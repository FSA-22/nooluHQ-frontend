import { NextResponse } from 'next/server';
import { serverAxios } from '@/lib/services/axios';
import { AxiosError, isAxiosError } from 'axios';

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
    // Type-safe Axios error check
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return NextResponse.json(
        {
          message: axiosError.response?.data?.message || 'Registration failed',
        },
        { status: axiosError.response?.status || 500 },
      );
    }

    // fallback for unknown errors
    return NextResponse.json(
      { message: 'Registration failed' },
      { status: 500 },
    );
  }
}
