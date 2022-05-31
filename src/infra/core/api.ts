import axios from 'axios';
import AppConfig from './appConfig';

const axiosInstance = axios.create({
  baseURL: AppConfig.baseURL,
});

axiosInstance.interceptors.request.use(config => {
  const USER_TOKEN = process.env.USER_TOKEN;

  if (config.headers && USER_TOKEN) {
    config.headers.Authorization = `Bearer ${USER_TOKEN}`;
  }
  return config;
});

export const api = axiosInstance;
