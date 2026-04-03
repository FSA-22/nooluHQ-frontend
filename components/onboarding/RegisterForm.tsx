// ===============================
// RegisterForm.tsx
// ===============================
'use client';

import * as z from 'zod';
import { accountFormSchema } from '@/schemas/onboarding.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';
import Textbox from '../shared/Textbox';
import LoginWithGoogle from '../GoogleButton';

import { registerAccount } from '@/lib/services/onboarding';
import { getErrorMessage } from '@/utils/getErrorMessage';

const RegisterForm = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof accountFormSchema>>({
    resolver: zodResolver(accountFormSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    criteriaMode: 'all',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (data: z.infer<typeof accountFormSchema>) => {
    try {
      const res = await registerAccount(data);

      toast.success('Account created successfully');

      router.push(
        `/verify-email?email=${encodeURIComponent(data.email)}&sessionId=${res.sessionId}`,
      );
    } catch (error: any) {
      const message = getErrorMessage(error);
      form.setError('root', { type: 'server', message });
      toast.error(message);
    }
  };
  return (
    <section className="w-full mx-auto py-2 h-screen space-y-2 mt-10 max-w-md">
      {/* Step indicator */}
      <div className="w-full flex justify-end">
        <span className="desc-text text-xs mt-6 text-darkGrey">1/4</span>
      </div>

      <div className="max-w-md">
        <CardHeader className="py-1 px-0">
          <CardTitle>
            <Textbox
              title="Let's start with the basics"
              desc="Enter your email and set a secure password. This helps us keep your account safe and ready for future logins."
            />
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <form
            id="account-onboarding-form"
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FieldGroup>
              {/* EMAIL */}
              <Controller
                name="email"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="email">Email address</FieldLabel>
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Your email address"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      className="input-field h-9"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* PASSWORD */}
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="password">Create password</FieldLabel>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      placeholder="Create your password"
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                      className="input-field h-9"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              {/* CONFIRM PASSWORD */}
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor="confirmPassword">
                      Confirm password
                    </FieldLabel>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                      className="input-field h-9"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>

        {/* SUBMIT BUTTON */}
        <div className="space-y-1 mt-3 w-full">
          <Button
            disabled={isSubmitting}
            type="submit"
            form="account-onboarding-form"
            className="w-full bg-primaryNorma hover:bg-primaryLight text-white py-5 rounded-1"
          >
            {isSubmitting ? 'Creating...' : 'Create account'}
          </Button>

          <div className="flex flex-col text-[11px] w-full mt-1 mx-auto space-y-1 text-center">
            <div className="flex-center desc-text text-[11px] gap-1">
              Already have an account?
              <Link
                href="/login"
                className="text-primaryNorma desc-text text-[11px]"
              >
                Login
              </Link>
            </div>
            <div className="flex-center justify-around w-full desc-text text-[11px]">
              By creating an account, I agree to MayK's AI
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primaryNorma text-[11px]"
              >
                Terms of Use
              </Link>
              and
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primaryNorma text-xs"
              >
                Privacy Policy
              </Link>
            </div>
          </div>

          {/* OR DIVIDER */}
          <div className="flex items-center w-xs mx-auto gap-4 my-2">
            <div className="flex-1 border-t border-gray-200" />
            <span className="desc-text text-xs">OR</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* GOOGLE BUTTON */}
          <LoginWithGoogle />
        </div>
      </div>
    </section>
  );
};

export default RegisterForm;
