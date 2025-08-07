/** @format */

import { useState } from "react";
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

const initialAssignments = [
  {
    id: 1,
    title: "Climate Change Argument",
    name: "Dr. Sarah Johnson",
    type: "Argumentative",
    issueDate: "Aug 10, 2025",
    dueDate: "Aug 15, 2025",
    submission: 1,
    reviewed: 1,
    description: "Write a persuasive essay about climate change solutions",
  },
  {
    id: 2,
    title: "Literary Analysis",
    name: "Prof. Michael Brown",
    type: "Analytical",
    issueDate: "Aug 12, 2025",
    dueDate: "Aug 20, 2025",
    submission: 2,
    reviewed: 0,
    description: "Analyze themes in Shakespeare's Hamlet",
  },
  {
    id: 3,
    title: "Scientific Method Report",
    name: "Dr. Emily Chen",
    type: "Research",
    issueDate: "Aug 8, 2025",
    dueDate: "Aug 18, 2025",
    submission: 0,
    reviewed: 0,
    description: "Document an experiment using the scientific method",
  },
  {
    id: 4,
    title: "Historical Essay",
    name: "Prof. James Wilson",
    type: "Expository",
    issueDate: "Aug 11, 2025",
    dueDate: "Aug 17, 2025",
    submission: 3,
    reviewed: 2,
    description: "Discuss the impact of the Industrial Revolution",
  },
];

const TeacherAssignment = () => {
  const [assignments, setAssignments] = useState(initialAssignments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [assignmentToDelete, setAssignmentToDelete] = useState(null);

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

  const handleSaveAssignment = (assignmentData) => {
    if (isEditing) {
      setAssignments((prev) =>
        prev.map((assignment) =>
          assignment.id === assignmentData.id ? assignmentData : assignment
        )
      );
    } else {
      setAssignments((prev) => [...prev, assignmentData]);
    }
  };

  const handleDeleteAssignment = (assignmentId) => {
    setAssignments((prev) =>
      prev.filter((assignment) => assignment.id !== assignmentId)
    );
    setIsDialogOpen(false);
    setAssignmentToDelete(null);
  };

  const handleOpenDeleteDialog = (assignment) => {
    setAssignmentToDelete(assignment);
    setIsDialogOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingAssignment(null);
    setIsEditing(false);
  };

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
                  {assignment.type}
                </CardDescription>
                <CardDescription className="text-right text-blue-300 text-base">
                  {assignment.name}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="px-4 py-0">
              <p className="text-gray-700 mb-2">{assignment.description}</p>
              <div className="flex justify-between text-sm text-gray-500 mt-6">
                <div>
                  <span className="font-semibold">Due Date</span>
                  <p>{assignment.dueDate}</p>
                </div>
                <div>
                  <span className="font-semibold">Issue date</span>
                  <p>{assignment.issueDate}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="p-2 bg-gray-50 flex justify-between items-center mx-4 mb-4 rounded-2xl">
              <div className="text-base text-gray-600">
                <Link
                  to="/assignment/submitted-assignments"
                  className="cursor-pointer"
                >
                  {assignment.submission} Submission
                </Link>
              </div>
              <span>|</span>
              <div className="text-base text-gray-600">
                <button>
                  {assignment.reviewed} {""}
                  reviewed
                </button>
              </div>
              <div className="flex space-x-2">
                <Button
                  onClick={() => handleEditAssignment(assignment)}
                  className="text-blue-600 hover:text-blue-800 bg-white hover:bg-gray-50"
                >
                  <PenLine className="text-black size-5" />
                </Button>
                <Button
                  onClick={() => handleOpenDeleteDialog(assignment)}
                  className="bg-white hover:bg-gray-50 border-none"
                >
                  <Trash2 className="text-red-600 hover:text-red-800 size-5" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto bg-white">
          <DialogHeader>
            <DialogTitle className="text-red-400">Confirm Delete</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete the assignment{" "}
              <span className="font-semibold text-red-400">
                {assignmentToDelete?.title}
              </span>
              ? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
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
      />
    </section>
  );
};

export default TeacherAssignment;
