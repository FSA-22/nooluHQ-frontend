import { getDashboardStats } from '@/lib/services/dashboard';
import { useEffect, useState } from 'react';

export const useDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const data = await getDashboardStats();
        setDashboardStats(data);
      } catch (err: any) {
        setError(err?.message || 'Failed to fetch dashboard stats');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { dashboardStats, loading, error };
};
