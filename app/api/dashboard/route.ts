import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { serverAxios } from '@/lib/services/axios'; // <-- use the preconfigured instance
import { AxiosError } from 'axios';

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized: No access token' },
        { status: 401 },
      );
    }

    const response = await serverAxios.get('/api/v1/dashboard/stats', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });

    return NextResponse.json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;

    console.error(
      'Dashboard API error:',
      axiosError.response?.data || axiosError.message,
    );

    return NextResponse.json(
      {
        message:
          (axiosError.response?.data as any)?.detail ||
          (axiosError.response?.data as any)?.message ||
          'Failed to fetch dashboard stats',
      },
      { status: axiosError.response?.status || 500 },
    );
  }
}
