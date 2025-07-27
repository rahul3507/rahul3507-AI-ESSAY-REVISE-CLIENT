/** @format */
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./../../../components/ui/table";
import {
  Bell,
  BookOpenText,
  BookText,
  FileText,
  MessageSquareCode,
  PenTool,
  Upload,
} from "lucide-react";
import { Button } from "./../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./../../../components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

// Sample assignmentsData array with 20 datasets
const assignmentsData = [
  { file: "Essay_1.doc", date: "2025-07-01", progress: "Complete" },
  { file: "Essay_2.doc", date: "2025-07-02", progress: "Unchecked" },
  { file: "Essay_3.doc", date: "2025-07-03", progress: "Complete" },
  { file: "Essay_4.doc", date: "2025-07-04", progress: "Unchecked" },
  { file: "Essay_5.doc", date: "2025-07-05", progress: "Complete" },
  { file: "Essay_6.doc", date: "2025-07-06", progress: "Unchecked" },
  { file: "Essay_7.doc", date: "2025-07-07", progress: "Complete" },
  { file: "Essay_8.doc", date: "2025-07-08", progress: "Unchecked" },
  { file: "Essay_9.doc", date: "2025-07-09", progress: "Complete" },
  { file: "Essay_10.doc", date: "2025-07-10", progress: "Unchecked" },
  { file: "Essay_11.doc", date: "2025-07-11", progress: "Complete" },
  { file: "Essay_12.doc", date: "2025-07-12", progress: "Unchecked" },
  { file: "Essay_13.doc", date: "2025-07-13", progress: "Complete" },
  { file: "Essay_14.doc", date: "2025-07-14", progress: "Unchecked" },
  { file: "Essay_15.doc", date: "2025-07-15", progress: "Complete" },
  { file: "Essay_16.doc", date: "2025-07-16", progress: "Unchecked" },
  { file: "Essay_17.doc", date: "2025-07-17", progress: "Complete" },
  { file: "Essay_18.doc", date: "2025-07-18", progress: "Unchecked" },
  { file: "Essay_19.doc", date: "2025-07-19", progress: "Complete" },
  { file: "Essay_20.doc", date: "2025-07-20", progress: "Unchecked" },
];

const HomePage = () => {
  const data = [
    {
      name: "Jan",
      grammar: 70,
      argument: 125,
      clarity: 55,
      vocabulary: 150,
      amt: 2400,
    },
    {
      name: "Feb",
      grammar: 100,
      argument: 30,
      clarity: 100,
      vocabulary: 130,
      amt: 2210,
    },
    {
      name: "Mar",
      grammar: 120,
      argument: 170,
      clarity: 30,
      vocabulary: 140,
      amt: 2290,
    },
    {
      name: "Apr",
      grammar: 155,
      argument: 140,
      clarity: 130,
      vocabulary: 123,
      amt: 2000,
    },
    {
      name: "May",
      grammar: 144,
      argument: 166,
      clarity: 111,
      vocabulary: 155,
      amt: 2181,
    },
    {
      name: "Jun",
      grammar: 177,
      argument: 144,
      clarity: 133,
      vocabulary: 133,
      amt: 2500,
    },
    {
      name: "Jul",
      grammar: 122,
      argument: 133,
      clarity: 155,
      vocabulary: 145,
      amt: 2100,
    },
  ];

  const data2 = [
    {
      title: "Total Essays",
      value: 12,
      totalAdded: "+1",
      totalMark: null,
    },
    {
      title: "Total Assignments",
      value: 9,
      totalAdded: "+1",
      totalMark: null,
    },
    {
      title: "Teacher Feedback",
      value: 9,
      totalAdded: "+1",
      totalMark: null,
    },
    {
      title: "Average Score",
      value: 5,
      totalAdded: "+1",
      totalMark: 12,
    },
  ];

  const progressData = [
    {
      title: "Grammar",
      icon: BookOpenText,
      time: "45 minutes",
      priority: "High priority",
      percentage: "25",
      bgColor: "#D1E9FF",
    },
    {
      title: "Clarity",
      icon: PenTool,
      time: "30 minutes",
      priority: "Medium priority",
      percentage: "82",
      bgColor: "#FDFFC2",
    },
    {
      title: "Argument Strength",
      icon: MessageSquareCode,
      time: "20 minutes",
      priority: "Medium priority",
      percentage: "25",
      bgColor: "#CBFEE2",
    },
    {
      title: "Vocabulary",
      icon: MessageSquareCode,
      time: "20 minutes",
      priority: "Medium priority",
      percentage: "43",
      bgColor: "#FFF4FE",
    },
  ];

  return (
    <div className="px-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-black mb-2">Welcome Back</h1>
          <p className="text-[#647187]">
            {
              "Here's your personalized dashboard to manage users, track progress, and oversee platform performance."
            }
          </p>
        </div>
        <div className="flex gap-5">
          <Button className="flex gap-2 bg-black rounded-lg p-2 px-4 text-white cursor-pointer">
            <Upload />
            Upload Essay
          </Button>
          <button size="icon" className="border-[#e3e4e6] bg-transparent">
            <Bell className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {data2.map((item, index) => (
          <Card key={index} className="border-[#e3e4e6]">
            <CardContent className="px-6">
              <div className="text-lg text-black mb-1">{item.title}</div>
              <div className="text-3xl font-bold text-black mb-1">
                {item.totalMark !== null ? (
                  <>
                    {item.value}
                    <span className="text-lg text-[#a1a1a1]">
                      /{item.totalMark}
                    </span>
                  </>
                ) : (
                  item.value
                )}
              </div>
              <div className="text-sm text-gray-400">
                <span className="text-black font-semibold">
                  {item.totalAdded}{" "}
                </span>
                {item.title === "Total Essays"
                  ? "from last month"
                  : "this week"}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="col-span-1 xl:col-span-2 rounded-2xl bg-gray-100 p-4">
          <h2 className="text-black font-bold text-2xl pb-4">
            Essay Activates
          </h2>
          <Card className=" bg-white border-white">
            <CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-5 w-full  mb-6">
                <div className=" col-span-1 md:col-span-3 w-full ">
                  <div className="text-4xl font-bold text-black pb-2">
                    1,665
                    <span className="text-sm text-gray-400 font-normal">
                      /Essay
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    You&apos;ve achieved a remarkable 79% increase compared to
                    last year!
                  </p>
                </div>
                <div className="col-span-1 md:col-span-2 grid grid-cols-2 items-center gap-6 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Grammar</span>
                    <div className="w-8 h-4 rounded-xl bg-[#3096f5]"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Argument Strength</span>
                    <div className="w-8 h-4 rounded-xl bg-[#29bc99]"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Clarity</span>
                    <div className="w-8 h-4 rounded-xl bg-[#e2e58a]"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400">Vocabulary</span>
                    <div className="w-8 h-4 rounded-xl bg-[#f428e0]"></div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <div className="min-w-96">
                  <ResponsiveContainer width="100%" height={300} className="">
                    <LineChart
                      data={data}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="grammar"
                        stroke="#3096f5"
                      />
                      <Line
                        type="monotone"
                        dataKey="argument"
                        stroke="#29bc99"
                      />
                      <Line
                        type="monotone"
                        dataKey="clarity"
                        stroke="#e2e58a"
                      />
                      <Line
                        type="monotone"
                        dataKey="vocabulary"
                        stroke="#f428e0"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>

        <div className="col-span-1 ">
          {/* Essay Progress */}
          <Card className="border-[#e3e4e6] h-[545px] overflow-auto">
            <CardHeader className="w-full flex justify-between">
              <div>
                <CardTitle className="text-black font-bold text-2xl pb-2">
                  Essay Progress
                </CardTitle>
                <div className="text-sm text-gray-400">
                  AI-generated based on your performance
                </div>
              </div>
              <div className="">
                <div className="text-4xl font-bold text-black pb-2">
                  120
                  <span className="text-sm text-gray-400 font-normal">
                    /Essay
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 ">
              {progressData.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between border border-gray-300 rounded-2xl p-4 "
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center`}
                      style={{ backgroundColor: item.bgColor }}
                    >
                      <item.icon className={`w-6 h-6`} />
                    </div>
                    <div>
                      <div className="text-xl font-medium text-black">
                        {item.title}
                      </div>
                      <div className="text-base text-gray-400">
                        {item.time} • {item.priority}
                      </div>
                    </div>
                  </div>
                  <div
                    className="text-3xl font-bold"
                    style={{
                      color:
                        item?.percentage < 40
                          ? "#F54A45" // red
                          : item?.percentage >= 4 && item?.percentage < 70
                          ? "#FF8800" // orange
                          : "#34C724", // green
                    }}
                  >
                    {item?.percentage}%
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="pt-6">
        <h1 className="text-black text-2xl pb-2">Recent Assignments</h1>
        <Table>
          <TableHeader>
            <TableRow className="text-xl">
              <TableHead>File Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead className="text-right"> </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {assignmentsData.map((data, key) => (
              <TableRow key={key}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="text-blue-600 w-8 h-8" />
                    <div className="text-lg">
                      {data.file}
                      <p className="text-base text-gray-400">Doc file</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-base text-gray-400">
                  {data.date}
                </TableCell>
                <TableCell
                  className={
                    data.progress === "Complete"
                      ? "text-[#34C724] text-base"
                      : "text-gray-400 text-base"
                  }
                >
                  {data.progress}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className={
                      data.progress === "Complete"
                        ? "bg-[#34C724] text-white cursor-pointer "
                        : "bg-gray-400 text-white cursor-pointer "
                    }
                  >
                    {data.progress === "Complete" ? " View " : "Submit"}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default HomePage;
