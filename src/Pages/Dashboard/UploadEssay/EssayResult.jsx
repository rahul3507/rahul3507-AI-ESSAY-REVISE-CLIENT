/** @format */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileText, User, Award, BarChart3 } from "lucide-react";
import apiClient from "../../../lib/api-client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";

const EssayResult = () => {
  const { essayId } = useParams();
  console.log("id is::", essayId);
  const [essayData, setEssayData] = useState(null);
  const [suggestionsData, setSuggestionsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSuggestion, setCurrentSuggestion] = useState(null);

  useEffect(() => {
    if (essayId) {
      fetchEssayDetails();
      fetchSuggestions();
    }
  }, [essayId]);

  const fetchEssayDetails = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/students/essays/${essayId}/`);
      setEssayData(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching essay details:", err);
      setError("Failed to load essay details");
    } finally {
      setLoading(false);
    }
  };

  const fetchSuggestions = async () => {
    try {
      const response = await apiClient.get(
        `/students/essays/${essayId}/suggestions/`
      );
      setSuggestionsData(response.data);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
    }
  };

  const openModal = (suggestion) => {
    setCurrentSuggestion(suggestion);
    setIsModalOpen(true);
  };

  const handleAccept = async (sugId) => {
    try {
      await apiClient.post(`/students/essays/${essayId}/suggestions/accept/`, {
        suggestion_id: sugId,
      });
      fetchSuggestions();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error accepting suggestion:", err);
    }
  };

  const handleReject = async (sugId) => {
    try {
      await apiClient.post(`/students/essays/${essayId}/suggestions/reject/`, {
        suggestion_id: sugId,
      });
      fetchSuggestions();
      setIsModalOpen(false);
    } catch (err) {
      console.error("Error rejecting suggestion:", err);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const capitalizeWords = (str) => {
    if (!str) return "";
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getScoreColor = (score, maxScore = 25) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getOverallScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  if (loading) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading essay details...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex justify-center items-center py-8">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  if (!essayData) {
    return (
      <div className="p-4 md:p-8">
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Essay not found</div>
        </div>
      </div>
    );
  }

  const aiEvaluation = essayData.ai_evaluations?.[0];
  const aiScores = aiEvaluation?.scores;

  const renderSuggestionText = () => {
    if (!suggestionsData || !suggestionsData.updated_text) {
      return <div>No suggestions available.</div>;
    }

    const text = suggestionsData.updated_text;
    const sortedSuggestions = [...suggestionsData.suggestions].sort(
      (a, b) => a.start_position - b.start_position
    );
    let parts = [];
    let lastEnd = 0;

    for (let sug of sortedSuggestions) {
      // Add text before the suggestion
      if (sug.start_position > lastEnd) {
        parts.push(
          <span key={`text-${lastEnd}`}>
            {text.slice(lastEnd, sug.start_position)}
          </span>
        );
      }

      // Add the underlined suggestion text
      parts.push(
        <span
          key={`sug-${sug.id}`}
          className="underline decoration-red-500 decoration-2 cursor-pointer hover:bg-red-50"
          onClick={() => openModal(sug)}
          title={`Click to ${sug.action_type}: "${sug.original_text}" → "${sug.suggested_text}"`}
        >
          {text.slice(sug.start_position, sug.end_position)}
        </span>
      );
      lastEnd = sug.end_position;
    }

    // Add remaining text after the last suggestion
    if (lastEnd < text.length) {
      parts.push(<span key={`text-${lastEnd}`}>{text.slice(lastEnd)}</span>);
    }

    return parts;
  };

  return (
    <div className="p-4 md:p-8">
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">
        Essay Result
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-4 mb-10">
        {/* Essay Details */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            Essay Details
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Information about this essay
          </p>

          <div className="space-y-3">
            <div className="flex items-center gap-3 border border-gray-200 bg-gray-50 p-4 rounded-xl">
              <FileText className="text-blue-600 w-6 h-6" />
              <div className="flex-1">
                <p className="text-sm font-semibold text-gray-800">
                  {essayData.title}
                </p>
                <p className="text-xs text-gray-500">
                  {capitalizeWords(essayData.essay_type)} Essay
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Suggestion Level:</span>
                <span className="text-sm font-medium text-gray-800">
                  {essayData.suggestion_level}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Coaching Level:</span>
                <span className="text-sm font-medium text-gray-800">
                  {essayData.coaching_level}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Submitted:</span>
                <span className="text-sm font-medium text-gray-800">
                  {formatDate(essayData.submitted_at)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Status:</span>
                <span className="text-sm font-medium text-gray-800">
                  {capitalizeWords(essayData.status)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* AI Scores */}
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-md">
          <h2 className="text-lg font-semibold text-gray-800 mb-1">
            AI Evaluation Scores
          </h2>
          <p className="text-sm text-gray-500 mb-4">
            Automated analysis results
          </p>

          {aiScores ? (
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-1 xl:gap-4">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`text-lg font-bold ${getScoreColor(
                      aiScores.ai_grammar_score
                    )}`}
                  >
                    {aiScores.ai_grammar_score}/25
                  </div>
                  <div className="text-xs text-gray-600">Grammar</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`text-lg font-bold ${getScoreColor(
                      aiScores.ai_clarity_score
                    )}`}
                  >
                    {aiScores.ai_clarity_score}/25
                  </div>
                  <div className="text-xs text-gray-600">Clarity</div>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <div
                    className={`text-lg font-bold ${getScoreColor(
                      aiScores.ai_arguments_score
                    )}`}
                  >
                    {aiScores.ai_arguments_score}/30
                  </div>
                  <div className="text-xs text-gray-600">Arguments</div>
                </div>
                <div className="text-center p-3 px-1 xl:px-3 bg-gray-50 rounded-lg">
                  <div
                    className={`text-lg font-bold ${getScoreColor(
                      aiScores.ai_vocabulary_score
                    )}`}
                  >
                    {aiScores.ai_vocabulary_score}/20
                  </div>
                  <div className="text-xs text-gray-600">Vocabulary</div>
                </div>
              </div>

              <div className="border-t pt-3">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div
                    className={`text-2xl font-bold ${getOverallScoreColor(
                      aiScores.percentage
                    )}`}
                  >
                    {aiScores.total_ai_score}/100
                  </div>
                  <div className="text-sm text-gray-600">
                    Overall Score ({aiScores.percentage}%)
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              No AI evaluation available
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {/* Essay Preview */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
          <div className="border-b border-gray-200 mb-4 pb-4">
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              Essay Text
            </h2>

            {aiScores && (
              <p className="text-sm text-gray-700 mb-2">
                <span className="font-semibold text-gray-900">AI Score:</span>{" "}
                <span className={getOverallScoreColor(aiScores.percentage)}>
                  {aiScores.total_ai_score} / 100 ({aiScores.percentage}%)
                </span>
              </p>
            )}
          </div>

          <Tabs defaultValue="original">
            <TabsList>
              <TabsTrigger value="original">Original Essay</TabsTrigger>
              <TabsTrigger value="suggestion">
                Suggestion Essay ({suggestionsData?.total_suggestions || 0}{" "}
                suggestions)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="original">
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
                {essayData?.essay_text || "No essay content available."}
              </div>
            </TabsContent>
            <TabsContent value="suggestion">
              <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
                <div className="mb-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-xs text-yellow-800">
                    <strong>Instructions:</strong> Red underlined text indicates
                    suggestions. Click on any underlined text to view and
                    accept/reject the suggestion.
                  </p>
                </div>
                {renderSuggestionText()}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Teacher Feedback */}
        <div className="md:col-span-2 bg-white p-6 rounded-2xl border border-gray-200 shadow-md">
          <div className="flex items-center gap-2 mb-4">
            <User className="w-5 h-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Teacher Feedback
            </h2>
          </div>

          <p className="text-sm text-gray-500 mb-4">
            {essayData?.total_teacher_evaluations || 0} teacher evaluation(s)
          </p>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {!essayData?.teacher_evaluations ||
            essayData.teacher_evaluations.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-gray-400 mb-2">
                  <Award className="w-12 h-12 mx-auto mb-2" />
                </div>
                <p className="text-sm text-gray-500">
                  No teacher feedback available yet
                </p>
              </div>
            ) : (
              essayData.teacher_evaluations.map((evaluation, index) => (
                <div
                  key={evaluation.evaluation_id}
                  className="border border-gray-200 rounded-xl p-4 bg-gray-50"
                >
                  {/* Teacher Info */}
                  <div className="flex items-center gap-2 mb-3">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold text-gray-800 text-sm">
                      {evaluation.teacher_info.teacher_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      ({evaluation.teacher_info.teacher_email})
                    </span>
                  </div>

                  {/* Teacher Scores */}
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-center p-2 bg-white rounded">
                      <div
                        className={`text-sm font-bold ${getScoreColor(
                          evaluation.scores.teacher_grammar_score
                        )}`}
                      >
                        {evaluation.scores.teacher_grammar_score}/25
                      </div>
                      <div className="text-xs text-gray-600">Grammar</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div
                        className={`text-sm font-bold ${getScoreColor(
                          evaluation.scores.teacher_clarity_score
                        )}`}
                      >
                        {evaluation.scores.teacher_clarity_score}/25
                      </div>
                      <div className="text-xs text-gray-600">Clarity</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div
                        className={`text-sm font-bold ${getScoreColor(
                          evaluation.scores.teacher_arguments_score
                        )}`}
                      >
                        {evaluation.scores.teacher_arguments_score}/30
                      </div>
                      <div className="text-xs text-gray-600">Arguments</div>
                    </div>
                    <div className="text-center p-2 bg-white rounded">
                      <div
                        className={`text-sm font-bold ${getScoreColor(
                          evaluation.scores.teacher_vocabulary_score
                        )}`}
                      >
                        {evaluation.scores.teacher_vocabulary_score}/20
                      </div>
                      <div className="text-xs text-gray-600">Vocabulary</div>
                    </div>
                  </div>

                  {/* Overall Teacher Score */}
                  <div className="text-center p-3 bg-blue-50 rounded-lg mb-3">
                    <div
                      className={`text-lg font-bold ${getOverallScoreColor(
                        evaluation.scores.percentage
                      )}`}
                    >
                      {evaluation.scores.total_teacher_score}/100
                    </div>
                    <div className="text-xs text-gray-600">
                      Total Score ({evaluation.scores.percentage}%)
                    </div>
                  </div>

                  {/* Teacher Comments */}
                  <div className="space-y-2">
                    <div className="text-xs font-semibold text-gray-700">
                      Overall Feedback:
                    </div>
                    <div className="bg-white p-3 rounded border">
                      <div className="text-xs text-gray-600 mb-1">
                        Rating:{" "}
                        <span className="font-medium text-blue-600">
                          {evaluation.overall_feedback.teacher_feedback_display}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        Ovarall Comment:{" "}
                        {evaluation.overall_feedback.teacher_general_comment}
                      </p>
                    </div>

                    {/* Detailed Comments */}
                    <div className="space-y-1">
                      <div className="text-xs font-semibold text-gray-700">
                        Detailed Comments:
                      </div>
                      <div className="space-y-1">
                        <div className="text-xs">
                          <span className="font-medium text-gray-600">
                            Grammar:
                          </span>{" "}
                          <span className="text-gray-700">
                            {
                              evaluation.detailed_comments
                                .teacher_grammar_comment
                            }
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-gray-600">
                            Clarity:
                          </span>{" "}
                          <span className="text-gray-700">
                            {
                              evaluation.detailed_comments
                                .teacher_clarity_comment
                            }
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-gray-600">
                            Arguments:
                          </span>{" "}
                          <span className="text-gray-700">
                            {
                              evaluation.detailed_comments
                                .teacher_arguments_comment
                            }
                          </span>
                        </div>
                        <div className="text-xs">
                          <span className="font-medium text-gray-600">
                            Vocabulary:
                          </span>{" "}
                          <span className="text-gray-700">
                            {
                              evaluation.detailed_comments
                                .teacher_vocabulary_comment
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Timestamp */}
                  <div className="mt-3 pt-2 border-t text-xs text-gray-400">
                    Evaluated on{" "}
                    {formatDate(evaluation.evaluation_timestamps.created_at)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Suggestion Modal */}
      <Dialog
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        className="bg-white"
      >
        <DialogContent className="bg-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">
              {currentSuggestion?.type === "grammar"
                ? "Grammar"
                : currentSuggestion?.type === "spelling"
                ? "Spelling"
                : currentSuggestion?.category === "clarity"
                ? "Clarity"
                : currentSuggestion?.category === "word_choice"
                ? "Word Choice"
                : "Writing"}{" "}
              Suggestion
            </DialogTitle>
          </DialogHeader>
          <DialogDescription className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm font-semibold text-red-800 mb-2">
                  Original Text:
                </p>
                <p className="text-sm text-red-700 font-mono bg-white p-2 rounded border">
                  "{currentSuggestion?.original_text}"
                </p>
              </div>

              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-semibold text-green-800 mb-2">
                  Suggested Text:
                </p>
                <p className="text-sm text-green-700 font-mono bg-white p-2 rounded border">
                  "{currentSuggestion?.suggested_text}"
                </p>
              </div>

              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm font-semibold text-blue-800 mb-2">
                  Explanation:
                </p>
                <p className="text-sm text-blue-700">
                  {currentSuggestion?.explanation}
                </p>
              </div>

              <div className="flex justify-between text-xs text-gray-500">
                <span>
                  Confidence:{" "}
                  <span className="font-medium">
                    {currentSuggestion?.confidence}
                  </span>
                </span>
                <span>
                  Priority:{" "}
                  <span className="font-medium">
                    {currentSuggestion?.priority}
                  </span>
                </span>
              </div>
            </div>
          </DialogDescription>
          <DialogFooter className="gap-2">
            <Button
              variant="outline"
              className="bg-red-50 hover:bg-red-100 border-red-200 text-red-700"
              onClick={() => handleReject(currentSuggestion?.id)}
            >
              Reject
            </Button>
            <Button
              className="bg-green-500 hover:bg-green-600 text-white"
              onClick={() => handleAccept(currentSuggestion?.id)}
            >
              Accept
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EssayResult;
