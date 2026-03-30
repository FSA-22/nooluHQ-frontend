'use client';

import { Controller } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import Textbox from '../shared/Textbox';
import Link from 'next/link';
import useLogin from '@/hooks/useLogin';
import { useState } from 'react';
import { getErrorMessage } from '@/utils/getErrorMessage';
import { toast } from 'sonner';
import LoginWithGoogle from '../GoogleButton';

interface LoginFormData {
  email: string;
  password: string;
}

const LoginForm = () => {
  const { form, onSubmit } = useLogin();
  const [loading, setLoading] = useState(false);

  const submit = async (data: LoginFormData) => {
    if (loading) return;
    setLoading(true);
    try {
      console.log('data from form page', data);
      await onSubmit(data);
    } catch (error) {
      const message = getErrorMessage(error);
      form.setError('root', {
        type: 'server',
        message,
      });

      toast.error(message);

      throw error;
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="w-full mx-auto my-auto py-8 max-w-md">
      <div className="max-w-xl">
        <CardHeader className="p-0">
          <CardTitle>
            <Textbox
              title="Let's log you into your account"
              desc="Enter your email and password to access your account."
            />
          </CardTitle>
        </CardHeader>

        <CardContent className="p-0">
          <form
            id="account-onboarding-form"
            onSubmit={form.handleSubmit(submit)}
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
                      name="email"
                      placeholder="Your email address"
                      autoComplete="email"
                      aria-invalid={fieldState.invalid}
                      className="input-field h-10"
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
                    <FieldLabel htmlFor="password">Enter password</FieldLabel>

                    <Input
                      {...field}
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      autoComplete="new-password"
                      aria-invalid={fieldState.invalid}
                      className="input-field h-10"
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

        {form.formState.errors.root && (
          <p className="text-sm text-red-500">
            {form.formState.errors.root.message}
          </p>
        )}

        {/* SUBMIT BUTTON */}
        <div className="space-y-4 mt-4 w-full">
          <Button
            disabled={form.formState.isSubmitting || loading}
            type="submit"
            form="account-onboarding-form"
            className="w-full bg-primaryNorma hover:bg-primaryLight text-white py-5 rounded-1"
          >
            Login{' '}
          </Button>
          <div className="flex mx-auto text-center flex-col w-full">
            <div className="w-full mx-auto flex flex-col text-xs space-y-1">
              <div className="flex-center gap-1">
                Don&apos;t have an account?
                <Link
                  href={'/register'}
                  className="text-primaryNorma desc-text text-xs"
                >
                  Register
                </Link>
              </div>
              <div className="flex-center w-full desc-text text-xs mt-2">
                <span> By creating an account. I agree to MayK's AI </span>
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-primaryNorma ml-1 text-xs"
                >
                  Terms of Use
                </Link>
                and
                <Link
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className=" text-primaryNorma text-xs"
                >
                  {' '}
                  Privacy Policy
                </Link>
              </div>
            </div>
          </div>

          {/* OR DIVIDER */}
          <div className="flex items-center w-xs mx-auto gap-4">
            <div className="flex-1 border-t border-gray-200" />
            <span className="desc-text text-sm">OR</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>
          {/* GOOGLE BUTTON */}
          <LoginWithGoogle />
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
