/** @format */

import {
  Dialog,
  DialogContent,
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
  onAccept,
  onAcceptAll,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter students based on search term (case-insensitive)
  const filteredStudents = students.filter((student) =>
    [student.name, student.email].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

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
                    <TableHead className="p-2">Student Name</TableHead>
                    <TableHead className="text-center">Score</TableHead>
                    <TableHead className="text-center">Reviewed</TableHead>
                    <TableHead className="text-center">Profile</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.map((item, index) => (
                    <TableRow key={index} className="border-0">
                      <TableCell className="py-3">
                        {item.name}
                        <div className="text-gray-500 text-sm">
                          {item.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.score}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.reviewed}
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
                      <TableCell className="text-center">
                        <Button
                          className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
                          onClick={() => onAccept(item.email)}
                        >
                          Accept
                        </Button>
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
          {filteredStudents.length > 0 && (
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              onClick={onAcceptAll}
            >
              Accept All
            </Button>
          )}
        </div>
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
      reviewed: PropTypes.number,
    })
  ).isRequired,
  onAccept: PropTypes.func.isRequired,
  onAcceptAll: PropTypes.func.isRequired,
};

export default StudentRequestDialog;
