'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Textbox from '@/components/shared/Textbox';

import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

import { verifyEmailOtp, resendEmailOtp } from '@/lib/services/onboarding';
import { getErrorMessage } from '@/utils/getErrorMessage';

const OTP_LENGTH = 6;

const VerifyEmail = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const email = searchParams.get('email') || '';
  const sessionId = searchParams.get('sessionId') || '';

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(30);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // =========================
  // Guard: sessionId required
  // =========================
  useEffect(() => {
    if (!sessionId) {
      toast.error('Session expired. Please register again.');
      router.replace('/register');
    }
  }, [sessionId, router]);

  // Timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    const joined = newOtp.join('');
    if (joined.length === OTP_LENGTH) {
      handleSubmit(joined);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const paste = e.clipboardData.getData('text').trim();

    if (!/^\d{6}$/.test(paste)) {
      return toast.error('Paste must be 6 digits');
    }

    const values = paste.split('');
    setOtp(values);

    inputsRef.current[OTP_LENGTH - 1]?.focus();
    handleSubmit(paste);
  };

  const handleSubmit = async (code?: string) => {
    const finalCode = code || otp.join('');

    if (finalCode.length !== OTP_LENGTH) {
      return toast.error('Enter the 6-digit code');
    }

    try {
      setIsSubmitting(true);

      await verifyEmailOtp({
        otp: finalCode,
        sessionId,
      });

      toast.success('Email verified successfully');
      router.push('/profile');
    } catch (err: any) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendCode = async () => {
    if (timer > 0 || !sessionId) return;

    try {
      setIsResending(true);

      await resendEmailOtp(sessionId);

      setTimer(30);
      toast.success('Code resent');
    } catch (err: any) {
      toast.error(getErrorMessage(err));
    } finally {
      setIsResending(false);
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="mx-auto flex-center flex-col h-full max-w-md w-full px-4"
    >
      <div className="flex items-center justify-between w-full mb-6">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-1 px-0"
        >
          <ChevronLeft size={18} />
          Back
        </Button>

        <span className="text-sm text-muted-foreground">2/4</span>
      </div>

      <Textbox
        title="Verify email address"
        desc={`Enter the 6-digit code sent to ${email}`}
      />

      <div
        className="flex justify-between w-full gap-2 mt-6"
        onPaste={handlePaste}
      >
        {otp.map((digit, index) => (
          <div key={index}>
            <Input
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              className="otp-input sm:w-13 sm:h-13 text-center"
            />
            <Label className="sr-only">Digit {index + 1}</Label>
          </div>
        ))}
      </div>

      <div className="flex justify-end py-4 w-full text-xs">
        {timer > 0 ? (
          <span className="text-muted-foreground">Resend in {timer}s</span>
        ) : (
          <Button
            type="button"
            variant="link"
            disabled={isResending}
            onClick={resendCode}
            className="text-primaryNorma text-xs px-1"
          >
            {isResending ? 'Resending...' : 'Resend code'}
          </Button>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="onboarding-button-primary bg-primaryNorma"
      >
        {isSubmitting ? 'Verifying...' : 'Verify'}
      </Button>
    </form>
  );
};

export default VerifyEmail;
