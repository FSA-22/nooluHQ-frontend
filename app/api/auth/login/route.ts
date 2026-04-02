import { NextRequest, NextResponse } from 'next/server';
import { serverAxios } from '@/lib/services/axios';
import { isAxiosError } from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('data from form route', body);

    const result = await serverAxios.post('/api/v1/auths/login', body);

    const { accessToken, refreshToken } = result.data;

    console.log('data accessToken and refreshToken', accessToken, refreshToken);

    const response = NextResponse.json({
      status: 200,
      message: 'Login successful',
    });

    const isProd = process.env.NODE_ENV === 'production';

    //  set cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
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
