import API from '../shared/api';
import { API_KEY } from '../shared/constants';

class GenreService {
  async fetchAllGenres(language = 'en-US') {
    const options = {
      params: {
        language,
        api_key: API_KEY,
      },
    };

    const endpoint = '/genre/tv/list';

    const { data } = await API.get(endpoint, options);

    return data.genres;
  }

  findGenres(allGenres, genreIds) {
    return genreIds.map((id) => allGenres.find((el) => el.id === id));
  }
}

export const genreService = new GenreService();
