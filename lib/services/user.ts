import axios, { AxiosError } from 'axios';

export const getAuthenticatedUser = async () => {
  try {
    const response = await axios.get('/api/users');

    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      throw error.response?.data || error;
    } else {
      throw error;
    }
  }
};
