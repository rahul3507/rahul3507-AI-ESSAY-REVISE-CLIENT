// import CounterCard from "../../../components/CounterCard";
import QuickActionsCard from "./QuickActionsCard";

const HomePage = () => {
  return (
    <div className="p-4 md:p-8">
      {/* Responsive grid for counter cards */}
      {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
        <CounterCard title="Total Essay" value={1} count={100} />
        <CounterCard title="Completed" value={2} count={100} />
      </div> */}

      {/* Quick Actions Section */}
      <div className="mt-8 md:mt-10">
        <QuickActionsCard />
      </div>
    </div>
  );
};

export default HomePage;
