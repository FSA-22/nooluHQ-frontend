import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(request: NextRequest) {
  const body = await request.json();

  try {
    const result = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auths/verify-otp`,
      body,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const { accessToken, refreshToken, message, nextStep } = result.data;

    const response = NextResponse.json({
      message,
      nextStep,
    });

    //  Set cookies
    response.cookies.set('accessToken', accessToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60, // 1 hour
      path: '/',
      sameSite: 'lax',
    });

    response.cookies.set('refreshToken', refreshToken, {
      httpOnly: true,
      secure: false,
      maxAge: 60 * 60 * 24 * 7,
      path: '/',
      sameSite: 'lax',
    });
    console.log('Response from new cookie set up', response);
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

    let status = 500;
    let message = 'OTP verification failed';

    if (axios.isAxiosError(error)) {
      status = error.response?.status || 500;
      message =
        error.response?.data?.message ||
        error.response?.data?.detail ||
        JSON.stringify(error.response?.data) ||
        'OTP verification failed';
    } else {
      console.error('Non-Axios error:', error);
    }

    console.error('Verify OTP error:', message);

    return NextResponse.json({ error: message }, { status });
  }
}
