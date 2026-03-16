'use client';

'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import Textbox from '@/components/shared/Textbox';

import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

const OTP_LENGTH = 6;

export default function VerifyEmailPage() {
  const router = useRouter();

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // otp countdown timer
  useEffect(() => {
    if (timer === 0) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  function handleChange(value: string, index: number) {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent) {
    const paste = e.clipboardData.getData('text').trim();

    if (!/^\d{6}$/.test(paste)) return;

    const newOtp = paste.split('');
    setOtp(newOtp);

    inputsRef.current[OTP_LENGTH - 1]?.focus();
  }

  async function handleSubmit() {
    const code = otp.join('');

    if (code.length !== OTP_LENGTH) {
      toast.error('Enter the 6 digit code');
      return;
    }

    try {
      setIsSubmitting(true);

      // call backend
      await fetch('/api/auth/verify-email', {
        method: 'POST',
        body: JSON.stringify({ code }),
      });

      toast.success('Email verified');

      router.push('/onboarding/profile');
    } catch (err) {
      toast.error('Invalid code');
    } finally {
      setIsSubmitting(false);
    }
  }

  function resendCode() {
    if (timer > 0) return;

    setTimer(10);

    toast.success('Code resent');

    // call resend endpoint
    fetch('/api/auth/resend-code', {
      method: 'POST',
    });
  }

  return (
    <section className="mx-auto max-w-md w-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm font-medium"
        >
          <ChevronLeft size={18} />
          Back
        </button>

        <span className="text-sm text-muted-foreground">1/4</span>
      </div>

      {/* Textbox */}
      <Textbox
        title="Verify your email"
        desc="Enter the 6 digit code we sent to your email address."
      />

      {/* OTP INPUTS */}
      <div className="flex justify-between gap-3 mt-8" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <input
            key={index}
            // ref={(el) => (inputsRef.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="w-12 h-14 text-center text-lg border rounded-md focus:ring-2 focus:ring-primaryNorma"
          />
        ))}
      </div>

      {/* RESEND */}
      <div className="flex justify-end mt-4 text-sm">
        {timer > 0 ? (
          <span className="text-muted-foreground">
            Didn't get Code? Resend code in {timer} sec
          </span>
        ) : (
          <button
            onClick={resendCode}
            className="text-primaryNorma font-medium"
          >
            Didn't get Code? Resend code
          </button>
        )}
      </div>

      {/* VERIFY BUTTON */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="w-full mt-8 py-6 active:scale-[0.98]"
      >
        {isSubmitting ? 'Verifying...' : 'Verify'}
      </Button>
    </section>
  );
}
