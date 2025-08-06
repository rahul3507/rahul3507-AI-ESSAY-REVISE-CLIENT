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
import ProfileDialog from "../Teachers/ProfileDialog";

const StudentRequestDialog = ({
  isOpen,
  onClose,
  students,

  onAcceptAll,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStudents, setSelectedStudents] = useState(new Set());

  // Filter students based on search term (case-insensitive)
  const filteredStudents = students.filter((student) =>
    [student.name, student.email].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
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

  // Handle accepting all selected students
  const handleAcceptSelected = () => {
    onAcceptAll([...selectedStudents]);
    setSelectedStudents(new Set()); // Clear selections after accepting
  };

  // Determine score cell styling based on score value
  const getScoreStyles = (score) => {
    if (score < 40) {
      return "bg-red-400 text-red-900";
    } else if (score >= 40 && score <= 69) {
      return "bg-[#FF880033] text-[#D47305]";
    } else {
      return "bg-[#34C72433] text-[#238B17]";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="bg-white">
      <DialogContent className="bg-white max-w-[90vw] sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Student Requests</DialogTitle>
          <Input
            type="text"
            placeholder="Search Student by Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 mt-3"
          />
        </DialogHeader>
        <DialogDescription>
          <div className="overflow-x-auto">
            {filteredStudents.length === 0 ? (
              <p className="text-gray-500">
                {searchTerm
                  ? "No students match your search."
                  : "No pending student requests."}
              </p>
            ) : (
              <div className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-white rounded-5xl border-0">
                      <TableHead className="p-2 w-12">
                        <input
                          type="checkbox"
                          checked={
                            selectedStudents.size === filteredStudents.length
                          }
                          onChange={() => {
                            if (
                              selectedStudents.size === filteredStudents.length
                            ) {
                              setSelectedStudents(new Set());
                            } else {
                              setSelectedStudents(
                                new Set(
                                  filteredStudents.map(
                                    (student) => student.email
                                  )
                                )
                              );
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead className="p-2">Student Name</TableHead>
                      <TableHead className="text-center">Score</TableHead>
                      <TableHead className="text-center">Essay</TableHead>
                      <TableHead className="text-center">Profile</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.map((item, index) => (
                      <TableRow key={index} className="border-0">
                        <TableCell className="py-3 w-12">
                          <input
                            type="checkbox"
                            checked={selectedStudents.has(item.email)}
                            onChange={() => handleCheckboxChange(item.email)}
                          />
                        </TableCell>
                        <TableCell className="py-3">
                          {item.name}
                          <div className="text-gray-500 text-sm">
                            {item.email}
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <span
                            className={`text-center rounded-full px-3 py-1 ${getScoreStyles(
                              item.score
                            )}`}
                          >
                            {item.score}
                          </span>
                        </TableCell>
                        <TableCell className="text-center">
                          {item.essay}
                        </TableCell>
                        <TableCell className="text-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button className="bg-gray-200 text-black hover:bg-gray-200 cursor-pointer">
                                <Eye />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white rounded-lg">
                              <ProfileDialog teacher={item} />
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
          <div className="mt-6 flex justify-between">
            <Button
              variant="outline"
              className="border-gray-300 cursor-pointer"
              onClick={onClose}
            >
              Cancel
            </Button>

            <Button
              className="bg-black text-white hover:bg-gray-900 cursor-pointer"
              onClick={handleAcceptSelected}
            >
              Asign Student
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
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      score: PropTypes.number,
      essay: PropTypes.number,
      assignDate: PropTypes.string,
    })
  ).isRequired,
  onAccept: PropTypes.func.isRequired,
  onAcceptAll: PropTypes.func.isRequired,
};

export default StudentRequestDialog;
