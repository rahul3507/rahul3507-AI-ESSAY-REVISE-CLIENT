// import { useState, useEffect } from "react";
// import { RiFileWord2Line, RiFilePdf2Line, RiVoiceAiLine } from "react-icons/ri";
// import { FiUploadCloud } from "react-icons/fi";
// import { Check, X } from "lucide-react";
// import apiClient from "../../../lib/api-client";

// const UploadOneFile = () => {
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [essayText, setEssayText] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [essayType, setEssayType] = useState("");
//   const [words, setWords] = useState([]);
//   const [wordStates, setWordStates] = useState({});

//   const handleFileChange = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;
//     setSelectedFile(file);
//   };

//   const handleWordAction = (index, action) => {
//     setWordStates((prev) => {
//       const newStates = {
//         ...prev,
//         [index]: prev[index] === action ? null : action,
//       };

//       const word = words[index];
//       const isAddition = essayText.includes(`<addition>${word}</addition>`);
//       const isDeletion = essayText.includes(`<deletion>${word}</deletion>`);

//       if (action === "approved") {
//         if (isAddition) {
//           setEssayText((prevText) =>
//             prevText.replace(
//               new RegExp(`<addition>${word}</addition>`, "g"),
//               word
//             )
//           );
//         } else if (isDeletion) {
//           setEssayText((prevText) =>
//             prevText.replace(
//               new RegExp(`<deletion>${word}</deletion>`, "g"),
//               ""
//             )
//           );
//         }
//       } else if (action === "rejected") {
//         if (isAddition) {
//           setEssayText((prevText) =>
//             prevText.replace(
//               new RegExp(`<addition>${word}</addition>`, "g"),
//               ""
//             )
//           );
//         } else if (isDeletion) {
//           setEssayText((prevText) =>
//             prevText.replace(
//               new RegExp(`<deletion>${word}</deletion>`, "g"),
//               word
//             )
//           );
//         }
//       }

//       return newStates;
//     });
//   };

//   const handleGenerateClick = async () => {
//     try {
//       setLoading(true);
//       const formData = new FormData();
//       formData.append("desired_essay_type", essayType);
//       formData.append("file", selectedFile);

//       const res = await apiClient.post("/ai/analyze/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });

//       const text = res.data?.corrected_essay || "No analysis returned.";
//       setEssayText(text);

//       const additions = [...text.matchAll(/<addition>(.*?)<\/addition>/g)].map(
//         (m) => m[1]
//       );
//       const deletions = [...text.matchAll(/<deletion>(.*?)<\/deletion>/g)].map(
//         (m) => m[1]
//       );
//       const combined = [...additions, ...deletions];

//       setWords(combined);
//       setWordStates(
//         combined.reduce((acc, _, index) => {
//           acc[index] = null;
//           return acc;
//         }, {})
//       );
//     } catch (err) {
//       setEssayText("Failed to analyze essay.");
//       console.error("Analyze error:", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getFileIcon = (file) => {
//     const type = file?.type;
//     if (type === "application/pdf")
//       return <RiFilePdf2Line className="text-4xl text-red-600" />;
//     return <RiFileWord2Line className="text-4xl text-blue-600" />;
//   };

//   const parseEssayText = (text) => {
//     const html = text
//       .replace(
//         /<addition>(.*?)<\/addition>/g,
//         '<span class="text-green-600 font-medium">$1</span>'
//       )
//       .replace(
//         /<deletion>(.*?)<\/deletion>/g,
//         '<span class="text-red-600 line-through">$1</span>'
//       )
//       .replace(/<br\s*\/?>(?!<)/g, "<br />");

//     return <span dangerouslySetInnerHTML={{ __html: html }} />;
//   };

//   return (
//     <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
//       <h1 className="text-2xl font-semibold mb-6 text-gray-800">
//         Quick Actions
//       </h1>

//       {/* Upload + AI Type */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//         {/* Upload File */}
//         <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
//           <h2 className="text-lg font-semibold text-gray-800 mb-1">
//             Uploaded File
//           </h2>
//           <p className="text-sm text-gray-500 mb-4">
//             Details of your uploaded file
//           </p>

//           {!selectedFile ? (
//             <label className="flex items-center gap-3 border border-gray-300 bg-gray-50 p-4 rounded-xl cursor-pointer hover:bg-gray-100 transition">
//               <FiUploadCloud className="text-2xl text-gray-500" />
//               <span className="text-sm text-gray-600">
//                 Click to upload file
//               </span>
//               <input
//                 type="file"
//                 accept=".pdf,.doc,.docx"
//                 onChange={handleFileChange}
//                 className="hidden outline-none"
//               />
//             </label>
//           ) : (
//             <div className="flex items-center gap-3 border bg-white p-4 rounded-xl">
//               {getFileIcon(selectedFile)}
//               <div>
//                 <p className="text-sm font-semibold text-gray-800">
//                   {selectedFile.name}
//                 </p>
//                 <p className="text-xs text-gray-500">
//                   {(selectedFile.size / 1024).toFixed(2)} KB
//                 </p>
//               </div>
//               <label className="ml-auto text-sm text-blue-500 underline cursor-pointer">
//                 Change
//                 <input
//                   type="file"
//                   accept=".pdf,.doc,.docx"
//                   onChange={handleFileChange}
//                   className="hidden outline-none"
//                 />
//               </label>
//             </div>
//           )}
//         </div>

//         {/* Essay Type + Generate */}
//         <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
//           <div className="flex items-center gap-3 border border-gray-300 p-3 rounded-lg mb-4">
//             <div className="bg-black text-white p-3 rounded-lg text-xl">
//               <RiVoiceAiLine />
//             </div>
//             <h2 className="text-lg font-semibold text-gray-800">Essay Type</h2>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-3">
//             <select
//               className="flex-grow border border-gray-300 rounded-md p-2 text-sm outline-none"
//               value={essayType}
//               onChange={(e) => setEssayType(e.target.value)}
//             >
//               <option value="" disabled>
//                 Select type
//               </option>
//               <option value="Narrative Essay">Narrative Essay</option>
//             </select>
//             <button
//               className="bg-black text-white px-5 py-2 rounded-md text-sm transition hover:bg-gray-800"
//               onClick={handleGenerateClick}
//             >
//               {loading ? "Generating..." : "Generate Essay"}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Essay and Word List */}
//       <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
//         {/* Essay Result */}
//         <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
//           <h2 className="text-lg font-medium text-gray-800 mb-4">
//             Essay Preview
//           </h2>
//           {loading ? (
//             <p className="text-sm text-gray-500">Processing...</p>
//           ) : (
//             <div className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
//               {essayText ? parseEssayText(essayText) : "No file uploaded yet."}
//             </div>
//           )}
//         </div>

//         {/* Word Selector */}
//         <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
//           <h2 className="text-xl font-semibold text-gray-800 mb-6">
//             Select Words
//           </h2>
//           <div className="space-y-4">
//             {words.map((word, index) => (
//               <div
//                 key={index}
//                 className="grid grid-cols-1 md:grid-cols-3 gap-3 items-center"
//               >
//                 <div className="flex gap-2 md:col-span-2">
//                   <button
//                     onClick={() => handleWordAction(index, "rejected")}
//                     className={`flex items-center justify-center px-3 py-1 rounded-xl text-sm font-medium border transition ${
//                       wordStates[index] === "rejected"
//                         ? "bg-red-100 text-red-600 border-red-300"
//                         : "bg-red-50 text-red-500 hover:bg-red-100 border-red-100"
//                     }`}
//                   >
//                     <X size={14} className="mr-1" />
//                     Reject
//                   </button>
//                   <button
//                     onClick={() => handleWordAction(index, "approved")}
//                     className={`flex items-center justify-center px-3 py-1 rounded-xl text-sm font-medium border transition w-28 ${
//                       wordStates[index] === "approved"
//                         ? "bg-blue-100 text-blue-600 border-blue-300"
//                         : "bg-blue-50 text-blue-500 hover:bg-blue-100 border-blue-100"
//                     }`}
//                   >
//                     <Check size={14} className="mr-1" />
//                     Approve
//                   </button>
//                 </div>
//                 <div className="text-center">
//                   <span
//                     className={`inline-block px-3 py-1 rounded-xl text-sm font-medium min-w-[100px] transition ${
//                       wordStates[index] === "approved"
//                         ? "bg-blue-100 text-blue-700 border border-blue-200"
//                         : wordStates[index] === "rejected"
//                         ? "bg-red-100 text-red-700 border border-red-200"
//                         : "bg-gray-200 text-gray-700 hover:bg-gray-300"
//                     }`}
//                   >
//                     {word}
//                   </span>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadOneFile;





import { useState, useEffect } from "react";
import {
  RiFileWord2Line,
  RiFilePdf2Line,
  RiVoiceAiLine,
} from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";
import apiClient from "../../../lib/api-client";

const UploadOneFile = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [essayText, setEssayText] = useState("");
  const [loading, setLoading] = useState(false);
  const [essayType, setEssayType] = useState("");

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setSelectedFile(file);
  };

  const handleGenerateClick = async () => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("desired_essay_type", essayType);
      formData.append("file", selectedFile);

      const res = await apiClient.post("/ai/analyze/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const text = res.data?.corrected_essay || "No analysis returned.";
      setEssayText(text);
    } catch (err) {
      setEssayText("Failed to analyze essay.");
      console.error("Analyze error:", err);
    } finally {
      setLoading(false);
    }
  };

  const getFileIcon = (file) => {
    const type = file?.type;
    if (type === "application/pdf") return <RiFilePdf2Line className="text-4xl text-red-600" />;
    return <RiFileWord2Line className="text-4xl text-blue-600" />;
  };

  const handleAdditionClick = (additionWord) => {
    setEssayText((prevText) => {
      const regex = new RegExp(
        `<deletion>(.*?)</deletion>\\s*<addition>${additionWord}</addition>`,
        "g"
      );
      return prevText.replace(regex, additionWord);
    });
  };

  const parseEssayText = (text) => {
    const withAdditionsInteractive = text.replace(
      /<addition>(.*?)<\/addition>/g,
      (match, word) =>
        `<span class="text-green-600 font-medium cursor-pointer" onclick="window.handleAdditionClick && window.handleAdditionClick('${word}')">${word}</span>`
    );

    const html = withAdditionsInteractive
      .replace(
        /<deletion>(.*?)<\/deletion>/g,
        '<span class="text-red-600 line-through">$1</span>'
      )
      .replace(/<br\s*\/?>/g, "<br />");

    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }

  useEffect(() => {
    window.handleAdditionClick = handleAdditionClick;
    return () => {
      delete window.handleAdditionClick;
    };
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
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
      </div>
    </div>
  );
};

export default UploadOneFile;
