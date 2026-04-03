import { NextRequest, NextResponse } from 'next/server';
import { serverAxios } from '@/lib/services/axios';
import axios from 'axios';

export async function POST(request: NextRequest) {
  try {
    const result = await serverAxios.post(
      '/api/v1/auths/resend-otp',
      await request.json(),
    );
    return NextResponse.json(result.data);
  } catch (error: unknown) {
    let status = 500;
    let message = 'Resend OTP failed';
    if (axios.isAxiosError(error)) {
      status = error.response?.status || 500;
      message = error.response?.data?.message || 'Resend OTP failed';
    }
    return NextResponse.json({ error: message }, { status });
  }
}
