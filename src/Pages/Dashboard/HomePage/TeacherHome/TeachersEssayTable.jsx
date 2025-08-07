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
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "../../../../components/ui/dialog";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { FileText } from "lucide-react";

const TeachersEssayTable = () => {
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
      fileName: "TEST ATTITUDINALE UFFICIALE.doc",
      fileType: "Doc file",
      uploadDate: "23/07/2025",
      teacherFeedback: "Done Feedback",
    },
    {
      name: "Jane Doe",
      email: "jane.doe@student.edu",
      score: 30,
      essay: 124,
      action: "accepted",
      phoneNumber: "555-0102-5678",
      role: "student",
      address: "456 Oak Ave, Chicago, IL 60601",
      profileImg: "https://example.com/profiles/jane_doe.jpg",
      assignDate: "2025-07-15",
      fileName: "TEST ATTITUDINALE UFFICIALE.doc",
      fileType: "Doc file",
      uploadDate: "23/07/2025",
      teacherFeedback: "Processing",
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
      assignDate: "2025-07-15",
      fileName: "TEST ATTITUDINALE UFFICIALE.doc",
      fileType: "Doc file",
      uploadDate: "23/07/2025",
      teacherFeedback: "No check",
    },
    {
      name: "Bob Wilson",
      email: "bob.wilson@student.edu",
      score: 45,
      essay: 134,
      action: "accepted",
      phoneNumber: "555-0104-3456",
      role: "student",
      address: "321 Elm St, Naperville, IL 60540",
      profileImg: "https://example.com/profiles/bob_wilson.jpg",
      assignDate: "2025-07-15",
      fileName: "TEST ATTITUDINALE UFFICIALE.doc",
      fileType: "Doc file",
      uploadDate: "23/07/2025",
      teacherFeedback: "Done Feedback",
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
      assignDate: "2025-07-15",
      fileName: "TEST ATTITUDINALE UFFICIALE.doc",
      fileType: "Doc file",
      uploadDate: "23/07/2025",
      teacherFeedback: "No check",
    },
    {
      name: "Michael Lee",
      email: "michael.lee@student.edu",
      score: 56,
      essay: 184,
      action: "accepted",
      phoneNumber: "555-0106-2345",
      role: "student",
      address: "987 Birch Dr, Peoria, IL 61604",
      profileImg: "https://example.com/profiles/michael_lee.jpg",
      assignDate: "2025-07-15",
      fileName: "TEST ATTITUDINALE UFFICIALE.doc",
      fileType: "Doc file",
      uploadDate: "23/07/2025",
      teacherFeedback: "Processing",
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
      assignDate: "2025-07-15",
      fileName: "TEST ATTITUDINALE UFFICIALE.doc",
      fileType: "Doc file",
      uploadDate: "23/07/2025",
      teacherFeedback: "No check",
    },
    {
      name: "David Clark",
      email: "david.clark@student.edu",
      score: 15,
      essay: 1243,
      action: "accepted",
      phoneNumber: "555-0108-1234",
      role: "student",
      address: "258 Willow Way, Joliet, IL 60435",
      profileImg: "https://example.com/profiles/david_clark.jpg",
      assignDate: "2025-07-15",
      fileName: "TEST ATTITUDINALE UFFICIALE.doc",
      fileType: "Doc file",
      uploadDate: "23/07/2025",
      teacherFeedback: "Done Feedback",
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
      assignDate: "2025-07-15",
      fileName: "TEST ATTITUDINALE UFFICIALE.doc",
      fileType: "Doc file",
      uploadDate: "23/07/2025",
      teacherFeedback: "Processing",
    },
    {
      name: "James Taylor",
      email: "james.taylor@student.edu",
      score: 25,
      essay: 124,
      action: "accepted",
      phoneNumber: "555-0110-9012",
      role: "student",
      address: "741 Chestnut Blvd, Bloomington, IL 61701",
      profileImg: "https://example.com/profiles/james_taylor.jpg",
      assignDate: "2025-07-15",
      fileName: "TEST ATTITUDINALE UFFICIALE.doc",
      fileType: "Doc file",
      uploadDate: "23/07/2025",
      teacherFeedback: "No check",
    },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterOption, setFilterOption] = useState("normal");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  // Filter and sort data based on search term and filter option
  const filteredData = studentsData
    .filter(
      (item) =>
        item.action === "accepted" &&
        item.fileName.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (filterOption === "high") {
        return b.score - a.score;
      } else if (filterOption === "low") {
        return a.score - b.score;
      }
      return 0; // normal (no sorting)
    });

  // Determine score cell styling based on score value
  const getScoreStyles = (score) => {
    if (score < 40) {
      return "bg-red-100 text-red-600";
    } else if (score >= 40 && score <= 69) {
      return "bg-orange-100 text-orange-600";
    } else {
      return "bg-green-100 text-green-600";
    }
  };

  // Get teacher feedback styling
  const getFeedbackStyles = (feedback) => {
    switch (feedback) {
      case "Done Feedback":
        return "text-green-600";
      case "Processing":
        return "text-orange-600";
      case "No check":
        return "text-gray-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <section className="">
      <div className="bg-transparent mt-4 border border-gray-200 rounded-xl p-6">
        <h1 className="text-black text-lg md:text-xl font-medium mb-4">
          Students Essay List
        </h1>

        <div className="flex justify-between mb-4 relative">
          <Input
            type="text"
            placeholder="Search by File Name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-1/3"
          />
          <div className="relative">
            <Button
              variant="outline"
              className="bg-transparent border border-gray-200 p-2 rounded-lg hover:bg-gray-100 cursor-pointer"
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
            >
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
                />
              </svg>
              Filter
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
                <TableHead className="p-4">File Name</TableHead>
                <TableHead className="text-center">AI Score</TableHead>
                <TableHead className="text-center">Upload Date</TableHead>
                <TableHead className="text-center">Teacher Feedback</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item, index) => (
                <TableRow key={index} className="border-0">
                  <TableCell className="py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">
                          {item.fileName}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {item.fileType}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-sm font-medium ${getScoreStyles(
                        item.score
                      )}`}
                    >
                      {item.score}.0
                    </span>
                  </TableCell>
                  <TableCell className="text-center text-gray-600">
                    {item.uploadDate}
                  </TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`font-medium ${getFeedbackStyles(
                        item.teacherFeedback
                      )}`}
                    >
                      {item.teacherFeedback}
                    </span>
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

export default TeachersEssayTable;
