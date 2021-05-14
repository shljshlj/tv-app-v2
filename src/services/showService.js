import { API_KEY } from '../shared/constants';
import { tvApi } from '../shared/api';
import { genreService } from './genreService';

import PreviewItem from '../models/PreviewItem';

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

    return data.results.slice(0, numOfShows);
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
        overview,
      } = show;

      const genres = genreService.findGenres(allGenres, genre_ids);

      return new PreviewItem(
        id,
        name,
        first_air_date,
        genres,
        overview,
        vote_average,
        poster_path
      );
    });
  }
}

export const showService = new ShowService();