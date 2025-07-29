/** @format */

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Input } from "../../../components/ui/input";
import { Button } from "../../../components/ui/button";
import { VscSettings } from "react-icons/vsc";
import TeacherRequestDialog from "./TeacherRequestDialog";

const Teachers = () => {
  const [billingData, setBillingData] = useState([
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 12,
      reviewed: 124,
      action: "accepted",
    },
    {
      teacherName: "Jane Doe",
      email: "jane.doe@teacher.edu",
      assignments: 230,
      reviewed: 124,
      action: "accept",
    },
    {
      teacherName: "Alice Johnson",
      email: "alice.johnson@teacher.edu",
      assignments: 20,
      reviewed: 124,
      action: "accepted",
    },
    {
      teacherName: "Bob Wilson",
      email: "bob.wilson@teacher.edu",
      assignments: 45,
      reviewed: 134,
      action: "accept",
    },
    {
      teacherName: "Emma Brown",
      email: "emma.brown@teacher.edu",
      assignments: 12,
      reviewed: 164,
      action: "accepted",
    },
    {
      teacherName: "Michael Lee",
      email: "michael.lee@teacher.edu",
      assignments: 56,
      reviewed: 184,
      action: "accept",
    },
    {
      teacherName: "Sarah Davis",
      email: "sarah.davis@teacher.edu",
      assignments: 80,
      reviewed: 1254,
      action: "accepted",
    },
    {
      teacherName: "David Clark",
      email: "david.clark@teacher.edu",
      assignments: 15,
      reviewed: 1243,
      action: "accept",
    },
    {
      teacherName: "Laura Adams",
      email: "laura.adams@teacher.edu",
      assignments: 30,
      reviewed: 124,
      action: "accepted",
    },
    {
      teacherName: "James Taylor",
      email: "james.taylor@teacher.edu",
      assignments: 25,
      reviewed: 124,
      action: "accept",
    },
    {
      teacherName: "Emily White",
      email: "emily.white@teacher.edu",
      assignments: 40,
      reviewed: 1424,
      action: "accepted",
    },
    {
      teacherName: "Thomas Green",
      email: "thomas.green@teacher.edu",
      assignments: 60,
      reviewed: 1224,
      action: "accept",
    },
    {
      teacherName: "Olivia Harris",
      email: "olivia.harris@teacher.edu",
      assignments: 70,
      reviewed: 424,
      action: "accepted",
    },
    {
      teacherName: "William Lewis",
      email: "william.lewis@teacher.edu",
      assignments: 35,
      reviewed: 1324,
      action: "accept",
    },
    {
      teacherName: "Sophia Walker",
      email: "sophia.walker@teacher.edu",
      assignments: 90,
      reviewed: 1124,
      action: "accepted",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("normal");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Calculate the number of accepted teachers
  const acceptedCount = billingData.filter(
    (item) => item.action === "accept"
  ).length;

  // Filter and sort data based on search term and filter option
  const filteredData = billingData
    .filter(
      (item) =>
        item.action === "accepted" &&
        item.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
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
  const handleAccept = (email) => {
    setBillingData((prevData) =>
      prevData.map((item) =>
        item.email === email ? { ...item, action: "accepted" } : item
      )
    );
  };

  // Handle accepting all teachers
  const handleAcceptAll = () => {
    setBillingData((prevData) =>
      prevData.map((item) =>
        item.action === "accept" ? { ...item, action: "accepted" } : item
      )
    );
    setIsDialogOpen(false);
  };

  return (
    <section className="px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-black text-xl md:text-3xl font-bold">
          Assignments
        </h1>
        <Button
          className="bg-gray-200 text-black px-2 py-1 rounded-md gap-1 cursor-pointer"
          onClick={() => setIsDialogOpen(true)}
        >
          <span className="p-1 px-2 text-xs rounded-full bg-blue-500 text-white">
            {acceptedCount}
          </span>
          Teachers Request
        </Button>
      </div>

      <div className="bg-transparent mt-4 border border-gray-200 rounded-xl p-6">
        <h1 className="text-black  text-lg md:text-xl font-medium mb-4">
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
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer "
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
          <Table>
            <TableHeader>
              <TableRow className="bg-white rounded-5xl border-0">
                <TableHead className="p-2">Teacher Name</TableHead>
                <TableHead className="text-center">Assignments</TableHead>
                <TableHead className="text-center">Reviewed</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell className="py-3">
                    {item.teacherName}
                    <div className="text-gray-500 text-sm">{item.email}</div>
                  </TableCell>
                  <TableCell className="text-center">
                    {item.assignments}
                  </TableCell>
                  <TableCell className="text-center">{item.reviewed}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <TeacherRequestDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        teachers={billingData.filter((item) => item.action === "accept")}
        onAccept={handleAccept}
        onAcceptAll={handleAcceptAll}
      />
    </section>
  );
};

export default Teachers;
