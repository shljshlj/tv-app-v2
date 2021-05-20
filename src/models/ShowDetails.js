import { POSTER_PATH_L } from '../shared/constants';
import { POSTER_PATH_M } from '../shared/constants';
import { POSTER_BACKDROP } from '../shared/constants';

import findLanguageName from '../utils/findLanguageName';
import findCountryName from '../utils/findCountryName';

export default class ShowDetails {
  constructor(
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
  ) {
    this.showId = id;
    this.title = name;
    this.episodeRuntime = episode_run_time[0];
    this.genres = genres;
    this.firstAirDate = first_air_date;
    this.lastAirDate = last_air_date;
    this.voteAverage = vote_average;
    this.voteCount = vote_count;
    this.overview = overview;
    this.tagline = tagline;
    this.status = status;
    this.seasons = seasons;
    this.originCountry = origin_country;
    this.originalLanguage = original_language;
    this.posterPath = poster_path;
    this.backdropPath = backdrop_path;
    this.creators = creators;
    this.homepage = homepage;
  }


  getGenreString() {
    let genreString = '';
    for (let i = 0; i < this.genres.length; i++) {
      if (i === this.genres.length - 1) genreString += this.genres[i].name;
      else genreString += this.genres[i].name + ', ';
    }

    return genreString;
  }

  getDateFormat() {
    if (this.firstAirDate) {
      const releaseYear = new Date(this.firstAirDate).getFullYear();

      if (this.status === 'Ended' && this.lastAirDate) {
        const lastAirDateYear = new Date(this.lastAirDate).getFullYear();
        return `(${releaseYear}${String.fromCharCode(8211)}${lastAirDateYear})`;
      }

      return `(${releaseYear}${String.fromCharCode(8211)})`;
    }
  }

  getReleaseDateFormat() {
    if (this.firstAirDate) {
      return new Date(this.firstAirDate).toLocaleDateString("en-GB", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    }
    return this.firstAirDate;
  }

  getCreatorString() {
    let creatorString = '';

    for (let i = 0; i < this.creators.length; i++) {
      if (i === this.creators.length - 1) creatorString += this.creators[i];
      else creatorString += this.creators[i] + ', ';
    }

    return creatorString;
  }

  getBackdropUrl() {
    if (!this.backdropPath) return null;
    return `${POSTER_BACKDROP}${this.backdropPath}`
  }

  getPosterUrl(size = 'medium') {
    if (!this.posterPath) return null;

    const posterSizes = {
      large: `${POSTER_PATH_L}${this.posterPath}`,
      medium: `${POSTER_PATH_M}${this.posterPath}`,
    };

    return posterSizes[size];
  }

  getOriginalLanguageFull() {
    if (!this.originalLanguage) return null;
    return findLanguageName(this.originalLanguage);
  }

  getCountryOfOrigin() {
    if (this.originCountry.length === 0) return null;

    return this.originCountry.map(country => findCountryName(country));
  }
};