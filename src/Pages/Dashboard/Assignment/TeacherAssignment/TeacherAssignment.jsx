/** @format */

import { PenLine, Trash2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../components/ui/card";
import { Button } from "../../../../components/ui/button";

const TeacherAssignment = () => {
  return (
    <section className="px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-4">
        <h1 className="text-black text-xl md:text-3xl font-bold">Assignment</h1>
        <Button className="bg-black text-white px-2 py-1 rounded-md gap-1 cursor-pointer hover:bg-gray-900">
          Create Assignment
        </Button>
      </div>
      <Card className="w-full max-w-md mx-auto bg-blue-50 shadow-lg rounded-lg overflow-hidden py-0">
        <CardHeader className="bg-blue-500 text-white p-4">
          <CardTitle className="text-2xl font-bold">
            Climate Change Argument
          </CardTitle>
          <div className="flex justify-between items-center">
            <CardDescription className="text-blue-300 text-base">
              Argumentative
            </CardDescription>

            <CardDescription className="text-right  text-blue-300 text-base">
              Dr. Sarah Johnson
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="px-4 py-0">
          <p className="text-gray-700 mb-2">
            Write a persuasive essay about climate change solutions
          </p>
          <div className="flex justify-between text-sm text-gray-500 mt-6 ">
            <div>
              <span className="font-semibold ">Due Date</span>
              <p>Aug 15, 2025</p>
            </div>
            <div>
              <span className="font-semibold ">Issue date</span>
              <p>Aug 10, 2025</p>
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-2 bg-gray-50 flex justify-between items-center mx-4 mb-4 rounded-2xl">
          <div className="text-base text-gray-600">
            <span>1 Submission | 1 reviewed</span>
          </div>
          <div className="flex space-x-2">
            <Button className="text-blue-600 hover:text-blue-800  bg-white hover:bg-gray-50">
              <PenLine className="text-black size-5" />
            </Button>
            <Button className=" bg-white hover:bg-gray-50 border-none">
              <Trash2 className="text-red-600 hover:text-red-800 size-5" />
            </Button>
          </div>
        </CardFooter>
      </Card>
    </section>
  );
};

export default TeacherAssignment;
