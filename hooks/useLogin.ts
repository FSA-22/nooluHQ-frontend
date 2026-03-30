'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/services/auth';
import { toast } from 'sonner';
import { loginFormSchema } from '@/schemas/onboarding.schema';

export default function useLogin() {
  const router = useRouter();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    console.log('data from form hook', values);

    return toast.promise(login(values), {
      loading: 'Logging in...',
      success: () => {
        router.push('/dashboard');
        return 'Logged in successfully!';
      },
      error: (err) => {
        return err?.response?.data?.message || 'Login failed';
      },
    });
  };

  return { form, onSubmit };
}
