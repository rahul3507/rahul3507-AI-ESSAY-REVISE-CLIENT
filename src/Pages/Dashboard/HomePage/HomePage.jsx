import CounterCard from "../../../components/CounterCard";
import QuickActionsCard from "./QuickActionsCard";

const HomePage = () => {
  return (
    <div>
      <div className="grid grid-cols-2 gap-10">
        <div>
          <CounterCard title={"Total Essay"} value={1} count={100} />
        </div>
        <div>
          <CounterCard title={"Completed"} value={2} count={100} />
        </div>
      </div>
      <div className="mt-10">
        <QuickActionsCard/>
      </div>
    </div>
  );
};

export default HomePage;
