import axios, { AxiosInstance } from 'axios';

const BACKEND_URL = 'https://filltext.com/'
const REQUEST_TIMEOUT = 180000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  return api;
};
