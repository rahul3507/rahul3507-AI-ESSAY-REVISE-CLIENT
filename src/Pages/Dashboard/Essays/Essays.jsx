/** @format */

import TeachersEssayTable from "../HomePage/TeacherHome/TeachersEssayTable";

const Essays = () => {
  return (
    <div className="px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Essays</h1>
        </div>
      </div>
      <div>
        <TeachersEssayTable />
      </div>
    </div>
  );
};

export default Essays;
