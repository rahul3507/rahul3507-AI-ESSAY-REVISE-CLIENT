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
import ProfileDialog from "../Teachers/ProfileDialog";

const Students = () => {
  const [studentsData, setStudentsData] = useState([
    {
      name: "John Smith",
      email: "john.smith@student.edu",
      score: 12,
      essay: 124,
      action: "accepted",
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
      action: "pending",
      phoneNumber: "555-0102-5678",
      role: "student",
      address: "456 Oak Ave, Chicago, IL 60601",
      profileImg: "https://example.com/profiles/jane_doe.jpg",
      assignDate: "2025-07-20",
    },
    {
      name: "Alice Johnson",
      email: "alice.johnson@student.edu",
      score: 20,
      essay: 124,
      action: "accepted",
      phoneNumber: "555-0103-9012",
      role: "student",
      address: "789 Pine Rd, Aurora, IL 60504",
      profileImg: "https://example.com/profiles/alice_johnson.jpg",
    },
    {
      name: "Bob Wilson",
      email: "bob.wilson@student.edu",
      score: 45,
      essay: 134,
      action: "pending",
      phoneNumber: "555-0104-3456",
      role: "student",
      address: "321 Elm St, Naperville, IL 60540",
      profileImg: "https://example.com/profiles/bob_wilson.jpg",
    },
    {
      name: "Emma Brown",
      email: "emma.brown@student.edu",
      score: 12,
      essay: 164,
      action: "accepted",
      phoneNumber: "555-0105-7890",
      role: "student",
      address: "654 Cedar Ln, Evanston, IL 60201",
      profileImg: "https://example.com/profiles/emma_brown.jpg",
    },
    {
      name: "Michael Lee",
      email: "michael.lee@student.edu",
      score: 56,
      essay: 184,
      action: "pending",
      phoneNumber: "555-0106-2345",
      role: "student",
      address: "987 Birch Dr, Peoria, IL 61604",
      profileImg: "https://example.com/profiles/michael_lee.jpg",
    },
    {
      name: "Sarah Davis",
      email: "sarah.davis@student.edu",
      score: 80,
      essay: 1254,
      action: "accepted",
      phoneNumber: "555-0107-6789",
      role: "student",
      address: "147 Spruce Ct, Rockford, IL 61101",
      profileImg: "https://example.com/profiles/sarah_davis.jpg",
    },
    {
      name: "David Clark",
      email: "david.clark@student.edu",
      score: 15,
      essay: 1243,
      action: "pending",
      phoneNumber: "555-0108-1234",
      role: "student",
      address: "258 Willow Way, Joliet, IL 60435",
      profileImg: "https://example.com/profiles/david_clark.jpg",
    },
    {
      name: "Laura Adams",
      email: "laura.adams@student.edu",
      score: 30,
      essay: 124,
      action: "accepted",
      phoneNumber: "555-0109-5678",
      role: "student",
      address: "369 Sycamore St, Champaign, IL 61820",
      profileImg: "https://example.com/profiles/laura_adams.jpg",
    },
    {
      name: "James Taylor",
      email: "james.taylor@student.edu",
      score: 25,
      essay: 124,
      action: "pending",
      phoneNumber: "555-0110-9012",
      role: "student",
      address: "741 Chestnut Blvd, Bloomington, IL 61701",
      profileImg: "https://example.com/profiles/james_taylor.jpg",
    },
    {
      name: "Emily White",
      email: "emily.white@student.edu",
      score: 40,
      essay: 1424,
      action: "accepted",
      phoneNumber: "555-0111-3456",
      role: "student",
      address: "852 Magnolia Ave, Decatur, IL 62526",
      profileImg: "https://example.com/profiles/emily_white.jpg",
    },
    {
      name: "Thomas Green",
      email: "thomas.green@student.edu",
      score: 60,
      essay: 1224,
      action: "pending",
      phoneNumber: "555-0112-7890",
      role: "student",
      address: "963 Laurel Dr, Elgin, IL 60120",
      profileImg: "https://example.com/profiles/thomas_green.jpg",
    },
    {
      name: "Olivia Harris",
      email: "olivia.harris@student.edu",
      score: 70,
      essay: 424,
      action: "accepted",
      phoneNumber: "555-0113-2345",
      role: "student",
      address: "159 Poplar St, Waukegan, IL 60085",
      profileImg: "https://example.com/profiles/olivia_harris.jpg",
    },
    {
      name: "William Lewis",
      email: "william.lewis@student.edu",
      score: 35,
      essay: 1324,
      action: "pending",
      phoneNumber: "555-0114-6789",
      role: "student",
      address: "357 Aspen Ct, Cicero, IL 60804",
      profileImg: "https://example.com/profiles/william_lewis.jpg",
    },
    {
      name: "Sophia Walker",
      email: "sophia.walker@student.edu",
      score: 90,
      essay: 1124,
      action: "accepted",
      phoneNumber: "555-0115-1234",
      role: "student",
      address: "468 Hazel Rd, Berwyn, IL 60402",
      profileImg: "https://example.com/profiles/sophia_walker.jpg",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("normal");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Calculate the number of accepted students
  const acceptedCount = studentsData.filter(
    (item) => item.action === "pending"
  ).length;

  // Filter and sort data based on search term and filter option
  const filteredData = studentsData
    .filter(
      (item) =>
        item.action === "accepted" &&
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterOption === "high") {
        return b.score - a.score;
      } else if (filterOption === "low") {
        return a.score - b.score;
      }
      return 0; // normal (no sorting)
    });

  // Handle accepting a single student
  const handleAccept = (email) => {
    setStudentsData((prevData) =>
      prevData.map((item) =>
        item.email === email ? { ...item, action: "accepted" } : item
      )
    );
  };

  // Handle accepting all students
  const handleAcceptAll = () => {
    setStudentsData((prevData) =>
      prevData.map((item) =>
        item.action === "pending" ? { ...item, action: "accepted" } : item
      )
    );
    setIsDialogOpen(false);
  };

  return (
    <section className="px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-black text-xl md:text-3xl font-bold">Students</h1>
        <Button
          className="bg-gray-200 text-black px-2 py-1 rounded-md gap-1 cursor-pointer hover:bg-gray-100"
          onClick={() => setIsDialogOpen(true)}
        >
          <span className="p-1 px-2 text-xs rounded-full bg-blue-500 text-white items-center m-auto justify-center">
            {acceptedCount}
          </span>
          Student Requests
        </Button>
      </div>

      <div className="bg-transparent mt-4 border border-gray-200 rounded-xl p-6">
        <h1 className="text-black text-lg md:text-xl font-medium mb-4">
          Accepted Students List
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
                    setFilterOption("high");
                    setShowFilterDropdown(false);
                  }}
                >
                  High Score
                </button>
                <button
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-sm cursor-pointer"
                  onClick={() => {
                    setFilterOption("low");
                    setShowFilterDropdown(false);
                  }}
                >
                  Low Score
                </button>
              </div>
            )}
          </div>
        </div>

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
              {filteredData.map((item, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell className="py-3">
                    {item.name}
                    <div className="text-gray-500 text-sm">{item.email}</div>
                  </TableCell>
                  <TableCell className="text-center">{item.score}</TableCell>
                  <TableCell className="text-center">{item.essay}</TableCell>
                  <TableCell className="text-center">
                    {item.assignDate}
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
      </div>

      <StudentRequestDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        students={studentsData.filter((item) => item.action === "pending")}
        onAccept={handleAccept}
        onAcceptAll={handleAcceptAll}
      />
    </section>
  );
};

export default Students;
