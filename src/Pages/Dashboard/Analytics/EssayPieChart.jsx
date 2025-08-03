/** @format */

import { Dot } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

// Add custom CSS to remove focus outline and cell borders
const styles = `
  .recharts-wrapper,
  .recharts-surface,
  .recharts-responsive-container,
  .recharts-pie,
  .recharts-sector {
    outline: none !important;
    border: none !important;
  }
  .recharts-wrapper:focus,
  .recharts-surface:focus,
  .recharts-responsive-container:focus,
  .recharts-pie:focus,
  .recharts-sector:focus,
  .recharts-sector.active {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
`;

// Inject the styles into the document
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

const data = [
  { name: "Grammar", value: 52.1 },
  { name: "Organization", value: 22.8 },
  { name: "Evidence", value: 13.9 },
  { name: "Structure", value: 11.2 },
  { name: "Style", value: 11.2 },
];
const COLORS = ["#88F77C", "#F54A45", "#02DBD6", "#FFF06A", "#F97316"];

export default function EssayPieChart() {
  return (
    <div className="grid grid-cols-2 gap-4">
      <PieChart width={500} height={300} className="col-span-1">
        <Pie
          data={data}
          cx={120}
          cy={120}
          innerRadius={60}
          outerRadius={100}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
          isAnimationActive={false} // Disable animation to prevent active state border
          cornerRadius={6}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${entry.name}`}
              fill={COLORS[index % COLORS.length]}
              stroke="none" // Explicitly remove stroke for each cell
            />
          ))}
        </Pie>
      </PieChart>
      <div className="col-span-1">
        {data.map((entry, index) => (
          <div
            key={`legend-${entry.name}`}
            className="flex justify-between items-center mb-2"
          >
            <div className="flex flex-row items-center">
              <Dot size={44} color={COLORS[index % COLORS.length]} />
              <span>{entry.name}</span>
            </div>

            <div className="ml-2">{entry.value}%</div>
          </div>
        ))}
      </div>
    </div>
  );
}
