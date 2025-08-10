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
    name: teacherName,
    type: "",
    dueDate: "",
    description: "",
  });

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
        name: teacherName,
        type: assignment.type || "",
        dueDate: formatDateForInput(assignment.dueDate) || "",
        description: assignment.description || "",
      });
    } else {
      // Reset form for new assignment
      setFormData({
        title: "",
        name: teacherName,
        type: "",
        dueDate: "",
        description: "",
      });
    }
  }, [isEditing, assignment, isOpen, teacherName]);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (
      !formData.title.trim() ||
      !formData.name.trim() ||
      !formData.type ||
      !formData.dueDate
    ) {
      alert("Please fill in all required fields");
      return;
    }

    const currentDate = getCurrentDate();
    const issueDate = formatDateForDisplay(currentDate);
    const dueDate = formatDateForDisplay(formData.dueDate);

    const newAssignment = {
      ...formData,
      id: assignment?.id || Date.now(),
      issueDate: issueDate,
      dueDate: dueDate,
      submission: assignment?.submission || 0,
      reviewed: assignment?.reviewed || 0,
    };

    onSave(newAssignment);
    onClose();
  };

  const resetForm = () => {
    setFormData({
      title: "",
      name: teacherName,
      type: "",
      dueDate: "",
      description: "",
    });
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
              : "Fill in the details to create a new assignment. Issue date will be set to today."}
          </DialogDescription>
        </DialogHeader>

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

          {/* <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="type" className="text-right font-semibold">
              Type <span className="text-red-500">*</span>
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) => handleInputChange("type", value)}
            >
              <SelectTrigger className="col-span-3  w-full cursor-pointer">
                <SelectValue placeholder="Select assignment type" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Argumentative " className="cursor-pointer">
                  Argumentative
                </SelectItem>
                <SelectItem value="Analytical" className="cursor-pointer">
                  Analytical
                </SelectItem>
                <SelectItem value="Research" className="cursor-pointer">
                  Research
                </SelectItem>
                <SelectItem value="Expository" className="cursor-pointer">
                  Expository
                </SelectItem>
                <SelectItem value="Narrative" className="cursor-pointer">
                  Narrative
                </SelectItem>
                <SelectItem value="Creative" className="cursor-pointer">
                  Creative
                </SelectItem>
              </SelectContent>
            </Select>
          </div> */}

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

          {/* {!isEditing && (
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right font-semibold text-gray-500">
                Issue Date
              </Label>
              <div className="col-span-3 text-sm text-gray-600 py-2">
                Will be set to today: {formatDateForDisplay(getCurrentDate())}
              </div>
            </div>
          )} */}
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
    name: PropTypes.string,
    type: PropTypes.string,
    dueDate: PropTypes.string,
    description: PropTypes.string,
    submission: PropTypes.number,
    reviewed: PropTypes.number,
  }),
  onSave: PropTypes.func.isRequired,
  isEditing: PropTypes.bool.isRequired,
};

export default TeacherAssignmentModal;
