import DropdownComponent from "@/components/ui/dropdown";
import LOGO from "../assets/logo.png";
import RefereeIcon from "../assets/referee-icon.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRecycle } from '@fortawesome/free-solid-svg-icons';



const  DetailedProposalView = () => {
  const [selectedScreen, setSelectedScreen] = useState("Proposals"); // Default screen
  // const [proposalStatus, setProposalStatus] = useState("");
  // const [feedback, setFeedback] = useState(""); 

  const dropdownTitle = "Review"; // Title for dropdown
  const dropdownOptions = [
    {
      label: "Review Proposal",
      icon: <FontAwesomeIcon icon={faPaperPlane} />,
    },
    {
      label: "Review Report",
      icon: <FontAwesomeIcon icon={faRecycle} />,
    },
  ];

  const proposalDetails = {
    id: 1,
    theme: "Project",
    title: "Reusable",
    description: "This section is dedicated to providing a comprehensive and detailed description of the proposal. Here, you will find a thorough explanation of the objectives, goals, scope, and potential impact of the proposal. It outlines the key elements, the rationale behind the proposal, and any supporting information that gives context to the initiative.",
  };


  const handleDropdownChange = (option:string) => {
    setSelectedScreen(option === "Review Proposal" ? "Proposals" : "Reports");
  };
  

  
  return (
    <div className="bg-background h-screen grid lg:grid-cols-[25%_auto]">
     {/* Sidebar Section */}
      <div className="flex flex-col items-center bg-[#CEE0F3]">
        <img src={LOGO} className="w-48 py-10" alt="Logo" />
        <div className="flex flex-col items-center">
          <img src={RefereeIcon} className="w-30 h-20" alt="Referee Icon" />
          <span className="font-semibold text-1xl font-bold text-[#003366] mb-5">Referee Name</span>
        </div>

        <div>
        <DropdownComponent
            title={dropdownTitle}
            options={dropdownOptions}
            onChange={handleDropdownChange}
          />
        </div>
        <div className="flex flex-col justify-center gap-6">
  {/* Logout Button */}
  <button className="bg-green-600 text-white w-40 py-2 px-4 rounded-lg hover:bg-green-800">
    Logout
  </button>
</div>

      </div>

      {/* Main Content Section */}
      <div className="flex flex-col py-10 px-10">
        {/* Header Section */}
        <div className="flex space-x-4 w-full justify-between pr-40 pb-5 pl-5">
  <p className="text-2xl font-bold text-[#003366]">{`Proposal ${proposalDetails.id}`}</p>
  <p className="text-2xl font-bold text-[#003366]">{proposalDetails.theme}</p>
  <p className="text-2xl font-bold text-[#003366]">{`${proposalDetails.title}`}</p>
        </div>
  {/* Proposal Details Section */}
        <div className="bg-[#CEE0F3] w-full max-w-4xl p-6 rounded-xl shadow-md mb-10">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-[#003366]">Description</h3>
            <p className="text-blue-900 text-lg pt-3">{proposalDetails.description}</p>
          </div>

        </div>

        {/* <div className="bg-[#CEE0F3] w-full max-w-4xl p-6 rounded-xl shadow-md"> */}
    <div className="mb-4">
        <h3 className="text-lg font-bold text-[#003366] pb-3 pl-2">Proposal Status</h3>
        <label htmlFor="proposal-status" className="bg-[#CEE0F3] block text-sm font-semibold text-[#003366]"></label>
    <select id="proposal-status" className=" p-3 mt-2 border border-[#003366] rounded-lg bg-[#CEE0F3] text-[#003366]">
      <option value="" disabled selected>Select Status of this Proposal to send</option>
      <option value="pending">Pending</option>
      <option value="approved">Approved</option>
      <option value="rejected">Rejected</option>
      <option value="in-progress">In Progress</option>
    </select>
  {/* </div> */}


  <h3 className="text-lg font-bold text-[#003366] pt-10 pb-3 pl-2">Feedback</h3>
{/* <div className="bg-[#CEE0F3] w-full max-w-4xl p-6 rounded-xl shadow-md mb-20"> */}
  <div className="mb-4">
    <textarea
      className="w-full max-w-4xl rounded-xl p-6 bg-[#CEE0F3] text-[#003366]"
      placeholder="Please enter your feedback"
    ></textarea>
  </div>
{/* </div> */}


        </div>
        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-between pr-40">
  <button className="bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-white hover:text-blue-900">
    Send Feedback
  </button>
  <button className="bg-white border border-blue-900 text-blue-900 py-2 px-6 rounded-lg hover:bg-blue-900 hover:text-white">
    Back to Proposal
  </button>
</div>
      </div>
    </div>
  );
};

export default  DetailedProposalView ;
