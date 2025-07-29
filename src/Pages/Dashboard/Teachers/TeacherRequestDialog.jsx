/** @format */

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
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

const TeacherRequestDialog = ({
  isOpen,
  onClose,
  teachers,
  onAccept,
  onAcceptAll,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  // Filter teachers based on search term (case-insensitive)
  const filteredTeachers = teachers.filter((teacher) =>
    [teacher.teacherName, teacher.email].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose} className="bg-white">
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Teacher Requests</DialogTitle>
          <Input
            type="text"
            placeholder="Search Teacher by Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 mt-3"
          />
        </DialogHeader>
        <div className="">
          {filteredTeachers.length === 0 ? (
            <p className="text-gray-500">
              {searchTerm
                ? "No teachers match your search."
                : "No pending teacher requests."}
            </p>
          ) : (
            <div className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow className="bg-white rounded-5xl border-0">
                    <TableHead className="p-2">Teacher Name</TableHead>
                    <TableHead className="text-center">Assignments</TableHead>
                    <TableHead className="text-center">Reviewed</TableHead>
                    <TableHead className="text-center">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredTeachers.map((item, index) => (
                    <TableRow key={index} className="border-0">
                      <TableCell className="py-3">
                        {item.teacherName}
                        <div className="text-gray-500 text-sm">
                          {item.email}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        {item.assignments}
                      </TableCell>
                      <TableCell className="text-center">
                        {item.reviewed}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          className="bg-blue-500 text-white hover:bg-blue-600"
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
            className="border-gray-300"
            onClick={onClose}
          >
            Cancel
          </Button>
          {filteredTeachers.length > 0 && (
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600"
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

TeacherRequestDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  teachers: PropTypes.arrayOf(
    PropTypes.shape({
      teacherName: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      assignments: PropTypes.number,
      reviewed: PropTypes.number,
      action: PropTypes.string,
    })
  ).isRequired,
  onAccept: PropTypes.func.isRequired,
  onAcceptAll: PropTypes.func.isRequired,
};

export default TeacherRequestDialog;
