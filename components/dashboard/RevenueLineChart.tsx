'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';
import { ChevronDown } from 'lucide-react';

type DataPoint = {
  date: string;
  revenue: number;
};

interface Props {
  data: DataPoint[];
}

const formatCurrency = (value: number) => {
  return `₦${value.toLocaleString()}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="bg-primaryDeep shadow-lg rounded-xl px-4 py-2">
      <p className="text-xs text-white">{label}</p>
      <p className="text-sm font-semibold text-white">
        {formatCurrency(payload[0].value)}
      </p>
    </div>
  );
};

const RevenueLineChart = ({ data }: Props) => {
  return (
    <div className="w-full bg-white rounded-2xl h-full shadow-sm border border-gray-100 p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-semibold text-gray-800">
          Revenue Over Time
        </h3>

        <button className="flex items-center gap-2 text-xs font-medium text-primaryNorma hover:text-gray-900 transition">
          THIS MONTH
          <ChevronDown className="w-4 h-4" />
        </button>
      </div>

      {/* Chart */}
      <div className="w-full h-75">
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#f1f5f9"
            />

            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              domain={[0, 60000]}
              tickFormatter={(value) => `₦${value / 1000}k`}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip content={<CustomTooltip />} />

            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#4f46e5"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: '#fff',
              }}
              activeDot={{
                r: 6,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueLineChart;
