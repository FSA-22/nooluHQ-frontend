'use client';

import * as z from 'zod';
import { accountFormSchema } from '@/schemas/onboarding.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { registerAccount } from '@/lib/services/onboarding';
import { useRouter } from 'next/navigation';

import { Input } from '@/components/ui/input';
import Textbox from '../shared/Textbox';
import Image from 'next/image';
import { toast } from 'sonner';
import Link from 'next/link';

const AccountForm = () => {
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
    console.log(data, 'data');

    try {
      await registerAccount(data);

      toast.success('Account created successfully');
      form.reset();

      router.push('/confirm-email');
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  return (
    <section className="w-full mx-auto my-auto py-8 max-w-md">
      {/* step indicator */}
      <div className="w-full flex justify-end">
        <span className="desc-text text-xs mt-6 text-darkGrey">1/4</span>
      </div>

      <div className="max-w-xl">
        <CardHeader className="p-0">
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
                    <FieldLabel htmlFor="password">Create password</FieldLabel>

                    <Input
                      {...field}
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Create your password"
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
                      name="confirmPassword"
                      placeholder="Confirm your password"
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

        {/* SUBMIT BUTTON */}
        <div className="space-y-2 mt-4 w-full">
          <Button
            disabled={isSubmitting}
            type="submit"
            form="account-onboarding-form"
            className="w-full bg-primaryNorma hover:bg-primaryLight text-white py-5 rounded-1"
          >
            Create account
          </Button>
          <div className="flex mx-auto text-center flex-col w-full">
            <div className="w-full mx-auto flex flex-col text-xs space-y-1">
              <div className="flex-center gap-1">
                Already have an account?
                <span className="text-primaryNorma desc-text text-xs">
                  Login
                </span>
              </div>
              <div className="flex-center w-full desc-text text-xs">
                By creating an account. I agree to MayK's AI
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
          <Button
            type="button"
            variant="outline"
            className="w-full py-5 flex-center gap-3 text-darkGrey rounded-1"
          >
            <Image
              width={18}
              height={18}
              alt="Google icon"
              src="/icons/google-icon.svg"
            />
            Continue with Google
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AccountForm;
