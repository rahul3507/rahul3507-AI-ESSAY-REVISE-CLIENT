/** @format */

import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  {
    name: "0 - 49",
    student: 30,
  },
  {
    name: "50 - 69",
    student: 50,
  },
  {
    name: "70 - 79",
    student: 70,
  },
  {
    name: "80 - 89",
    student: 30,
  },
  {
    name: "90 - 100",
    student: 16,
  },
];

const EssayBarChart = () => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
        <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
        <Tooltip />
        <Legend />
        <Bar yAxisId="left" dataKey="student" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EssayBarChart;
