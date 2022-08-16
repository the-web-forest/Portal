import axios from 'axios';
import { parseCookies } from 'nookies';
import AppConfig from './appConfig';
import CookiesEnum from './CookiesEnum';

const axiosInstance = axios.create({
  baseURL: AppConfig.baseURL,
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

export const api = axiosInstance;
