'use client';

import { getAuthenticatedUser } from '@/lib/services/user';
import { useEffect, useState } from 'react';

export interface UserProps {
  id: string;
  name: string;
  email: string;
  role?: string;
}

export function useCurrentUser() {
  const [user, setUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getAuthenticatedUser();
      setUser(res.data.data);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return { user, loading, error, refetchUser: fetchUser };
}
