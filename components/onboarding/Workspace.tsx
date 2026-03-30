'use client';

import * as z from 'zod';
import { workspaceFormSchema } from '@/schemas/onboarding.schema';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

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

import { ChevronLeft } from 'lucide-react';
import { createWorkspace } from '@/lib/services/onboarding';

const WorkspaceComponent = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof workspaceFormSchema>>({
    resolver: zodResolver(workspaceFormSchema),
    mode: 'onChange',

    defaultValues: {
      name: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(data: z.infer<typeof workspaceFormSchema>) {
    try {
      await createWorkspace(data);
      toast.success('Workspace created');
      console.log('workspace values', data);

      router.push('/teammate');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <section className="mx-auto max-w-md w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 desc-text text-sm"
        >
          <ChevronLeft size={18} />
          Tell us about you
        </button>

        <span className="desc-text text-sm">3/4</span>
      </div>

      {/* TEXTBOX */}
      <Textbox
        title="Create your workspace"
        desc="Name your workspace and invite teammates (if you'd like) you ca always add more later, we'll keep things flexible."
      />

      {/* FORM */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel className="text-darkGrey">
                  What&apos;s the name of your workspace?
                </FieldLabel>

                <Input
                  {...field}
                  placeholder="e.g... Nexa team"
                  className="input-field h-11"
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="onboarding-button-primary bg-primaryNorma"
        >
          {isSubmitting ? 'Creating...' : 'Continue'}
        </Button>
      </form>
    </section>
  );
};

export default WorkspaceComponent;
