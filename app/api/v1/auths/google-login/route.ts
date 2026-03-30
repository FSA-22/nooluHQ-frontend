import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json({ error: 'Missing ID token' }, { status: 400 });
    }

    const res = await fetch(`${process.env.BACKEND_URL}/auths/google-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ idToken }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: 'Backend failed' }, { status: 500 });
    }

    const data = await res.json();

    const response = NextResponse.json({ success: true });

    // ✅ Important: secure only in production
    const isProd = process.env.NODE_ENV === 'production';

    response.cookies.set('accessToken', data.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
    });

    response.cookies.set('refreshToken', data.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: 'lax',
      path: '/',
    });

    return response;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
