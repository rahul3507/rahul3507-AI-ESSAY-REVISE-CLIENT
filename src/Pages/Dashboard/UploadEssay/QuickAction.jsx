/** @format */

import { useState } from "react";
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
  Crown,
} from "lucide-react";
import { FiUploadCloud } from "react-icons/fi";

import apiClient from "../../../lib/api-client";

const QuickAction = () => {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: "",
    suggestion_level: "",
    coaching_level: "",
    file_upload: null,
  });

  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState("");

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Please upload a PDF, DOCX, or TXT file only.");
        return;
      }

      // Validate file size (e.g., max 10MB)
      const maxSize = 10 * 1024 * 1024; // 10MB
      if (file.size > maxSize) {
        toast.error("File size should be less than 10MB.");
        return;
      }

      setFormData((prev) => ({
        ...prev,
        file_upload: file,
      }));
      setFileName(file.name);
      toast.success("File selected successfully!");
    }
  };

  // Handle form submission
  const handleUploadClick = async () => {
    try {
      // Validation
      if (!formData.title.trim()) {
        toast.error("Please enter a title for your essay.");
        return;
      }

      if (!formData.file_upload) {
        toast.error("Please select a file to upload.");
        return;
      }

      setIsUploading(true);

      // Create FormData for file upload
      const uploadData = new FormData();
      uploadData.append("title", formData.title.trim());
      uploadData.append("suggestion_level", formData.suggestion_level);
      uploadData.append("coaching_level", formData.coaching_level);
      uploadData.append("file_upload", formData.file_upload);

      // API call
      const response = await apiClient.post("/students/essays/", uploadData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Success handling
      toast.success("Essay uploaded successfully!");

      // Reset form
      setFormData({
        title: "",
        suggestion_level: "",
        coaching_level: "",
        file_upload: null,
      });
      setFileName("");

      // Reset file input
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) fileInput.value = "";

      // Optional: Navigate to essay details or refresh the list
      // navigate(`/essays/${response.data.id}`);
    } catch (error) {
      console.error("Upload error:", error);

      // Handle different error scenarios
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        if (typeof errorData === "object") {
          // Handle field-specific errors
          Object.keys(errorData).forEach((field) => {
            if (Array.isArray(errorData[field])) {
              errorData[field].forEach((message) => {
                toast.error(`${field}: ${message}`);
              });
            } else {
              toast.error(`${field}: ${errorData[field]}`);
            }
          });
        } else {
          toast.error("Invalid data provided. Please check your inputs.");
        }
      } else if (error.response?.status === 401) {
        toast.error("Authentication required. Please login again.");
        navigate("/login");
      } else if (error.response?.status === 413) {
        toast.error("File too large. Please upload a smaller file.");
      } else if (error.response?.status === 415) {
        toast.error(
          "Unsupported file type. Please upload PDF, DOCX, or TXT files only."
        );
      } else {
        toast.error("Upload failed. Please try again.");
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />

      <div className="bg-white rounded-xl shadow-md p-5 border border-gray-200 grid grid-cols-1 xl:grid-cols-3 w-full justify-between gap-10">
        <div className="col-span-1 xl:col-span-2">
          <div className="border-b border-gray-200 mb-4">
            <h2 className="text-xl font-semibold">Quick Actions</h2>
            <p className="text-sm text-gray-500 pb-3">
              Upload and analyze your essays with customizable feedback levels
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter essay title"
              />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
              <div className="col-span-1">
                <label className="block text-lg font-medium text-gray-700">
                  Coaching Level
                </label>
                <select
                  name="coaching_level"
                  value={formData.coaching_level}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Light - Basic feedback">
                    Light - Basic feedback
                  </option>
                  <option value="Medium - Balanced feedback">
                    Medium - Balanced feedback
                  </option>
                  <option value="Intensive - Detailed feedback">
                    Intensive - Detailed feedback
                  </option>
                </select>
              </div>

              <div className="col-span-1">
                <label className="block text-lg font-medium text-gray-700">
                  Suggestion Level
                </label>
                <select
                  name="suggestion_level"
                  value={formData.suggestion_level}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="Low - Conservative suggestions">
                    Low - Conservative suggestions
                  </option>
                  <option value="Medium - Balanced suggestions">
                    Medium - Balanced suggestions
                  </option>
                  <option value="High - Aggressive suggestions">
                    High - Aggressive suggestions
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Upload essay file <span className="text-red-500">*</span>
              </label>
              <label
                className={`flex items-center gap-3 ${
                  !isUploading
                    ? "cursor-pointer border border-gray-200 hover:bg-gray-100"
                    : "bg-gray-100 opacity-60 cursor-not-allowed"
                } p-4 rounded-xl transition`}
              >
                <FiUploadCloud className="text-2xl text-gray-500" />
                <div className="flex-1">
                  <span className="text-sm text-gray-600">
                    {fileName
                      ? fileName
                      : "Click to upload file (PDF, DOCX, TXT)"}
                  </span>
                  {fileName && (
                    <div className="text-xs text-green-600 mt-1">
                      File ready for upload
                    </div>
                  )}
                </div>
                <input
                  type="file"
                  accept=".pdf,.docx,.txt,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isUploading}
                />
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Supported formats: PDF, DOCX, TXT (Max size: 10MB)
              </p>
            </div>

            <button
              onClick={handleUploadClick}
              className={`w-full flex items-center justify-center gap-2 font-medium py-2.5 rounded-md mb-6 transition ${
                isUploading || !formData.title.trim() || !formData.file_upload
                  ? "bg-gray-400 cursor-not-allowed text-white"
                  : "bg-[#1E2839] hover:bg-[#2a3441] text-white cursor-pointer"
              }`}
            >
              <Share2 className="w-4 h-4" />
              {isUploading ? "Uploading..." : "Upload Essay"}
            </button>
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="text-2xl font-semibold text-gray-700 mb-3 flex gap-2">
            <Crown className="h-6 w-6 mt-1" />
            Features We Provide
          </h3>

          <div className="gap-4 text-sm text-gray-700 grid grid-cols-1">
            <div className="col-span-1 space-y-5">
              <Feature icon={<FileText />} text="Document Upload (.docx)" />
              <Feature icon={<Send />} text="Essay Type Classification" />
              <Feature
                icon={<Search />}
                text="Tracked Revisions with Metadata"
              />
              <Feature
                icon={<ZoomIn />}
                text="Multi-Pass Grammar & Style Checks"
              />
              <Feature icon={<BarChart2 />} text="Essay-Specific Criteria" />
            </div>
            <div className="col-span-1 space-y-5">
              <Feature icon={<Link />} text="Source Authenticity Validation" />
              <Feature icon={<Folder />} text="Draft Comparison (Optional)" />
              <Feature icon={<Settings />} text="Admin Custom Guidelines" />
              <Feature
                icon={<MessageSquare />}
                text="Inline Comments & Feedback"
              />
              <Feature
                icon={<PieChart />}
                text="Analytics Dashboard (Upcoming)"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="border border-gray-200 rounded-2xl mt-4 px-4">
        <EssayList />
      </div>
    </>
  );
};

import PropTypes from "prop-types";
import EssayList from "./EssayList";

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
