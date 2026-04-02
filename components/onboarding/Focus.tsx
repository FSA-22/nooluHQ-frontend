'use client';

import * as z from 'zod';
import { focusFormSchema } from '@/schemas/onboarding.schema';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { ChevronLeft } from 'lucide-react';

import Textbox from '@/components/shared/Textbox';
import { Button } from '@/components/ui/button';

import { FOCUS_CARDS } from '@/constants';
import Image from 'next/image';

import { setupGoal } from '@/lib/services/onboarding';

const Goal = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof focusFormSchema>>({
    resolver: zodResolver(focusFormSchema),
    defaultValues: { focusId: '' },
  });

  const { setValue, watch, handleSubmit, formState } = form;
  const selectedFocus = watch('focusId');

  const onSubmit = handleSubmit(async (data) => {
    try {
      const selected = FOCUS_CARDS.find((c) => c.id === data.focusId);

      if (!selected) {
        return toast.error('Invalid selection');
      }

      await setupGoal({ focusId: selected.id });

      toast.success('Focus saved');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Failed to save goal');
    }
  });

  const skip = () => router.push('/dashboard');

  return (
    <section className="mx-auto max-w-xl px-4 sm:p-0 w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between max-sm:p-2 mx-auto mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm font-medium"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <span className="text-sm text-muted-foreground">4/4</span>
      </div>

      {/* TEXTBOX */}
      <Textbox
        title="What do you want to achieve?"
        desc="Choose a use case so that we can recommend the right tools and templates to get you started faster. You can always change this later"
      />

      {/* CARDS */}
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 w-full">
        {FOCUS_CARDS.map(({ title, id, description, icon }) => (
          <div
            key={id}
            className={`flex flex-col sm:w-46 px-4 py-2 border rounded-md cursor-pointer transition
              ${
                selectedFocus === id
                  ? 'border-primaryNorma bg-primaryLight/10'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            onClick={() => setValue('focusId', id)}
          >
            <Image
              src={icon}
              alt={title}
              width={16}
              height={16}
              className="w-5 h-5 mb-2"
            />
            <h4 className="font-medium text-sm">{title}</h4>
            <p className="desc-text text-xs">{description}</p>
          </div>
        ))}
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-10">
        <button onClick={skip} className="onboarding-button-secondary">
          Skip for later
        </button>

        <Button
          onClick={onSubmit}
          className="onboarding-button-primary w-fit bg-primaryNorma px-8"
          disabled={formState.isSubmitting}
        >
          {formState.isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </section>
  );
};

export default Goal;
