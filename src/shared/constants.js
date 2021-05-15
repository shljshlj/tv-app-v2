import { imageConfiguration } from './configuration';

// Api key
export const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

// Endpoints
export const BASE_API_ENDPOINT = 'https://api.themoviedb.org/3';
export const TV_ENDPOINT = BASE_API_ENDPOINT + '/tv';
export const PERSON_ENDPOINT = BASE_API_ENDPOINT + '/person';

const TV_TOP_RATED = `${TV_ENDPOINT}/popular?api_key=${API_KEY}`;
const TV_POPULAR = `${TV_ENDPOINT}/top_rated?api_key=${API_KEY}`;


// https://api.themoviedb.org/3/tv/popular?api_key=${api_key}&language=en-US&page=1
// https://api.themoviedb.org/3/tv/top_rated?api_key=${api_key}&language=en-US&page=1




// Poster images
export const POSTER_PATH_XS = imageConfiguration.images.secure_base_url + imageConfiguration.images.poster_sizes[0];
export const POSTER_PATH_S = imageConfiguration.images.secure_base_url + imageConfiguration.images.poster_sizes[3];
export const POSTER_PATH_M = imageConfiguration.images.secure_base_url + imageConfiguration.images.poster_sizes[4];
export const POSTER_PATH_L = imageConfiguration.images.secure_base_url + imageConfiguration.images.poster_sizes[5];

// Backdrop images
export const POSTER_BACKDROP = imageConfiguration.images.secure_base_url + imageConfiguration.images.backdrop_sizes[3];

// Profile images
export const PROFILE_IMG_S = imageConfiguration.images.secure_base_url + imageConfiguration.images.profile_sizes[0];
export const PROFILE_IMG_M = imageConfiguration.images.secure_base_url + imageConfiguration.images.profile_sizes[1];
export const PROFILE_IMG_L = imageConfiguration.images.secure_base_url + imageConfiguration.images.profile_sizes[2];
export const PROFILE_IMG_ORG = imageConfiguration.images.secure_base_url + imageConfiguration.images.profile_sizes[3];

// https://image.tmdb.org/t/p/w45/igWylWFncQPoJZcmwRsACUYXtyQ.jpg
// https://image.tmdb.org/t/p/w185/igWylWFncQPoJZcmwRsACUYXtyQ.jpg
// https://image.tmdb.org/t/p/h632/igWylWFncQPoJZcmwRsACUYXtyQ.jpg


// External Urls
export const IMDB_URL = 'https://www.imdb.com/title/';
export const FACEBOOK_URL = 'https://www.facebook.com/';
export const INSTAGRAM_URL = 'https://www.instagram.com/';
export const TWITTER_URL = 'https://twitter.com/';

// YouTube
const YOUTUBE_URL = 'https://www.youtube.com/watch?v=aDrsItJ_HU4';