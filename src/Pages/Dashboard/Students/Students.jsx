/** @format */

import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { VscSettings } from "react-icons/vsc";
import StudentRequestDialog from "./StudentRequestDialog";
import { Eye } from "lucide-react";
import ProfileDialog from "./ProfileDialog";
import apiClient from "../../../lib/api-client";

const Students = () => {
  const [assignedStudents, setAssignedStudents] = useState([]);
  const [availableStudents, setAvailableStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("normal");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assigned students and transform the data
  const fetchAssignedStudents = async () => {
    try {
      const response = await apiClient.get("/teachers/my-students/");
      // Transform the API response to match the expected structure for ProfileDialog
      const transformedData = response.data.map((item) => ({
        id: item.student.id,
        profileImg: item.student_profile.profile_picture,
        name: `${item.student.first_name} ${item.student.last_name}`,
        email: item.student.email,
        phoneNumber: item.student_profile.phone_number,
        address: item.student_profile.address,
        role: item.student.role,
        isVerified: item.student.is_verified,
        joinedDate: item.student_profile.joined_date,
        total_essays: item.total_essays,
        average_score: item.average_score,
      }));
      setAssignedStudents(transformedData);
    } catch (err) {
      console.error("Error fetching assigned students:", err);
      setError("Failed to fetch assigned students");
    }
  };

  // Fetch available students
  const fetchAvailableStudents = async () => {
    try {
      const response = await apiClient.get("/teachers/students/available/");
      setAvailableStudents(response.data);
    } catch (err) {
      console.error("Error fetching available students:", err);
      setError("Failed to fetch available students");
    }
  };

  // Initial data fetch
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      await Promise.all([fetchAssignedStudents(), fetchAvailableStudents()]);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filter and sort data based on search term and filter option
  const filteredData = assignedStudents
    .filter((student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterOption === "name_asc") {
        return a.name.localeCompare(b.name);
      } else if (filterOption === "name_desc") {
        return b.name.localeCompare(a.name);
      } else if (filterOption === "date_new") {
        return new Date(b.joinedDate) - new Date(a.joinedDate);
      } else if (filterOption === "date_old") {
        return new Date(a.joinedDate) - new Date(b.joinedDate);
      }
      return 0; // normal (no sorting)
    });

  // Handle student assignment requests
  const handleAssignStudents = async (selectedEmails) => {
    try {
      await apiClient.post("/teachers/students/bulk-request/", {
        student_emails: selectedEmails,
      });
      await Promise.all([fetchAssignedStudents(), fetchAvailableStudents()]);
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error assigning students:", err);
      setError("Failed to assign students");
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString();
  };

  if (loading) {
    return (
      <section className="px-4">
        <div className="flex justify-center items-center h-64">
          <div className="text-lg">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4">
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-red-700 hover:text-red-900"
          >
            ×
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-black text-xl md:text-3xl font-bold">Students</h1>
        <Button
          className="bg-gray-200 text-black px-2 py-1 rounded-md gap-1 cursor-pointer hover:bg-gray-100"
          onClick={() => setIsDialogOpen(true)}
        >
          <span className="p-1 px-2 text-xs rounded-full bg-blue-500 text-white items-center m-auto justify-center">
            {availableStudents.length}
          </span>
          Available Students
        </Button>
      </div>

      <div className="bg-transparent mt-4 border border-gray-200 rounded-xl p-6">
        <h1 className="text-black text-lg md:text-xl font-medium mb-4">
          My Students ({assignedStudents.length})
        </h1>

        <div className="flex justify-between mb-4 relative">
          <Input
            type="text"
            placeholder="Search Student by Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3"
          />
          <div className="relative">
            <Button
              className="bg-transparent border border-gray-200 p-2 rounded-lg hover:bg-gray-300 cursor-pointer"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <VscSettings className="font-bold w-8 h-6" />
              <span>Filter</span>
            </Button>
            {showFilterDropdown && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => {
                    setFilterOption("normal");
                    setShowFilterDropdown(false);
                  }}
                >
                  Normal
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => {
                    setFilterOption("name_asc");
                    setShowFilterDropdown(false);
                  }}
                >
                  Name A-Z
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => {
                    setFilterOption("name_desc");
                    setShowFilterDropdown(false);
                  }}
                >
                  Name Z-A
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => {
                    setFilterOption("date_new");
                    setShowFilterDropdown(false);
                  }}
                >
                  Newest First
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => {
                    setFilterOption("date_old");
                    setShowFilterDropdown(false);
                  }}
                >
                  Oldest First
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
          {filteredData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm
                ? "No students match your search."
                : "No assigned students yet."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-white rounded-5xl border-0">
                  <TableHead className="p-2">Student Name</TableHead>
                  <TableHead className="text-center">Total Essays</TableHead>
                  <TableHead className="text-center">Score</TableHead>
                  <TableHead className="text-center">Join Date</TableHead>
                  <TableHead className="text-center">Profile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((student) => (
                  <TableRow key={student.id} className="border-0">
                    <TableCell className="py-3">
                      {student.name}
                      <div className="text-gray-500 text-sm">
                        {student.email}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                        {student.total_essays}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className="bg-blue-100 text-blue-800 rounded-full px-3 py-1">
                        {student.average_score}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      {formatDate(student.joinedDate)}
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
                          <ProfileDialog teacher={student} />
                        </DialogContent>
                      </Dialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>

      <StudentRequestDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        students={availableStudents}
        onAssignStudents={handleAssignStudents}
      />
    </section>
  );
};

export default Students;
