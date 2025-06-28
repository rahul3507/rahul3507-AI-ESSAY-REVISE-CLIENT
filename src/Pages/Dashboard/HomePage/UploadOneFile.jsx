import { useState } from "react";
import { RiFileWord2Line, RiFilePdf2Line, RiVoiceAiLine } from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import apiClient from "../../../lib/api-client";

const UploadOneFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [essayText, setEssayText] = useState("");
  const [loading, setLoading] = useState(false);
  const [essayType, setEssayType] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [changes, setChanges] = useState([]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", file);

      const res = await apiClient.post("/ai/analyze_essay_view/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const text = res.data?.corrected_essay || "No analysis returned.";
      setEssayText(text);
      extractChanges(text);
    } catch (err) {
      setEssayText("Failed to analyze essay.");
      console.error("Analyze error:", err);
    } finally {
      setLoading(false);
    }
  };

  const extractChanges = (text) => {
    const regex = /<del>(.*?)<\/del>\s*<ins>(.*?)<\/ins>/g;
    let match;
    const found = [];
    while ((match = regex.exec(text))) {
      found.push({ del: match[1], ins: match[2], time: new Date().toLocaleTimeString() });
    }
    setChanges(found);
  };

  const handleGenerateClick = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("target_essay_type", essayType);
      formData.append("essay_text", essayText);

      const res = await apiClient.post("/ai/analyze/", formData);
      const text = res.data?.corrected_essay || "No analysis returned.";
      setEssayText(text);
      extractChanges(text);
    } catch (err) {
      setEssayText("Failed to analyze essay.");
      console.error("Analyze error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptChange = (index) => {
    const acceptedChange = changes[index];

    // Replace the change in essayText
    const regex = new RegExp(`<del>${acceptedChange.del}</del>\\s*<ins>${acceptedChange.ins}</ins>`, "g");
    const updatedEssayText = essayText.replace(regex, acceptedChange.ins);
    setEssayText(updatedEssayText);

    // Remove from changes
    const updatedChanges = [...changes];
    updatedChanges.splice(index, 1);
    setChanges(updatedChanges);

    // Toast
    toast.success("Change accepted");
  };

  const getFileIcon = (file) => {
    const type = file?.type;
    if (type === "application/pdf")
      return <RiFilePdf2Line className="text-4xl text-red-600" />;
    return <RiFileWord2Line className="text-4xl text-blue-600" />;
  };

  const handleTextClick = (type, word) => {
    setSelectedWord(word);
    setEssayText((prev) => {
      const delRegex = new RegExp(`<del>(.*?)</del>\\s*<ins>${word}</ins>`, "g");
      const insRegex = new RegExp(`<del>${word}</del>\\s*<ins>(.*?)</ins>`, "g");

      if (type === "ins") {
        return prev.replace(delRegex, word);
      } else if (type === "del") {
        return prev.replace(insRegex, word);
      }
      return prev;
    });
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
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
      <ToastContainer position="top-right" autoClose={2000} />
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Quick Actions</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">Uploaded File</h2>
          <p className="text-sm text-gray-500 mb-4">Details of your uploaded file</p>

          {!selectedFile ? (
            <label className="flex items-center gap-3 border border-gray-300 bg-gray-50 p-4 rounded-xl cursor-pointer hover:bg-gray-100 transition">
              <FiUploadCloud className="text-2xl text-gray-500" />
              <span className="text-sm text-gray-600">Click to upload file</span>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden outline-none"
              />
            </label>
          ) : (
            <div className="flex items-center gap-3 border bg-white p-4 rounded-xl">
              {getFileIcon(selectedFile)}
              <div>
                <p className="text-sm font-semibold text-gray-800">{selectedFile.name}</p>
                <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
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

        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg mb-4">
            <div className="bg-black text-white p-3 rounded-lg text-xl">
              <RiVoiceAiLine />
            </div>
            <h2 className="text-lg font-semibold text-gray-800">Essay Type</h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select
              className="flex-grow border border-gray-300 rounded-md p-2 text-sm outline-none"
              value={essayType}
              onChange={(e) => setEssayType(e.target.value)}
            >
              <option value="" disabled>Select type</option>
              <option value="Narrative Essay">Narrative Essay</option>
              <option value="Descriptive Essay">Descriptive Essay</option>
              <option value="Expository Essay">Expository Essay</option>
              <option value="Argumentative Essay">Argumentative Essay</option>
              <option value="Persuasive Essay">Persuasive Essay</option>
              <option value="Analytical Essay">Analytical Essay</option>
            </select>
            <button
              className="bg-black text-white px-5 py-2 rounded-md text-sm transition hover:bg-gray-800"
              onClick={handleGenerateClick}
            >
              {loading ? "Generating..." : "Generate Essay"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-lg font-medium text-gray-800 mb-4">Essay Preview</h2>
          {loading ? (
            <p className="text-sm text-gray-500">Processing...</p>
          ) : (
            <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
              {essayText ? parseEssayText(essayText) : "No file uploaded yet."}
            </div>
          )}
        </div>

        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Track Changes</h2>
          <p className="text-sm text-gray-500 mb-4">{changes.length} changes</p>
          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {changes.map((item, index) => (
              <div key={index} className="border rounded-xl p-4 relative">
                <span className="absolute top-2 left-2 text-xs font-semibold px-2 py-1 rounded-full text-white bg-blue-500">
                  CHANGE
                </span>
                <p className="text-sm italic mt-6 text-gray-800">
                  &quot;{item.del}&quot; ➝ &quot;{item.ins}&quot;
                </p>
                <div className="flex items-center justify-between mt-2">
                  <button
                    className="text-xs text-green-600 hover:underline"
                    onClick={() => handleAcceptChange(index)}
                  >
                    ✓ Accept
                  </button>
                  <span className="text-xs text-gray-400">{item.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadOneFile;
