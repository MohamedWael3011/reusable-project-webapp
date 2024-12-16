/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import TableUser from "@/components/ui/TableUser";
import UserSidepanel from "@/components/ui/UserSidepanel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { getSubBeforeDeadline, deleteProposal } from "../apis/user.api"; // Import the API functions

const columns = ["SubmissionId", "Title", "Status", "delete"]; // Added "Delete" column

export const UserDeleteView: React.FC = () => {
  const [data, setData] = useState<any[]>([]); // State to hold the fetched submissions
  const [loading, setLoading] = useState<boolean>(true); // Loading state for fetching data
  const [error, setError] = useState<string | null>(null); // State to hold any error messages

  // Fetch submissions when the component mounts
  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const submissions = await getSubBeforeDeadline();
        setData(submissions); // Update state with fetched data
        console.log(submissions)
      } catch (error) {
        setError("Failed to fetch submissions");
        console.error("Error fetching submissions:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, []); // Empty dependency array ensures this runs only once after mount

  // Handle delete functionality
  const handleDelete = async (id: number) => {
    try {
      const isDeleted = await deleteProposal(id);
      if (isDeleted) {
        setData((prevData) => prevData.filter((item) => item.SubmissionId !== id));
      } else {
        setError("Failed to delete the proposal");
      }
    } catch (error) {
      setError("An error occurred while deleting the proposal");
      console.error("Error deleting proposal:", error);
    }
  };

  const tableData = data.map((item) => ({
    ...item,
    delete: (
      <div
        className="hover:cursor-pointer text-red-500"
        onClick={() => handleDelete(item.SubmissionId)}
      >
        <FontAwesomeIcon icon={faTrash} style={{ marginRight: 5 }} />
        Delete
      </div>
    ),
  }));

  return (
    <div className="flex grid grid-cols-12">
      <UserSidepanel />
      <div className="col-span-9 flex items-start justify-center mt-44">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "red" }}>{error}</p>
        ) : (
          <TableUser title="Your Projects" columns={columns} data={tableData} />
        )}
      </div>
    </div>
  );
};

export default UserDeleteView;
