/** @format */

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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

const EssayList = () => {
  const [essays, setEssays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchEssays();
  }, []);

  const fetchEssays = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get("/students/essays/");
      setEssays(response.data);
      setError(null);
    } catch (err) {
      console.error("Error fetching essays:", err);
      setError("Failed to load essays");
    } finally {
      setLoading(false);
    }
  };

  const handleViewClick = (essayId) => {
    navigate(`/essay_result/${essayId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getFileName = (fileUrl, title) => {
    if (fileUrl) {
      // Extract filename from URL
      const urlParts = fileUrl.split("/");
      const fileName = urlParts[urlParts.length - 1];
      // Remove file extension for display
      return fileName.split(".")[0] || title || "Essay";
    }
    return title || "Essay";
  };

  const getStatusText = (status) => {
    switch (status) {
      case "reviewed":
        return "Complete";
      case "pending":
        return "Pending";
      case "draft":
        return "Draft";
      default:
        return status;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "reviewed":
        return "text-[#34C724]";
      case "pending":
        return "text-yellow-500";
      case "draft":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  if (loading) {
    return (
      <div className="pt-6">
        <h1 className="text-black text-2xl pb-2">Recent Assignments</h1>
        <div className="flex justify-center items-center py-8">
          <div className="text-gray-500">Loading essays...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pt-6">
        <h1 className="text-black text-2xl pb-2">Recent Essays</h1>
        <div className="flex justify-center items-center py-8">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-6">
      <h1 className="text-black text-2xl pb-2">Recent Essays</h1>
      <Table>
        <TableHeader>
          <TableRow className="text-xl">
            <TableHead>File Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {essays.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                No essays found
              </TableCell>
            </TableRow>
          ) : (
            essays.map((essay) => (
              <TableRow key={essay.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <FileText className="text-blue-600 w-8 h-8" />
                    <div className="text-lg">
                      {getFileName(essay.file_upload, essay.title)}
                      <p className="text-base text-gray-400">
                        {essay.essay_type} essay
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-base text-gray-400">
                  {formatDate(essay.submitted_at)}
                </TableCell>
                <TableCell
                  className={`${getStatusColor(essay.status)} text-base`}
                >
                  {getStatusText(essay.status)}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    className="bg-[#34C724] hover:bg-[#34C724] text-white cursor-pointer"
                    onClick={() => handleViewClick(essay.id)}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default EssayList;
