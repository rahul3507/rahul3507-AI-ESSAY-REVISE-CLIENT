/** @format */

import { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import apiClient from "../../../lib/api-client";

const EssayBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const colors = ["#EF4444", "#FF7700", "#FFB01C", "#34C724", "#1155FF"];

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/teachers/analytics/");

        // Transform score_distribution data for the chart
        const scoreData = response.data.score_distribution;
        const chartData = Object.entries(scoreData).map(([range, data]) => ({
          name: range,
          student: data.count,
        }));

        setData(chartData);
        setError(null);
      } catch (err) {
        console.error("Error fetching analytics:", err);
        setError("Failed to load analytics data");
        // Fallback to demo data
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-gray-500">Loading analytics...</div>
      </div>
    );
  }

  if (error && data.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      {/* Chart Title */}

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
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={{ stroke: "#E5E7EB" }}
          />
          <YAxis
            yAxisId="left"
            orientation="left"
            stroke="#6B7280"
            tick={{ fontSize: 12 }}
            axisLine={{ stroke: "#E5E7EB" }}
            tickLine={{ stroke: "#E5E7EB" }}
          />
          <Tooltip
            cursor={false}
            contentStyle={{
              backgroundColor: "#F9FAFB",
              border: "1px solid #E5E7EB",
              borderRadius: "8px",
              fontSize: "12px",
            }}
            labelStyle={{ color: "#374151", fontWeight: "600" }}
            formatter={(value, name) => [`${value} Assignments`, "Count"]}
            labelFormatter={(label) => `Score Range: ${label}`}
          />
          <Bar
            yAxisId="left"
            dataKey="student"
            radius={[12, 12, 12, 12]}
            maxBarSize={60}
          >
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
