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
  } catch (error: any) {
    console.log('AXIOS FULL ERROR:', error);

    return NextResponse.json({
      message: error.message,
      status: error.response?.status,
      data: error.response?.data,
      url: error.config?.url,
      baseURL: error.config?.baseURL,
    });
  }
}
