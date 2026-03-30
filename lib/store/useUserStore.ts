'use client';

import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import axios from 'axios';

// ----- Types -----
export interface User {
  id: string;
  name: string;
  email: string;
  role?: string;
}

interface UserState {
  user: User | null;
  loading: boolean;
  error: string | null;

  fetchUser: () => Promise<void>;
  clearUser: () => void;
}

// ----- Store -----
export const useUserStore = create<UserState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        loading: false,
        error: null,

        fetchUser: async () => {
          set({ loading: true, error: null });
          try {
            const res = await axios.get('/api/user');
            set({ user: res.data, loading: false });
          } catch (err: any) {
            set({
              error:
                err.response?.data?.message ||
                err.message ||
                'Failed to fetch user',
              loading: false,
            });
          }
        },

        clearUser: () => set({ user: null, error: null }),
      }),
      {
        name: 'user',
        partialize: (state) => ({ user: state.user }), // only persist user object
      },
    ),
  ),
);
