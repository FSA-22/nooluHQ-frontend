import MetricCard from '@/components/dashboard/MetricCard';
import RevenueLineChart from '@/components/dashboard/RevenueLineChart';
import UserCountryPieChart from '@/components/dashboard/UserCountryPieChart';
import UsersTable from '@/components/dashboard/UsersTable';
import PlansHistogramChart from '@/components/dashboard/PlansHistogramChart';
import { data, data2, data3, users } from '@/constants';

const Dashboard = () => {
  return (
    <section className="w-full sm:min-h-screen bg-bgPrimary p-6 space-y-4">
      <div className="bg-transparent">
        <h1 className="title-text text-3xl">Welcome Adebanjo</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-5">
        <MetricCard value={240000} label="TOTal REVENUE" percentage={20} />
        <MetricCard value={2000} label="CHURNED REVENUE" percentage={-5} />
        <MetricCard value={400} label="ACTIVE USERS" percentage={20} />
      </div>
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1/2">
          <RevenueLineChart data={data} />
        </div>
        <div className="flex-1/2">
          <PlansHistogramChart data={data2} />
        </div>
        <div className="flex-1 min-w-65">
          <UserCountryPieChart data={data3} />
        </div>
      </div>

      <div>
        <UsersTable users={users} />
      </div>
    </section>
  );
};

export default Dashboard;
