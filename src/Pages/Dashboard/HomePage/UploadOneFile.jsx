import { useState } from "react";
import { RiVoiceAiLine } from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../../../lib/api-client";
import { FileText } from "lucide-react";
import useLoggedUser from "../../../components/hook/useLoggedUser";

const UploadOneFile = () => {
  const { user } = useLoggedUser([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [essayText, setEssayText] = useState("");
  const [loading, setLoading] = useState(false);
  const [essayType, setEssayType] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [changes, setChanges] = useState([]);
  const [overallScore, setOverallScore] = useState(null);

  console.log(user?.is_active);

  const handleFileChange = async (e) => {
    if (!user?.is_active) {
      toast.error("You currently do not have an active subscription plan.");
      return;
    }

    const file = e.target.files[0];
    if (!file) return;

    console.log("File selected:", {
      name: file.name,
      type: file.type,
      size: file.size,
    });

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Please upload a PDF, DOC, or DOCX file.");
      return;
    }

    setSelectedFile(file);

    // Check if apiClient is properly configured
    if (!apiClient) {
      console.error("apiClient is not defined");
      toast.error("API client configuration error. Please check your setup.");
      return;
    }

    try {
      setLoading(true);
      // Reset states when new file is uploaded
      setChanges([]);
      setSelectedWord(null);
      setEssayType("");

      const formData = new FormData();
      formData.append("file", file);

      console.log("API Client:", apiClient);
      console.log("Making file upload request to /ai/analyze_essay_view/");

      const res = await apiClient.post("/ai/analyze_essay_view/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000, // 30 second timeout
      });

      console.log("File upload response:", res?.data);

      if (!res || !res.data) {
        throw new Error("No response received from server");
      }

      const text = res.data?.corrected_essay || "No analysis returned.";
      setOverallScore(res.data?.essay_score || null);

      if (!text || text.trim() === "") {
        throw new Error("Empty response from server");
      }

      setEssayText(text);

      const plainText = stripHtmlTags(text);
      console.log("Original text extracted:", {
        length: plainText.length,
        preview: plainText.substring(0, 100),
      });

      extractChanges(text);
      toast.success("File uploaded and analyzed successfully!");
    } catch (err) {
      console.group("File Upload Error");
      console.error("Full error:", err);
      console.error("Error name:", err.name);
      console.error("Error message:", err.message);
      console.error("Error stack:", err.stack);
      console.error("Response:", err.response);
      console.error("Response data:", err.response?.data);
      console.error("Status:", err.response?.status);
      console.error("Request config:", err.config);
      console.groupEnd();

      let errorMessage = "Failed to analyze essay.";

      if (err.message && err.message.includes("includes")) {
        errorMessage =
          "Configuration Error: Please check your API client setup.";
        console.error("Likely cause: apiClient baseURL or interceptors issue");
      } else if (err.code === "ECONNABORTED") {
        errorMessage = "Request timeout. Please try again.";
      } else if (
        err.code === "NETWORK_ERROR" ||
        err.message === "Network Error"
      ) {
        errorMessage =
          "Network error. Please check your connection and server status.";
      } else if (err.response) {
        const status = err.response.status;
        const data = err.response.data;

        if (status === 413) {
          errorMessage = "File too large. Please upload a smaller file.";
        } else if (status === 415) {
          errorMessage =
            "Unsupported file type. Please upload PDF, DOC, or DOCX files.";
        } else if (status === 400) {
          errorMessage = `Bad Request: ${
            data?.message || data?.error || "Invalid file or request"
          }`;
        } else if (status === 500) {
          errorMessage = "Server error. Please try again later.";
        } else if (data?.message) {
          errorMessage = data.message;
        }
      } else if (err.request) {
        errorMessage =
          "No response from server. Please check if the server is running.";
      } else {
        errorMessage = `Error: ${err.message || "Unknown error occurred"}`;
      }

      setEssayText(`Error: ${errorMessage}`);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const extractChanges = (text) => {
    const regex = /<del>(.*?)<\/del>\s*<ins>(.*?)<\/ins>/g;
    let match;
    const found = [];
    while ((match = regex.exec(text))) {
      found.push({
        del: match[1],
        ins: match[2],
        time: new Date().toLocaleTimeString(),
      });
    }
    setChanges(found);
  };

  const stripHtmlTags = (html) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = html;
    return tempDiv.textContent || tempDiv.innerText || "";
  };

  const handleGenerateClick = async () => {
    if (!essayType) {
      toast.error("Please select an essay type.");
      return;
    }

    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("target_essay_type", essayType);
      formData.append("essay_text", essayText);

      const res = await apiClient.post("/ai/analyze/", {
        target_essay_type: essayType,
        essay_text: essayText,
      });
      const text = res.data?.corrected_essay || "No analysis returned.";
      setEssayText(text);
      extractChanges(text);
      toast.success(`Essay regenerated as ${essayType}`);
    } catch (err) {
      setEssayText("Failed to analyze essay.");
      console.error("Analyze error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptChange = (index) => {
    const acceptedChange = changes[index];
    const regex = new RegExp(
      `<del>${acceptedChange.del}</del>\\s*<ins>${acceptedChange.ins}</ins>`
    );
    const updatedEssayText = essayText.replace(regex, acceptedChange.ins);
    setEssayText(updatedEssayText);

    const updatedChanges = changes.filter((_, i) => i !== index);
    setChanges(updatedChanges);

    toast.success("Change accepted");
  };

  const handleRejectChange = (index) => {
    const rejectedChange = changes[index];
    const regex = new RegExp(
      `<del>${rejectedChange.del}</del>\\s*<ins>${rejectedChange.ins}</ins>`
    );
    const updatedEssayText = essayText.replace(regex, rejectedChange.del);
    setEssayText(updatedEssayText);

    const updatedChanges = changes.filter((_, i) => i !== index);
    setChanges(updatedChanges);

    toast.info("Change rejected");
  };

  const handleAcceptAllChanges = () => {
    let updatedText = essayText;
    changes.forEach((change) => {
      const regex = new RegExp(
        `<del>${change.del}</del>\\s*<ins>${change.ins}</ins>`
      );
      updatedText = updatedText.replace(regex, change.ins);
    });
    setEssayText(updatedText);
    setChanges([]);
    toast.success("All changes accepted");
  };

  const handleRejectAllChanges = () => {
    let updatedText = essayText;
    changes.forEach((change) => {
      const regex = new RegExp(
        `<del>${change.del}</del>\\s*<ins>${change.ins}</ins>`
      );
      updatedText = updatedText.replace(regex, change.del);
    });
    setEssayText(updatedText);
    setChanges([]);
    toast.success("All changes rejected");
  };

  const getFileIcon = (file) => {
    const type = file?.type;
    if (type === "application/pdf")
      return <FileText className="text-4xl text-red-600" />;
    return <FileText className="text-4xl text-blue-600" />;
  };

  const handleTextClick = (type, word) => {
    setSelectedWord(word);
    setEssayText((prev) => {
      const delRegex = new RegExp(
        `<del>(.*?)</del>\\s*<ins>${word}</ins>`,
        "g"
      );
      const insRegex = new RegExp(
        `<del>${word}</del>\\s*<ins>(.*?)</ins>`,
        "g"
      );

      if (type === "ins") {
        return prev.replace(delRegex, word);
      } else if (type === "del") {
        return prev.replace(insRegex, word);
      }
      return prev;
    });

    const updatedChanges = changes.filter(
      (item) => item.ins !== word && item.del !== word
    );
    setChanges(updatedChanges);
  };

  const parseEssayText = (text) => {
    const html = text
      .replace(/<ins>(.*?)<\/ins>/g, (match, word) => {
        const selected = selectedWord === word ? "bg-blue-200" : "";
        const safeWord = word.replace(/'/g, "&#39;");
        return `<span class="text-green-700 bg-green-100 px-1 py-0.5 rounded cursor-pointer ${selected}" data-type="ins" data-word="${safeWord}">${word}</span>`;
      })
      .replace(/<del>(.*?)<\/del>/g, (match, word) => {
        const selected = selectedWord === word ? "bg-blue-200" : "";
        const safeWord = word.replace(/'/g, "&#39;");
        return `<span class="text-red-700 bg-red-100 px-1 py-0.5 rounded cursor-pointer line-through ${selected}" data-type="del" data-word="${safeWord}">${word}</span>`;
      })
      .replace(/\n/g, "<br />");

    return (
      <div
        dangerouslySetInnerHTML={{ __html: html }}
        onClick={(e) => {
          const target = e.target;
          if (target.dataset?.type && target.dataset?.word) {
            handleTextClick(target.dataset.type, target.dataset.word);
          }
        }}
      />
    );
  };

  return (
    <div className="p-4 md:p-8">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Quick Actions
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Uploaded File
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Details of your uploaded file
          </p>

          {!selectedFile ? (
            <label
              className={`flex items-center gap-3${
                user?.is_active
                  ? "cursor-pointer border border-gray-200 hover:bg-gray-100 "
                  : " bg-gray-100 opacity-60"
              } p-4 rounded-xl transition`}
            >
              <FiUploadCloud className="text-2xl text-gray-500" />
              <span className="text-sm text-gray-600">
                Click to upload file
              </span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden border border-gray-200"
                // disabled={!user?.is_active}
              />
            </label>
          ) : (
            <div className="flex items-center gap-3 border border-gray-200 bg-white p-4 rounded-xl">
              {getFileIcon(selectedFile)}
              <div>
                <p className="text-sm font-semibold text-gray-800">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-gray-500">
                  {(selectedFile.size / 1024).toFixed(2)} KB
                </p>
              </div>
              <label className="ml-auto text-sm text-blue-500 underline cursor-pointer">
                Change
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden outline-none"
                />
              </label>
            </div>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
          <div className="flex items-center gap-3 border border-gray-200 p-3 rounded-lg mb-4">
            <div className="bg-black text-white p-3 rounded-lg text-xl">
              <RiVoiceAiLine />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Essay Type</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              className="flex-grow border border-gray-200 rounded-md p-2 text-sm outline-none"
              value={essayType}
              onChange={(e) => setEssayType(e.target.value)}
            >
              <option disabled>Select type</option>
              <option value="Narrative Essay">Narrative Essay</option>
              <option value="Descriptive Essay">Descriptive Essay</option>
              <option value="Expository Essay">Expository Essay</option>
              <option value="Argumentative Essay">Argumentative Essay</option>
              <option value="Persuasive Essay">Persuasive Essay</option>
              <option value="Analytical Essay">Analytical Essay</option>
            </select>
            <button
              className="bg-black text-white px-5 py-2 rounded-md text-sm transition hover:bg-gray-800 disabled:opacity-50"
              onClick={handleGenerateClick}
              disabled={loading || !selectedFile}
            >
              {loading ? "Generating..." : "Generate Essay"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
          <div className="border-b border-gray-200 mb-4 pb-1">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Essay Preview
            </h2>

            {overallScore !== null && (
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-gray-900">
                  Overall Score:
                </span>{" "}
                {overallScore} / 100
              </p>
            )}
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Processing...</p>
          ) : (
            <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
              {essayText ? parseEssayText(essayText) : "No file uploaded yet."}
            </div>
          )}
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Track Changes
            </h2>
            {changes.length > 0 && (
              <div className="flex gap-2">
                <button
                  className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200"
                  onClick={handleAcceptAllChanges}
                >
                  Accept All
                </button>
                <button
                  className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200"
                  onClick={handleRejectAllChanges}
                >
                  Reject All
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-500 mb-4">{changes.length} changes</p>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {changes.length === 0 ? (
              <p className="text-sm text-gray-400 italic">
                No changes to track
              </p>
            ) : (
              changes.map((item, index) => (
                <div
                  key={index}
                  className="border border-gray-200 rounded-xl p-4 relative"
                >
                  <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full text-white bg-blue-500">
                    CHANGE
                  </span>
                  <p className="text-sm italic mt-6 text-gray-800">
                    &quot;{item.del}&quot; ➝ &quot;{item.ins}&quot;
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-3">
                      <button
                        className="text-xs text-green-600 hover:underline"
                        onClick={() => handleAcceptChange(index)}
                      >
                        ✓ Accept
                      </button>
                      <button
                        className="text-xs text-red-600 hover:underline"
                        onClick={() => handleRejectChange(index)}
                      >
                        ✕ Reject
                      </button>
                    </div>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadOneFile;
