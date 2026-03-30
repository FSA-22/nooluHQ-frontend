'use client';

import { useDashboardStore } from '@/lib/store/useDashboardStore';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

type DataPoint = {
  country: string;
  users: number;
};

interface Props {
  data: DataPoint[];
}

// 🎨 Generate dynamic colors (HSL-based for consistency)
const generateColors = (length: number) => {
  return Array.from({ length }, (_, i) => {
    const hue = (i * 360) / length;
    return `hsl(${hue}, 65%, 55%)`;
  });
};

const CustomTooltip = ({ active, payload }: any) => {
  if (!active || !payload?.length) return null;

  const { country, users, percent } = payload[0].payload;

  const { stats, loading, error, fetchDashboard } = useDashboardStore();

  console.log('stats', stats);

  return (
    <div className="bg-primaryDeep shadow-lg rounded-xl px-4 py-2">
      <p className="text-xs text-white">{country}</p>
      <p className="text-sm font-semibold text-white">
        {users} users ({(percent * 100).toFixed(0)}%)
      </p>
    </div>
  );
};

export default function UserCountryPieChart({ data }: Props) {
  //  Sort data (largest first)
  const sortedData = [...data].sort((a, b) => b.users - a.users);

  //  Total users (for center label)
  const totalUsers = sortedData.reduce((acc, curr) => acc + curr.users, 0);

  // Dynamic colors
  const COLORS = generateColors(sortedData.length);

  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="mb-6">
        <h3 className="text-sm title-text uppercase">
          User Distribution by Country
        </h3>
      </div>

      {/* Chart */}
      <div className="relative w-full h-75">
        <ResponsiveContainer>
          <PieChart>
            <Tooltip content={(props) => <CustomTooltip {...props} />} />

            <Pie
              data={sortedData}
              dataKey="users"
              nameKey="country"
              cx="50%"
              cy="50%"
              innerRadius={75}
              outerRadius={99}
              paddingAngle={3}
            >
              {sortedData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>

            <Legend verticalAlign="bottom" iconType="circle" />
          </PieChart>
        </ResponsiveContainer>

        {/*  Center Label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-xs text-gray-500">Total Users</p>
          <p className="text-lg font-semibold text-darkGrey">
            {totalUsers.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
