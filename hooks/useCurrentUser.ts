'use client';

import { getDashboardStats } from '@/lib/services/dashboard';
import { useEffect, useState } from 'react';

export function useCurrentUserFromDashboard() {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await getDashboardStats();
      setUser(res.currentUser);
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
