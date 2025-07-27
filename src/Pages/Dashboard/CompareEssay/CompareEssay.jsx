/** @format */

import React from "react";

const CompareEssay = () => {
  return (
    <section className="md:p-10 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 place-items-center max-w-6xl mx-auto">
        <div className="w-full max-w-md shadow-md rounded-lg overflow-hidden">
          <ComparisonFile />
        </div>
      </div>
    </section>
  );
};

export default CompareEssay;
