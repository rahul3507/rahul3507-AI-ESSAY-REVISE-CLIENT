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
import TeacherRequestDialog from "./TeacherRequestDialog";
import { Eye } from "lucide-react";

import ProfileDialog from "./ProfileDialog";
import apiClient from "../../../lib/api-client";

const Teachers = () => {
  const [teachersData, setTeachersData] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("normal");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch accepted teachers (my-teachers)
  const fetchMyTeachers = async () => {
    try {
      const response = await apiClient.get("/students/my-teachers/");
      const teachers = response.data.map((relation) => ({
        id: relation.id,
        name:
          relation.teacher_profile.first_name +
          " " +
          relation.teacher_profile.last_name,
        email: relation.teacher.email,
        phoneNumber: relation.teacher_profile.phone_number,
        address: relation.teacher_profile.address,
        profileImg: relation.teacher_profile.profile_picture,
        role: relation.teacher.role,
        assignments: 0, // You might want to fetch this from another endpoint
        reviewed: 0, // You might want to fetch this from another endpoint
        joinedDate: relation.teacher_profile.joined_date,
        teacherProfile: relation.teacher_profile,
        isVerified: relation.teacher.is_verified,
      }));
      setTeachersData(teachers);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setError("Failed to fetch teachers");
    }
  };

  // Fetch pending teacher requests
  const fetchPendingRequests = async () => {
    try {
      const response = await apiClient.get("/students/teacher-relations/");
      const pending = response.data
        .filter((relation) => relation.status === "pending")
        .map((relation) => ({
          id: relation.id,
          relationId: relation.id,
          name:
            relation.teacher_profile.first_name +
            " " +
            relation.teacher_profile.last_name,
          email: relation.teacher.email,
          phoneNumber: relation.teacher_profile.phone_number,
          address: relation.teacher_profile.address,
          profileImg: relation.teacher_profile.profile_picture,
          role: relation.teacher.role,
          assignments: 0,
          reviewed: 0,
          joinedDate: relation.teacher_profile.joined_date,
          teacherProfile: relation.teacher_profile,
          isVerified: relation.teacher.is_verified,
          createdAt: relation.created_at,
        }));
      setPendingRequests(pending);
    } catch (err) {
      console.error("Error fetching pending requests:", err);
      setError("Failed to fetch pending requests");
    }
  };

  // Initial data fetch
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.all([fetchMyTeachers(), fetchPendingRequests()]);
      } catch (error) {
        setError("Failed to load data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Filter and sort data based on search term and filter option
  const filteredData = teachersData
    .filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterOption === "high") {
        return b.assignments - a.assignments;
      } else if (filterOption === "low") {
        return a.assignments - b.assignments;
      }
      return 0; // normal (no sorting)
    });

  // Handle accepting a single teacher
  const handleAccept = async (relationId) => {
    try {
      await apiClient.put(`/students/teacher-relations/${relationId}/`, {
        status: "accepted",
      });

      // Refresh both lists
      await Promise.all([fetchMyTeachers(), fetchPendingRequests()]);
    } catch (err) {
      console.error("Error accepting teacher:", err);
      setError("Failed to accept teacher request");
    }
  };

  // Handle accepting all teachers
  const handleAcceptAll = async () => {
    try {
      await apiClient.post("/students/teacher-requests/accept-all/");

      // Refresh both lists
      await Promise.all([fetchMyTeachers(), fetchPendingRequests()]);
      setIsDialogOpen(false);
    } catch (err) {
      console.error("Error accepting all teachers:", err);
      setError("Failed to accept all teacher requests");
    }
  };

  // Handle rejecting a teacher request
  const handleReject = async (relationId) => {
    try {
      await apiClient.put(`/students/teacher-relations/${relationId}/`, {
        status: "rejected",
      });

      // Refresh pending requests list
      await fetchPendingRequests();
    } catch (err) {
      console.error("Error rejecting teacher:", err);
      setError("Failed to reject teacher request");
    }
  };

  if (loading) {
    return (
      <section className="px-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-gray-500">Loading teachers...</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="px-4">
        <div className="flex justify-center items-center h-64">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-black text-xl md:text-3xl font-bold">
          My Teachers
        </h1>
        <Button
          className="bg-gray-200 text-black px-2 py-1 rounded-md gap-1 cursor-pointer hover:bg-gray-100"
          onClick={() => setIsDialogOpen(true)}
        >
          <span className="p-1 px-2 text-xs rounded-full bg-blue-500 text-white items-center m-auto justify-center">
            {pendingRequests.length}
          </span>
          Teachers Request
        </Button>
      </div>

      <div className="bg-transparent mt-4 border border-gray-200 rounded-xl p-6">
        <h1 className="text-black text-lg md:text-xl font-medium mb-4">
          Assigned Teachers List
        </h1>

        <div className="flex justify-between mb-4 relative">
          <Input
            type="text"
            placeholder="Search Teacher by Name"
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
                    setFilterOption("high");
                    setShowFilterDropdown(false);
                  }}
                >
                  More assignments
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => {
                    setFilterOption("low");
                    setShowFilterDropdown(false);
                  }}
                >
                  Less assignments
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
          {filteredData.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              {searchTerm
                ? "No teachers match your search."
                : "No teachers assigned yet."}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-white rounded-5xl border-0">
                  <TableHead className="p-2">Teacher Name</TableHead>
                  <TableHead className="text-center">Phone</TableHead>

                  <TableHead className="text-center">Profile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((item, index) => (
                  <TableRow key={item.id || index} className="border-0">
                    <TableCell className="py-3">
                      {item.name}
                      <div className="text-gray-500 text-sm">{item.email}</div>
                    </TableCell>
                    <TableCell className="text-center">
                      {item.phoneNumber || "N/A"}
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
          )}
        </div>
      </div>

      <TeacherRequestDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        teachers={pendingRequests}
        onAccept={handleAccept}
        onAcceptAll={handleAcceptAll}
        onReject={handleReject}
      />
    </section>
  );
};

export default Teachers;
