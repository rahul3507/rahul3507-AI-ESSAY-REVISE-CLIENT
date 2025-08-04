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
        <XAxis dataKey="name" />
        <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />

        <Tooltip cursor={false} />

        <Bar yAxisId="left" dataKey="student" radius={[12, 12, 0, 0]}>
          {data.map((entry, index) => {
            const colors = [
              "#EF4444",
              "#FF7700",
              "#FFB01C",
              "#34C724",
              "#1155FF",
            ];
            return <Cell key={`cell-${index}`} fill={colors[index]} />;
          })}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default EssayBarChart;
