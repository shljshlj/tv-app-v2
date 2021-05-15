import { POSTER_PATH_L } from '../shared/constants';
import { POSTER_PATH_M } from '../shared/constants';
import { POSTER_BACKDROP } from '../shared/constants';

import findLanguageName from '../utils/findLanguageName';
import findCountryName from '../utils/findCountryName';

export default class Show {
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
    creators,
    cast,
    homepage,
    externalIds,
    keywords,
    recommendedShows
  ) {
    this.id = id;
    this.title = name;
    this.episodeRuntime = episode_run_time[0];
    this.genres = genres;
    this.firstAirDate = first_air_date;
    this.lastAirDate = last_air_date;
    this.voteAverage = vote_average;
    this.voteCount = vote_count;
    this.overview = overview;
    this.status = status;
    this.type = type;
    this.numOfEpisodes = number_of_episodes;
    this.numOfSeasons = number_of_seasons;
    this.seasons = seasons;
    this.originCountry = origin_country;
    this.originalLanguage = original_language;
    this.posterPath = poster_path;
    this.backdropPath = backdrop_path;
    this.videos = videos;
    this.creators = creators;
    this.cast = cast;
    this.homepage = homepage;
    this.externalIds = externalIds;
    this.keywords = keywords;
    this.recommendedShows = recommendedShows;
  }

  getGenreList() {
    let genreList = '';
    for (let i = 0; i < this.genres.length; i++) {
      if (i === this.genres.length - 1) genreList += this.genres[i].name;
      else genreList += this.genres[i].name + ', ';
    }

    return genreList;
  }

  getDateFormat() {
    if (this.firstAirDate) {
      const releaseYear = new Date(this.firstAirDate).getFullYear();

      if (this.status === 'Ended' && this.lastAirDate) {
        const lastAirYear = new Date(this.lastAirDate).getFullYear();
        return `(${releaseYear}${String.fromCharCode(8211)}${lastAirYear})`;
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

  getCreatorsList() {
    let creatorsList = '';

    for (let i = 0; i < this.creators.length; i++) {
      if (i === this.creators.length - 1) creatorsList += this.creators[i];
      else creatorsList += this.creators[i] + ', ';
    }

    return {
      numOfCreators: this.creators.length,
      creatorsList
    };
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

  getKeywordsArray() {
    return Array.from(this.keywords, keywordObj => keywordObj.name);
  }
};
