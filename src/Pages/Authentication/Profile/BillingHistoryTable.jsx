/** @format */

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";

const billingData = [
  {
    plan: "Monthly",
    issue: "12/06/2024",
    expire: "12/07/2024",
    amount: "$55",
    download: "Download PDF",
  },
  {
    plan: "Monthly",
    issue: "12/06/2024",
    expire: "12/07/2024",
    amount: "$55",
    download: "Download PDF",
  },
  {
    plan: "Monthly",
    issue: "12/06/2024",
    expire: "12/07/2024",
    amount: "$55",
    download: "Download PDF",
  },
  {
    plan: "Monthly",
    issue: "12/04/2023",
    expire: "12/05/2024",
    amount: "$265",
    download: "Download PDF",
  },
];

export default function BillingHistoryTable() {
  return (
    <div className="w-full  mx-auto ">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-gray-600">Plan</TableHead>
            <TableHead className="text-gray-600">Issue</TableHead>
            <TableHead className="text-gray-600">Expire</TableHead>
            <TableHead className="text-gray-600">Amount</TableHead>
            <TableHead className="text-gray-600">Download</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billingData.map((item, index) => (
            <TableRow key={index} className="border-b-0  border-gray-800 ">
              <TableCell className="text-gray-400">{item.plan}</TableCell>
              <TableCell className="text-gray-400">{item.issue}</TableCell>
              <TableCell className="text-red-500">{item.expire}</TableCell>
              <TableCell className="text-gray-400">{item.amount}</TableCell>
              <TableCell>
                <a href="#" className="text-blue-500 hover:underline">
                  {item.download}
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
