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
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

export default function EssayPieChart() {
  return (
    <div className="grid grid-cols-2">
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
        <div>
          <div>
            <Dot />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}
