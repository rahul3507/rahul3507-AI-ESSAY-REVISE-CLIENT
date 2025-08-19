/** @format */

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
import { DialogClose } from "../../../components/ui/dialog";

import PropTypes from "prop-types";
import apiClient from "../../../lib/api-client";

export default function AssignmentForm({
  assignmentId,
  initialTitle,
  initialType,
  onSubmitSuccess,
}) {
  const [assignmentTitle, setAssignmentTitle] = useState(initialTitle || "");
  const [essayType, setEssayType] = useState(initialType || "");
  const [essayText, setEssayText] = useState("");
  const [coachingLevel, setCoachingLevel] = useState("medium");
  const [suggestionLevel, setSuggestionLevel] = useState("medium");
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);

  const handleSubmit = async () => {
    if (!essayText.trim() && !selectedFile) {
      setSubmitError(
        "Please provide essay content either by typing or uploading a file."
      );
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();

      // Add content based on what's provided
      if (essayText.trim()) {
        formData.append("content", essayText);
      } else {
        // If no text content, send empty string for content
        formData.append("content", "");
      }

      // Add file if provided
      if (selectedFile) {
        formData.append("file_upload", selectedFile);
      }

      formData.append("suggestion_level", suggestionLevel);
      formData.append("coaching_level", coachingLevel);

      const response = await apiClient.post(
        `/students/assignments/${assignmentId}/submit/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Assignment submitted successfully:", response.data);

      // Call success callback
      if (onSubmitSuccess) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Error submitting assignment:", error);
      setSubmitError(
        error.response?.data?.message ||
          error.response?.data?.error ||
          "Failed to submit assignment. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (
      file &&
      ["docx", "pdf", "txt"].includes(file.name.split(".").pop().toLowerCase())
    ) {
      setSelectedFile(file);
      setSubmitError(null); // Clear any previous errors
    } else {
      alert("Please upload a file in .docx, .pdf, or .txt format.");
      event.target.value = null;
    }
  };

  const mapCoachingLevel = (level) => {
    const mapping = {
      "Light - Basic feedback": "Light - Basic feedback",
      "Medium - Balanced feedback": "Medium - Balanced feedback",
      "Intensive - Detailed feedback": "Intensive - Detailed feedback",
    };
    return mapping[level] || level;
  };

  const mapSuggestionLevel = (level) => {
    const mapping = {
      "Low - Few suggestions": "Low - Minimal feedback",
      "Medium - Moderate suggestions": "Medium - Balanced feedback",
      "High - Aggressive suggestions": "High - Aggressive suggestions",
    };
    return mapping[level] || level;
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
          disabled
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
          disabled
        />
      </div>

      <div className="space-y-4">
        <Tabs defaultValue="text-input" className="w-full">
          <h2 className="text-base font-medium text-gray-700 mt-2">
            Upload Assignment (Either text or a file, but not both.)
          </h2>
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
                disabled={isSubmitting}
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
              <div className="border border-dashed border-blue-300 rounded-lg p-4 py-10 text-center">
                <input
                  id="file-upload"
                  type="file"
                  accept=".docx,.pdf,.txt"
                  onChange={handleFileChange}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <div className="flex items-center gap-2">
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
        <Select
          value={
            coachingLevel === "Light - Basic feedback"
              ? "Light - Basic feedback"
              : coachingLevel === "Medium - Balanced feedback"
              ? "Medium - Balanced feedback"
              : coachingLevel === "Intensive - Detailed feedback"
              ? "Intensive - Detailed feedback"
              : "Intensive - Detailed feedback"
          }
          onValueChange={(value) => setCoachingLevel(mapCoachingLevel(value))}
          disabled={isSubmitting}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Light - Basic feedback">
              Low - Basic feedback
            </SelectItem>
            <SelectItem value="Medium - Balanced feedback">
              Medium - Balanced feedback
            </SelectItem>
            <SelectItem value="Intensive - Detailed feedback">
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
        <Select
          value={
            suggestionLevel === "'Low - Conservative suggestions"
              ? "'Low - Conservative suggestions"
              : suggestionLevel === "Medium - Balanced suggestions"
              ? "Medium - Balanced suggestions"
              : suggestionLevel === "High - Aggressive suggestions"
              ? "High - Aggressive suggestions"
              : "Low - Conservative suggestions"
          }
          onValueChange={(value) =>
            setSuggestionLevel(mapSuggestionLevel(value))
          }
          disabled={isSubmitting}
        >
          <SelectTrigger className="w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="bg-white">
            <SelectItem value="Low - Conservative suggestions">
              Low - Few suggestions
            </SelectItem>
            <SelectItem value="Medium - Balanced suggestions">
              Medium - Moderate suggestions
            </SelectItem>
            <SelectItem value="High - Aggressive suggestions">
              High - Many suggestions
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      {submitError && (
        <div className="bg-red-50 border border-red-300 text-red-700 px-4 py-3 rounded">
          {submitError}
        </div>
      )}

      <div className="flex justify-end gap-3 pt-6">
        <DialogClose asChild>
          <Button
            variant="outline"
            className="px-8 bg-transparent hover:bg-gray-100 cursor-pointer"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
        </DialogClose>
        <Button
          onClick={handleSubmit}
          className="px-4 text-white bg-slate-800 hover:bg-slate-700 cursor-pointer"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Submit Assignment"}
        </Button>
      </div>
    </div>
  );
}

AssignmentForm.propTypes = {
  assignmentId: PropTypes.number.isRequired,
  initialTitle: PropTypes.string,
  initialType: PropTypes.string,
  onSubmitSuccess: PropTypes.func,
};
