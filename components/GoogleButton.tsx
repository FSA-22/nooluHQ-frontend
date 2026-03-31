'use client';

import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useState } from 'react';
import { toast } from 'sonner';
import { Button } from './ui/button';

export default function LoginWithGoogle() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      toast.loading('Redirecting to Google...');

      await signIn('google', {
        callbackUrl: '/dashboard', // direct redirect
      });
    } catch (err) {
      console.error(err);
      toast.error('Google login failed');
      setIsLoading(false);
    }
  };

  return (
    <Button
      onClick={handleGoogleLogin}
      disabled={isLoading}
      type="button"
      variant="outline"
      className="w-full py-5 flex-center gap-3"
    >
      <Image src="/icons/google-icon.svg" width={18} height={18} alt="Google" />
      Continue with Google
    </Button>
  );
}
