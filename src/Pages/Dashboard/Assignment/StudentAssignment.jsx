/** @format */

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

const StudentAssignment = () => {
  // Sample data array with 20 assignments
  const assignmentsData = [
    {
      title: "Climate Change Argument",
      type: "Argumentative",
      name: "Dr. Sarah Johnson",
      desc: "Write a persuasive essay about climate change solutions",
      date: "Aug 15, 2025",
      status: "pending",
    },
    {
      title: "Machine Learning Research",
      type: "Research Paper",
      name: "Prof. Michael Chen",
      desc: "Conduct research on modern ML algorithms and their applications",
      date: "Sep 10, 2025",
      status: "submit",
    },
    {
      title: "Database Design Project",
      type: "Technical",
      name: "Dr. Emily Davis",
      desc: "Design and implement a relational database system",
      date: "Aug 22, 2025",
      status: "reviewed",
    },
    {
      title: "Poetry Analysis",
      type: "Literary Analysis",
      name: "Prof. James Wilson",
      desc: "Analyze themes and literary devices in contemporary poetry",
      date: "Sep 05, 2025",
      status: "pending",
    },
    {
      title: "Marketing Strategy Report",
      type: "Business Report",
      name: "Dr. Lisa Anderson",
      desc: "Develop a comprehensive marketing strategy for a startup",
      date: "Aug 30, 2025",
      status: "submit",
    },
    {
      title: "Physics Lab Report",
      type: "Lab Report",
      name: "Prof. Robert Taylor",
      desc: "Document findings from quantum mechanics experiments",
      date: "Sep 12, 2025",
      status: "reviewed",
    },
    {
      title: "Historical Timeline",
      type: "Timeline Project",
      name: "Dr. Maria Garcia",
      desc: "Create a detailed timeline of World War II events",
      date: "Aug 28, 2025",
      status: "pending",
    },
    {
      title: "Software Architecture Design",
      type: "Technical Design",
      name: "Prof. David Lee",
      desc: "Design scalable software architecture for web applications",
      date: "Sep 15, 2025",
      status: "submit",
    },
    {
      title: "Environmental Impact Study",
      type: "Research Study",
      name: "Dr. Jennifer Brown",
      desc: "Assess environmental impact of renewable energy sources",
      date: "Sep 08, 2025",
      status: "reviewed",
    },
    {
      title: "Financial Analysis Report",
      type: "Financial Report",
      name: "Prof. Thomas White",
      desc: "Analyze financial performance of Fortune 500 companies",
      date: "Aug 25, 2025",
      status: "pending",
    },
    {
      title: "Art History Essay",
      type: "Essay",
      name: "Dr. Rachel Green",
      desc: "Explore the influence of Renaissance art on modern design",
      date: "Sep 20, 2025",
      status: "submit",
    },
    {
      title: "Mobile App Prototype",
      type: "Development Project",
      name: "Prof. Kevin Martinez",
      desc: "Create a functional prototype for a social media app",
      date: "Sep 18, 2025",
      status: "reviewed",
    },
    {
      title: "Psychology Case Study",
      type: "Case Study",
      name: "Dr. Amanda Clark",
      desc: "Analyze cognitive behavioral patterns in adolescents",
      date: "Aug 27, 2025",
      status: "pending",
    },
    {
      title: "Chemical Synthesis Lab",
      type: "Lab Experiment",
      name: "Prof. Daniel Rodriguez",
      desc: "Synthesize organic compounds using advanced techniques",
      date: "Sep 14, 2025",
      status: "submit",
    },
    {
      title: "Literature Review",
      type: "Academic Review",
      name: "Dr. Susan Lewis",
      desc: "Comprehensive review of recent publications in linguistics",
      date: "Sep 22, 2025",
      status: "reviewed",
    },
    {
      title: "Statistical Analysis Project",
      type: "Data Analysis",
      name: "Prof. Matthew Hall",
      desc: "Perform statistical analysis on healthcare data trends",
      date: "Aug 29, 2025",
      status: "pending",
    },
    {
      title: "Urban Planning Proposal",
      type: "Proposal",
      name: "Dr. Laura Young",
      desc: "Propose sustainable urban development solutions",
      date: "Sep 16, 2025",
      status: "submit",
    },
    {
      title: "Mechanical Engineering Design",
      type: "Engineering Project",
      name: "Prof. Christopher King",
      desc: "Design mechanical systems for automotive applications",
      date: "Sep 25, 2025",
      status: "reviewed",
    },
    {
      title: "Social Media Impact Study",
      type: "Sociological Study",
      name: "Dr. Michelle Wright",
      desc: "Study the impact of social media on youth behavior",
      date: "Aug 31, 2025",
      status: "pending",
    },
    {
      title: "Blockchain Implementation",
      type: "Technical Implementation",
      name: "Prof. Andrew Lopez",
      desc: "Implement blockchain technology for supply chain management",
      date: "Sep 28, 2025",
      status: "submit",
    },
  ];

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

  return (
    <section className="">
      <h1 className="text-black text-3xl font-bold mb-8">Assignments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
        {assignmentsData.map((assignment, index) => (
          <Card key={index} className="shadow-lg bg-[#F5F8FF] p-0">
            <CardHeader
              className={`space-y-2 pt-4 rounded-t-xl ${getHeaderBgClass(
                assignment.status
              )}`}
            >
              <div className="flex items-start justify-between">
                <div className="space-y-2 w-full">
                  <CardTitle
                    className={`text-lg font-bold ${getHeaderTextClass(
                      assignment.status
                    )}`}
                  >
                    {assignment.title}
                  </CardTitle>
                  <div className="w-full justify-between flex flex-wrap">
                    <CardDescription
                      className={`text-base flex items-center gap-2 ${getHeaderDescriptionClass(
                        assignment.status
                      )}`}
                    >
                      <FileText className="w-4 h-4" />
                      {assignment.type}
                    </CardDescription>

                    <CardDescription
                      className={`text-base flex items-center gap-2 ${getHeaderDescriptionClass(
                        assignment.status
                      )}`}
                    >
                      <span className="text-base">{assignment.name}</span>
                    </CardDescription>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <div>
                <p className="text-gray-500 leading-relaxed">
                  {assignment.desc}
                </p>
              </div>

              <div className="flex items-center justify-between pb-4 border-b border-gray-200">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-black">
                    <Calendar className="w-4 h-4" />
                    <span className="font-medium">Due Date</span>
                  </div>
                  <p className="text-lg text-gray-400">{assignment.date}</p>
                </div>

                <div className="space-y-2">
                  <div className="text-gray-600 font-medium text-center">
                    Status
                  </div>
                  <div
                    className={`px-3 py-0.5 rounded-2xl ${getStatusBgClass(
                      assignment.status
                    )} ${getStatusTextClass(
                      assignment.status
                    )} capitalize text-center`}
                  >
                    {assignment.status}
                  </div>
                </div>
              </div>

              <div className="mb-4 mt-auto h-full ">
                {assignment.status === "submit" ? (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="cursor-pointer rounded-lg bg-black hover:bg-gray-800 text-white font-medium py-4">
                        Submit Essay
                      </Button>
                    </DialogTrigger>
                    <DialogContent className=" bg-white rounded-lg">
                      <AssignmentForm
                        initialTitle={assignment.title}
                        initialType={assignment.type}
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
    </section>
  );
};

export default StudentAssignment;
