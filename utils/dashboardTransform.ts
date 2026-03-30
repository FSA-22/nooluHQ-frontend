export const formatCurrency = (value: number) => {
  return `₦${value.toLocaleString()}`;
};

export const formatDate = (iso: string) => {
  const date = new Date(iso);
  return date.toLocaleDateString('en-NG', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

export const transformDashboardData = (stats: any) => {
  if (!stats) return null;

  return {
    //  Metric Cards
    metrics: {
      revenue: {
        value: formatCurrency(stats.revenue.total),
        percentage: stats.revenue.change,
      },
      churnedRevenue: {
        value: formatCurrency(stats.churnedRevenue.total),
        percentage: stats.churnedRevenue.change,
      },
      activeUsers: {
        value: stats.activeUsers.total.toLocaleString(),
        percentage: stats.activeUsers.change,
      },
    },

    // Revenue Line Chart
    revenueOverTime: stats.revenueOverTime.map((item: any) => ({
      date: item._id ? `Month ${item._id}` : 'Unknown',
      revenue: item.total,
    })),

    //  Plans Histogram (fallback since backend gives only one)
    plans: stats.thirdPerformingPlan
      ? [
          {
            plan: stats.thirdPerformingPlan._id,
            users: stats.thirdPerformingPlan.subscribers,
          },
        ]
      : [],

    //  Users by Country (Pie Chart)
    usersByCountry: stats.usersByCountry.map((item: any) => ({
      country: item._id,
      users: item.count,
    })),

    //  Latest Signups Table
    latestUsers: stats.latestSignups.map((user: any, index: number) => ({
      id: index + 1,
      avatar: `https://ui-avatars.com/api/?name=${user.name}`,
      name: user.name,
      email: user.email,
      plan: user.plan,
      joined: formatDate(user.joined),
      status: user.status,
    })),
  };
};
