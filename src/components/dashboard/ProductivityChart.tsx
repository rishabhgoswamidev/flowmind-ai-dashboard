"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ProductivityChart = () => {
  const chartData = [
    { day: "Mon", tasks: 4 },
    { day: "Tue", tasks: 7 },
    { day: "Wed", tasks: 9 },
    { day: "Thu", tasks: 2 },
    { day: "Fri", tasks: 6 },
    { day: "Sat", tasks: 8 },
    { day: "Sun", tasks: 5 },
  ];

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