'use client';

import * as z from 'zod';
import { profileFormSchema } from '@/schemas/onboarding.schema';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, Controller } from 'react-hook-form';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import Textbox from '@/components/shared/Textbox';

import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from '@/components/ui/field';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const ProfileComponent = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    mode: 'onChange',

    defaultValues: {
      name: '',
      role: '',
      teamSize: undefined,
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof profileFormSchema>) {
    try {
      toast.success('Profile saved');

      router.push('/workspace');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <section className="mx-auto max-w-md w-full h-full my-auto py-8">
      {/* STEP INDICATOR */}
      <div className="flex justify-end">
        <span className="text-sm desc-text">2/4</span>
      </div>

      {/* TEXT HEADER */}
      <Textbox
        title="Who's joining us?"
        desc="We'd love to know your name and role so that we can tailor the experience to know how you work best, whether you're solo or with a team."
      />

      {/* FORM */}
      <form onSubmit={form.handleSubmit(onSubmit)} className=" space-y-4">
        <FieldGroup>
          {/* NAME */}
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>What should we call you</FieldLabel>

                <Input
                  {...field}
                  placeholder="eg.. Orimadegun Promise"
                  className="input-field h-11"
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />

          {/* ROLE */}
          <Controller
            name="role"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>What&apos;s your role?</FieldLabel>

                <Input
                  {...field}
                  placeholder="eg.. Product Designer"
                  className="input-field h-11"
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        {/* TEAM SIZE */}
        <Controller
          name="teamSize"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>Are you working solo or with a team?</FieldLabel>

              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className=" space-y-3 text-xs"
              >
                <div className="flex items-center space-x-3">
                  <RadioGroupItem
                    value="solo"
                    id="solo"
                    className=" active:bg-primaryNorma"
                  />
                  <label htmlFor="solo">Just me</label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="2-10" id="team2" />
                  <label htmlFor="team2">2 - 10 teammates</label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="11-50" id="team3" />
                  <label htmlFor="team3">11 - 50 teammates</label>
                </div>

                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="50+" id="team4" />
                  <label htmlFor="team4">50+ teammates</label>
                </div>
              </RadioGroup>

              {fieldState.error && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* CONTINUE BUTTON */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="onboarding-button-primary bg-primaryNorma"
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </form>
    </section>
  );
};

export default ProfileComponent;
