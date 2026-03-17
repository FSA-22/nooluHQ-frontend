'use client';

import * as z from 'zod';
import { focusFormSchema } from '@/schemas/onboarding.schema';

import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { useState } from 'react';

import { ChevronLeft } from 'lucide-react';

import Textbox from '@/components/shared/Textbox';
import { Button } from '@/components/ui/button';

import { FOCUS_CARDS } from '@/constants/onboardingSteps';

const Goal = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof focusFormSchema>>({
    resolver: zodResolver(focusFormSchema),
    defaultValues: { focusId: '' },
  });

  const [selectedFocus, setSelectedFocus] = useState<string>('');

  const { isSubmitting } = form.formState;

  const onSubmit = async () => {
    if (!selectedFocus) {
      toast.error('Please select a focus area or skip for later');
      return;
    }

    try {
      // const res = await fetch('/api/onboarding/focus', {
      //   method: 'POST',
      //   body: JSON.stringify({ focusId: selectedFocus }),
      // });

      // if (!res.ok) throw new Error('Failed to save focus');

      toast.success('Focus saved');

      router.push('/dashboard'); // onboarding finished
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const skip = () => {
    router.push('/dashboard');
  };

  return (
    <section className="mx-auto max-w-md w-full">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
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
        title="Select your focus"
        desc="Choose the area you want to prioritize in your workspace."
      />

      {/* CARDS */}
      <div className="mt-8 grid grid-cols-1 gap-4">
        {FOCUS_CARDS.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col p-4 border rounded-md cursor-pointer transition
              ${selectedFocus === card.id ? 'border-primaryNorma bg-primaryLight/10' : 'border-gray-200 hover:border-gray-400'}`}
            onClick={() => setSelectedFocus(card.id)}
          >
            <img src={card.icon} alt={card.title} className="w-6 h-6 mb-2" />
            <h4 className="font-medium">{card.title}</h4>
            <p className="text-sm text-muted-foreground mt-1">
              {card.description}
            </p>
          </div>
        ))}
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-between items-center mt-10">
        <button
          onClick={skip}
          className="text-primaryNorma desc-text text-sm font-medium"
        >
          Skip for later
        </button>

        <Button onClick={onSubmit} className="px-8" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </section>
  );
};

export default Goal;
