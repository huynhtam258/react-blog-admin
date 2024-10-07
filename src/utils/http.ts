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
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 419 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem(BASE_KEY.REFRESH_TOKEN);

      try {
        const { data } = await axios.post( process.env.REACT_APP_BASE_URL + 'auth/refresh-token', { refresh_token: refreshToken });
        const { access_token, refresh_token } = data
        localStorage.setItem(BASE_KEY.ACCESS_TOKEN, access_token);
        localStorage.setItem(BASE_KEY.REFRESH_TOKEN, refresh_token);

        http.defaults.headers.common['authorization'] = 'Bearer ' + access_token;
        originalRequest.headers['authorization'] = 'Bearer ' + access_token;

        return axios(originalRequest);
      } catch (err) {
        localStorage.clear();
        return Promise.reject(err);
      }
    }

    if (originalRequest.url === '/user/profile') {
      localStorage.clear();
    }
    return Promise.reject(error);
  }
);

export default http;
