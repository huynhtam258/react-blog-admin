import axios from 'axios';
import { BASE_KEY } from './../enums/index';

const http = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: Number(process.env.REACT_APP_TIMEOUT || 0),
});

http.interceptors.request.use((config) => {
  const token = localStorage.getItem(BASE_KEY.ACCESS_TOKEN);
  const clientKey = localStorage.getItem(BASE_KEY.CLIENT_KEY);

  if (token) {
    config.headers['authorization'] = `Bearer ${token}`;
  }

  if (clientKey) {
    config.headers['x-client-id'] = clientKey;
  }

  return config;
});

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.config.url === '/user/profile') {
      localStorage.clear()
    }
    return Promise.reject(error);
  }
);

export default http;
