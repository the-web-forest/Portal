import axios from 'axios';
import cachios from 'cachios';
import { parseCookies } from 'nookies';
import CookiesEnum from './CookiesEnum';
import Settings from './settings';

const axiosInstance = axios.create({
  baseURL: Settings.getApiUrl(),
});

axiosInstance.interceptors.request.use(config => {
  const cookies = parseCookies()[CookiesEnum.USER_TOKEN];
  const USER_TOKEN = cookies;
  if (config.headers && USER_TOKEN) {
    config.headers.Authorization = `Bearer ${USER_TOKEN}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  response => Promise.resolve(response),
  error => {
    if (error.response.status == 401) {
      window.open(`https://${window.location.host}`, '_self');
    }
    return Promise.reject(error);
  },
);

const cachiosInstance = cachios.create(axiosInstance);

export const api = cachiosInstance;
