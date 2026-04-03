'use client';

import { getDashboardStats } from '@/lib/services/dashboard';
import { useEffect, useState } from 'react';

export function useCurrentUserFromDashboard(autoFetch = false) {
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
  } | null>(null);

  const [loading, setLoading] = useState(autoFetch);
  const [error, setError] = useState<string | null>(null);

  const fetchUser = async (retry = true) => {
    setLoading(true);
    setError(null);

    try {
      const res = await getDashboardStats();
      setUser(res?.currentUser ?? null);
    } catch (err: any) {
      if (err?.response?.status === 401 && retry) {
        setTimeout(() => fetchUser(false), 100);
        return;
      }

      setError(err?.message || 'Failed to fetch user');
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!autoFetch) return;
    fetchUser();
  }, [autoFetch]);

  return { user, loading, error, refetchUser: fetchUser };
}
