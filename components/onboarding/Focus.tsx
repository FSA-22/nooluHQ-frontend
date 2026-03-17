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

import { FOCUS_CARDS } from '@/constants';
import Image from 'next/image';

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
      toast.success('Focus saved');

      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const skip = () => {
    router.push('/dashboard');
  };

  return (
    <section className="mx-auto max-w-xl w-full">
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
        title="What do you want to achieve?"
        desc="Choose a use case so that we can recommend the right tools and templates to get you started faster. You can always change this later"
      />

      {/* CARDS */}
      <div className="mt-8 grid grid-cols-3 gap-4 w-full">
        {FOCUS_CARDS.map((card) => (
          <div
            key={card.id}
            className={`flex flex-col w-46 px-4 py-2 border rounded-md cursor-pointer transition
              ${selectedFocus === card.id ? 'border-primaryNorma bg-primaryLight/10' : 'border-gray-200 hover:border-gray-400'}`}
            onClick={() => setSelectedFocus(card.id)}
          >
            <Image
              src={card.icon}
              alt={card.title}
              width={16}
              height={16}
              className="w-5 h-5 mb-2"
            />
            <h4 className="font-medium text-sm">{card.title}</h4>
            <p className="desc-text text-xs">{card.description}</p>
          </div>
        ))}
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-between items-center mt-10">
        <button onClick={skip} className="onboarding-button-secondary">
          Skip for later
        </button>

        <Button
          onClick={onSubmit}
          className="onboarding-button-primary w-fit bg-primaryNorma px-8 "
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Saving...' : 'Continue'}
        </Button>
      </div>
    </section>
  );
};

export default Goal;
