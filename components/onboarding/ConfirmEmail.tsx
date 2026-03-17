'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Textbox from '@/components/shared/Textbox';
import { ChevronLeft } from 'lucide-react';
import { toast } from 'sonner';

const OTP_LENGTH = 6;

// Replace this with your actual API call
const verifyOtpApi = async (code: string) => {
  await new Promise((res) => setTimeout(res, 800)); // simulate network delay
  return code === '123456'; // simulate valid OTP
};

const VerifyEmail = () => {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [timer, setTimer] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  // OTP countdown timer
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Auto focus first empty input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) {
      toast.error('Only numbers are allowed');
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputsRef.current[index + 1]?.focus();
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
      toast.error('Invalid paste, must be 6 digits');
      return;
    }
    setOtp(paste.split(''));
    inputsRef.current[OTP_LENGTH - 1]?.focus();
  };

  const handleSubmit = async () => {
    const code = otp.join('');
    if (code.length !== OTP_LENGTH) {
      toast.error('Enter the 6-digit code');
      return;
    }

    try {
      setIsSubmitting(true);

      const isValid = await verifyOtpApi(code);
      if (!isValid) {
        toast.error('Invalid code');
        return;
      }

      toast.success('Email verified successfully');
      router.push('/profile');
    } catch {
      toast.error('Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resendCode = () => {
    if (timer > 0) return;
    setTimer(10);
    toast.success('Code resent');
    // fetch('/api/v1/auths/resend-code', { method: 'POST' });
  };

  return (
    <section className="mx-auto flex-center flex-col h-full max-w-md w-full px-4">
      {/* Header */}
      <div className="flex items-center justify-between w-full mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => router.back()}
          className="flex items-center gap-1 px-0"
        >
          <ChevronLeft size={18} />
          Back
        </Button>
        <span className="text-sm text-muted-foreground">1/4</span>
      </div>

      {/* Textbox */}
      <Textbox
        title="Verify email address"
        desc="A six-digit verification has been sent to your email address, enter it here to verify your account"
      />

      {/* OTP Inputs */}
      <div className="flex justify-between gap-3 mt-8" onPaste={handlePaste}>
        {otp.map((digit, index) => (
          <div key={index} className="flex flex-col items-center">
            <Input
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                inputsRef.current[index] = el;
              }}
              className="otp-input w-8 h-8 sm:w-14 sm:h-14"
            />
            <Label className="sr-only">Digit {index + 1}</Label>
          </div>
        ))}
      </div>

      {/* Resend */}
      <div className="flex justify-end py-4 w-full text-xs font-normal">
        {timer > 0 ? (
          <span className="text-muted-foreground">
            <span> Didn&apos;t get code? </span>{' '}
            <span className="text-primaryNorma"> Resend in {timer} secs </span>
          </span>
        ) : (
          <div>
            <span>Didn't get the code?</span>
            <Button
              variant="link"
              className="text-primaryNorma text-xs px-1"
              onClick={resendCode}
            >
              Resend
            </Button>
          </div>
        )}
      </div>

      {/* Verify Button */}
      <Button
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="onboarding-button-primary bg-primaryNorma"
      >
        {isSubmitting ? 'Verifying...' : 'Verify'}
      </Button>
    </section>
  );
};
export default VerifyEmail;
