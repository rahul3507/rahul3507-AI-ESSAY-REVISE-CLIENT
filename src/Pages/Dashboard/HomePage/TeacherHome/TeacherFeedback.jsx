/** @format */

"use client";

import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Textarea } from "../../../../components/ui/textarea";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../../components/ui/tabs";

export default function TeacherFeedback() {
  const location = useLocation();
  const { item } = location.state || {};

  const [selectedGrammar, setSelectedGrammar] = useState("");
  const [grammarReason, setGrammarReason] = useState("");
  const [selectedArgument, setSelectedArgument] = useState("");
  const [argumentReason, setArgumentReason] = useState("");
  const [selectedClarity, setSelectedClarity] = useState("");
  const [clarityReason, setClarityReason] = useState("");
  const [selectedVocabulary, setSelectedVocabulary] = useState("");
  const [vocabularyReason, setVocabularyReason] = useState("");
  const [feedback, setFeedback] = useState("");

  const feedbackOptions = [
    { label: "Inadequate", color: "bg-[#f54a45]", textColor: "text-white" },
    {
      label: "Needs Improvement",
      color: "bg-[#ff8800]",
      textColor: "text-white",
    },
    { label: "Satisfactory", color: "bg-[#e89908]", textColor: "text-white" },
    { label: "Good", color: "bg-[#34c724]", textColor: "text-white" },
    { label: "Excellent", color: "bg-[#1155ff]", textColor: "text-white" },
  ];

  return (
    <div className="flex h-screen bg-[#f9f9f9]">
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* AI Scores Panel */}
        <div className="w-96 p-6 bg-white border-r border-[#e3e4e6]">
          <h2 className="text-xl font-semibold text-[#1e2839] mb-6">
            Review {item?.name || "Student"}'s Essay
          </h2>

          <Card className="mb-6 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#1e2839] ">
                AI Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 border border-gray-200 mx-1 rounded-2xl py-3">
              <div className="text-center">
                <div className="text-lg font-bold text-[#1e2839] border-b border-gray-200">
                  Total Score: {item?.score || "N/A"}/100
                </div>
              </div>

              <div className="grid grid-cols-2 gap-0 text-sm space-y-2">
                <div>
                  <div className="text-[#647187]">Grammar</div>
                  <div className="font-semibold text-[#1e2839]">
                    (25%): 20/25
                  </div>
                </div>
                <div>
                  <div className="text-[#647187]">Argument Strength</div>
                  <div className="font-semibold text-[#1e2839]">
                    (30%): 24/30
                  </div>
                </div>
                <div>
                  <div className="text-[#647187]">Clarity</div>
                  <div className="font-semibold text-[#1e2839]">
                    (25%): 20/25
                  </div>
                </div>
                <div>
                  <div className="text-[#647187]">Vocabulary</div>
                  <div className="font-semibold text-[#1e2839]">
                    (20%): 18/20
                  </div>
                </div>
              </div>
              <div className="text-sm text-[#647187]">
                File: {item?.fileName || "N/A"} ({item?.fileType || "N/A"})
              </div>
              <div className="text-sm text-[#647187]">
                Uploaded: {item?.uploadDate || "N/A"}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#1e2839]">
                Teacher Rubric (1-25 Scale)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Grammar
                </label>
                <Select
                  value={selectedGrammar}
                  onValueChange={setSelectedGrammar}
                >
                  <SelectTrigger className="w-full cursor-pointer border border-gray-200">
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent className="bg-white cursor-pointer border-gray-200">
                    {Array.from({ length: 25 }, (_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={(i + 1).toString()}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Reason for grammar score..."
                  value={grammarReason}
                  onChange={(e) => setGrammarReason(e.target.value)}
                  className="mt-2 min-h-[60px] text-sm border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Argument Strength
                </label>
                <Select
                  value={selectedArgument}
                  onValueChange={setSelectedArgument}
                >
                  <SelectTrigger className="w-full cursor-pointer border-gray-200">
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent className="bg-white cursor-pointer border-gray-200">
                    {Array.from({ length: 25 }, (_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={(i + 1).toString()}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Reason for argument strength score..."
                  value={argumentReason}
                  onChange={(e) => setArgumentReason(e.target.value)}
                  className="mt-2 min-h-[60px] text-sm border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Clarity
                </label>
                <Select
                  value={selectedClarity}
                  onValueChange={setSelectedClarity}
                >
                  <SelectTrigger className="w-full cursor-pointer border-gray-200">
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent className="bg-white cursor-pointer border-gray-200">
                    {Array.from({ length: 25 }, (_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={(i + 1).toString()}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Reason for clarity score..."
                  value={clarityReason}
                  onChange={(e) => setClarityReason(e.target.value)}
                  className="mt-2 min-h-[60px] text-sm border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Vocabulary
                </label>
                <Select
                  value={selectedVocabulary}
                  onValueChange={setSelectedVocabulary}
                >
                  <SelectTrigger className="w-full cursor-pointer border-gray-200">
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent className="bg-white cursor-pointer border-gray-200">
                    {Array.from({ length: 25 }, (_, i) => (
                      <SelectItem
                        key={i + 1}
                        value={(i + 1).toString()}
                        className="cursor-pointer"
                      >
                        {i + 1}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Reason for vocabulary score..."
                  value={vocabularyReason}
                  onChange={(e) => setVocabularyReason(e.target.value)}
                  className="mt-2 min-h-[60px] text-sm border-gray-200"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg text-[#1e2839]">
                Teacher Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {feedbackOptions.map((option, index) => (
                <div
                  key={index}
                  className={`px-4 py-2 rounded-lg ${option.color} ${option.textColor} text-sm font-medium`}
                >
                  {option.label}
                </div>
              ))}
              <Textarea
                placeholder="Provide general feedback for the student..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mt-4 min-h-[80px] text-sm"
              />
            </CardContent>
          </Card>
        </div>

        {/* Essay Content Panel */}
        <div className="flex-1 p-6 bg-[#f9f9f9]">
          <Tabs defaultValue="original" className="h-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger
                value="original"
                className="bg-[#e3e4e6] data-[state=active]:bg-white"
              >
                Original Essay
              </TabsTrigger>
              <TabsTrigger
                value="suggestions"
                className="bg-[#e3e4e6] data-[state=active]:bg-white"
              >
                AI Suggestions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="original" className="h-full">
              <Card className="h-full">
                <CardContent className="p-8 h-full overflow-auto">
                  <h1 className="text-2xl font-bold text-[#1e2839] mb-6">
                    The Fourth Floor
                  </h1>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions" className="h-full">
              <Card className="h-full">
                <CardContent className="p-8 h-full overflow-auto">
                  <div className="text-center text-[#acacac] mt-20">
                    AI suggestions would appear here...
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" className="px-8">
              Cancel
            </Button>
            <Button className="px-8 bg-[#1155ff] hover:bg-[#0d47d9]">
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
