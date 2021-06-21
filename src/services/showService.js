import { API_KEY } from '../shared/constants';
import { searchApi, tvApi, personApi, discoverApi } from '../shared/api';
import { genreService } from './genreService';

import PreviewItem from '../models/PreviewItem';
import ShowDetails from '../models/ShowDetails';
import ExternalIds from '../models/ExternalIds';
import PreviewPerson from '../models/PreviewPerson';
import PreviewSeason from '../models/PreviewSeason';
import Video from '../models/Video';


class ShowService {
  fetchPopular = this.fetchShows('/popular');
  // fetchTopRated = this.fetchShows('/top_rated');
  fetchTopRated = this.fetchTopRated2('/tv');

  fetchTopRated2(endpoint = '/tv') {
    return async (numOfShows = 20, page = 1, language = 'en-US') => {
      const options = {
        params: {
          page,
          language,
          'sort_by': 'vote_average.desc',
          'vote_count.gte': 1500,
          api_key: API_KEY
        },
      };

      const { data } = await discoverApi.get(endpoint, options);
      const fetchedShows = data.results.slice(0, numOfShows);
      const showPreviews = await this.createShowPreviews(fetchedShows);

      return showPreviews;
    }
  }

  fetchShows(endpoint) {
    return async (numOfShows = 20, page = 1, language = 'en-US') => {
      const options = {
        params: {
          page,
          language,
          api_key: API_KEY,
        },
      };

      const { data } = await tvApi.get(endpoint, options);
      const fetchedShows = data.results.slice(0, numOfShows);
      const showPreviews = await this.createShowPreviews(fetchedShows);

      return showPreviews;
    }
  }

  async createShowPreviews(fetchedShows) {
    const allGenres = await genreService.fetchAllGenres();

    return fetchedShows.map((show) => {
      const {
        id,
        name,
        genre_ids,
        vote_average,
        first_air_date,
        poster_path,
      } = show;

      const genres = genreService.findGenres(allGenres, genre_ids);

      return new PreviewItem(
        id,
        name,
        first_air_date,
        genres,
        vote_average,
        poster_path
      );
    });
  }

  async fetchDetails(tvId, language = 'en-US') {
    const options = {
      params: {
        language,
        append_to_response: 'videos',
        api_key: API_KEY,
      },
    };

    const { data } = await tvApi.get(`/${tvId}`, options);

    const {
      id,
      name,
      episode_run_time,
      genres,
      first_air_date,
      last_air_date,
      vote_average,
      vote_count,
      overview,
      tagline,
      status,
      seasons,
      origin_country,
      original_language,
      poster_path,
      backdrop_path,
      homepage,
      created_by,
    } = data;

    const seasonPreviews = seasons.map(season => new PreviewSeason(season));
    const creators = created_by.map(creator => creator.name);

    return new ShowDetails(
      id,
      name,
      episode_run_time,
      genres,
      first_air_date,
      last_air_date,
      vote_average,
      vote_count,
      overview,
      tagline,
      status,
      seasonPreviews,
      origin_country,
      original_language,
      poster_path,
      backdrop_path,
      homepage,
      creators
    );
  }

  async fetchExternalIds(tvId, language = 'en-US') {
    const options = {
      params: {
        language,
        api_key: API_KEY,
      },
    };

    const { data } = await tvApi.get(`/${tvId}/external_ids`, options);

    return new ExternalIds(data);
  }

  async fetchKeywords(tvId, language = 'en-US') {
    const options = {
      params: {
        language,
        api_key: API_KEY,
      },
    };

    const { data } = await tvApi.get(`/${tvId}/keywords`, options);
    const keywords = data.results;

    return keywords;
  }

  async fetchCast(tvId, language = 'en-US') {
    const options = {
      params: {
        language,
        api_key: API_KEY,
      },
    };

    try {
      const { data } = await tvApi.get(`/${tvId}/credits`, options);

      const castWithEpisodes = data.cast.length !== 0 ? await this.createCastWithEpisodes(data.cast) : null;

      return {
        cast: castWithEpisodes,
        error: null
      };
    } catch (err) {
      console.error(err.message);

      return {
        cast: null,
        error: err.message
      };
    }
  }

  async fetchEpisodeCount(personId, creditId, language = 'en-US') {
    const options = {
      params: {
        language,
        api_key: API_KEY,
      },
    };

    const { data } = await personApi.get(`/${personId}/tv_credits`, options);
    const show = data.cast.filter(obj => obj.credit_id === creditId)[0];

    let episodeCount;

    if (show) episodeCount = show.episode_count;
    else episodeCount = null;

    return episodeCount;
  }

  async createCastWithEpisodes(cast) {

    return await Promise.all(cast.map(async person => {
      const personId = person.id;
      const creditId = person.credit_id;
      const episodeCount = await this.fetchEpisodeCount(personId, creditId);

      return new PreviewPerson(person, episodeCount);
    }));
  }

  async fetchVideos(tvId, language = 'en-US') {
    const endpoint = `/${tvId}/videos`;
    const options = {
      params: {
        language,
        api_key: API_KEY,
      },
    };

    try {
      const { data } = await tvApi.get(endpoint, options);

      const videoList = data.results.length !== 0 ? data.results.map(video => new Video(video)) : [];

      return {
        videos: videoList,
        error: null
      };
    } catch (err) {
      console.error(err.message);

      return {
        videos: [],
        error: err.message
      };
    }

  }

  async fetchRecommended(tvId, page = 1, language = 'en-US') {
    const options = {
      params: {
        page,
        language,
        api_key: API_KEY,
      },
    };

    try {
      const { data } = await tvApi.get(`/${tvId}/recommendations`, options);
      const recommendations = await this.createShowPreviews(data.results);
      const recommendedShows = recommendations.slice(0, 8);

      return {
        recommendedShows,
        error: null
      };
    } catch (err) {
      console.error(err.message);

      return {
        recommendedShows: null,
        error: err.message
      };
    }
  }

  async searchShows(query, page = 1, language = 'en-US') {
    const options = {
      params: {
        query,
        page,
        language,
        api_key: API_KEY,
      },
    };

    try {
      const { data } = await searchApi.get('/tv', options);

      return data.results.slice(0, 8);
    } catch (err) {
      console.error(err.message);
    }
  }
}

export const showService = new ShowService();