'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/services/auth';
import { toast } from 'sonner';
import { loginFormSchema } from '@/schemas/onboarding.schema';

const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
  const router = useRouter();

  console.log('data from form hook', values);

  try {
    const res = await login(values);
    toast.success('Logged in successfully!');
    router.push('/dashboard');
    return res;
  } catch (error: any) {
    toast.error(error.message || 'Login failed');
    throw error;
  }
};
