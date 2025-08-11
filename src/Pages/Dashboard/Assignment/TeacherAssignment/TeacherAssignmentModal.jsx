/** @format */

import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../../../components/ui/dialog";
import { Button } from "../../../../components/ui/button";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Textarea } from "../../../../components/ui/textarea";
import useLoggedUser from "../../../../components/hook/useLoggedUser";
import apiClient from "../../../../lib/api-client";

const TeacherAssignmentModal = ({
  isOpen,
  onClose,
  assignment,
  onSave,
  isEditing,
}) => {
  const { user, loading } = useLoggedUser([]);
  const teacherName =
    user?.user_profile?.first_name + " " + user?.user_profile?.last_name ||
    "N/A";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [error, setError] = useState(null);

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format date from "Aug 10, 2025" to "2025-08-10"
  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "";
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    } catch {
      return "";
    }
  };

  // Format date from "2025-08-10" to "Aug 10, 2025"
  const formatDateForDisplay = (dateString) => {
    if (!dateString) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return dateString;
    }
  };

  // Update form data when assignment prop changes (for editing)
  useEffect(() => {
    if (isEditing && assignment) {
      setFormData({
        title: assignment.title || "",
        description: assignment.description || "",
        dueDate: formatDateForInput(assignment.dueDate) || "",
      });
    } else {
      // Reset form for new assignment
      setFormData({
        title: "",
        description: "",
        dueDate: "",
      });
    }
    setError(null); // Reset error on modal open/close
  }, [isEditing, assignment, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError(null); // Clear error on input change
  };

  const handleSubmit = async () => {
    if (!formData.title.trim() || !formData.dueDate) {
      setError("Please fill in all required fields (Title and Due Date).");
      return;
    }

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        due_date: formData.dueDate, // Send as YYYY-MM-DD
      };

      const response = isEditing
        ? await apiClient.put(`/core/assignments/${assignment.id}/`, payload)
        : await apiClient.post("/core/assignments/", payload);

      const newAssignment = {
        ...response.data,
        dueDate: formatDateForDisplay(response.data.due_date),
        issueDate: formatDateForDisplay(getCurrentDate()),
        submission: assignment?.submission || 0,
        reviewed: assignment?.reviewed || 0,
      };

      onSave(newAssignment);
      onClose();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
          "Failed to save assignment. Please try again."
      );
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      dueDate: "",
    });
    setError(null);
  };

  const handleClose = () => {
    onClose();
    if (!isEditing) {
      resetForm();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} className="bg-white">
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            {isEditing ? "Edit Assignment" : "Create New Assignment"}
          </DialogTitle>
          <DialogDescription className="text-gray-600">
            {isEditing
              ? "Make changes to your assignment here."
              : "Fill in the details to create a new assignment. The essay type will be auto-detected by AI."}
          </DialogDescription>
        </DialogHeader>

        {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right font-semibold">
              Title <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="col-span-3"
              placeholder="Enter assignment title"
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-semibold">
              Teacher <span className="text-red-500">*</span>
            </Label>
            <div className="col-span-3 text-sm text-gray-600 py-2">
              {loading ? "Loading..." : teacherName}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right font-semibold">
              Due Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              className="col-span-3"
              min={getCurrentDate()}
            />
          </div>

          <div className="grid grid-cols-4 items-start gap-4">
            <Label
              htmlFor="description"
              className="text-right font-semibold pt-2"
            >
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              className="col-span-3"
              placeholder="Enter assignment description"
              rows={3}
            />
          </div>

          {!isEditing && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-semibold text-gray-500">
                Issue Date
              </Label>
              <div className="col-span-3 text-sm text-gray-600 py-2">
                Will be set to today: {formatDateForDisplay(getCurrentDate())}
              </div>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="mr-2"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isEditing ? "Save Changes" : "Create Assignment"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

// Prop type validation
TeacherAssignmentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  assignment: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    dueDate: PropTypes.string,
    submission: PropTypes.number,
    reviewed: PropTypes.number,
  }),
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default TeacherAssignmentModal;
