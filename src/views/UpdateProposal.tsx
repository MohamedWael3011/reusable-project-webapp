import TextInput from "@/components/ui/TextInput";
import UserSidepanel from "@/components/ui/UserSidepanel";
import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { updateProposal } from "../apis/user.api"; // Adjust the import path as needed
import { useUser } from '@/hooks/useUser';


const UpdateProposal: React.FC = () => {
  const [proposalID, setProposalId] = useState("");
  const [proposalContent, setProposalContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = useUser();

const handleUpdate = async () => {
  if (!proposalID || !proposalContent) {
    setErrorMessage("Please provide a valid Proposal ID and content.");
    return;
  }

  if (!user || !user.id) {
    setErrorMessage("User information is not available. Please log in again.");
    return;
  }

  setLoading(true);
  setSuccessMessage("");
  setErrorMessage("");

  try {
    const success = await updateProposal(parseInt(proposalID), user.id, proposalContent); // Pass user.id to the API call
    if (success) {
      setSuccessMessage("Proposal updated successfully!");
    } else {
      setErrorMessage("Failed to update the proposal. You may not have the correct permissions.");
    }
  } catch (error) {
    console.error("Error updating proposal:", error);
    setErrorMessage("An error occurred while updating the proposal.");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="flex h-screen">
      {/* Left Section: Side Menu */}
      <div className="w-[510px]">
            <UserSidepanel
                username={user?.name || "Unknown User"} 
                id={user?.id || 0} // ID or fallback
            />   
      </div>

      {/* Right Section: Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
        <div className="w-full max-w-3xl flex space-x-8">
          <div className="flex-1 space-y-8">
            <h1 className="text-2xl text-[#033469] font-bold mb-6">Update Proposal</h1>

            {/* Proposal ID Input */}
            <div className="w-full">
              <TextInput
                value={proposalID}
                onChange={(e) => setProposalId(e.target.value)}
                placeholder="Enter Proposal ID"
                label="Proposal ID"
                required
              />
            </div>

            {/* Proposal Content Textarea */}
            <div className="mb-4">
              <label className="block text-primary text-sm font-medium mb-1">
                Enter Your Proposal
              </label>
              <textarea
                placeholder="Content..."
                value={proposalContent}
                onChange={(e) => setProposalContent(e.target.value)}
                required
                className="w-full h-[150px] px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue text-black bg-blue-100"
              ></textarea>
            </div>

            {/* Buttons */}
            <div className="mt-6 flex space-x-4">
              <Button
                className="bg-[#033469] text-white"
                onClick={handleUpdate}
                disabled={loading}
              >
                {loading ? "Updating..." : "Update"}
              </Button>
              <Button
                className="border border-[#033469] text-[#033469] bg-transparent hover:bg-[#033469] hover:text-white"
                onClick={() => {
                  setProposalId("");
                  setProposalContent("");
                  setSuccessMessage("");
                  setErrorMessage("");
                }}
              >
                Cancel
              </Button>
            </div>

            {/* Feedback Messages */}
            {successMessage && (
              <p className="text-green-500 text-center mt-4">{successMessage}</p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProposal;
