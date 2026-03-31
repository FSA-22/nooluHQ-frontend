import { NextResponse } from 'next/server';
import { serverAxios } from '@/lib/services/axios';
import { isAxiosError } from 'axios';

export async function POST(req: Request) {
  console.log('account API route loaded');

  try {
    const body = await req.json();
    console.log('body from route', body);

    const response = await serverAxios.post('/api/v1/auths/register', body);

    console.log('backend response status:', response.status);
    console.log('backend response data:', response.data);

    return NextResponse.json(response.data, {
      status: response.status,
    });
  } catch (error: unknown) {
    console.error('FULL ERROR:', error);

    if (isAxiosError(error)) {
      console.error('AXIOS ERROR DATA:', error.response?.data);
      console.error('AXIOS ERROR STATUS:', error.response?.status);
      console.error('AXIOS ERROR URL:', error.config?.baseURL);

      return NextResponse.json(
        {
          message: error.response?.data || 'Axios error',
          status: error.response?.status,
          baseURL: error.config?.baseURL,
        },
        { status: error.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: 'Unknown error', error },
      { status: 500 },
    );
  }
}
