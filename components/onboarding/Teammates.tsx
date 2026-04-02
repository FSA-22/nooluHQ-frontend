'use client';

import * as z from 'zod';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { ChevronLeft, AlertCircle, X } from 'lucide-react';

import Textbox from '@/components/shared/Textbox';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { inviteTeammate } from '@/lib/services/onboarding';

const emailSchema = z.object({
  emailInput: z.string().optional(),
});

const Teammates = () => {
  const router = useRouter();
  const [emails, setEmails] = useState<string[]>([]);

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { emailInput: '' },
  });

  const { control, handleSubmit, setValue, getValues } = form;

  const { isSubmitting } = form.formState;

  const addEmail = () => {
    const email = getValues('emailInput')?.trim();
    if (!email) return;

    const parsed = z.string().email().safeParse(email);
    if (!parsed.success) {
      return toast.error(parsed.error.issues[0].message);
    }

    if (emails.includes(email)) {
      return toast.error('Email already added');
    }

    setEmails((prev) => [...prev, email]);
    setValue('emailInput', '');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addEmail();
    }
  };

  const removeEmail = (index: number) => {
    setEmails((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    let finalEmails = [...emails];

    const currentInput = getValues('emailInput')?.trim();

    if (currentInput) {
      const parsed = z.string().email().safeParse(currentInput);

      if (!parsed.success) {
        return toast.error(parsed.error.issues[0].message);
      }

      if (!finalEmails.includes(currentInput)) {
        finalEmails.push(currentInput);
      }
    }

    if (finalEmails.length === 0) {
      router.push('/focus');
      return;
    }

    try {
      await inviteTeammate({ emails: finalEmails });
      toast.success('Teammates invited successfully!');
      router.push('/focus');
    } catch (err: any) {
      toast.error(err.message || 'Failed to invite teammates');
    }
  };

  const skip = () => router.push('/focus');

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mx-auto max-w-md w-full py-6 mt-4"
    >
      {/* HEADER */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
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
        desc="Add their addresses so they can join your workspace right away. You can skip and invite them later."
      />

      {/* EMAIL INPUT */}
      <Controller
        name="emailInput"
        control={control}
        render={({ field }) => (
          <div className="mt-2 space-y-2">
            <label className="text-sm font-medium">Enter email address</label>
            <Input
              placeholder="teammate@email.com"
              {...field}
              onKeyDown={handleKeyDown}
              className="input-field h-11"
            />
          </div>
        )}
      />

      {/* EMAIL CHIPS */}
      {emails.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {emails.map((email, index) => (
            <div
              key={index}
              className="px-3 py-1 text-sm bg-muted rounded-full flex items-center gap-2"
            >
              {email}
              <button
                type="button"
                onClick={() => removeEmail(index)}
                className="text-xs"
              >
                <X size={12} />
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
          <li>They won't receive invites until setup is completed</li>
          <li>You can skip this step and invite teammates later.</li>
        </ol>
      </div>

      {/* FOOTER */}
      <div className="flex justify-between items-center mt-10">
        <button
          type="button"
          onClick={skip}
          className="onboarding-button-secondary text-primaryNorma"
        >
          Skip for later
        </button>

        <Button
          disabled={isSubmitting}
          type="submit"
          className="onboarding-button-primary w-fit px-8 bg-primaryNorma"
        >
          {isSubmitting ? 'Submitting...' : ' Continue'}
        </Button>
      </div>
    </form>
  );
};

export default Teammates;
