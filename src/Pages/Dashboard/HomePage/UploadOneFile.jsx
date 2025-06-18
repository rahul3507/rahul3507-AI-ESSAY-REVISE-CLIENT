import { useState } from "react";
import { RiFileWord2Line } from "react-icons/ri";
import { FiUploadCloud } from "react-icons/fi";

const UploadOneFile = () => {
    const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  return (
    <div>
      <h1 className="text-xl font-semibold">Quick Actions</h1>
      <div className="flex justify-between gap-10">
        <div className="border border-base-300 bg-base-300 rounded-2xl p-5 w-xl">
      <div className="pb-3 text-gray-700">
        <h4 className="text-xl font-semibold">Uploaded File</h4>
        <p className="text-xs">Here is the details of your file</p>
      </div>

      <div className="mt-2 relative">
        <label className="flex items-center gap-3 border border-gray-300 bg-white p-4 rounded-xl cursor-pointer transition hover:bg-gray-50">
          <FiUploadCloud className="text-2xl text-gray-500" />
          <span className="text-sm text-gray-600">
            {selectedFile ? "Change file" : "Click to upload file"}
          </span>
          <input
            type="file"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {selectedFile && (
          <div className="mt-4 flex items-center gap-2 text-gray-700 bg-white border border-gray-200 p-3 rounded-lg">
            <RiFileWord2Line className="text-2xl text-blue-600" />
            <div>
              <p className="text-sm font-medium">{selectedFile.name}</p>
              <p className="text-xs text-gray-500">
                {(selectedFile.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
        <div className="border border-base-300 bg-base-300 rounded-2xl p-4 ">
          <div className="border-b border-gray-300 pb-3 text-gray-700 flex items-center justify-between">
            <h4 className=""></h4>
          </div>
          <div className="mt-2">
            <span className="text-3xl font-bold"></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadOneFile;
