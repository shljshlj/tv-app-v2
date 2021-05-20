import { API_KEY } from '../shared/constants';
import { tvApi } from '../shared/api';
import { personApi } from '../shared/api';
import { genreService } from './genreService';

import PreviewItem from '../models/PreviewItem';
import ShowDetails from '../models/ShowDetails';
import ExternalIds from '../models/ExternalIds';
import PreviewPerson from '../models/PreviewPerson';
import Show from '../models/Show';
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

  async fetchDetails2(tvId, language = 'en-US') {
    const options = {
      params: {
        language,
        append_to_response: 'videos',
        api_key: API_KEY,
      },
    };

    const { data } = await tvApi.get(`/${tvId}`, options);

    return data;
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
      seasons,
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


  async fetchRecommended(tvId, page = 1, language = 'en-US') {
    const options = {
      params: {
        page,
        language,
        api_key: API_KEY,
      },
    };

    const { data } = await tvApi.get(`/${tvId}/recommendations`, options);

    return data.results;
  }

  async fetchShow(tvId, page, language) {
    const details = await this.fetchDetails2(tvId, language);
    const cast = await this.fetchCast(tvId, language);
    const externalIds = await this.fetchExternalIds(tvId, language);
    const keywords = await this.fetchKeywords(tvId, language);
    const recommended = await this.fetchRecommended(tvId, page, language);
    const recommendedShows = await this.createShowPreviews(recommended);

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
      status,
      type,
      number_of_episodes,
      number_of_seasons,
      seasons,
      origin_country,
      original_language,
      poster_path,
      backdrop_path,
      videos,
      homepage,
      created_by,
    } = details;

    const creators = created_by.map(creator => creator.name);
    const seasonPreviews = seasons.map(season => new PreviewSeason(season));
    const videoList = videos.results.length !== 0 ? videos.results.map(video => new Video(video)) : null;

    return new Show(
      id,
      name,
      episode_run_time,
      genres,
      first_air_date,
      last_air_date,
      vote_average,
      vote_count,
      overview,
      status,
      type,
      number_of_episodes,
      number_of_seasons,
      seasonPreviews,
      origin_country,
      original_language,
      poster_path,
      backdrop_path,
      videoList,
      creators,
      cast,
      homepage,
      externalIds,
      keywords,
      recommendedShows
    );
  }
}

export const showService = new ShowService();