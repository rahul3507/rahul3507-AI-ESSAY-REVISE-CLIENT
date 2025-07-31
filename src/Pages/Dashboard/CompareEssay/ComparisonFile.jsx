/** @format */

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  FileText,
  LinkIcon,
  Send,
  Folder,
  Search,
  Settings,
  ZoomIn,
  MessageSquare,
  BarChart2,
  PieChart,
  ExternalLink,
  Crown,
} from "lucide-react";
import useLoggedUser from "../../../components/hook/useLoggedUser";

const ComparisonFile = () => {
  const { user } = useLoggedUser();
  const navigate = useNavigate();

  const handleCompareClick = () => {
    // if (!user?.is_active) {
    //   toast.error(
    //     "You need an active subscription to access comparison tools."
    //   );
    //   return;
    // }

    toast.success("Redirecting to comparison tool...");
    navigate("/upload_comparison");
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 grid grid-cols-1 xl:grid-cols-2 w-full justify-between gap-10">
      <div className="col-span-1 ">
        {/* Header */}
        <div className="border-b border-gray-200 mb-4">
          <h2 className="text-xl font-semibold text-gray-800">
            File Comparison Tools
          </h2>
          <p className="text-sm text-gray-600 pb-3">
            Powerful tools to compare & evaluate essays.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleCompareClick}
          className="w-full flex items-center justify-center gap-2 bg-[#1E2839] hover:bg-[#2a3441] text-white font-medium py-2.5 rounded-md mb-6 transition cursor-pointer"
        >
          <ExternalLink className="w-4 h-4" />
          Compare New Essay
        </button>
      </div>

      {/* Features */}

      <div className="col-span-1">
        <h3 className="text-2xl font-semibold text-gray-700 mb-3 flex gap-2 ">
          <Crown className="h-6 w-6 mt-1" />
          Features We Provide
        </h3>

        <div className="gap-4 text-sm text-gray-700 grid grid-cols-1 md:grid-cols-2">
          <div className="col-span-1 space-y-5">
            <FeatureItem icon={<FileText />} text="Document Upload (.docx)" />
            <FeatureItem icon={<Send />} text="Essay Type Classification" />
            <FeatureItem icon={<Search />} text="Revision Metadata Tracking" />
            <FeatureItem icon={<MessageSquare />} text="Inline Feedback" />
            <FeatureItem icon={<PieChart />} text="Analytics Dashboard" />
          </div>
          <div className="col-span-1 space-y-5">
            <FeatureItem
              icon={<LinkIcon />}
              text="Source Authenticity Validation"
            />

            <FeatureItem icon={<Folder />} text="Draft Comparison" />
            <FeatureItem icon={<ZoomIn />} text="Multi-Pass Grammar Checks" />

            <FeatureItem icon={<BarChart2 />} text="Essay-Specific Criteria" />

            <FeatureItem icon={<Settings />} text="Admin Guidelines Setup" />
          </div>
        </div>
      </div>
      {/* <h3 className="text-sm font-semibold text-gray-800 mb-3">
        Premium Features
      </h3>
      <div className="space-y-5 text-sm text-gray-800">
        <FeatureItem icon={<FileText />} text="Document Upload (.docx)" />
        <FeatureItem
          icon={<LinkIcon />}
          text="Source Authenticity Validation"
        />
        <FeatureItem icon={<Send />} text="Essay Type Classification" />
        <FeatureItem icon={<Folder />} text="Draft Comparison" />
        <FeatureItem icon={<Search />} text="Revision Metadata Tracking" />

        <FeatureItem icon={<ZoomIn />} text="Multi-Pass Grammar Checks" />
        <FeatureItem icon={<MessageSquare />} text="Inline Feedback" />

        <FeatureItem icon={<BarChart2 />} text="Essay-Specific Criteria" />
        <FeatureItem icon={<PieChart />} text="Analytics Dashboard" />

        <FeatureItem icon={<Settings />} text="Admin Guidelines Setup" />
      </div> */}
    </div>
  );
};

import PropTypes from "prop-types";

const FeatureItem = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-500 w-5 h-5">{icon}</span>
    {text}
  </div>
);

FeatureItem.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default ComparisonFile;
