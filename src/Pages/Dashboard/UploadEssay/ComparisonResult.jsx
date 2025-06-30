import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { Plus, FileText } from "lucide-react";

export default function ComparisonResult() {
  const location = useLocation();
  const { result, draft1, draft2 } = location.state || {};

  const [activeTab, setActiveTab] = useState("summary");

  const tabs = [
    {
      label: "Summary",
      value: "summary",
      content: (
        <div className="text-sm text-gray-700 space-y-4">
          <div>
            <h3 className="font-semibold mb-2">Draft 01 Summary:</h3>
            <p className="bg-gray-50 p-3 rounded-md border border-gray-200">{result?.draft1_analysis}</p>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Draft 02 Summary:</h3>
            <p className="bg-gray-50 p-3 rounded-md border border-gray-200">{result?.draft2_analysis}</p>
          </div>
        </div>
      ),
    },
    {
      label: "Key Changes",
      value: "history",
      content: (
        <div className="text-sm text-gray-700">
          <p className="bg-gray-50 whitespace-pre-wrap p-3 rounded-md border border-gray-200">
            {result?.key_differences}
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
        <div className="flex flex-wrap items-center gap-4">
          <h1 className="text-xl font-semibold text-gray-900">
            Comparison Results
          </h1>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
              {draft1?.name || "Draft 01"}
            </span>
            <div className="flex items-center">
              <div className="w-6 h-px bg-gray-400"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full mx-1"></div>
              <div className="w-6 h-px bg-gray-400"></div>
            </div>
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
              {draft2?.name || "Draft 02"}
            </span>
          </div>
        </div>
        <Link
          to="/upload_comparison"
          className="flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 text-sm rounded hover:bg-gray-50 transition"
        >
          <Plus size={16} />
          <span>New Comparison</span>
        </Link>
      </div>

      {/* Documents Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[draft1, draft2].map((doc, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden"
          >
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-sm font-medium text-gray-900 mb-1">
                Uploaded file
              </h2>
              <p className="text-xs text-gray-500 mb-3">
                Here is the detail of your file
              </p>
              <div className="flex items-center gap-3 bg-blue-50 p-3 rounded-md">
                <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                  <FileText size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">{doc?.name}</p>
                  <p className="text-xs text-gray-500">{doc?.type}</p>
                </div>
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-base font-medium text-gray-900 mb-3">
                Draft {idx + 1} Analysis
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed">
                {idx === 0 ? result?.draft1_analysis : result?.draft2_analysis}
              </p>
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
                ? "bg-[#1E2839] shadow-md"
                : "hover:bg-[#1E2839]/30"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-6 bg-white border border-gray-200 rounded-xl p-5 shadow-md">
        {tabs.find((tab) => tab.value === activeTab)?.content}
      </div>
    </div>
  );
}
