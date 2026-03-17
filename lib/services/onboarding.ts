import axios from 'axios';

export async function registerAccount(data: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  try {
    const res = await axios.post('/api/v1/auths/account', data, {
      withCredentials: true,
    });

    console.log('Registered:', res.data);

    return res.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
    throw new Error('Registration failed');
  }
}
