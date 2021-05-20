import { API_KEY } from '../shared/constants';
import { tvApi } from '../shared/api';
import { personApi } from '../shared/api';
import { genreService } from './genreService';

import PreviewItem from '../models/PreviewItem';
import ShowDetails from '../models/ShowDetails';
import ExternalIds from '../models/ExternalIds';
import PreviewPerson from '../models/PreviewPerson';
import PreviewSeason from '../models/PreviewSeason';
import Video from '../models/Video';

class ShowService {
  async fetchPopular(numOfShows = 4, page = 1, language = 'en-US') {
    const options = {
      params: {
        page,
        language,
        api_key: API_KEY,
      },
    };

    const { data } = await tvApi.get('/popular', options);
    const fetchedShows = data.results.slice(0, numOfShows);
    const showPreviews = await this.createShowPreviews(fetchedShows);

    return showPreviews;
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

    const { data } = await tvApi.get(`/${tvId}/credits`, options);

    let castWithEpisodes;

    if (data.cast.length !== 0) {
      castWithEpisodes = await this.createCastWithEpisodes(data.cast);
    } else {
      castWithEpisodes = null;
    }

    return castWithEpisodes;
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
    }))
  }

  async fetchVideos(tvId, language = 'en-US') {
    const endpoint = `/${tvId}/videos`;
    const options = {
      params: {
        language,
        api_key: API_KEY,
      },
    };

    const { data } = await tvApi.get(endpoint, options);
    const videoList = data.results.length !== 0 ? data.results.map(video => new Video(video)) : null;

    return videoList;
  }

  async fetchRecommended(tvId, page = 1, language = 'en-US') {
    const options = {
      params: {
        page,
        language,
        api_key: API_KEY,
      },
    };

    const { data } = await tvApi.get(`/${tvId}/recommendations`, options);

    const recommendedShows = await this.createShowPreviews(data.results);

    return recommendedShows;
  }
}

export const showService = new ShowService();