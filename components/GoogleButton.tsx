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
      toast.loading('Logging in with Google...');

      // Step 1: Trigger Google OAuth (no redirect)
      const res = await signIn('google', { redirect: false });

      if (res?.error) throw new Error(res.error);

      // Step 2: Get session (contains idToken)
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();

      const idToken = session?.idToken;

      if (!idToken) throw new Error('No ID token');

      // Step 3: Send to your API route
      const loginRes = await fetch('/api/auth/google-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken }),
      });

      if (!loginRes.ok) throw new Error('Backend login failed');

      toast.success('Login successful');
    } catch (err) {
      console.error(err);
      toast.error('Google login failed');
    } finally {
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
      {isLoading ? 'Loading...' : 'Continue with Google'}
    </Button>
  );
}
