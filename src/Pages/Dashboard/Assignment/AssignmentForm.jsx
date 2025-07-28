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

  const handleSubmit = () => {
    console.log("Submitting assignment:", {
      assignmentTitle,
      essayType,
      essayText,
      coachingLevel,
      suggestionLevel,
    });
  };

  const handleCancel = () => {
    console.log("Cancelled");
  };

  return (
    <div className=" w-full overflow-hidden p-2">
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
          className="border-1 focus-visible:ring-[1px] "
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
          className="border-1 focus-visible:ring-[1px] "
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
          <TabsContent value="text-input" className="mt-4">
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
                className="min-h-[130px]  max-w-full resize-none border-1 focus-visible:ring-[1px] "
              />
            </div>
          </TabsContent>
          <TabsContent value="file-upload" className="mt-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              <p className="text-gray-500">
                File upload functionality would go here
              </p>
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
          className="px-8 bg-slate-800 hover:bg-slate-700"
        >
          Submit Assignment
        </Button>
      </div>
    </div>
  );
}
