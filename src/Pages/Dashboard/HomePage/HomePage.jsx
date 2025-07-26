/** @format */

import { Bell, Upload } from "lucide-react";
import { Button } from "./../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "./../../../components/ui/card";

const HomePage = () => {
  const data = [
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
        {data.map((item, index) => (
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

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-2xl bg-gray-100 p-4">
          <h2 className="text-black font-bold text-2xl pb-4">
            Essay Activates
          </h2>
          <Card className="col-span-2 bg-white border-white">
            <CardHeader>
              <div className="grid grid-cols-5 w-full ">
                <div className=" col-span-3 w-full ">
                  <div className="text-4xl font-bold text-black pb-2">
                    1,665
                    <span className="text-sm text-[#a1a1a1] font-normal">
                      /Essay
                    </span>
                  </div>
                  <p className="text-sm text-gray-400">
                    You&apos;ve achieved a remarkable 79% increase compared to
                    last year!
                  </p>
                </div>
                <div className="col-span-2 grid grid-cols-2 items-center gap-6 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-[#647187]">Grammar</span>
                    <div className="w-8 h-4 rounded-xl bg-[#3096f5]"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#647187]">Argument Strength</span>
                    <div className="w-8 h-4 rounded-xl bg-[#29bc99]"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#647187]">Clarity</span>
                    <div className="w-8 h-4 rounded-xl bg-[#e2e58a]"></div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[#647187]">Vocabulary</span>
                    <div className="w-8 h-4 rounded-xl bg-[#f428e0]"></div>
                  </div>
                </div>
              </div>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
