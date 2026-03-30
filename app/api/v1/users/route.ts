import { NextResponse } from 'next/server';
import { serverAxios } from '@/lib/services/axios';
import { AxiosError, isAxiosError } from 'axios';
import { cookies } from 'next/headers';

interface UserDataResponse {
  message?: string;
  detail?: string;
}

export async function GET() {
  try {
    //  Extract access token from cookies (server-side safe)
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('accessToken')?.value;

    console.log('Extracted accessToken (user route):', accessToken);

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized: No access token' },
        { status: 401 },
      );
    }

    // ✅ Call backend with Authorization header
    const response = await serverAxios.get('/users', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({
      status: 200,
      data: response.data,
    });
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      const axiosError = error as AxiosError<UserDataResponse>;

      return NextResponse.json(
        {
          message:
            axiosError.response?.data?.message ||
            axiosError.response?.data?.detail ||
            'Failed to fetch user details',
        },
        {
          status: axiosError.response?.status || 500,
        },
      );
    }

    return NextResponse.json(
      { message: 'Failed to fetch user details' },
      { status: 500 },
    );
  }
}
