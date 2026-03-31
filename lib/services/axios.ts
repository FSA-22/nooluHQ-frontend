import axios from 'axios';

export const serverAxios = axios.create({
  baseURL: process.env.BASE_URL,
  withCredentials: true,
  timeout: 10000,
});
