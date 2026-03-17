import axios from 'axios';

export const serverAxios = axios.create({
  baseURL: process.env.EXPRESS_API_URL,
  withCredentials: true,
  timeout: 10000,
});
