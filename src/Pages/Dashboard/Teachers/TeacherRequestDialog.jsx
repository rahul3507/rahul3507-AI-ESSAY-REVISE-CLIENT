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
import { Eye, Check, X } from "lucide-react";
import ProfileDialog from "./ProfileDialog";

const TeacherRequestDialog = ({
  isOpen,
  onClose,
  teachers,
  onAccept,
  onAcceptAll,
  onReject,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [processingIds, setProcessingIds] = useState(new Set());

  // Filter teachers based on search term (case-insensitive)
  const filteredTeachers = teachers.filter((teacher) =>
    [teacher.name, teacher.email].some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  // Handle individual accept with loading state
  const handleAcceptClick = async (relationId) => {
    setProcessingIds((prev) => new Set([...prev, relationId]));
    try {
      await onAccept(relationId);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(relationId);
        return newSet;
      });
    }
  };

  // Handle individual reject with loading state
  const handleRejectClick = async (relationId) => {
    setProcessingIds((prev) => new Set([...prev, relationId]));
    try {
      await onReject(relationId);
    } finally {
      setProcessingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(relationId);
        return newSet;
      });
    }
  };

  // Handle accept all with loading state
  const [acceptingAll, setAcceptingAll] = useState(false);
  const handleAcceptAllClick = async () => {
    setAcceptingAll(true);
    try {
      await onAcceptAll();
    } finally {
      setAcceptingAll(false);
    }
  };
  // Get full profile image URL - Fixed CORS issue
  const getProfileImageUrl = (profileImg) => {
    if (!profileImg) return "/default-avatar.png"; // Use local default image instead of external service

    // If it's already a full URL, return as is
    if (profileImg.startsWith("http")) return profileImg;

    // If it's a relative path, construct the full URL
    // Using environment variable with fallback to match your backend IP
    const baseUrl =
      import.meta.env.VITE_API_BASE_URL || "http://10.10.12.15:8000";
    return `${baseUrl}${profileImg}`;
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-[90vw] sm:max-w-[800px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Teacher Requests ({teachers.length})</DialogTitle>
          <Input
            type="text"
            placeholder="Search Teacher by Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/2 mt-3"
          />
        </DialogHeader>

        <div className="overflow-auto flex-1">
          {filteredTeachers.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">
                {searchTerm
                  ? "No teachers match your search."
                  : "No pending teacher requests."}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-white rounded-5xl border-0">
                      <TableHead className="p-2">Teacher Info</TableHead>
                      <TableHead className="text-center">Contact</TableHead>
                      <TableHead className="text-center">Status</TableHead>
                      <TableHead className="text-center">Profile</TableHead>
                      <TableHead className="text-center">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTeachers.map((teacher) => (
                      <TableRow key={teacher.relationId} className="border-0">
                        <TableCell className="py-3">
                          <div className="flex items-center gap-3">
                            <div className="relative w-10 h-10">
                              <img
                                src={getProfileImageUrl(teacher.profileImg)}
                                alt="Profile"
                                crossOrigin="anonymous"
                                className="w-full h-full rounded-full object-cover bg-gray-200"
                              />
                            </div>
                            <div>
                              <div className="font-medium">{teacher.name}</div>
                              <div className="text-gray-500 text-sm">
                                {teacher.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="text-sm">
                            <div>{teacher.phoneNumber || "N/A"}</div>
                            <div className="text-gray-500 text-xs mt-1">
                              {teacher.address || "No address"}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="space-y-1">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                teacher.isVerified
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {teacher.isVerified ? "Verified" : "Not Verified"}
                            </span>
                            <div className="text-xs text-gray-500">
                              Requested:{" "}
                              {new Date(teacher.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                size="sm"
                                className="bg-gray-200 text-black hover:bg-gray-300 cursor-pointer"
                              >
                                <Eye className="w-4 h-4" />
                                View
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="bg-white rounded-lg">
                              <ProfileDialog teacher={teacher} />
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex gap-2 justify-center">
                            <Button
                              size="sm"
                              className="bg-green-500 text-white hover:bg-green-600 cursor-pointer"
                              onClick={() =>
                                handleAcceptClick(teacher.relationId)
                              }
                              disabled={processingIds.has(teacher.relationId)}
                            >
                              {processingIds.has(teacher.relationId) ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <Check className="w-4 h-4" />
                              )}
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              className="bg-red-500 text-white hover:bg-red-600 cursor-pointer"
                              onClick={() =>
                                handleRejectClick(teacher.relationId)
                              }
                              disabled={processingIds.has(teacher.relationId)}
                            >
                              {processingIds.has(teacher.relationId) ? (
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                              ) : (
                                <X className="w-4 h-4" />
                              )}
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-between border-t pt-4">
          <Button
            variant="outline"
            className="border-gray-300 cursor-pointer"
            onClick={onClose}
          >
            Close
          </Button>
          {filteredTeachers.length > 0 && (
            <Button
              className="bg-blue-500 text-white hover:bg-blue-600 cursor-pointer"
              onClick={handleAcceptAllClick}
              disabled={acceptingAll}
            >
              {acceptingAll ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  Processing...
                </>
              ) : (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Accept All ({filteredTeachers.length})
                </>
              )}
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
      relationId: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phoneNumber: PropTypes.string,
      address: PropTypes.string,
      profileImg: PropTypes.string,
      isVerified: PropTypes.bool,
      createdAt: PropTypes.string,
    })
  ).isRequired,
  onAccept: PropTypes.func.isRequired,
  onAcceptAll: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default TeacherRequestDialog;
