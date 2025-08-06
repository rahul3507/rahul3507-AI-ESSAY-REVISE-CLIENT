/** @format */

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";

import { Button } from "../../../../components/ui/button";

import { Eye } from "lucide-react";

const AssignmentTable = () => {
  const [studentsData, setStudentsData] = useState([
    {
      name: "John Smith",
      email: "john.smith@student.edu",
      score: 12,
      essay: 124,

      phoneNumber: "555-0101-1234",
      role: "student",
      address: "123 Maple St, Springfield, IL 62701",
      profileImg: "https://example.com/profiles/john_smith.jpg",
      assignDate: "2025-07-15",
    },
    {
      name: "Jane Doe",
      email: "jane.doe@student.edu",
      score: 30,
      essay: 124,

      phoneNumber: "555-0102-5678",
      role: "student",
      address: "456 Oak Ave, Chicago, IL 60601",
      profileImg: "https://example.com/profiles/jane_doe.jpg",
      assignDate: "",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@student.edu",
      score: 20,
      essay: 124,

      phoneNumber: "555-0103-9012",
      role: "student",
      address: "789 Pine Rd, Aurora, IL 60504",
      profileImg: "https://example.com/profiles/alice_johnson.jpg",
      assignDate: "2025-07-15",
    },
    {
      name: "Bob Wilson",
      email: "bob.wilson@student.edu",
      score: 45,
      essay: 134,

      phoneNumber: "555-0104-3456",
      role: "student",
      address: "321 Elm St, Naperville, IL 60540",
      profileImg: "https://example.com/profiles/bob_wilson.jpg",
      assignDate: "",
    },
    {
      name: "Emma Brown",
      email: "emma.brown@student.edu",
      score: 12,
      essay: 164,

      phoneNumber: "555-0105-7890",
      role: "student",
      address: "654 Cedar Ln, Evanston, IL 60201",
      profileImg: "https://example.com/profiles/emma_brown.jpg",
      assignDate: "2025-07-15",
    },
    {
      name: "Michael Lee",
      email: "michael.lee@student.edu",
      score: 56,
      essay: 184,

      phoneNumber: "555-0106-2345",
      role: "student",
      address: "987 Birch Dr, Peoria, IL 61604",
      profileImg: "https://example.com/profiles/michael_lee.jpg",
      assignDate: "",
    },
    {
      name: "Sarah Davis",
      email: "sarah.davis@student.edu",
      score: 80,
      essay: 1254,

      phoneNumber: "555-0107-6789",
      role: "student",
      address: "147 Spruce Ct, Rockford, IL 61101",
      profileImg: "https://example.com/profiles/sarah_davis.jpg",
      assignDate: "2025-07-15",
    },
    {
      name: "David Clark",
      email: "david.clark@student.edu",
      score: 15,
      essay: 1243,

      phoneNumber: "555-0108-1234",
      role: "student",
      address: "258 Willow Way, Joliet, IL 60435",
      profileImg: "https://example.com/profiles/david_clark.jpg",
      assignDate: "",
    },
    {
      name: "Laura Adams",
      email: "laura.adams@student.edu",
      score: 30,
      essay: 124,

      phoneNumber: "555-0109-5678",
      role: "student",
      address: "369 Sycamore St, Champaign, IL 61820",
      profileImg: "https://example.com/profiles/laura_adams.jpg",
      assignDate: "2025-07-15",
    },
    {
      name: "James Taylor",
      email: "james.taylor@student.edu",
      score: 25,
      essay: 124,

      phoneNumber: "555-0110-9012",
      role: "student",
      address: "741 Chestnut Blvd, Bloomington, IL 61701",
      profileImg: "https://example.com/profiles/james_taylor.jpg",
      assignDate: "",
    },
    {
      name: "Emily White",
      email: "emily.white@student.edu",
      score: 40,
      essay: 1424,

      phoneNumber: "555-0111-3456",
      role: "student",
      address: "852 Magnolia Ave, Decatur, IL 62526",
      profileImg: "https://example.com/profiles/emily_white.jpg",
      assignDate: "2025-07-15",
    },
    {
      name: "Thomas Green",
      email: "thomas.green@student.edu",
      score: 60,
      essay: 1224,

      phoneNumber: "555-0112-7890",
      role: "student",
      address: "963 Laurel Dr, Elgin, IL 60120",
      profileImg: "https://example.com/profiles/thomas_green.jpg",
      assignDate: "",
    },
  ]);

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
    <section className="px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-black text-xl md:text-3xl font-bold">
          Assignment Details
        </h1>
      </div>

      <div className="bg-transparent mt-4 border border-gray-200 rounded-xl p-6">
        <h1 className="text-black text-lg md:text-xl font-medium mb-4">
          Accepted Students List
        </h1>

        <div className="bg-gray-50 rounded-xl p-4 overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-white rounded-5xl border-0">
                <TableHead className="p-2">Student Name</TableHead>
                <TableHead className="text-center">Score</TableHead>
                <TableHead className="text-center">Essay</TableHead>
                <TableHead className="text-center">Assign Date</TableHead>
                <TableHead className="text-center">Profile</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {studentsData.map((item, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell className="py-3">
                    {item.name}
                    <div className="text-gray-500 text-sm">{item.email}</div>
                  </TableCell>
                  <TableCell className={`text-center `}>
                    <span
                      className={`text-center rounded-full px-3 py-1 ${getScoreStyles(
                        item.score
                      )}`}
                    >
                      {item.score}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">{item.essay}</TableCell>
                  <TableCell className="text-center">
                    {item.assignDate}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button className="bg-gray-200 text-black hover:bg-gray-200 cursor-pointer">
                      <Eye />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </section>
  );
};

export default AssignmentTable;
