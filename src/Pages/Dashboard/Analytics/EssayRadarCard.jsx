/** @format */

import { PureComponent } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// Add custom CSS to remove focus outline
const styles = `
  .recharts-wrapper,
  .recharts-surface,
  .recharts-responsive-container,
  .recharts-radar,
  .recharts-polar-grid,
  .recharts-polar-angle-axis,
  .recharts-polar-radius-axis {
    outline: none !important;
    border: none !important;
  }
  .recharts-wrapper:focus,
  .recharts-surface:focus,
  .recharts-responsive-container:focus,
  .recharts-radar:focus,
  .recharts-polar-grid:focus,
  .recharts-polar-angle-axis:focus,
  .recharts-polar-radius-axis:focus {
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
  {
    subject: "Argumentative",
    A: 95,
    fullMark: 100,
  },
  {
    subject: "Descriptive",
    A: 33,
    fullMark: 100,
  },
  {
    subject: "Expository",
    A: 77,
    fullMark: 100,
  },
  {
    subject: "Literary",
    A: 66,
    fullMark: 100,
  },
  {
    subject: "Narrative",
    A: 70,
    fullMark: 100,
  },
];

export default class EssayRadarCard extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="47%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={90} />
          <Radar
            name="Mike"
            dataKey="A"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.2}
          />
        </RadarChart>
      </ResponsiveContainer>
    );
  }
}
