/** @format */

import { Card, CardContent } from "../../../../components/ui/card";

const data2 = [
  {
    title: "Total Student",
    value: 12,
    totalMark: null,
  },
  {
    title: "Total Essays Submit",
    value: 9,
    totalMark: null,
  },
  {
    title: "Pending Review",
    value: 9,
    totalMark: null,
  },
  {
    title: "Average Score",
    value: 5,
    totalMark: 12,
  },
];

const TeacherHome = () => {
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
        {data2.map((item, index) => (
          <Card key={index} className="border-gray-200">
            <CardContent className="px-6">
              <div className="text-lg text-black mb-1 border-b border-gray-200 ">
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
    </div>
  );
};

export default TeacherHome;
