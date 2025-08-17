/** @format */

import { useState, useEffect } from "react";
import { Card, CardContent } from "../../../../components/ui/card";
import TeachersEssayTable from "./TeachersEssayTable";
import apiClient from "../../../../lib/api-client";

const TeacherHome = () => {
  const [dashboardData, setDashboardData] = useState({
    total_students: 0,
    total_essays_submitted: 0,
    pending_reviews: 0,
    average_score: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get("/teachers/dashboard/");
        setDashboardData(response.data);
      } catch (err) {
        setError("Failed to fetch dashboard data");
        console.error("Dashboard API error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardCards = [
    {
      title: "Total Student",
      value: dashboardData.total_students,
      totalMark: null,
    },
    {
      title: "Total Essays Submit",
      value: dashboardData.total_essays_submitted,
      totalMark: null,
    },
    {
      title: "Pending Review",
      value: dashboardData.pending_reviews,
      totalMark: null,
    },
    {
      title: "Average Score",
      value: dashboardData.average_score,
      totalMark: 100,
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        {dashboardCards.map((item, index) => (
          <Card key={index} className="border-gray-200">
            <CardContent className="px-6">
              <div className="text-lg text-black mb-1 border-b border-gray-200 ">
                {item.title}
              </div>
              <div className="text-3xl font-bold text-black mb-1">
                {item.value}
                {item.totalMark && (
                  <span className="text-sm font-normal text-gray-500">
                    /{item.totalMark}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div>
        <TeachersEssayTable />
      </div>
    </div>
  );
};

export default TeacherHome;
