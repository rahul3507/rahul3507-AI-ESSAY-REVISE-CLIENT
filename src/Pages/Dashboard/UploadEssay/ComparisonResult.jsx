import { useState } from "react";
import { Plus, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function ComparisonResult() {
  const tabs = [
    {
      label: "Summary",
      value: "summary",
      content: (
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          dignissimos a porro harum? Autem neque praesentium tempore,
          repudiandae ad tenetur doloribus voluptate sit deserunt.
        </p>
      ),
    },
    {
      label: "Key Changes",
      value: "history",
      content: (
        <p className="text-sm text-gray-700">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio culpa
          beatae eius inventore asperiores praesentium voluptates quam aperiam.
        </p>
      ),
    },
  ];

  const [leftDoc] = useState({
    name: "TEST ATTITUDINALE UFFICIALE.doc",
    type: "Doc file",
  });

  const [rightDoc] = useState({
    name: "TEST ATTITUDINALE UFFICIALE.doc",
    type: "Doc file",
  });

  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Comparison Results
          </h1>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">Draft 01</span>
            <div className="flex items-center">
              <div className="w-6 h-px bg-gray-400"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full mx-1"></div>
              <div className="w-6 h-px bg-gray-400"></div>
            </div>
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">Draft 02</span>
          </div>
        </div>
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition"
        >
          <Plus size={16} />
          <span>New Comparison</span>
        </Link>
      </div>

      {/* Documents Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[leftDoc, rightDoc].map((doc, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-sm font-medium text-gray-900 mb-1">
                Uploaded file
              </h2>
              <p className="text-xs text-gray-500 mb-3">
                Here is the details of your file
              </p>
              <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-md">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <FileText size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.type}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-base font-medium text-gray-900 mb-3">
                The Fourth Floor
              </h3>
              <div className="text-sm text-gray-700 leading-relaxed space-y-4">
                <p>
                  For years, the old Hamilton Hospital stood abandoned at the edge of town,
                  draped in ivy and silence.{" "}
                  <span className={`${idx === 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} px-1 rounded`}>
                    {idx === 0 ? "She don't goes to the school" : "She doesn't go to the school"}
                  </span>{" "}
                  yesterday because{" "}
                  <span className={`${idx === 0 ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"} px-1 rounded`}>
                    {idx === 0 ? "it raining hardly" : "it was raining hard"}
                  </span>. The locals called it cursed, a place where screams once echoed in the
                  hallways long after the patients were gone.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-[#647187] p-2 rounded-xl mt-10 flex flex-col sm:flex-row gap-2 text-white text-center">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
              activeTab === tab.value
                ? "bg-[#1E2839] shadow-sm"
                : "hover:bg-[#1E2839]/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 bg-white border rounded-xl p-5 shadow-sm">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
}
