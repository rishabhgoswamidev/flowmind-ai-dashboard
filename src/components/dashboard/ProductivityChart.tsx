"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type Props = {
  chartData: {
    day: string;
    tasks: number;
  }[];
};

const ProductivityChart = ({chartData}:Props) => {
  
  return (
    <div className="min-w-0 overflow-hidden rounded-xl border bg-white p-2 md:p-6 shadow-sm mt-6">
      {/* Chart */}
      <div className="mt-8 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          
          <LineChart data={chartData}>
            
            <XAxis dataKey="day" />

            <YAxis />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="tasks"
              stroke="#2563eb"
              strokeWidth={3}
            />

          </LineChart>

        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductivityChart;