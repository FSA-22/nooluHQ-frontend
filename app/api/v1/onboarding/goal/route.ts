import { NextResponse } from 'next/server';
import { serverAxios } from '@/lib/services/axios';
import { AxiosError, isAxiosError } from 'axios';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    //  Extract access token from cookies
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    console.log('Extracted accessToken:', accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized: No access token' },
        { status: 401 },
      );
    }

    const response = await serverAxios.post('/api/v1/onboarding/goal', body, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json(response.data);
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<{ message?: string }>;
      return NextResponse.json(
        { message: axiosError.response?.data?.message || 'Goal setup failed' },
        { status: axiosError.response?.status || 500 },
      );
    }
    return NextResponse.json({ message: 'Goal setup failed' }, { status: 500 });
  }
}
