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

const Teachers = () => {
  const [billingData] = useState([
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 12,
      pendingAssignment: "23/07/2025",
      action: "accepted",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 230,
      pendingAssignment: "23/07/2025",
      action: "accepted",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 20,
      pendingAssignment: "23/07/2025",
      action: "accepted",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 45,
      pendingAssignment: "23/07/2025",
      action: "accept",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 12,
      pendingAssignment: "23/07/2025",
      action: "accept",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 56,
      pendingAssignment: "23/07/2025",
      action: "accepted",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 80,
      pendingAssignment: "23/07/2025",
      action: "accepted",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 15,
      pendingAssignment: "24/07/2025",
      action: "accept",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 30,
      pendingAssignment: "24/07/2025",
      action: "accepted",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 25,
      pendingAssignment: "24/07/2025",
      action: "accept",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 40,
      pendingAssignment: "25/07/2025",
      action: "accepted",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 60,
      pendingAssignment: "25/07/2025",
      action: "accept",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 70,
      pendingAssignment: "25/07/2025",
      action: "accepted",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 35,
      pendingAssignment: "26/07/2025",
      action: "accepted",
    },
    {
      teacherName: "John Smith",
      email: "john.smith@student.edu",
      assignments: 90,
      pendingAssignment: "26/07/2025",
      action: "accept",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterDate, setFilterDate] = useState("");

  const filteredData = billingData
    .filter((item) => item.action === "accepted")
    .filter((item) =>
      item.teacherName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item) => !filterDate || item.pendingAssignment === filterDate);

  return (
    <section className="px-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-black text-3xl font-bold">Assignments</h1>
        <button className="bg-gray-200 text-black px-2 py-1 rounded-md gap-1 cursor-pointer">
          <span className="p-1 px-2 text-xs rounded-full bg-blue-500 text-white">
            5
          </span>
          Teachers Request
        </button>
      </div>

      <div className="bg-transparent mt-4 border border-gray-200 rounded-xl p-6">
        <h1 className="text-black text-xl font-medium mb-4">
          Assigned Teachers List
        </h1>

        <div className="flex justify-between mb-4">
          <Input
            type="text"
            placeholder="Search Student"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3"
          />
          <Button></Button>
        </div>

        <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-white rounded-5xl ">
                <TableHead className="p-2">Teacher Name</TableHead>
                <TableHead>Assignments</TableHead>
                <TableHead>Pending Assignment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index} className="border-0 ">
                  <TableCell className="py-3">
                    {item.teacherName}
                    <div className="text-gray-500 text-sm">{item.email}</div>
                  </TableCell>
                  <TableCell>{item.assignments}</TableCell>
                  <TableCell>{item.pendingAssignment}</TableCell>
                  <TableCell>{item.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default Teachers;
