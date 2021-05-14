import { POSTER_PATH_S } from '../shared/constants';
import { POSTER_PATH_M } from '../shared/constants';

export default class PreviewItem {
  constructor(
    id,
    title,
    releaseDate,
    genres,
    overview,
    rating,
    poster_path
  ) {
    this.id = id;
    this.title = title;
    this.releaseDate = releaseDate;
    this.genres = genres;
    this.overview = overview;
    this.rating = rating;
    this.posterPath = poster_path;
  }

  getPosterUrl(size = 'm') {
    if (!this.posterPath) return null;

    const posterUrl = {
      s: `${POSTER_PATH_S}${this.posterPath}`,
      m: `${POSTER_PATH_M}${this.posterPath}`
    }
    return posterUrl[size];
  }

  getReleaseYear() {
    if (!this.releaseDate) return null;
    return new Date(this.releaseDate).getFullYear();
  }

  getGenreNames() {
    return this.genres.reduce((acc, cur) => {
      if (cur) return [...acc, cur.name];
      return acc;
    }, []);
  }

  getGenresFormat() {
    const genreNames = this.getGenreNames();
    return genreNames.join(' &bull; ');
  }
};