/** @format */

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Button } from "../../../../components/ui/button";
import { Eye, ArrowLeft } from "lucide-react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import apiClient from "../../../../lib/api-client";

const AssignmentTable = () => {
  const [assignmentData, setAssignmentData] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  // Try to get assignment ID from multiple possible param names
  const assignmentId =
    params.assignmentId ||
    params.id ||
    params.assignmentid ||
    params.assignment_id;

  console.log("All URL params:", params);
  console.log("Current location:", location.pathname);
  console.log("Extracted assignment ID:", assignmentId);

  useEffect(() => {
    const fetchAssignmentDetails = async () => {
      // Debug log
      console.log("Assignment ID from params:", assignmentId); // Debug log
      console.log("Current URL:", window.location.pathname); // Debug log

      if (!assignmentId) {
        setError(
          `Assignment ID is missing. Current URL: ${window.location.pathname}. Expected format: /assignment/submitted-assignments/[ID]`
        );
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Add timeout to prevent infinite loading
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

        const response = await apiClient.get(
          `/teachers/assignments/${assignmentId}/`,
          {
            signal: controller.signal,
          }
        );

        clearTimeout(timeoutId);

        console.log("API Response:", response.data); // Debug log

        // Handle the response data structure based on your API structure
        if (response.data) {
          setAssignmentData(response.data);

          // Extract submissions from the response - map to expected format
          const submissionsData =
            response.data.submissions?.map((submission) => ({
              id: submission.submission_id,
              student: submission.student,
              status: submission.status,
              submitted_at: submission.submitted_at,
              submission_text: submission.content_preview,
              total_ai_score: submission.total_ai_score,
              ai_total_score: submission.total_ai_score, // fallback
              total_teacher_score: submission.total_teacher_score,
              // Map AI scores
              evaluation: {
                grammar_score: submission.ai_grammar_score,
                arguments_score: submission.ai_arguments_score,
                clarity_score: submission.ai_clarity_score,
                vocabulary_score: submission.ai_vocabulary_score,
                total_ai_score: submission.total_ai_score,
                // Teacher scores
                teacher_grammar_score: submission.teacher_grammar_score,
                teacher_arguments_score: submission.teacher_arguments_score,
                teacher_clarity_score: submission.teacher_clarity_score,
                teacher_vocabulary_score: submission.teacher_vocabulary_score,
                teacher_feedback: submission.teacher_feedback,
                teacher_general_comment: submission.teacher_general_comment,
                // AI feedback
                grammar_comment: submission.ai_grammar_comment,
                arguments_comment: submission.ai_arguments_comment,
                clarity_comment: submission.ai_clarity_comment,
                vocabulary_comment: submission.ai_vocabulary_comment,
                overall_feedback: submission.ai_overall_feedback,
                suggestions: submission.ai_suggestions,
              },
            })) || [];

          setSubmissions(submissionsData);

          console.log("Assignment data:", response.data);
          console.log("Processed submissions:", submissionsData);
        } else {
          throw new Error("No data received from server");
        }
      } catch (err) {
        console.error("Error fetching assignment details:", err);

        if (err.name === "AbortError") {
          setError("Request timed out. Please try again.");
        } else if (err.response) {
          // API responded with an error status
          const status = err.response.status;
          if (status === 404) {
            setError("Assignment not found");
          } else if (status === 403) {
            setError("You don't have permission to view this assignment");
          } else if (status >= 500) {
            setError("Server error. Please try again later.");
          } else {
            setError(
              `Error: ${err.response.data?.detail || err.response.statusText}`
            );
          }
        } else if (err.request) {
          // Network error
          setError(
            "Network error. Please check your connection and try again."
          );
        } else {
          setError(err.message || "Failed to fetch assignment details");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAssignmentDetails();
  }, [assignmentId]);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        return dateString; // Return original string if invalid date
      }
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return dateString;
    }
  };

  // Get essay type display name
  const getEssayTypeDisplay = (essayType) => {
    if (!essayType) return "General";

    const essayTypes = {
      argumentative: "Argumentative Essay",
      narrative: "Narrative Essay",
      literary_analysis: "Literary Analysis",
      expository: "Expository Essay",
      descriptive: "Descriptive Essay",
      compare_contrast: "Compare/Contrast Essay",
    };
    return (
      essayTypes[essayType] ||
      essayType.charAt(0).toUpperCase() + essayType.slice(1)
    );
  };

  // Determine score cell styling based on score value
  const getScoreStyles = (score) => {
    // Handle null, undefined, or 0 scores
    if (!score && score !== 0) {
      return "bg-gray-200 text-gray-600";
    }

    const numScore = typeof score === "string" ? parseFloat(score) : score;

    if (numScore < 40) {
      return "bg-red-100 text-red-800";
    } else if (numScore >= 40 && numScore <= 69) {
      return "bg-yellow-100 text-yellow-800";
    } else {
      return "bg-green-100 text-green-800";
    }
  };

  // Format score display
  const formatScore = (score) => {
    if (!score && score !== 0) return "Not Scored";
    return typeof score === "number" ? score.toFixed(1) : score;
  };

  // Handle navigation on button click
  const handleViewClick = (submission) => {
    if (!submission?.id) {
      console.error("Invalid submission data:", submission);
      return;
    }

    navigate(
      `/assignment/submitted-assignments/assignment-result/${submission.id}`,
      {
        state: {
          submission: {
            ...submission,
            assignment: assignmentData, // Pass assignment data as well
          },
          assignmentData,
        },
      }
    );
  };

  // Handle back navigation
  const handleBackClick = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return (
      <section className="px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-black text-xl md:text-3xl font-bold">
            Assignment Details
          </h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600 flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div>Loading assignment details...</div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-black text-xl md:text-3xl font-bold">
            Assignment Details
          </h1>
          <Button
            onClick={handleBackClick}
            className="bg-gray-600 text-white hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
          <div className="font-medium">Error Loading Assignment</div>
          <div>{error}</div>
          <Button
            onClick={() => window.location.reload()}
            className="mt-2 bg-red-600 text-white hover:bg-red-700"
          >
            Try Again
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-black text-xl md:text-3xl font-bold">
          Assignment Details
        </h1>
        <Button
          onClick={handleBackClick}
          className="bg-gray-600 text-white hover:bg-gray-700"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Go Back
        </Button>
      </div>

      {/* Assignment Info */}
      {assignmentData && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {assignmentData.title}
            </h2>
            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              {getEssayTypeDisplay(assignmentData.essay_type)}
            </span>
          </div>

          {assignmentData.description && (
            <p className="text-gray-600 mb-4">{assignmentData.description}</p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm border-t pt-4">
            <div className="flex flex-col">
              <span className="font-semibold text-gray-500 mb-1">Created:</span>
              <span>{formatDate(assignmentData.created_at)}</span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-500 mb-1">
                Due Date:
              </span>
              <span
                className={`${
                  new Date(assignmentData.due_date) < new Date()
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {formatDate(assignmentData.due_date)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-500 mb-1">
                Total Submissions:
              </span>
              <span className="text-blue-600 font-medium">
                {assignmentData.submissions_count || 0}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-500 mb-1">Teacher:</span>
              <span>{assignmentData.teacher?.full_name || "N/A"}</span>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">
          Student Submissions ({submissions.length})
        </h2>

        {submissions.length === 0 ? (
          <div className="flex justify-center items-center h-32 bg-gray-50 rounded-lg">
            <div className="text-lg text-gray-500 text-center">
              <div>No submissions found</div>
              <div className="text-sm mt-2">
                Students haven&apos;t submitted their assignments yet
              </div>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50">
                  <TableHead className="font-semibold">Student</TableHead>
                  <TableHead className="text-center font-semibold">
                    AI Score
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Teacher Score
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Status
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Submitted
                  </TableHead>
                  <TableHead className="text-center font-semibold">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {submissions.map((submission) => (
                  <TableRow key={submission.id} className="hover:bg-gray-50">
                    <TableCell className="py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {submission.student?.full_name || "Unknown Student"}
                        </span>
                        <span className="text-gray-500 text-sm">
                          {submission.student?.email || "No email"}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell className="text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getScoreStyles(
                          submission.total_ai_score || submission.ai_total_score
                        )}`}
                      >
                        {formatScore(
                          submission.total_ai_score || submission.ai_total_score
                        )}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getScoreStyles(
                          submission.total_teacher_score
                        )}`}
                      >
                        {formatScore(submission.total_teacher_score)}
                      </span>
                    </TableCell>

                    <TableCell className="text-center">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          submission.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : submission.status === "graded"
                            ? "bg-green-100 text-green-800"
                            : submission.status === "submitted"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {submission.status?.charAt(0).toUpperCase() +
                          submission.status?.slice(1) || "Unknown"}
                      </span>
                    </TableCell>

                    <TableCell className="text-center text-sm">
                      {formatDate(submission.submitted_at)}
                    </TableCell>

                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        className="bg-blue-600 text-white hover:bg-blue-700"
                        onClick={() => handleViewClick(submission)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </section>
  );
};

export default AssignmentTable;
