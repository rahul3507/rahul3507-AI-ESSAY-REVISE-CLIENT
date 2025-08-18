/** @format */

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FileText, User, Award, BarChart3 } from "lucide-react";
import apiClient from "../../../lib/api-client";

const EssayResult = () => {
  const { essayId } = useParams();
  console.log("id is::", essayId);
  const [essayData, setEssayData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (essayId) {
      fetchEssayDetails();
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

          <div className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed max-h-[600px] overflow-y-auto">
            {essayData?.essay_text || "No essay content available."}
          </div>
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
    </div>
  );
};

export default EssayResult;
