// app/api/v1/auths/account/route.ts
import { NextResponse } from 'next/server';
import { serverAxios } from '@/lib/services/axios';
import { AxiosError, isAxiosError } from 'axios';

export async function POST(req: Request) {
  console.log('account API route loaded');

  try {
    const body = await req.json();
    console.log('body from route', body);

    const response = await serverAxios.post('/api/v1/auths/account', body);

    return NextResponse.json(response.data);
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
