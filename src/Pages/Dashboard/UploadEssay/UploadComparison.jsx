import { useState } from "react";
import { Upload, FileText, File } from "lucide-react";
import { useNavigate } from "react-router-dom";
import apiClient from "../../../lib/api-client"; // Make sure this path is correct

const UploadComparison = () => {
  const [draft1Label, setDraft1Label] = useState("Draft 01");
  const [draft2Label, setDraft2Label] = useState("Draft 02");
  const [essay1, setEssay1] = useState(null);
  const [essay2, setEssay2] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleFileChange1 = (e) => {
    if (e.target.files?.[0]) {
      setEssay1(e.target.files[0]);
    }
  };

  const handleFileChange2 = (e) => {
    if (e.target.files?.[0]) {
      setEssay2(e.target.files[0]);
    }
  };

  const getFileIcon = (file) => {
    const ext = file?.name.split(".").pop()?.toLowerCase();
    if (ext === "pdf") return <File className="w-8 h-8 text-red-500" />;
    if (ext === "docx" || ext === "doc")
      return <FileText className="w-8 h-8 text-blue-500" />;
    return <FileText className="w-8 h-8 text-gray-500" />;
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(2) + " " + sizes[i];
  };

  const handleGenerate = async () => {
    if (!essay1 || !essay2) return;

    const formData = new FormData();
    formData.append("essay1", essay1);
    formData.append("essay2", essay2);
    formData.append("label1", draft1Label);
    formData.append("label2", draft2Label);

    try {
      setLoading(true);
      const res = await apiClient.post("/ai/compare_documents/", formData);
      const result = res.data;
      // console.log(res);
      navigate("/result", {
        state: {
          result,
          draft1: {
            name: essay1.name,
            type: essay1.type,
            text: result?.draft1_text, 
          },
          draft2: {
            name: essay2.name,
            type: essay2.type,
            text: result?.draft2_text,
          },
        },
      });
    } catch (err) {
      console.error("Comparison error:", err);
      alert("Failed to generate comparison.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen p-5">
      <div className="">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-semibold text-slate-900 mb-2">
            Document Comparison
          </h1>
          <p className="text-slate-600">
            Upload two document versions to generate a detailed comparison
            analysis
          </p>
        </div>

        {/* Upload Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Draft 1 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border-0 overflow-hidden">
            <div className="p-5 pb-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                First Document
              </h3>
              <p className="text-sm text-slate-500">
                Upload your first document version for comparison
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="draft1-label"
                  className="block text-sm font-medium text-slate-700"
                >
                  Version Label
                </label>
                <input
                  id="draft1-label"
                  type="text"
                  value={draft1Label}
                  onChange={(e) => setDraft1Label(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                />
              </div>

              <div className="space-y-4">
                <label
                  htmlFor="file-upload-1"
                  className={`
                    flex flex-col items-center justify-center cursor-pointer 
                    border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                    ${
                      essay1
                        ? "border-green-300 bg-green-50/50"
                        : "border-slate-300 hover:border-slate-400 hover:bg-slate-50/50"
                    }
                  `}
                >
                  {essay1 ? (
                    <div className="flex flex-col items-center space-y-3">
                      {getFileIcon(essay1)}
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-800 truncate max-w-48">
                          {essay1.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {formatFileSize(essay1.size)}
                        </p>
                      </div>
                      <p className="text-xs text-green-600 font-medium">
                        ✓ File uploaded successfully
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 bg-slate-100 rounded-full">
                        <Upload className="w-6 h-6 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Upload first document
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Drag & drop or click to browse
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Supports: PDF, DOCX, TXT (Max 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    id="file-upload-1"
                    type="file"
                    accept=".docx,.pdf,.txt,.doc"
                    className="hidden"
                    onChange={handleFileChange1}
                  />
                </label>
              </div>
            </div>
          </div>

          {/* Draft 2 */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl shadow-md border-0 overflow-hidden">
            <div className="p-6 pb-4 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-800 mb-1">
                Second Document
              </h3>
              <p className="text-sm text-slate-500">
                Upload your second document version for comparison
              </p>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="draft2-label"
                  className="block text-sm font-medium text-slate-700"
                >
                  Version Label
                </label>
                <input
                  id="draft2-label"
                  type="text"
                  value={draft2Label}
                  onChange={(e) => setDraft2Label(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-colors"
                />
              </div>

              <div className="space-y-4">
                <label
                  htmlFor="file-upload-2"
                  className={`
                    flex flex-col items-center justify-center cursor-pointer 
                    border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200
                    ${
                      essay2
                        ? "border-green-300 bg-green-50/50"
                        : "border-slate-300 hover:border-slate-400 hover:bg-slate-50/50"
                    }
                  `}
                >
                  {essay2 ? (
                    <div className="flex flex-col items-center space-y-3">
                      {getFileIcon(essay2)}
                      <div className="text-center">
                        <p className="text-sm font-medium text-slate-800 truncate max-w-48">
                          {essay2.name}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {formatFileSize(essay2.size)}
                        </p>
                      </div>
                      <p className="text-xs text-green-600 font-medium">
                        ✓ File uploaded successfully
                      </p>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-3">
                      <div className="p-3 bg-slate-100 rounded-full">
                        <Upload className="w-6 h-6 text-slate-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-700">
                          Upload second document
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Drag & drop or click to browse
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          Supports: PDF, DOCX, TXT (Max 10MB)
                        </p>
                      </div>
                    </div>
                  )}
                  <input
                    id="file-upload-2"
                    type="file"
                    accept=".docx,.pdf,.txt,.doc"
                    className="hidden"
                    onChange={handleFileChange2}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <div className="flex justify-center">
            <button
              disabled={!essay1 || !essay2 || loading}
              onClick={handleGenerate}
              className="px-8 py-3 bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-md rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Generating..." : "Generate Comparison Analysis"}
            </button>
          </div>
        </div>

        {/* Status Indicator */}
        {(essay1 || essay2) && (
          <div className="mt-6 text-center">
            <div className="inline-flex items-center space-x-2 text-sm text-slate-600 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200">
              <div className="flex space-x-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    essay1 ? "bg-green-500" : "bg-slate-300"
                  }`}
                ></div>
                <div
                  className={`w-2 h-2 rounded-full ${
                    essay2 ? "bg-green-500" : "bg-slate-300"
                  }`}
                ></div>
              </div>
              <span>
                {essay1 && essay2
                  ? "Ready to generate comparison"
                  : `${essay1 || essay2 ? "1" : "0"} of 2 documents uploaded`}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadComparison;
