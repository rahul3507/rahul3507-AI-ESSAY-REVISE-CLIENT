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
    <div className="w-full max-w-4xl mx-auto mt-4">
      <h2 className="text-lg font-semibold mb-2 text-gray-300">
        Billing History
      </h2>
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-700">
            <TableHead className="text-gray-400">Plan</TableHead>
            <TableHead className="text-gray-400">Issue</TableHead>
            <TableHead className="text-gray-400">Expire</TableHead>
            <TableHead className="text-gray-400">Amount</TableHead>
            <TableHead className="text-gray-400">Download</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {billingData.map((item, index) => (
            <TableRow key={index} className="border-b border-gray-800">
              <TableCell className="text-gray-300">{item.plan}</TableCell>
              <TableCell className="text-gray-300">{item.issue}</TableCell>
              <TableCell className="text-red-500">{item.expire}</TableCell>
              <TableCell className="text-gray-300">{item.amount}</TableCell>
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
