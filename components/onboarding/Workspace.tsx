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

const WorkspaceComponent = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof workspaceFormSchema>>({
    resolver: zodResolver(workspaceFormSchema),
    mode: 'onChange',

    defaultValues: {
      workspaceName: '',
    },
  });

  const { isSubmitting } = form.formState;

  async function onSubmit(values: z.infer<typeof workspaceFormSchema>) {
    try {
      const res = await fetch('/api/onboarding/workspace', {
        method: 'POST',
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error('Failed to create workspace');

      toast.success('Workspace created');

      router.push('/onboarding/goal');
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
          className="flex items-center gap-1 text-sm font-medium"
        >
          <ChevronLeft size={18} />
          Tell us about you
        </button>

        <span className="text-sm text-muted-foreground">3/4</span>
      </div>

      {/* TEXTBOX */}
      <Textbox
        title="Create your workspace"
        desc="Your workspace is where your team and projects will live."
      />

      {/* FORM */}
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
        <FieldGroup>
          <Controller
            name="workspaceName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>What's the name of your workspace?</FieldLabel>

                <Input
                  {...field}
                  placeholder="e.g. BizEaze"
                  className="input-field"
                />

                {fieldState.error && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        </FieldGroup>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-6 active:scale-[0.98]"
        >
          {isSubmitting ? 'Creating...' : 'Continue'}
        </Button>
      </form>
    </section>
  );
};

export default WorkspaceComponent;
