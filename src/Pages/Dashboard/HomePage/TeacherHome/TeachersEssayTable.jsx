/** @format */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { ArrowRight, FileText } from "lucide-react";
import apiClient from "../../../../lib/api-client";

const TeachersEssayTable = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("normal");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch essays from API
  useEffect(() => {
    const fetchEssays = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/teachers/essays/");
        console.log("Fetched essays:", response.data);
        setEssays(response.data || []);
        setError(null);
      } catch (err) {
        console.error("Error fetching essays:", err);
        setError("Failed to load essays. Please try again.");
        setEssays([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEssays();
  }, []);

  // Filter and sort data based on search term and filter option
  const filteredData = essays
    .filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterOption === "high") {
        return b.total_ai_score - a.total_ai_score;
      } else if (filterOption === "low") {
        return a.total_ai_score - b.total_ai_score;
      }
      return 0; // normal (no sorting)
    });

  // Determine score cell styling based on score value
  const getScoreStyles = (score) => {
    if (score < 40) {
      return "bg-red-100 text-red-600";
    } else if (score >= 40 && score <= 69) {
      return "bg-orange-100 text-orange-600";
    } else {
      return "bg-green-100 text-green-600";
    }
  };

  // Get teacher feedback styling
  const getFeedbackStyles = (status) => {
    switch (status) {
      case "reviewed":
        return "text-green-600";
      case "pending":
        return "text-orange-600";
      default:
        return "text-gray-600";
    }
  };

  // Handle navigation to feedback page
  const handleFeedbackClick = (item) => {
    navigate(`/essays/feedback/${item.id}`, { state: { item } });
  };

  // Format date for display
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

  // Get status display text
  const getStatusDisplay = (item) => {
    // Check if teacher has evaluated (teacher_grammar_score exists and is not null)
    const hasTeacherEvaluation =
      item.teacher_grammar_score !== null &&
      item.teacher_grammar_score !== undefined;

    if (hasTeacherEvaluation) {
      return "reviewed";
    } else {
      return "pending";
    }
  };

  if (loading) {
    return (
      <section className="">
        <div className="bg-transparent mt-4 border border-gray-200 rounded-xl p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-gray-600 flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <div>Loading essays...</div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="">
        <div className="bg-transparent mt-4 border border-gray-200 rounded-xl p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg text-red-600 text-center">
              <div>{error}</div>
              <Button
                onClick={() => window.location.reload()}
                className="mt-4 bg-blue-600 text-white hover:bg-blue-700"
              >
                Retry
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="bg-transparent mt-4 border border-gray-200 rounded-xl p-6">
        <h1 className="text-black text-lg md:text-xl font-medium mb-4">
          Students Essay List
        </h1>

        <div className="flex justify-between mb-4 relative">
          <Input
            type="text"
            placeholder="Search by Essay Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3"
          />
          <div className="relative">
            <Button
              variant="outline"
              className="bg-transparent border border-gray-200 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
              Filter
            </Button>
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => {
                    setFilterOption("normal");
                    setShowFilterDropdown(false);
                  }}
                >
                  Normal
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => {
                    setFilterOption("high");
                    setShowFilterDropdown(false);
                  }}
                >
                  High Score
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => {
                    setFilterOption("low");
                    setShowFilterDropdown(false);
                  }}
                >
                  Low Score
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-white rounded-5xl border-0">
                <TableHead className="p-4">Essay Title</TableHead>
                <TableHead className="text-center">AI Score</TableHead>
                <TableHead className="text-center">Submit Date</TableHead>
                <TableHead className="text-center">Teacher Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.length === 0 ? (
                <TableRow className="border-0">
                  <TableCell
                    colSpan={4}
                    className="text-center py-8 text-gray-500"
                  >
                    No essays found
                  </TableCell>
                </TableRow>
              ) : (
                filteredData.map((item, index) => {
                  const status = getStatusDisplay(item);
                  return (
                    <TableRow key={item.id || index} className="border-0">
                      <TableCell className="py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900">
                              {item.title || "Untitled Essay"}
                            </div>
                            <div className="text-gray-500 text-sm">
                              {item.student?.full_name || "Unknown Student"} •{" "}
                              {item.essay_type || "Essay"}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getScoreStyles(
                            item.total_ai_score || 0
                          )}`}
                        >
                          {item.total_ai_score || 0}
                        </span>
                      </TableCell>
                      <TableCell className="text-center text-gray-600">
                        {formatDate(item.submitted_at)}
                      </TableCell>
                      <TableCell className="flex justify-center">
                        <Button
                          className={`font-medium bg-transparent text-center flex items-center gap-1 hover:bg-gray-100 ${getFeedbackStyles(
                            status
                          )}`}
                          onClick={() => handleFeedbackClick(item)}
                        >
                          {status}
                          <ArrowRight className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default TeachersEssayTable;
