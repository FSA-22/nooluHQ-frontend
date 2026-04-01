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
      maxAge: 60 * 60,
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
    console.error('Verify OTP error:', status);

    return NextResponse.json({ error: message }, { status });
  }
}
