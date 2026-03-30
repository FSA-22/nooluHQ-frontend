import axios from 'axios';

export const getDashboardStats = async () => {
  try {
    const response = await axios.get('/api/v1/dashboard', {
      withCredentials: true,
    });

    if (!response.data) {
      throw new Error('Invalid response structure from dashboard API');
    }

    return response.data;
  } catch (error) {
    console.error('[getDashboardStats]', error);
    throw error;
  }
};
