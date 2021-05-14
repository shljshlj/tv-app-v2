import axios from 'axios';
import { BASE_API_ENDPOINT } from './constants';
import { TV_ENDPOINT } from './constants';

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