import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import {
  Share2,
  Settings,
  Folder,
  MessageSquare,
  PieChart,
  Link,
  BarChart2,
  ZoomIn,
  Search,
  Send,
  FileText,
} from "lucide-react";
import useLoggedUser from "../../../components/hook/useLoggedUser";

const QuickAction = () => {
  const { user } = useLoggedUser([]);
  const navigate = useNavigate();

  const handleUploadClick = () => {
    if (!user?.is_active) {
      toast.error("You currently do not have an active subscription plan.");
      return;
    }
    navigate("/upload_one");
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200">
        <div className="border-b border-gray-200 mb-4">
          <h2 className="text-xl font-semibold">Quick Actions</h2>
          <p className="text-sm text-gray-500 pb-3">
            Common tasks and actions to get started
          </p>
        </div>

        <button
          onClick={handleUploadClick}
          className="w-full flex items-center justify-center gap-2 bg-[#1E2839] hover:bg-[#2a3441] text-white font-medium py-2.5 rounded-md mb-6 transition cursor-pointer"
        >
          <Share2 className="w-4 h-4" />
          Upload New Essay
        </button>

        <h3 className="text-sm font-semibold text-gray-700 mb-3">Features We Provide</h3>

        <div className="space-y-5 text-sm text-gray-700">
          <Feature icon={<FileText />} text="Document Upload (.docx)" />
          <Feature icon={<Link />} text="Source Authenticity Validation" />
          <Feature icon={<Send />} text="Essay Type Classification" />
          <Feature icon={<Folder />} text="Draft Comparison (Optional)" />
          <Feature icon={<Search />} text="Tracked Revisions with Metadata" />
          <Feature icon={<Settings />} text="Admin Custom Guidelines" />
          <Feature icon={<ZoomIn />} text="Multi-Pass Grammar & Style Checks" />
          <Feature icon={<MessageSquare />} text="Inline Comments & Feedback" />
          <Feature icon={<BarChart2 />} text="Essay-Specific Criteria" />
          <Feature icon={<PieChart />} text="Analytics Dashboard (Upcoming)" />
        </div>
      </div>
    </>
  );
};

import PropTypes from "prop-types";

const Feature = ({ icon, text }) => (
  <div className="flex items-center gap-2">
    <span className="text-gray-500 w-5 h-5">{icon}</span>
    {text}
  </div>
);

Feature.propTypes = {
  icon: PropTypes.node.isRequired,
  text: PropTypes.string.isRequired,
};

export default QuickAction;
