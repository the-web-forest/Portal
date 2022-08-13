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

export const api = axiosInstance;
