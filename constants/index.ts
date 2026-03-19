import { User } from '@/types';

export const ONBOARDING_STEPS = [
  {
    id: 1,
    title: 'Create account',
    description: 'Start by creating your account',
  },
  {
    id: 2,
    title: 'Tell us about you',
    description: 'Share some info about yourself',
  },
  {
    id: 3,
    title: 'Set up your workspace',
    description: 'Configure your workspace',
  },
  {
    id: 4,
    title: 'Choose your focus',
    description: 'Pick your main focus for the app',
  },
];

export const FOCUS_CARDS = [
  {
    id: 'manage-project',
    title: 'Manage projects or tasks',
    description: 'Plan, track and complete project efficiently',
    icon: '/icons/app-logo-1.svg',
  },
  {
    id: 'collaboration',
    title: 'Collaborate with my team',
    description: 'Share updates, files and feedbacks all in one place',
    icon: '/icons/app-logo-1.svg',
  },
  {
    id: 'track-performance',
    title: 'Track performance or KPI',
    description: 'Build dashboard to monitor growth and goals .',
    icon: '/icons/app-logo-1.svg',
  },
  {
    id: 'workflow',
    title: 'Design workflows or systems',
    description: 'Create reusable template and internal tools',
    icon: '/icons/app-logo-1.svg',
  },
  {
    id: 'exploring',
    title: 'Just exploring for now',
    description: `Show me around, I'll decide later.`,
    icon: '/icons/app-logo-1.svg',
  },
];

export const navLinks = [
  { name: 'Dashboard', href: '/dashboard', src: '/icons/dashboard.svg' },
  { name: 'Report', href: '/report', src: '/icons/report.svg' },
  { name: 'Analytics', href: '/analytics', src: '/icons/analytics.svg' },
  { name: 'Users', href: '/users', src: '/icons/users.svg' },
  {
    name: 'Integrations',
    href: '/integrations',
    src: '/icons/integration.svg',
  },
  { name: 'Settings', href: '/settings', src: '/icons/settings.svg' },
];

export const data = [
  { date: 'Oct 1', revenue: 5000 },
  { date: 'Oct 2', revenue: 12000 },
  { date: 'Oct 3', revenue: 8000 },
  { date: 'Oct 4', revenue: 15000 },
  { date: 'Oct 5', revenue: 20000 },
  { date: 'Oct 6', revenue: 18000 },
  { date: 'Oct 7', revenue: 22000 },
  { date: 'Oct 8', revenue: 26000 },
  { date: 'Oct 9', revenue: 24000 },
  { date: 'Oct 10', revenue: 30000 },
  { date: 'Oct 11', revenue: 28000 },
  { date: 'Oct 12', revenue: 35000 },
  { date: 'Oct 13', revenue: 40000 },
  { date: 'Oct 14', revenue: 42000 },
  { date: 'Oct 15', revenue: 45000 },
  { date: 'Oct 16', revenue: 48000 },
  { date: 'Oct 17', revenue: 52000 },
  { date: 'Oct 18', revenue: 58000 },
];

export const data2 = [
  { plan: 'Free', users: 120 },
  { plan: 'Pro', users: 180 },
  { plan: 'Business', users: 240 },
  { plan: 'Enterprise', users: 90 },
];

export const data3 = [
  { country: 'Nigeria', users: 400 },
  { country: 'USA', users: 300 },
  { country: 'UK', users: 200 },
  { country: 'Canada', users: 150 },
  { country: 'Germany', users: 100 },
];

export const users: User[] = [
  {
    id: 1,
    avatar: '/icons/user-1.svg',
    name: 'Simeon Fowotade',
    email: 'simeon@example.com',
    plan: 'Pro',
    joined: '2026-03-01',
    status: 'active',
  },
  {
    id: 2,
    avatar: '/icons/user-2.svg',
    name: 'Aisha Bello',
    email: 'aisha@example.com',
    plan: 'Business',
    joined: '2026-02-15',
    status: 'pending',
  },
  {
    id: 3,
    avatar: '/icons/user-1.svg',

    name: 'John Doe',
    email: 'john@example.com',
    plan: 'Enterprise',
    joined: '2026-01-28',
    status: 'inactive',
  },
  {
    id: 4,
    avatar: '/icons/user-2.svg',

    name: 'Mary Johnson',
    email: 'mary@example.com',
    plan: 'Free',
    joined: '2026-03-10',
    status: 'active',
  },
];
