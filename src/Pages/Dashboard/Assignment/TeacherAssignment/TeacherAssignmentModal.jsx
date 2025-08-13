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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import useLoggedUser from "../../../../components/hook/useLoggedUser";

const ESSAY_TYPES = [
  { value: "argumentative", label: "Argumentative Essay" },
  { value: "narrative", label: "Narrative Essay" },
  { value: "literary_analysis", label: "Literary Analysis" },
  { value: "expository", label: "Expository Essay" },
  { value: "descriptive", label: "Descriptive Essay" },
  { value: "compare_contrast", label: "Compare/Contrast Essay" },
];

const TeacherAssignmentModal = ({
  isOpen,
  onClose,
  assignment,
  onSave,
  isEditing,
  error,
}) => {
  const { user, loading } = useLoggedUser([]);
  const teacherName =
    user?.user_profile?.first_name && user?.user_profile?.last_name
      ? `${user.user_profile.first_name} ${user.user_profile.last_name}`
      : user?.email || "N/A";

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    due_date: "",
    essay_type: "argumentative",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get current date in YYYY-MM-DD format
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Format date from ISO string to YYYY-MM-DD format for input
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

  // Update form data when assignment prop changes (for editing)
  useEffect(() => {
    if (isEditing && assignment) {
      setFormData({
        title: assignment.title || "",
        description: assignment.description || "",
        due_date: formatDateForInput(assignment.due_date) || "",
        essay_type: assignment.essay_type || "argumentative",
      });
    } else {
      setFormData({
        title: "",
        description: "",
        due_date: "",
        essay_type: "argumentative",
      });
    }
  }, [isEditing, assignment, isOpen]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      return "Title is required";
    }
    if (!formData.due_date) {
      return "Due date is required";
    }
    if (!formData.essay_type) {
      return "Essay type is required";
    }

    // Validate due date is not in the past
    const dueDate = new Date(formData.due_date);
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day

    if (dueDate < today) {
      return "Due date cannot be in the past";
    }

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      return; // Let the parent component handle error display
    }

    setIsSubmitting(true);

    try {
      // Prepare the data in the format expected by the API
      const assignmentData = {
        id: assignment?.id, // Include ID for editing
        title: formData.title.trim(),
        description: formData.description.trim(),
        due_date: formData.due_date, // Keep in YYYY-MM-DD format
        essay_type: formData.essay_type,
      };

      await onSave(assignmentData);
      // Modal will be closed by parent component after successful save
    } catch (err) {
      // Error handling is done in parent component
      console.error("Error in modal submit:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      due_date: "",
      essay_type: "argumentative",
    });
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
      if (!isEditing) {
        resetForm();
      }
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
              : "Fill in the details to create a new assignment."}
          </DialogDescription>
        </DialogHeader>

        {/* Display validation errors or API errors */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

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
              disabled={isSubmitting}
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right font-semibold">Teacher</Label>
            <div className="col-span-3 text-sm text-gray-600 py-2">
              {loading ? "Loading..." : teacherName}
            </div>
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="essayType" className="text-right font-semibold">
              Essay Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.essay_type}
              onValueChange={(value) => handleInputChange("essay_type", value)}
              disabled={isSubmitting}
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select essay type" />
              </SelectTrigger>
              <SelectContent className={`bg-white`}>
                {ESSAY_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right font-semibold">
              Issue Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.created_at}
              onChange={(e) => handleInputChange("created_at", e.target.value)}
              className="col-span-3"
              min={getCurrentDate()}
              disabled={isSubmitting}
            />
          </div> */}

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="dueDate" className="text-right font-semibold">
              Due Date <span className="text-red-500">*</span>
            </Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.due_date}
              onChange={(e) => handleInputChange("due_date", e.target.value)}
              className="col-span-3"
              min={getCurrentDate()}
              disabled={isSubmitting}
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
              disabled={isSubmitting}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="mr-2"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit}
            className="bg-blue-600 hover:bg-blue-700 text-white"
            disabled={
              isSubmitting || !formData.title.trim() || !formData.due_date
            }
          >
            {isSubmitting
              ? isEditing
                ? "Saving..."
                : "Creating..."
              : isEditing
              ? "Save Changes"
              : "Create Assignment"}
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
    due_date: PropTypes.string,
    essay_type: PropTypes.string,
    submissions_count: PropTypes.number,
  }),
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export default TeacherAssignmentModal;
