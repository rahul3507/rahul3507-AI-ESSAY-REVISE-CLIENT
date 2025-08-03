/** @format */
import EssayRadarCard from "./EssayRadarCard";
const Analytics = () => {
  return (
    <div className="px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-black mb-6">
        Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mr-4">
        <div className="border border-gray-200 rounded-2xl col-span-1 h-80 py-3 px-5">
          <h1 className="text-black text-sm md:text-lg">
            Essay Types Performance
          </h1>
          <EssayRadarCard />
        </div>
      </div>
    </div>
  );
};

export default Analytics;
