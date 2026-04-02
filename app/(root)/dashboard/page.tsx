'use client';

import MetricCard from '@/components/dashboard/MetricCard';
import { useDashboard } from '@/hooks/useDashboard';
import { transformDashboardData } from '@/utils/dashboardTransform';
import { useCurrentUserFromDashboard } from '@/hooks/useCurrentUser';

import dynamic from 'next/dynamic';

const UsersTable = dynamic(() => import('@/components/dashboard/UsersTable'), {
  ssr: false,
});
const RevenueLineChart = dynamic(
  () => import('@/components/dashboard/RevenueLineChart'),
  { ssr: false },
);
const UserCountryPieChart = dynamic(
  () => import('@/components/dashboard/UserCountryPieChart'),
  { ssr: false },
);
const PlansHistogramChart = dynamic(
  () => import('@/components/dashboard/PlansHistogramChart'),
  { ssr: false },
);

const Dashboard = () => {
  const { dashboardStats, loading, error } = useDashboard();
  const { user, loading: loadingUser } = useCurrentUserFromDashboard();

  const data = transformDashboardData(dashboardStats);

  if (loading) {
    return (
      <div className="w-full flex-center text-primaryNorma p-6">
        Loading dashboard...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="w-full flex-center bg-errorBG p-6 text-error">
        Failed to load dashboard
      </div>
    );
  }

  return (
    <section className="w-full sm:min-h-screen bg-bgPrimary p-6 space-y-4">
      <div className="bg-transparent">
        <h1 className="title-text text-3xl">
          {' '}
          {loadingUser ? 'loading user...' : user?.name || 'Guest'}
        </h1>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <MetricCard
          value={data.metrics.revenue.value}
          label="TOTAL REVENUE"
          percentage={data.metrics.revenue.percentage}
        />
        <MetricCard
          value={data.metrics.churnedRevenue.value}
          label="CHURNED REVENUE"
          percentage={data.metrics.churnedRevenue.percentage}
        />
        <MetricCard
          value={data.metrics.activeUsers.value}
          label="ACTIVE USERS"
          percentage={data.metrics.activeUsers.percentage}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1/2">
          <RevenueLineChart data={data.revenueOverTime} />
        </div>
        <div className="flex-1/2">
          <PlansHistogramChart data={data.plans} />
        </div>
        <div className="flex-1 min-w-65">
          <UserCountryPieChart data={data.usersByCountry} />
        </div>
      </div>

      <div>
        <UsersTable users={data.latestUsers} />
      </div>
    </section>
  );
};

export default Dashboard;
