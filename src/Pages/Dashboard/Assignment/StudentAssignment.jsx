/** @format */

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Calendar, FileText } from "lucide-react";
import { Button } from "../../../components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../components/ui/dialog";

import AssignmentForm from "./AssignmentForm";
import apiClient from "../../../lib/api-client";

const StudentAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch assignments from API
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/students/assignments/");
        setAssignments(response.data);
      } catch (err) {
        setError("Failed to fetch assignments");
        console.error("Error fetching assignments:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, []);

  // Format date function
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // Function to get header background class based on status
  const getHeaderBgClass = (status) => {
    return status === "submit" ? "bg-gray-200" : "bg-blue-500";
  };

  // Function to get header text color classes
  const getHeaderTextClass = (status) => {
    return status === "submit" ? "text-gray-900" : "text-white";
  };

  const getHeaderDescriptionClass = (status) => {
    return status === "submit" ? "text-gray-600" : "text-gray-200";
  };

  // Function to get status background class
  const getStatusBgClass = (status) => {
    switch (status) {
      case "submit":
        return "bg-gray-200";
      case "pending":
        return "bg-orange-500";
      case "reviewed":
        return "bg-green-500";
      default:
        return "bg-gray-200";
    }
  };

  // Function to get status text color
  const getStatusTextClass = (status) => {
    return status === "submit" ? "text-gray-700" : "text-white";
  };

  // Capitalize first letter of essay type
  const capitalizeEssayType = (type) => {
    return type
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  if (loading) {
    return (
      <section className="">
        <h1 className="text-black text-3xl font-bold mb-8">Assignments</h1>
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-gray-600">Loading assignments...</div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="">
        <h1 className="text-black text-3xl font-bold mb-8">Assignments</h1>
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-red-600">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="">
      <h1 className="text-black text-3xl font-bold mb-8">Assignments</h1>

      {assignments.length === 0 ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-lg text-gray-600">No assignments found</div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
          {assignments.map((assignment) => (
            <Card key={assignment.id} className="shadow-lg bg-[#F5F8FF] p-0">
              <CardHeader
                className={`space-y-2 pt-4 rounded-t-xl ${getHeaderBgClass(
                  assignment.assignment_status
                )}`}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-2 w-full">
                    <CardTitle
                      className={`text-lg font-bold ${getHeaderTextClass(
                        assignment.assignment_status
                      )}`}
                    >
                      {assignment.title}
                    </CardTitle>
                    <div className="w-full justify-between flex flex-wrap">
                      <CardDescription
                        className={`text-base flex items-center gap-2 ${getHeaderDescriptionClass(
                          assignment.assignment_status
                        )}`}
                      >
                        <FileText className="w-4 h-4" />
                        {capitalizeEssayType(assignment.essay_type)}
                      </CardDescription>

                      <CardDescription
                        className={`text-base flex items-center gap-2 ${getHeaderDescriptionClass(
                          assignment.assignment_status
                        )}`}
                      >
                        <span className="text-base">
                          {assignment.teacher_name}
                        </span>
                      </CardDescription>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <p className="text-gray-500 leading-relaxed">
                    {assignment.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-black">
                      <Calendar className="w-4 h-4" />
                      <span className="font-medium">Due Date</span>
                    </div>
                    <p className="text-lg text-gray-400">
                      {formatDate(assignment.due_date)}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <div className="text-gray-600 font-medium text-center">
                      Status
                    </div>
                    <div
                      className={`px-3 py-0.5 rounded-2xl ${getStatusBgClass(
                        assignment.assignment_status
                      )} ${getStatusTextClass(
                        assignment.assignment_status
                      )} capitalize text-center`}
                    >
                      {assignment.assignment_status}
                    </div>
                  </div>
                </div>

                <div className="mb-4 mt-auto h-full">
                  {assignment.assignment_status === "submit" ? (
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="cursor-pointer rounded-lg bg-black hover:bg-gray-800 text-white font-medium py-4">
                          Submit Essay
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-white rounded-lg">
                        <AssignmentForm
                          assignmentId={assignment.id}
                          initialTitle={assignment.title}
                          initialType={capitalizeEssayType(
                            assignment.essay_type
                          )}
                          onSubmitSuccess={() => {
                            // Refresh assignments after successful submission
                            window.location.reload();
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  ) : (
                    <Button className="cursor-pointer rounded-lg bg-transparent hover:bg-gray-100 text-gray-700 border border-gray-300 font-medium py-4">
                      View Submission
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default StudentAssignment;
