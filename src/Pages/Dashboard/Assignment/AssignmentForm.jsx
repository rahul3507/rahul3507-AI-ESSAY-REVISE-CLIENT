/** @format */

"use client";

import { useState } from "react";
import { Button } from "../../../components/ui/button";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import { Input } from "../../../components/ui/input";
import { Upload } from "lucide-react";

export default function EssayForm() {
  const [assignmentTitle, setAssignmentTitle] = useState(
    "write an essay about pollution"
  );
  const [essayType, setEssayType] = useState("Argumentative");
  const [essayText, setEssayText] = useState("");
  const [coachingLevel, setCoachingLevel] = useState(
    "Medium - Balanced feedback"
  );
  const [suggestionLevel, setSuggestionLevel] = useState(
    "Medium - Moderate suggestions"
  );
  const [selectedFile, setSelectedFile] = useState(null);

  const handleSubmit = () => {
    console.log("Submitting assignment:", {
      assignmentTitle,
      essayType,
      essayText,
      coachingLevel,
      suggestionLevel,
      selectedFile,
    });
  };

  const handleCancel = () => {
    console.log("Cancelled");
    setSelectedFile(null); // Reset file on cancel
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      ["docx", "pdf", "txt"].includes(file.name.split(".").pop().toLowerCase())
    ) {
      setSelectedFile(file);
    } else {
      alert("Please upload a file in .docx, .pdf, or .txt format.");
      event.target.value = null;
    }
  };

  return (
    <div className="w-full overflow-hidden p-2">
      <div className="space-y-2">
        <Label
          htmlFor="assignment-title"
          className="text-base font-medium text-gray-700"
        >
          Assignment Title
        </Label>
        <Input
          id="assignment-title"
          placeholder="Enter assignment title"
          value={assignmentTitle}
          onChange={(e) => setAssignmentTitle(e.target.value)}
          className="border-1 focus-visible:ring-[1px]"
        />
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="essay-type"
          className="text-base font-medium text-gray-700"
        >
          Essay Type
        </Label>
        <Input
          id="essay-type"
          placeholder="Enter essay type"
          value={essayType}
          onChange={(e) => setEssayType(e.target.value)}
          className="border-1 focus-visible:ring-[1px]"
        />
      </div>

      <div className="space-y-4">
        <Tabs defaultValue="text-input" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text-input">Text input</TabsTrigger>
            <TabsTrigger value="file-upload" className="text-gray-400">
              File upload
            </TabsTrigger>
          </TabsList>
          <TabsContent value="text-input" className="">
            <div className="space-y-2 p-2">
              <Label
                htmlFor="essay-text"
                className="text-base font-medium text-gray-700"
              >
                Essay Text
              </Label>
              <Textarea
                id="essay-text"
                placeholder="Write your essay here..."
                value={essayText}
                onChange={(e) => setEssayText(e.target.value)}
                className="min-h-[130px] max-w-full resize-none border-1 focus-visible:ring-[1px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="file-upload" className="">
            <div className="space-y-2 p-2">
              <Label
                htmlFor="file-upload"
                className="text-base font-medium text-gray-700"
              >
                File Upload
              </Label>
              <div className="border border-dashed border-blue-300 rounded-lg p-4 py-10  text-center">
                <input
                  id="file-upload"
                  type="file"
                  accept=".docx,.pdf,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="flex  items-center gap-2">
                    <Upload />
                    <div className="flex flex-col text-left">
                      <span className="text-black">Upload first draft</span>
                      <span className="text-gray-500 text-sm">
                        Supported formats: .docx, .pdf, .txt
                      </span>
                      {selectedFile && (
                        <span className="text-green-600 mt-2">
                          Selected: {selectedFile.name}
                        </span>
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="coaching-level"
          className="text-base font-medium text-gray-700"
        >
          Coaching Level
        </Label>
        <Select value={coachingLevel} onValueChange={setCoachingLevel}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Low - Minimal feedback">
              Low - Minimal feedback
            </SelectItem>
            <SelectItem value="Medium - Balanced feedback">
              Medium - Balanced feedback
            </SelectItem>
            <SelectItem value="High - Detailed feedback">
              High - Detailed feedback
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label
          htmlFor="suggestion-level"
          className="text-base font-medium text-gray-700"
        >
          Suggestion Level
        </Label>
        <Select value={suggestionLevel} onValueChange={setSuggestionLevel}>
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Low - Few suggestions">
              Low - Few suggestions
            </SelectItem>
            <SelectItem value="Medium - Moderate suggestions">
              Medium - Moderate suggestions
            </SelectItem>
            <SelectItem value="High - Many suggestions">
              High - Many suggestions
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end gap-3 pt-6">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="px-8 bg-transparent"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="px-8 text-white bg-slate-800 hover:bg-slate-700"
        >
          Submit Assignment
        </Button>
      </div>
    </div>
  );
}
