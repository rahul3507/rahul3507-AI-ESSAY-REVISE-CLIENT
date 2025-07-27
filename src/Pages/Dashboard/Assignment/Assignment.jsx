/** @format */

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge, Calendar, FileText, User } from "lucide-react";
import { Button } from "../../../components/ui/button";

const Assignment = () => {
  return (
    <section className=" px-4  ">
      <h1 className="text-black text-3xl font-bold mb-8">Assignments</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <Card className="shadow-lg bg-[#F5F8FF] p-0">
          <CardHeader className="space-y-2 pt-4 bg-gray-200 rounded-t-2xl">
            <div className="flex items-start justify-between">
              <div className="space-y-2 w-full">
                <CardTitle className="text-lg font-bold text-gray-900">
                  Climate Change Argument
                </CardTitle>
                <div className="w-full justify-between flex">
                  <CardDescription className="text-vase text-gray-600 flex items-center gap-2">
                    <FileText className="w-4 h-4" />
                    Argumentative
                  </CardDescription>

                  <CardDescription className="text-vase text-gray-600 flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-base">Dr. Sarah Johnson</span>
                  </CardDescription>
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="  ">
              <p className="text-gray-500 leading-relaxed">
                Write a persuasive essay about climate change solutions
              </p>
            </div>

            <div className="flex items-center justify-between pb-4 border-b border-gray-200">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-black">
                  <Calendar className="w-4 h-4" />
                  <span className="font-medium">Due Date</span>
                </div>
                <p className="text-lg  text-gray-400">Aug 15, 2025</p>
              </div>

              <div className="space-y-2 ">
                <div className="text-gray-600 font-medium text-center">
                  Status
                </div>
                <div className="px-3 py-0.5 rounded-2xl bg-amber-500">
                  Pending
                </div>
              </div>
            </div>

            <div className="mb-4">
              <Button className="cursor-pointer rounded-lg bg-slate-700 hover:bg-slate-800 text-white font-medium py-4">
                Submit Essay
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Assignment;
