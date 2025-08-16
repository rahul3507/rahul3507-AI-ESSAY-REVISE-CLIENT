/** @format */

"use client";

import { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
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

import apiClient from "../../../../lib/api-client";

export default function AssignmentResult() {
  const location = useLocation();
  const { submissionId } = useParams();
  const navigate = useNavigate();
  const { submission: initialSubmission } = location.state || {};

  const [submission, setSubmission] = useState(initialSubmission);
  const [loading, setLoading] = useState(!initialSubmission);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // Teacher evaluation form states
  const [selectedGrammar, setSelectedGrammar] = useState("");
  const [grammarReason, setGrammarReason] = useState("");
  const [selectedArgument, setSelectedArgument] = useState("");
  const [argumentReason, setArgumentReason] = useState("");
  const [selectedClarity, setSelectedClarity] = useState("");
  const [clarityReason, setClarityReason] = useState("");
  const [selectedVocabulary, setSelectedVocabulary] = useState("");
  const [vocabularyReason, setVocabularyReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState("");

  const feedbackOptions = [
    { label: "Inadequate", color: "bg-[#F5D8D8]", textColor: "text-[#F54A45]" },
    {
      label: "Needs Improvement",
      color: "bg-[#FFDBB2]",
      textColor: "text-[#FF8800]",
    },
    {
      label: "Satisfactory",
      color: "bg-[#FFEBB2]",
      textColor: "text-[#E89908]",
    },
    { label: "Good", color: "bg-[#E8FFE5]", textColor: "text-[#34C724]" },
    { label: "Excellent", color: "bg-[#E5EDFF]", textColor: "text-[#1155FF]" },
  ];

  // Fetch submission details if not provided via location state
  useEffect(() => {
    const fetchSubmissionDetails = async () => {
      if (!submission && submissionId) {
        try {
          setLoading(true);
          const response = await apiClient.get(
            `/teachers/submissions/${submissionId}/`
          );

          // Transform the response to match expected structure
          const submissionData = response.data;
          const transformedSubmission = {
            id: submissionData.submission_id || submissionData.id,
            student: submissionData.student,
            status: submissionData.status,
            submitted_at: submissionData.submitted_at,
            submission_text:
              submissionData.content_preview || submissionData.content,
            assignment: submissionData.assignment,
            evaluation: {
              grammar_score: submissionData.ai_grammar_score,
              arguments_score: submissionData.ai_arguments_score,
              clarity_score: submissionData.ai_clarity_score,
              vocabulary_score: submissionData.ai_vocabulary_score,
              total_ai_score: submissionData.total_ai_score,
              overall_feedback: submissionData.ai_overall_feedback,
              suggestions: submissionData.ai_suggestions,
              // Teacher evaluation data
              teacher_grammar_score: submissionData.teacher_grammar_score,
              teacher_grammar_comment: submissionData.teacher_grammar_comment,
              teacher_arguments_score: submissionData.teacher_arguments_score,
              teacher_arguments_comment:
                submissionData.teacher_arguments_comment,
              teacher_clarity_score: submissionData.teacher_clarity_score,
              teacher_clarity_comment: submissionData.teacher_clarity_comment,
              teacher_vocabulary_score: submissionData.teacher_vocabulary_score,
              teacher_vocabulary_comment:
                submissionData.teacher_vocabulary_comment,
              teacher_feedback: submissionData.teacher_feedback,
              teacher_general_comment: submissionData.teacher_general_comment,
            },
          };

          setSubmission(transformedSubmission);
          setError(null);
        } catch (err) {
          setError("Failed to fetch submission details");
          console.error("Error fetching submission details:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSubmissionDetails();
  }, [submission, submissionId]);

  // Prefill teacher evaluation if already exists
  useEffect(() => {
    if (submission?.evaluation) {
      const evalData = submission.evaluation;
      setSelectedGrammar(evalData.teacher_grammar_score?.toString() || "");
      setGrammarReason(evalData.teacher_grammar_comment || "");
      setSelectedArgument(evalData.teacher_arguments_score?.toString() || "");
      setArgumentReason(evalData.teacher_arguments_comment || "");
      setSelectedClarity(evalData.teacher_clarity_score?.toString() || "");
      setClarityReason(evalData.teacher_clarity_comment || "");
      setSelectedVocabulary(
        evalData.teacher_vocabulary_score?.toString() || ""
      );
      setVocabularyReason(evalData.teacher_vocabulary_comment || "");
      setSelectedFeedback(evalData.teacher_feedback || "");
      setFeedback(evalData.teacher_general_comment || "");
    }
  }, [submission]);

  const handleFeedbackChange = (value) => {
    setSelectedFeedback(value);
  };

  const handleSubmitEvaluation = async () => {
    try {
      setSubmitting(true);
      setError(null);

      // Validate required fields
      if (
        !selectedGrammar ||
        !selectedArgument ||
        !selectedClarity ||
        !selectedVocabulary ||
        !selectedFeedback
      ) {
        setError(
          "Please provide scores for all criteria and select an overall rating"
        );
        return;
      }

      // Ensure scores are within valid ranges
      const grammarScore = parseInt(selectedGrammar);
      const argumentScore = parseInt(selectedArgument);
      const clarityScore = parseInt(selectedClarity);
      const vocabScore = parseInt(selectedVocabulary);

      if (
        grammarScore < 0 ||
        grammarScore > 25 ||
        argumentScore < 0 ||
        argumentScore > 30 ||
        clarityScore < 0 ||
        clarityScore > 25 ||
        vocabScore < 0 ||
        vocabScore > 20
      ) {
        setError("Scores must be within the valid ranges for each criterion");
        return;
      }

      // API payload matching the expected format
      const evaluationData = {
        teacher_grammar_score: grammarScore,
        teacher_grammar_comment: grammarReason.trim() || "",
        teacher_arguments_score: argumentScore,
        teacher_arguments_comment: argumentReason.trim() || "",
        teacher_clarity_score: clarityScore,
        teacher_clarity_comment: clarityReason.trim() || "",
        teacher_vocabulary_score: vocabScore,
        teacher_vocabulary_comment: vocabularyReason.trim() || "",
        teacher_feedback: selectedFeedback,
        teacher_general_comment: feedback.trim() || "",
      };

      console.log("Submitting evaluation data:", evaluationData);

      const response = await apiClient.post(
        `/teachers/submissions/${submission.id}/evaluate/`,
        evaluationData
      );

      console.log("Evaluation submitted successfully:", response.data);

      // Transform the response back to our expected structure
      const updatedSubmissionData = response.data;
      const transformedSubmission = {
        ...submission,
        evaluation: {
          ...submission.evaluation,
          teacher_grammar_score: updatedSubmissionData.teacher_grammar_score,
          teacher_grammar_comment:
            updatedSubmissionData.teacher_grammar_comment,
          teacher_arguments_score:
            updatedSubmissionData.teacher_arguments_score,
          teacher_arguments_comment:
            updatedSubmissionData.teacher_arguments_comment,
          teacher_clarity_score: updatedSubmissionData.teacher_clarity_score,
          teacher_clarity_comment:
            updatedSubmissionData.teacher_clarity_comment,
          teacher_vocabulary_score:
            updatedSubmissionData.teacher_vocabulary_score,
          teacher_vocabulary_comment:
            updatedSubmissionData.teacher_vocabulary_comment,
          teacher_feedback: updatedSubmissionData.teacher_feedback,
          teacher_general_comment:
            updatedSubmissionData.teacher_general_comment,
        },
      };

      // Update local submission data with response
      setSubmission(transformedSubmission);

      // Navigate back or show success message
      alert("Evaluation submitted successfully!");
      navigate(-1); // Go back to previous page
    } catch (err) {
      console.error("Error submitting evaluation:", err);
      let errorMessage = "Failed to submit evaluation";

      if (err.response?.data) {
        const errorData = err.response.data;
        console.log("Error response data:", errorData);

        if (typeof errorData === "string") {
          errorMessage = errorData;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else {
          // Handle field-specific errors
          const errors = Object.entries(errorData)
            .map(([field, msgs]) => {
              if (Array.isArray(msgs)) {
                return `${field}: ${msgs.join(", ")}`;
              } else if (typeof msgs === "string") {
                return `${field}: ${msgs}`;
              } else {
                return `${field}: ${JSON.stringify(msgs)}`;
              }
            })
            .join("; ");
          errorMessage = errors || errorMessage;
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return "Invalid Date";
    }
  };

  // Format AI suggestions for display
  const formatAISuggestions = (suggestions) => {
    if (!suggestions) return "No suggestions available";

    // Split by newline and filter out empty lines
    const lines = suggestions.split("\n").filter((line) => line.trim());

    return (
      <div className="space-y-2">
        {lines.map((line, index) => (
          <p key={index} className="text-gray-700">
            {line.trim()}
          </p>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-gray-600 flex flex-col items-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <div>Loading submission details...</div>
        </div>
      </div>
    );
  }

  if (!submission) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-600">Submission not found</div>
      </div>
    );
  }

  const assignmentTitle =
    typeof submission.assignment === "string"
      ? submission.assignment
      : submission.assignment?.title || "N/A";

  return (
    <div className="flex h-screen bg-[#f9f9f9]">
      {/* Main Content */}
      <div className="flex-1 flex">
        {/* AI Scores Panel */}
        <div className="w-96 p-6 bg-white border-r border-[#e3e4e6] overflow-y-auto">
          <h2 className="text-xl font-semibold text-[#1e2839] mb-6">
            Review {submission.student?.full_name || "Student"}&apos;s Essay
          </h2>

          {/* Display error if any */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-3 py-2 rounded mb-4 text-sm">
              {error}
            </div>
          )}

          <Card className="mb-6 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#1e2839]">
                AI Scores
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 border border-gray-200 mx-1 rounded-2xl py-3">
              <div className="text-center">
                <div className="text-lg font-bold text-[#1e2839] border-b border-gray-200">
                  Total AI Score: {submission.evaluation?.total_ai_score || "0"}
                  /100
                </div>
              </div>

              <div className="grid grid-cols-2 gap-0 text-sm space-y-2">
                <div>
                  <div className="text-[#647187]">Grammar</div>
                  <div className="font-semibold text-[#1e2839]">
                    (25%): {submission.evaluation?.grammar_score || "0"}/25
                  </div>
                </div>
                <div>
                  <div className="text-[#647187]">Argument Strength</div>
                  <div className="font-semibold text-[#1e2839]">
                    (30%): {submission.evaluation?.arguments_score || "0"}/30
                  </div>
                </div>
                <div>
                  <div className="text-[#647187]">Clarity</div>
                  <div className="font-semibold text-[#1e2839]">
                    (25%): {submission.evaluation?.clarity_score || "0"}/25
                  </div>
                </div>
                <div>
                  <div className="text-[#647187]">Vocabulary</div>
                  <div className="font-semibold text-[#1e2839]">
                    (20%): {submission.evaluation?.vocabulary_score || "0"}/20
                  </div>
                </div>
              </div>
              <div className="text-sm text-[#647187]">
                Assignment: {assignmentTitle}
              </div>
              <div className="text-sm text-[#647187]">
                Submitted: {formatDate(submission.submitted_at)}
              </div>
            </CardContent>
          </Card>

          <Card className="mb-6 border border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#1e2839]">
                Teacher Rubric
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Grammar (0-25)
                </label>
                <Select
                  value={selectedGrammar}
                  onValueChange={setSelectedGrammar}
                >
                  <SelectTrigger className="w-full cursor-pointer border border-gray-200">
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent className="bg-white cursor-pointer border-gray-200">
                    {Array.from({ length: 26 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={i.toString()}
                        className="cursor-pointer"
                      >
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Comment for grammar score (optional)..."
                  value={grammarReason}
                  onChange={(e) => setGrammarReason(e.target.value)}
                  className="mt-2 min-h-[60px] text-sm border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Argument Strength (0-30)
                </label>
                <Select
                  value={selectedArgument}
                  onValueChange={setSelectedArgument}
                >
                  <SelectTrigger className="w-full cursor-pointer border-gray-200">
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent className="bg-white cursor-pointer border-gray-200">
                    {Array.from({ length: 31 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={i.toString()}
                        className="cursor-pointer"
                      >
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Comment for argument strength score (optional)..."
                  value={argumentReason}
                  onChange={(e) => setArgumentReason(e.target.value)}
                  className="mt-2 min-h-[60px] text-sm border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Clarity (0-25)
                </label>
                <Select
                  value={selectedClarity}
                  onValueChange={setSelectedClarity}
                >
                  <SelectTrigger className="w-full cursor-pointer border-gray-200">
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent className="bg-white cursor-pointer border-gray-200">
                    {Array.from({ length: 26 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={i.toString()}
                        className="cursor-pointer"
                      >
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Comment for clarity score (optional)..."
                  value={clarityReason}
                  onChange={(e) => setClarityReason(e.target.value)}
                  className="mt-2 min-h-[60px] text-sm border-gray-200"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#1e2839] mb-2">
                  Vocabulary (0-20)
                </label>
                <Select
                  value={selectedVocabulary}
                  onValueChange={setSelectedVocabulary}
                >
                  <SelectTrigger className="w-full cursor-pointer border-gray-200">
                    <SelectValue placeholder="Select score" />
                  </SelectTrigger>
                  <SelectContent className="bg-white cursor-pointer border-gray-200">
                    {Array.from({ length: 21 }, (_, i) => (
                      <SelectItem
                        key={i}
                        value={i.toString()}
                        className="cursor-pointer"
                      >
                        {i}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Textarea
                  placeholder="Comment for vocabulary score (optional)..."
                  value={vocabularyReason}
                  onChange={(e) => setVocabularyReason(e.target.value)}
                  className="mt-2 min-h-[60px] text-sm border-gray-200"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200">
            <CardHeader>
              <CardTitle className="text-lg text-[#1e2839]">
                Overall Rating
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {feedbackOptions.map((option) => (
                <div
                  key={option.label}
                  className={`flex items-center px-4 py-2 rounded-lg cursor-pointer ${
                    selectedFeedback === option.label
                      ? `${option.color} ${option.textColor}`
                      : "bg-gray-100 text-gray-600"
                  } text-sm font-medium transition-colors`}
                  onClick={() => handleFeedbackChange(option.label)}
                >
                  <input
                    type="radio"
                    name="feedback"
                    checked={selectedFeedback === option.label}
                    onChange={() => handleFeedbackChange(option.label)}
                    className="mr-2 w-4 h-4 cursor-pointer"
                  />
                  {option.label}
                </div>
              ))}
              <Textarea
                placeholder="Provide additional general comment for the student (optional)..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="mt-4 min-h-[80px] text-sm border-gray-200"
              />
            </CardContent>
          </Card>
        </div>

        {/* Essay Content Panel */}
        <div className="flex-1 p-6 bg-[#f9f9f9] rounded-2xl">
          <Tabs defaultValue="original" className="h-full rounded-2xl">
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
                AI Suggestions & Feedback
              </TabsTrigger>
            </TabsList>

            <TabsContent value="original" className="h-full">
              <Card className="h-full border-gray-200">
                <CardContent className="p-8 h-full overflow-auto bg-white mt-0">
                  <h1 className="text-2xl font-bold text-[#1e2839] mb-6">
                    Student Essay Submission
                  </h1>
                  <div className="text-gray-700 whitespace-pre-wrap leading-relaxed">
                    {submission.submission_text ||
                      submission.content ||
                      "No essay content available"}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="suggestions" className="h-full">
              <Card className="h-full border-gray-200">
                <CardContent className="p-8 h-full overflow-auto bg-white mt-0">
                  <h2 className="text-xl font-bold text-[#1e2839] mb-4">
                    AI Feedback
                  </h2>
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-gray-700">
                      {submission.evaluation?.overall_feedback ||
                        "No AI feedback available"}
                    </p>
                  </div>

                  <h2 className="text-xl font-bold text-[#1e2839] mb-4">
                    AI Suggestions
                  </h2>
                  <div className="p-4 bg-green-50 rounded-lg">
                    {formatAISuggestions(submission.evaluation?.suggestions)}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex justify-end gap-4 mt-6">
            <Button
              variant="outline"
              className="px-8"
              onClick={() => navigate(-1)}
            >
              Cancel
            </Button>
            <Button
              className="px-8 bg-[#1155ff] hover:bg-[#0d47d9] text-white"
              onClick={handleSubmitEvaluation}
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Evaluation"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
