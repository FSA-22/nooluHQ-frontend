'use client';

import * as z from 'zod';
import { teammateFormSchema } from '@/schemas/onboarding.schema';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { ChevronLeft, AlertCircle } from 'lucide-react';

import Textbox from '@/components/shared/Textbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { toast } from 'sonner';

const Teammates = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof teammateFormSchema>>({
    resolver: zodResolver(teammateFormSchema),
    defaultValues: {
      emails: [],
    },
  });

  const [emailInput, setEmailInput] = useState('');
  const [emails, setEmails] = useState<string[]>([]);

  function addEmail(email: string) {
    const trimmed = email.trim();

    if (!trimmed) return;

    const parsed = z.string().email().safeParse(trimmed);

    if (!parsed.success) {
      toast.error('Invalid email');
      return;
    }

    if (emails.includes(trimmed)) {
      toast.error('Email already added');
      return;
    }

    setEmails([...emails, trimmed]);
    setEmailInput('');
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();

      addEmail(emailInput);
    }
  }

  function removeEmail(index: number) {
    const updated = [...emails];
    updated.splice(index, 1);

    setEmails(updated);
  }

  async function onSubmit() {
    try {
      toast.success('Teammates saved');

      router.push('/onboarding/goal');
    } catch (err: any) {
      toast.error(err.message);
    }
  }

  function skip() {
    router.push('/goal');
  }

  return (
    <section className="mx-auto max-w-md w-full py-6 mt-4">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 desc-text text-sm"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <span className="desc-text text-sm">3/4</span>
      </div>

      {/* TEXTBOX */}
      <Textbox
        title="Invite teammates by email"
        desc="Add their addresses so that they can join your workspace right away, you can skip this and invite them later."
      />

      {/* EMAIL INPUT */}
      <div className="mt-2 space-y-2">
        <label className="text-sm font-medium">Enter email address</label>

        <Input
          placeholder="teammate@email.com"
          value={emailInput}
          onChange={(e) => setEmailInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="input-field h-11"
        />
      </div>

      {/* EMAIL CHIPS */}
      {emails.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {emails.map((email, index) => (
            <div
              key={index}
              className="px-3 py-1 text-sm bg-muted rounded-full flex items-center gap-2"
            >
              {email}

              <button onClick={() => removeEmail(index)} className="text-xs">
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {/* QUICK TIPS */}
      <div className="mt-8">
        <div className="flex items-center gap-1 text-darkGrey font-medium mb-3">
          <AlertCircle size={16} className="text-primaryNorma" />

          <span>Quick Tips</span>
        </div>

        <ol className="space-y-2 text-xs text-darkGrey list-decimal pl-5">
          <li>Separate multiple emails with commas</li>

          <li>Press enter or comma to add each teammate.</li>

          <li>
            They won't receive an invite until you've completed your setup
          </li>

          <li>You can skip this step and invite teammates later.</li>
        </ol>
      </div>

      {/* FOOTER BUTTONS */}
      <div className="flex justify-between items-center mt-10">
        <button
          onClick={skip}
          className="text-sm font-medium text-primaryNorma"
        >
          Skip for later
        </button>

        <Button
          onClick={onSubmit}
          className="onboarding-button-primary w-fit px-8 bg-primaryNorma"
        >
          Continue
        </Button>
      </div>
    </section>
  );
};

export default Teammates;
