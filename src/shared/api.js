import axios from 'axios';
import {
  BASE_API_ENDPOINT,
  TV_ENDPOINT,
  PERSON_ENDPOINT,
  SEARCH_ENDPOINT,
  DISCOVER_ENDPOINT
} from './constants';


export default axios.create({
  baseURL: BASE_API_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const tvApi = axios.create({
  baseURL: TV_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const personApi = axios.create({
  baseURL: PERSON_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const searchApi = axios.create({
  baseURL: SEARCH_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});

export const discoverApi = axios.create({
  baseURL: DISCOVER_ENDPOINT,
  headers: {
    'Content-Type': 'application/json'
  }
});