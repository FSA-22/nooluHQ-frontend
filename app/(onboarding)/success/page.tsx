'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthSuccess() {
  const router = useRouter();

  useEffect(() => {
    const run = async () => {
      try {
        // 1. Get session (contains idToken)
        const res = await fetch('/api/auth/session');
        const session = await res.json();

        const idToken = session?.idToken;

        if (!idToken) throw new Error('No ID token');

        // 2. Send to backend via API route
        await fetch('/api/auth/google-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        });

        // 3. Redirect to dashboard
        router.push('/dashboard');
      } catch (err) {
        console.error(err);
        router.push('/login');
      }
    };

    run();
  }, [router]);

  return <p>Signing you in...</p>;
}
