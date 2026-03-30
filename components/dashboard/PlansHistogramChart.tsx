'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ChevronDown } from 'lucide-react';

type DataPoint = {
  plan: string;
  users: number;
};

interface Props {
  data: DataPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-primaryDeep shadow-lg rounded-xl px-4 py-2 ">
      <p className="text-xs text-white">{label}</p>
      <p className="text-sm font-semibold text-white">
        {payload[0].value} users
      </p>
    </div>
  );
};

const PlansHistogramChart = ({ data }: Props) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col">
          <h3 className="text-sm font-semibold text-gray-800">
            Third Performing Plans
          </h3>
          <p className="text-xs text-gray-500">Active Users</p>
        </div>

        <button className="flex items-center gap-2 text-xs font-medium text-gray-600 hover:text-gray-900 transition">
          THIS MONTH
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-75">
        <ResponsiveContainer>
          <BarChart
            data={data}
            barSize={40}
            barCategoryGap="35%" //
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e5e7eb"
            />

            <XAxis
              dataKey="plan"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 300]}
              ticks={[0, 100, 200, 300]}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Bar dataKey="users" radius={[8, 8, 0, 0]} fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PlansHistogramChart;
