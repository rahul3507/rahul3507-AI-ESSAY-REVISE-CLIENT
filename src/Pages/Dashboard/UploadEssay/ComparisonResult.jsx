import { useState } from "react";
import { Download, Plus, FileText } from "lucide-react";
import { Link } from "react-router-dom";

export default function ComparisonResult() {
  const tabs = [
    {
      label: "Summary",
      value: "summary",
      content: (
        <>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          dignissimos a porro harum? Autem neque praesentium tempore,
          repudiandae ad tenetur doloribus voluptate sit deserunt.{" "}
        </>
      ),
    },
    {
      label: "Key Changes",
      value: "history",
      content: (
        <>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio culpa
          beatae eius inventore asperiores praesentium voluptates quam aperiam.
          Ad, consequatur?
        </>
      ),
    },
  ];
  const [leftDoc, setLeftDoc] = useState({
    name: "TEST ATTITUDINALE UFFICIALE.doc",
    type: "Doc file",
  });

  const [rightDoc, setRightDoc] = useState({
    name: "TEST ATTITUDINALE UFFICIALE.doc",
    type: "Doc file",
  });

  const [activeTab, setActiveTab] = useState("summary");
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg font-medium text-gray-900">
            Comparison Results
          </h1>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
              Draft 01
            </span>
            <div className="flex items-center">
              <div className="w-8 h-px bg-gray-400"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full mx-1"></div>
              <div className="w-8 h-px bg-gray-400"></div>
            </div>
            <span className="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded">
              Draft 02
            </span>
          </div>
        </div>
        <div className="flex space-x-3">
          <Link
            to="/"
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm rounded hover:bg-gray-50 transition-colors"
          >
            <Plus size={16} />
            <span>New Comparison</span>
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left Panel */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
          {/* Upload Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-900 mb-2">
              Uploaded file
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Here is the details of your file
            </p>

            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <FileText size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {leftDoc.name}
                </p>
                <p className="text-xs text-gray-500">{leftDoc.type}</p>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="p-6">
            <h3 className="text-base font-medium text-gray-900 mb-4">
              The Fourth Floor
            </h3>
            <div className="text-sm text-gray-700 leading-relaxed space-y-4">
              <p>
                For years, the old Hamilton Hospital stood abandoned at the edge
                of town, draped in ivy and silence.
                <span className="bg-red-100 text-red-800 px-1 rounded">
                  She don't goes to the school
                </span>{" "}
                yesterday because
                <span className="bg-red-100 text-red-800 px-1 rounded">
                  it raining hardly
                </span>
                . The locals called it cursed, a place where screams once echoed
                in the hallways long after the patients were gone. No one had
                dared step inside—until Sarah.
              </p>
              <p className="text-gray-400">...</p>
            </div>
          </div>
        </div>

        {/* Right Panel */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
          {/* Upload Section */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-sm font-medium text-gray-900 mb-2">
              Uploaded file
            </h2>
            <p className="text-xs text-gray-500 mb-4">
              Here is the details of your file
            </p>

            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center">
                <FileText size={16} className="text-white" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {rightDoc.name}
                </p>
                <p className="text-xs text-gray-500">{rightDoc.type}</p>
              </div>
            </div>
          </div>

          {/* Document Content */}
          <div className="p-6">
            <h3 className="text-base font-medium text-gray-900 mb-4">
              The Fourth Floor
            </h3>
            <div className="text-sm text-gray-700 leading-relaxed space-y-4">
              <p>
                For years, the old Hamilton Hospital stood abandoned at the edge
                of town, draped in ivy and silence.
                <span className="bg-green-100 text-green-800 px-1 rounded">
                  She doesn't go to the school
                </span>{" "}
                yesterday because
                <span className="bg-green-100 text-green-800 px-1 rounded">
                  it was raining hard
                </span>
                . The locals called it cursed, a place where screams once echoed
                in the hallways long after the patients were gone. No one had
                dared step inside—until Sarah.
              </p>
              <p className="text-gray-400">...</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#647187] p-2 rounded-xl mb-4 flex justify-between gap-2 text-white text-center items-center w-full mt-10">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-lg text-sm w-full font-medium transition-all duration-500 ${
              activeTab === tab.value
                ? "bg-[#1E2839]  shadow-sm"
                : "hover:bg-[#1E2839]/20"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {/* Tab Content */}
      <div>{tabs.find((tab) => tab.value === activeTab)?.content}</div>
    </div>
  );
}
