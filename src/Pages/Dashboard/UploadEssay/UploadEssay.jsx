import QuickAction from "./QuickAction";
import ComparisonFile from "./ComparisonFile";

const UploadEssay = () => {
  return (
    <section className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center max-w-6xl mx-auto">
        <div className="w-full max-w-md shadow-md rounded-lg overflow-hidden">
          <QuickAction />
        </div>
        <div className="w-full max-w-md shadow-md rounded-lg overflow-hidden">
          <ComparisonFile />
        </div>
      </div>
    </section>
  );
};

export default UploadEssay;
