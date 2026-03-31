import { NextResponse } from 'next/server';
import axios from 'axios';

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    // Validate request body
    if (!idToken) {
      return NextResponse.json({ error: 'Missing ID token' }, { status: 400 });
    }

    // Call backend with axios
    const { data } = await axios.post(
      `${process.env.BACKEND_URL}/api/auths/google-login`,
      { idToken },
    );

    // Create response
    const response = NextResponse.json({ success: true });

    const isProd = process.env.NODE_ENV === 'production';

    // Set HttpOnly cookies
    response.cookies.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 15,
    });

    response.cookies.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });
    return response;
  } catch (error: any) {
    console.error('Google login route error:', error?.response?.data || error);

    return NextResponse.json(
      { error: 'Backend login failed' },
      { status: 500 },
    );
  }
}
