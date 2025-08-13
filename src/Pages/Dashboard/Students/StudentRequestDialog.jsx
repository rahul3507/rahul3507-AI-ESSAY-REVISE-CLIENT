/** @format */

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Button } from "../../../components/ui/button";
import PropTypes from "prop-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { useState } from "react";
import { Eye } from "lucide-react";
import ProfileDialog from "./ProfileDialog";

const StudentRequestDialog = ({
  isOpen,
  onClose,
  students,
  onAssignStudents,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState(new Set());
  const [loading, setLoading] = useState(false);

  // Filter students based on search term (case-insensitive)
  const filteredStudents = students.filter((student) =>
    [
      `${student.first_name} ${student.last_name}`,
      student.email,
      student.profile?.first_name,
      student.profile?.last_name,
    ].some((field) => field?.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  // Handle checkbox toggle for a student
  const handleCheckboxChange = (email) => {
    setSelectedStudents((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(email)) {
        newSet.delete(email);
      } else {
        newSet.add(email);
      }
      return newSet;
    });
  };

  // Handle selecting/deselecting all students
  const handleSelectAll = () => {
    if (selectedStudents.size === filteredStudents.length) {
      setSelectedStudents(new Set());
    } else {
      setSelectedStudents(
        new Set(filteredStudents.map((student) => student.email))
      );
    }
  };

  // Handle assigning selected students
  const handleAssignSelected = async () => {
    if (selectedStudents.size === 0) return;

    setLoading(true);
    try {
      await onAssignStudents([...selectedStudents]);
      setSelectedStudents(new Set()); // Clear selections after successful assignment
      setSearchTerm(""); // Clear search term
    } catch (error) {
      console.error("Error in assignment:", error);
    } finally {
      setLoading(false);
    }
  };

  // Reset state when dialog closes
  const handleClose = () => {
    setSelectedStudents(new Set());
    setSearchTerm("");
    onClose();
  };

  // Format date helper
  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  // Get student display name
  const getStudentName = (student) => {
    if (student.first_name && student.last_name) {
      return `${student.first_name} ${student.last_name}`;
    }
    if (student.profile?.first_name && student.profile?.last_name) {
      return `${student.profile.first_name} ${student.profile.last_name}`;
    }
    return student.email.split("@")[0]; // Fallback to email username
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose} className="bg-white">
      <DialogContent className="bg-white max-w-[90vw] sm:max-w-[800px] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Available Students</DialogTitle>
          <div className="flex gap-2 mt-3">
            <Input
              type="text"
              placeholder="Search Student by Name or Email"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />
            <Button
              onClick={handleSelectAll}
              variant="outline"
              className="whitespace-nowrap"
            >
              {selectedStudents.size === filteredStudents.length
                ? "Deselect All"
                : "Select All"}
            </Button>
          </div>
          {selectedStudents.size > 0 && (
            <div className="text-sm text-blue-600 mt-2">
              {selectedStudents.size} student(s) selected
            </div>
          )}
        </DialogHeader>
        <DialogDescription className="overflow-hidden">
          <div className="overflow-y-auto max-h-[50vh]">
            {filteredStudents.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-500">
                  {searchTerm
                    ? "No students match your search."
                    : "No available students to assign."}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-white rounded-5xl border-0">
                      <TableHead className="p-2 w-12">
                        <input
                          type="checkbox"
                          checked={
                            selectedStudents.size === filteredStudents.length &&
                            filteredStudents.length > 0
                          }
                          onChange={handleSelectAll}
                          className="cursor-pointer"
                        />
                      </TableHead>
                      <TableHead className="p-2">Student Name</TableHead>
                      <TableHead className="text-center">
                        Total Essays
                      </TableHead>
                      <TableHead className="text-center">Join Date</TableHead>
                      <TableHead className="text-center">Profile</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((student, index) => (
                      <TableRow key={student.id || index} className="border-0">
                        <TableCell className="py-3 w-12">
                          <input
                            type="checkbox"
                            checked={selectedStudents.has(student.email)}
                            onChange={() => handleCheckboxChange(student.email)}
                            className="cursor-pointer"
                          />
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="font-medium">
                            {getStudentName(student)}
                          </div>
                          <div className="text-gray-500 text-sm">
                            {student.email}
                          </div>
                          {student.profile?.phone_number && (
                            <div className="text-gray-400 text-xs">
                              {student.profile.phone_number}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
                            {student.total_essays || 0}
                          </span>
                        </TableCell>
                        <TableCell className="text-center text-sm">
                          {formatDate(
                            student.date_joined || student.profile?.joined_date
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="bg-gray-200 text-black hover:bg-gray-300 cursor-pointer text-sm">
                                <Eye size={16} />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white rounded-lg">
                              <ProfileDialog teacher={student} />
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-between items-center border-t pt-4">
            <Button
              variant="outline"
              className="border-gray-300 cursor-pointer"
              onClick={handleClose}
              disabled={loading}
            >
              Cancel
            </Button>

            <Button
              className="bg-black text-white hover:bg-gray-900 cursor-pointer"
              onClick={handleAssignSelected}
              disabled={selectedStudents.size === 0 || loading}
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Assigning...
                </>
              ) : (
                `Assign ${selectedStudents.size} Student${
                  selectedStudents.size !== 1 ? "s" : ""
                }`
              )}
            </Button>
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

StudentRequestDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  students: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      email: PropTypes.string.isRequired,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      total_essays: PropTypes.number,
      date_joined: PropTypes.string,
      profile: PropTypes.object,
    })
  ).isRequired,
  onAssignStudents: PropTypes.func.isRequired,
};

export default StudentRequestDialog;
