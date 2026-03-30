'use client';

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import axios from 'axios';

// ----- Types -----
export interface RevenueStat {
  total: number;
  change: number;
}

export interface RevenueOverTime {
  _id: number | string;
  total: number;
}

export interface PlanStat {
  _id: string;
  totalRevenue: number;
  subscribers: number;
}

export interface UserByCountry {
  _id: string; // country
  count: number;
}

export interface LatestSignup {
  name: string;
  email: string;
  plan: string;
  joined: string;
  status: string;
}

export interface DashboardStats {
  revenue: RevenueStat;
  churnedRevenue: RevenueStat;
  activeUsers: RevenueStat;
  revenueOverTime: RevenueOverTime[];
  thirdPerformingPlan: PlanStat | null;
  usersByCountry: UserByCountry[];
  latestSignups: LatestSignup[];
}

interface DashboardState {
  stats: DashboardStats | null;
  loading: boolean;
  error: string | null;

  fetchDashboard: () => Promise<void>;
  clearDashboard: () => void;
}

// ----- Store -----
export const useDashboardStore = create<DashboardState>()(
  devtools((set) => ({
    stats: null,
    loading: false,
    error: null,

    fetchDashboard: async () => {
      set({ loading: true, error: null });
      try {
        const res = await axios.get('/api/v1/dashboard');
        set({ stats: res.data, loading: false });
      } catch (err: any) {
        set({
          error:
            err.response?.data?.message ||
            err.message ||
            'Failed to fetch dashboard',
          loading: false,
        });
      }
    },

    clearDashboard: () => set({ stats: null, error: null }),
  })),
);
