/** @format */
import EssayRadarCard from "./EssayRadarCard";
import EssayPieChart from "./EssayPieChart";
import EssayBarChart from "./EssayBarChart";
const Analytics = () => {
  return (
    <div className="px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
        Analytics
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 mr-4">
        <div className="border border-gray-200 rounded-2xl col-span-1 h-80 py-3 px-5">
          <h1 className="text-black text-sm md:text-lg">Score Distribution</h1>
          <EssayBarChart />
        </div>
        <div className="border border-gray-200 rounded-2xl col-span-1 h-80 py-3 px-5">
          <h1 className="text-black text-sm md:text-lg">
            Essay Types Performance
          </h1>
          <EssayRadarCard />
        </div>
        <div className="border border-gray-200 rounded-2xl col-span-1 h-80 py-3 px-5">
          <h1 className="text-black text-sm md:text-lg">Category Analytics</h1>
          <EssayPieChart />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
