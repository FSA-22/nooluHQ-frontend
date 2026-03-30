import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('data from form route', body);

    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auths/login`,
      body,
    );

    const { accessToken, refreshToken } = result.data;

    console.log('data accessToken and refreshToken', accessToken, refreshToken);

    const response = NextResponse.json({
      status: 200,
      message: 'Login successful',
    });

    const isProd = process.env.NODE_ENV === 'production';

    //  set cookies
    response.cookies.set('access_token', accessToken, {
      httpOnly: true,
      secure: isProd,
      maxAge: 60 * 15,
      path: '/',
      sameSite: 'lax',
    });

    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: isProd,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    });

    return response;
  } catch (error: any) {
    console.error('LOGIN ROUTE ERROR:', error?.response?.data || error);

    const status = error?.response?.status || 500;
    const message =
      error?.response?.data?.message ||
      error?.response?.data?.detail ||
      'Login failed';

    return NextResponse.json({ message }, { status });
  }
}
