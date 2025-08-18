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

import apiClient from "../../../lib/api-client";

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
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);
}

export default class EssayRadarCard extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchAnalyticsData();
  }

  fetchAnalyticsData = async () => {
    try {
      this.setState({ loading: true, error: null });

      const response = await apiClient.get("/teachers/analytics/");
      const analyticsData = response.data;

      // Transform API data to chart format
      const transformedData = this.transformApiData(
        analyticsData.essay_type_performance
      );

      this.setState({
        data: transformedData,
        loading: false,
      });
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  transformApiData = (essayTypePerformance) => {
    // Define the mapping from API keys to chart subject names
    const essayTypeMapping = {
      "Argumentative Essay": "Argumentative",
      "Narrative Essay": "Narrative",
      "Literary Analysis": "Literary",
      "Expository Essay": "Expository",
      "Descriptive Essay": "Descriptive",
    };

    // Get the first 5 essay types as requested
    const essayTypes = [
      "Argumentative Essay",
      "Narrative Essay",
      "Literary Analysis",
      "Expository Essay",
      "Descriptive Essay",
    ];

    return essayTypes.map((essayType) => {
      const score = essayTypePerformance[essayType];
      return {
        subject: essayTypeMapping[essayType],
        A: score !== null && score !== undefined ? Math.round(score) : 0,
        fullMark: 100,
      };
    });
  };

  render() {
    const { data, loading, error } = this.state;

    if (loading) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#666",
          }}
        >
          Loading chart data...
        </div>
      );
    }

    if (error) {
      return (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ff6b6b",
            textAlign: "center",
            padding: "20px",
          }}
        >
          <div>
            <div>Failed to load chart data</div>
            <div style={{ fontSize: "12px", marginTop: "5px" }}>
              Using default data
            </div>
          </div>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="47%" outerRadius="70%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" />
          <PolarRadiusAxis angle={90} />
          <Radar
            name="Performance"
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
