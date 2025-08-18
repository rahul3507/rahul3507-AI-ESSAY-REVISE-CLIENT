/** @format */

import { useState } from "react";
import { RiVoiceAiLine } from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FileText } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

// Mock API client for demonstration
const apiClient = {
  post: async (url, data, config) => {
    // Simulate API response
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return {
      data: {
        corrected_essay: `This is a sample essay with some <error data-correct="errors">mistake</error> that need correction. The <error data-correct="student">pupil</error> should <error data-correct="review">revise</error> their work carefully. 

Another paragraph with <error data-correct="proper grammar">good grammer</error> issues that should be addressed. The essay needs <error data-correct="thorough">through</error> editing.`,
        essay_score: 75,
      },
    };
  },
};

// Mock user data
const useLoggedUser = () => ({
  user: { is_active: true },
});

const EssayResult = () => {
  const { user } = useLoggedUser();
  const [selectedFile, setSelectedFile] = useState(null);
  const [essayText, setEssayText] = useState("");
  const [loading, setLoading] = useState(false);
  const [essayType, setEssayType] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [changes, setChanges] = useState([]);
  const [overallScore, setOverallScore] = useState(null);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentError, setCurrentError] = useState(null);

  const handleFileChange = async (e) => {
    // if (!user?.is_active) {
    //   toast.error("You currently do not have an active subscription plan.");
    //   return;
    // }

    const file = e.target.files[0];
    if (!file) return;

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

    try {
      setLoading(true);
      setChanges([]);
      setSelectedWord(null);
      setEssayType("");

      const formData = new FormData();
      formData.append("file", file);

      const res = await apiClient.post("/ai/analyze_essay_view/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      });

      const text = res.data?.corrected_essay || "No analysis returned.";
      setOverallScore(res.data?.essay_score || null);
      setEssayText(text);

      extractChanges(text);
      toast.success("File uploaded and analyzed successfully!");
    } catch (err) {
      console.error("File upload error:", err);
      setEssayText("Failed to analyze essay.");
      toast.error("Failed to analyze essay.");
    } finally {
      setLoading(false);
    }
  };

  const extractChanges = (text) => {
    const changesList = [];
    const replaceRegex = /<del>(.*?)<\/del>\s*<ins>(.*?)<\/ins>/g;
    const deleteRegex = /<del>(.*?)<\/del>(?!\s*<ins>)/g;
    const insertRegex = /(?<!<del>)<ins>(.*?)<\/ins>/g;

    let match;

    while ((match = replaceRegex.exec(text))) {
      changesList.push({
        del: match[1],
        ins: match[2],
        type: "replace",
        time: new Date().toLocaleTimeString(),
      });
    }

    while ((match = deleteRegex.exec(text))) {
      changesList.push({
        del: match[1],
        ins: null,
        type: "delete",
        time: new Date().toLocaleTimeString(),
      });
    }

    while ((match = insertRegex.exec(text))) {
      changesList.push({
        del: null,
        ins: match[1],
        type: "insert",
        time: new Date().toLocaleTimeString(),
      });
    }

    setChanges(changesList);
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

  // Handle error click to open modal
  const handleErrorClick = (errorText, correctText) => {
    setCurrentError({
      incorrect: errorText,
      correct: correctText,
    });
    setIsModalOpen(true);
  };

  // Handle accepting the correction
  const handleAcceptCorrection = () => {
    if (currentError) {
      const updatedText = essayText.replace(
        new RegExp(
          `<error data-correct="${currentError.correct}">${currentError.incorrect}</error>`,
          "g"
        ),
        currentError.correct
      );
      setEssayText(updatedText);
      toast.success("Correction applied successfully!");
    }
    setIsModalOpen(false);
    setCurrentError(null);
  };

  // Handle rejecting the correction
  const handleRejectCorrection = () => {
    setIsModalOpen(false);
    setCurrentError(null);
  };

  const handleAcceptChange = (index) => {
    const change = changes[index];
    let updatedText = essayText;

    if (change.type === "replace") {
      const regex = new RegExp(
        `<del>${change.del}</del>\\s*<ins>${change.ins}</ins>`
      );
      updatedText = updatedText.replace(regex, change.ins);
    } else if (change.type === "insert") {
      const regex = new RegExp(`<ins>${change.ins}</ins>`);
      updatedText = updatedText.replace(regex, change.ins);
    }

    setEssayText(updatedText);
    setChanges(changes.filter((_, i) => i !== index));
    toast.success("Change accepted");
  };

  const handleRejectChange = (index) => {
    const change = changes[index];
    let updatedText = essayText;

    if (change.type === "replace") {
      const regex = new RegExp(
        `<del>${change.del}</del>\\s*<ins>${change.ins}</ins>`
      );
      updatedText = updatedText.replace(regex, change.del);
    } else if (change.type === "delete") {
      const regex = new RegExp(`<del>${change.del}</del>`);
      updatedText = updatedText.replace(regex, change.del);
    } else if (change.type === "insert") {
      const regex = new RegExp(`<ins>${change.ins}</ins>`);
      updatedText = updatedText.replace(regex, "");
    }

    setEssayText(updatedText);
    setChanges(changes.filter((_, i) => i !== index));
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
      // Handle error tags with red underline and click functionality
      .replace(
        /<error data-correct="([^"]*)">(.*?)<\/error>/g,
        (match, correct, incorrect) => {
          return `<span class="text-red-600 underline decoration-red-500 decoration-2 cursor-pointer hover:bg-red-50 px-1 rounded" data-type="error" data-incorrect="${incorrect}" data-correct="${correct}">${incorrect}</span>`;
        }
      )
      // Handle existing ins/del tags
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
          if (target.dataset?.type === "error") {
            handleErrorClick(target.dataset.incorrect, target.dataset.correct);
          } else if (target.dataset?.type && target.dataset?.word) {
            handleTextClick(target.dataset.type, target.dataset.word);
          }
        }}
      />
    );
  };

  const downloadEssayAsDocx = () => {
    // Mock download functionality
    toast.success("Essay downloaded as DOCX!");
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
          <div className="flex items-start justify-between border-b border-gray-200 mb-4 pb-4">
            <div className="pb-1">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Essay Preview
              </h2>
              <p className="text-xs text-gray-500 mb-2">
                Click on red underlined words to see corrections
              </p>

              {overallScore !== null && (
                <p className="text-sm text-gray-700 mb-2">
                  <span className="font-semibold text-gray-900">
                    Overall Score:
                  </span>{" "}
                  {overallScore} / 100
                </p>
              )}
            </div>
            {essayText && (
              <button
                onClick={downloadEssayAsDocx}
                className="mt-2 text-sm px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!essayText}
              >
                Download
              </button>
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
                    {item.type === "replace" && `"${item.del}" ➝ "${item.ins}"`}
                    {item.type === "delete" && `Delete "${item.del}"`}
                    {item.type === "insert" && `Insert "${item.ins}"`}
                  </p>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex gap-3">
                      {(item.type === "replace" || item.type === "insert") && (
                        <button
                          className="text-xs text-green-600 hover:underline"
                          onClick={() => handleAcceptChange(index)}
                        >
                          ✓ Accept
                        </button>
                      )}
                      {(item.type === "replace" ||
                        item.type === "delete" ||
                        item.type === "insert") && (
                        <button
                          className="text-xs text-red-600 hover:underline"
                          onClick={() => handleRejectChange(index)}
                        >
                          ✕ Reject
                        </button>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{item.time}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Correction Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Suggested Correction</DialogTitle>
            <DialogDescription>
              We found a potential error in your essay. Would you like to apply
              the suggested correction?
            </DialogDescription>
          </DialogHeader>

          {currentError && (
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-red-600">
                    Incorrect:
                  </span>
                  <span className="text-sm bg-red-50 px-2 py-1 rounded border border-red-200">
                    {currentError.incorrect}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-green-600">
                    Suggested:
                  </span>
                  <span className="text-sm bg-green-50 px-2 py-1 rounded border border-green-200">
                    {currentError.correct}
                  </span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={handleRejectCorrection}>
              Cancel
            </Button>
            <Button onClick={handleAcceptCorrection}>Apply Correction</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EssayResult;
