import QuickAction from "./QuickAction";
import ComparisonFile from "./ComparisonFile";

const UploadEssay = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 p-6 overflow-hidden">
      <div className="w-full max-w-md overflow-hidden">
        <QuickAction />
      </div>
      <div className="w-full max-w-md overflow-hidden">
        <ComparisonFile />
      </div>
    </div>
  );
};

export default UploadEssay;
