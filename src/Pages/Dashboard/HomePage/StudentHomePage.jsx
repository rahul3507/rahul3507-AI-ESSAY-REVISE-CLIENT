/** @format */

import {
  Bell,
  BookOpenText,
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
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import EssayList from "../UploadEssay/EssayList";
import apiClient from "../../../lib/api-client";

const StudentHomePage = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/students/dashboard/");
        setDashboardData(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Transform API data for chart
  // Transform API data for chart
  const getChartData = () => {
    if (!dashboardData?.monthly_essay_activities) return [];

    const months = Object.keys(dashboardData.monthly_essay_activities);
    return months.map((month) => {
      const monthData = dashboardData.monthly_essay_activities[month];
      return {
        name: month,
        grammar: monthData?.grammar || 0,
        arguments: monthData?.arguments || 0,
        clarity: monthData?.clarity || 0,
        vocabulary: monthData?.vocabulary || 0,
      };
    });
  };
  // Transform API data for summary cards
  const getSummaryData = () => {
    if (!dashboardData) return [];

    return [
      {
        title: "Total Essays",
        value: dashboardData.total_essays,

        totalMark: null,
      },
      {
        title: "Total Assignments",
        value: dashboardData.total_assignments,

        totalMark: null,
      },
      {
        title: "Teacher Feedback",
        value: dashboardData.teacher_feedback_count,

        totalMark: null,
      },
      {
        title: "Average Score",
        value: Math.round(dashboardData.average_score),

        totalMark: 100,
      },
    ];
  };

  // Transform API data for progress cards
  const getProgressData = () => {
    if (!dashboardData?.essay_progress) return [];

    const {
      grammar,
      clarity,
      arguments: argumentsScore,
      vocabulary,
    } = dashboardData.essay_progress;

    return [
      {
        title: "Grammar",
        icon: BookOpenText,
        time: "45 minutes",
        priority: "High priority",
        percentage: Math.round(grammar),
        bgColor: "#D1E9FF",
      },
      {
        title: "Clarity",
        icon: PenTool,
        time: "30 minutes",
        priority: "Medium priority",
        percentage: Math.round(clarity),
        bgColor: "#FDFFC2",
      },
      {
        title: "Argument Strength",
        icon: MessageSquareCode,
        time: "20 minutes",
        priority: "Medium priority",
        percentage: Math.round(argumentsScore),
        bgColor: "#CBFEE2",
      },
      {
        title: "Vocabulary",
        icon: MessageSquareCode,
        time: "20 minutes",
        priority: "Medium priority",
        percentage: Math.round(vocabulary),
        bgColor: "#FFF4FE",
      },
    ];
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-red-500">
          Error loading dashboard: {error}
        </div>
      </div>
    );
  }

  const chartData = getChartData();
  const summaryData = getSummaryData();
  const progressData = getProgressData();

  return (
    <div className="">
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
          <Button
            onClick={() => navigate("/upload_essay")}
            className="flex gap-2 bg-black hover:bg-black rounded-lg p-2 px-4 text-white cursor-pointer"
          >
            <Upload />
            Upload Essay
          </Button>
          <button size="icon" className="border-[#e3e4e6] bg-transparent">
            <Bell className="h-6 w-6" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {summaryData.map((item, index) => (
          <Card key={index} className="border-[#e3e4e6]">
            <CardContent className="px-6">
              <div className="text-lg text-black mb-1 border-b border-gray-200">
                {item.title}
              </div>
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
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="col-span-1 xl:col-span-2 rounded-2xl bg-gray-100 p-4">
          <h2 className="text-black font-bold text-2xl pb-4">
            Essay Activities
          </h2>
          <Card className=" bg-white border-white">
            <CardHeader>
              <div className="grid grid-cols-1 md:grid-cols-5 w-full  mb-6">
                <div className=" col-span-1 md:col-span-3 w-full ">
                  <div className="text-4xl font-bold text-black pb-2">
                    {dashboardData?.total_essays || 0}
                    <span className="text-sm text-gray-400 font-normal">
                      /Essays
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    Keep up the great work! Your writing skills are improving.
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
                      data={chartData}
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
                        dataKey="arguments"
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
                  Based on your performance
                </div>
              </div>
              <div className="">
                <div className="text-4xl font-bold text-black pb-2">
                  {Math.round(dashboardData?.average_score || 0)}
                  <span className="text-sm text-gray-400 font-normal">
                    /100
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
                          : item?.percentage >= 40 && item?.percentage < 70
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
      <div>
        <EssayList />
      </div>
    </div>
  );
};

export default StudentHomePage;
