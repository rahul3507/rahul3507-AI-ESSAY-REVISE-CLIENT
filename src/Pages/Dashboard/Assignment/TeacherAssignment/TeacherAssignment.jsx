/** @format */

import { useState, useEffect } from "react";
import { PenLine, Trash2, Plus } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import TeacherAssignmentModal from "./TeacherAssignmentModal";
import { Link } from "react-router-dom";
import apiClient from "../../../../lib/api-client";

const TeacherAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

  // Fetch assignments from API
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/teachers/assignments/");

        console.log("Fetched assignments:", response.data);

        // Ensure each assignment has a submissions_count field
        const assignmentsWithCounts = response.data.map((assignment) => ({
          ...assignment,
          submissions_count: assignment.submissions_count || 0,
          reviewed_count: assignment.reviewed_count || 0, // If available from API
        }));

        setAssignments(assignmentsWithCounts);
        setError(null);
      } catch (err) {
        setError("Failed to fetch assignments");
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Get essay type display name
  const getEssayTypeDisplay = (essayType) => {
    const essayTypes = {
      argumentative: "Argumentative Essay",
      narrative: "Narrative Essay",
      literary_analysis: "Literary Analysis",
      expository: "Expository Essay",
      descriptive: "Descriptive Essay",
      compare_contrast: "Compare/Contrast Essay",
    };
    return essayTypes[essayType] || "General";
  };

  // Calculate reviewed submissions count
  const getReviewedCount = (assignment) => {
    // If the API provides reviewed_count, use it
    if (assignment.reviewed_count !== undefined) {
      return assignment.reviewed_count;
    }

    // Otherwise, you might need to calculate it based on submissions
    // This would require additional API calls or the data to be included in the assignment response
    return 0; // Placeholder - you'll need to implement this based on your API structure
  };

  const handleCreateAssignment = () => {
    setEditingAssignment(null);
    setIsEditing(false);
    setIsModalOpen(true);
  };

  const handleEditAssignment = (assignment) => {
    setEditingAssignment(assignment);
    setIsEditing(true);
    setIsModalOpen(true);
  };

  const handleSaveAssignment = async (assignmentData) => {
    try {
      // Validate required fields
      if (!assignmentData.title?.trim()) {
        throw new Error("Title is required");
      }

      if (!assignmentData.due_date) {
        throw new Error("Due date is required");
      }

      // Validate due_date format
      const dueDate = new Date(assignmentData.due_date);
      if (isNaN(dueDate.getTime())) {
        throw new Error("Invalid due date format");
      }

      const payload = {
        title: assignmentData.title.trim(),
        description: assignmentData.description?.trim() || "",
        due_date: assignmentData.due_date, // Should be in YYYY-MM-DD format
        essay_type: assignmentData.essay_type || "argumentative",
      };

      console.log("Assignment payload:", payload);

      let response;
      if (isEditing && editingAssignment) {
        // Update existing assignment
        response = await apiClient.put(
          `/teachers/assignments/${editingAssignment.id}/`,
          payload
        );
        setAssignments((prev) =>
          prev.map((assignment) =>
            assignment.id === editingAssignment.id
              ? {
                  ...response.data,
                  submissions_count: assignment.submissions_count || 0,
                  reviewed_count: assignment.reviewed_count || 0,
                }
              : assignment
          )
        );
      } else {
        // Create new assignment
        response = await apiClient.post("/teachers/assignments/", payload);
        const newAssignment = {
          ...response.data,
          submissions_count: 0,
          reviewed_count: 0,
        };
        setAssignments((prev) => [...prev, newAssignment]);
      }

      setError(null);
      setIsModalOpen(false);
      setEditingAssignment(null);
      setIsEditing(false);

      console.log("Assignment saved successfully:", response.data);
    } catch (err) {
      console.error("Error saving assignment:", err);

      // Handle API error response
      let errorMessage = "Failed to save assignment";

      if (err.response?.data) {
        const errorData = err.response.data;

        // Handle field-specific errors
        if (errorData.due_date) {
          const dueDateErrors = Array.isArray(errorData.due_date)
            ? errorData.due_date.join(", ")
            : errorData.due_date;
          errorMessage = `Due date error: ${dueDateErrors}`;
        } else if (errorData.title) {
          const titleErrors = Array.isArray(errorData.title)
            ? errorData.title.join(", ")
            : errorData.title;
          errorMessage = `Title error: ${titleErrors}`;
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.non_field_errors) {
          const nonFieldErrors = Array.isArray(errorData.non_field_errors)
            ? errorData.non_field_errors.join(", ")
            : errorData.non_field_errors;
          errorMessage = nonFieldErrors;
        } else {
          // Handle other validation errors
          const errorMessages = Object.entries(errorData)
            .map(([field, errors]) => {
              const errorList = Array.isArray(errors)
                ? errors.join(", ")
                : errors;
              return `${field}: ${errorList}`;
            })
            .join("; ");
          errorMessage = errorMessages || "Unknown error occurred";
        }
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
    }
  };

  const handleDeleteAssignment = async (assignmentId) => {
    try {
      await apiClient.delete(`/teachers/assignments/${assignmentId}/`);
      setAssignments((prev) =>
        prev.filter((assignment) => assignment.id !== assignmentId)
      );
      setIsDialogOpen(false);
      setAssignmentToDelete(null);
      setError(null);

      console.log("Assignment deleted successfully");
    } catch (err) {
      console.error("Error deleting assignment:", err);
      let errorMessage = "Failed to delete assignment";

      if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.response?.status === 403) {
        errorMessage = "You don't have permission to delete this assignment";
      } else if (err.response?.status === 404) {
        errorMessage = "Assignment not found";
      }

      setError(errorMessage);
    }
  };

  const handleOpenDeleteDialog = (assignment) => {
    setAssignmentToDelete(assignment);
    setIsDialogOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAssignment(null);
    setIsEditing(false);
    setError(null); // Clear error when closing modal
  };

  if (loading) {
    return (
      <section className="">
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h1 className="text-black text-xl md:text-3xl font-bold">
            Assignment
          </h1>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600 flex flex-col items-center space-y-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <div>Loading assignments...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-black text-xl md:text-3xl font-bold">Assignment</h1>
        <Button
          onClick={handleCreateAssignment}
          className="bg-black text-white px-4 py-2 rounded-md gap-2 cursor-pointer hover:bg-gray-900"
        >
          <Plus className="size-4" />
          Create Assignment
        </Button>
      </div>

      {/* Display error message */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
          <div className="font-medium">Error</div>
          <div>{error}</div>
        </div>
      )}

      {assignments.length === 0 ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-lg text-gray-600 text-center">
            <div>No assignments found</div>
            <div className="text-sm mt-2 text-gray-500">
              Create your first assignment to get started
            </div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {assignments.map((assignment) => (
            <Card
              key={assignment.id}
              className="w-full max-w-md mx-auto bg-blue-50 shadow-lg rounded-lg overflow-hidden py-0 border border-gray-300"
            >
              <CardHeader className="bg-blue-500 text-white p-4">
                <CardTitle className="text-2xl font-bold">
                  {assignment.title}
                </CardTitle>
                <div className="flex justify-between items-center">
                  <CardDescription className="text-blue-300 text-base">
                    {getEssayTypeDisplay(assignment.essay_type)}
                  </CardDescription>
                  <CardDescription className="text-right text-blue-300 text-base">
                    {assignment.teacher?.full_name || "N/A"}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="px-4 py-0">
                <p className="text-gray-700 mb-2 line-clamp-3">
                  {assignment.description || "No description provided"}
                </p>
                <div className="flex justify-between text-sm text-gray-500 mt-6">
                  <div>
                    <span className="font-semibold">Due Date</span>
                    <p
                      className={`${
                        new Date(assignment.due_date) < new Date()
                          ? "text-red-600"
                          : "text-gray-700"
                      }`}
                    >
                      {formatDate(assignment.due_date)}
                    </p>
                  </div>
                  <div>
                    <span className="font-semibold">Created At</span>
                    <p>{formatDate(assignment.created_at)}</p>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="p-2 bg-gray-50 flex justify-between items-center mx-4 mb-4 rounded-2xl">
                <div className="text-base text-gray-600">
                  <Link
                    to={`/assignment/submitted-assignments/${assignment.id}`}
                    className="cursor-pointer hover:text-blue-600 transition-colors"
                  >
                    {assignment.submissions_count || 0} Submission
                    {(assignment.submissions_count || 0) !== 1 ? "s" : ""}
                  </Link>
                </div>
                <span className="text-gray-400">|</span>
                <div className="text-base text-gray-600">
                  {getReviewedCount(assignment)} Reviewed
                </div>
                <div className="flex space-x-2">
                  <Button
                    onClick={() => handleEditAssignment(assignment)}
                    className="text-blue-600 hover:text-blue-800 bg-white hover:bg-gray-50 border-none p-2"
                    size="sm"
                  >
                    <PenLine className="text-black size-5" />
                  </Button>
                  <Button
                    onClick={() => handleOpenDeleteDialog(assignment)}
                    className="bg-white hover:bg-gray-50 border-none p-2"
                    size="sm"
                  >
                    <Trash2 className="text-red-600 hover:text-red-800 size-5" />
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-red-400">Confirm Delete</DialogTitle>
            <DialogDescription className="text-gray-600">
              Are you sure you want to delete the assignment{" "}
              <span className="font-semibold text-red-400">
                &quot;{assignmentToDelete?.title}&quot;
              </span>
              ? This action cannot be undone and will also delete all associated
              submissions.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="hover:bg-gray-100"
            >
              Cancel
            </Button>
            <Button
              variant="outline"
              className="bg-red-500 text-white hover:bg-red-600"
              onClick={() => handleDeleteAssignment(assignmentToDelete?.id)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <TeacherAssignmentModal
        isOpen={isModalOpen}
        onClose={closeModal}
        assignment={editingAssignment}
        onSave={handleSaveAssignment}
        isEditing={isEditing}
        error={error}
      />
    </section>
  );
};

export default TeacherAssignment;
