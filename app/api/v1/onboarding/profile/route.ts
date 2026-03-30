import { NextResponse } from 'next/server';
import { serverAxios } from '@/lib/services/axios';
import { AxiosError, isAxiosError } from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  console.log('profile API route loaded');

  try {
    const body = await req.json();

    // Extract access token from cookies (match name exactly)
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    console.log('Extracted accessToken:', accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized: No access token' },
        { status: 401 },
      );
    }

    // Send token via Authorization header
    const response = await serverAxios.post(
      '/api/v1/onboarding/profile',
      body,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    return NextResponse.json(response.data, { status: response.status });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;

      return NextResponse.json(
        {
          message: axiosError.response?.data?.message || 'Profile setup failed',
        },
        { status: axiosError.response?.status || 500 },
      );
    }

    return NextResponse.json(
      { message: 'Profile setup failed' },
      { status: 500 },
    );
  }
}
