/** @format */

import { useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const EssayBarChart = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("weekly");

  const chartData = {
    weekly: [
      { name: "0 - 49", student: 30 },
      { name: "50 - 69", student: 50 },
      { name: "70 - 79", student: 70 },
      { name: "80 - 89", student: 30 },
      { name: "90 - 100", student: 16 },
    ],
    monthly: [
      { name: "0 - 49", student: 120 },
      { name: "50 - 69", student: 200 },
      { name: "70 - 79", student: 280 },
      { name: "80 - 89", student: 120 },
      { name: "90 - 100", student: 64 },
    ],
    yearly: [
      { name: "0 - 49", student: 1440 },
      { name: "50 - 69", student: 2400 },
      { name: "70 - 79", student: 3360 },
      { name: "80 - 89", student: 1440 },
      { name: "90 - 100", student: 768 },
    ],
  };

  const data = chartData[selectedPeriod];
  const colors = ["#EF4444", "#FF7700", "#FFB01C", "#34C724", "#1155FF"];

  return (
    <div className="w-full h-full relative">
      {/* Time Period Selector */}
      <div className="absolute top-4 right-4 z-10">
        <select
          value={selectedPeriod}
          onChange={(e) => setSelectedPeriod(e.target.value)}
          className="bg-white border border-gray-300 rounded-lg px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        >
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 60,
            right: 30,
            left: 20,
            bottom: 5,
          }}
          barCategoryGap="70%"
        >
          <XAxis dataKey="name" />
          <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
          <Tooltip cursor={false} />
          <Bar yAxisId="left" dataKey="student" radius={[12, 12, 12, 12]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EssayBarChart;
