/** @format */

import { Button } from "./../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./../../../components/ui/table";
import { FileText } from "lucide-react";
import apiClient from "../../../lib/api-client";

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

const EssayList = () => {
  return (
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
                {data.status}
              </TableCell>
              <TableCell className="text-right">
                <Button className="bg-[#34C724] hover:bg-[#34C724] text-white cursor-pointer ">
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default EssayList;
