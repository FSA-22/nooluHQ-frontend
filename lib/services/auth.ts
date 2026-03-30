import axios from 'axios';
import { getErrorMessage } from '@/utils/getErrorMessage';

interface LoginPayload {
  email: string;
  password: string;
}

export const login = async (payload: LoginPayload) => {
  try {
    console.log('data from form service', payload);

    const response = await axios.post('/api/v1/auths/login', payload, {
      withCredentials: true,
    });

    return response.data;
  } catch (error: any) {
    const message = getErrorMessage(error);

    console.error('[login service error]:', message);

    throw new Error(message);
  }
};
