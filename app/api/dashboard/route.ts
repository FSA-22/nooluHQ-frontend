import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import axios, { AxiosError } from 'axios';

export async function GET(req: NextRequest) {
  try {
    // Read cookie from browser request
    const accessToken = req.cookies.get('accessToken')?.value;

    if (!accessToken) {
      return NextResponse.json(
        { message: 'Unauthorized: No access token' },
        { status: 401 },
      );
    }

    // Send token via Authorization header
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/dashboard/stats`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    console.log('Extracted response:', response.data);

    return NextResponse.json(response.data);
  } catch (error) {
    const axiosError = error as AxiosError;

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
