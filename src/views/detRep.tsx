import DropdownComponent from "@/components/ui/dropdown";
import LOGO from "../assets/logo.png";
import RefereeIcon from "../assets/referee-icon.png";
import { useState } from "react";



const  DetailedReportsView = () => {
  const [selectedScreen, setSelectedScreen] = useState("Proposals"); // Default screen
  const dropdownTitle = "Referee name"; // Title for dropdown
  const dropdownOptions = [
    "Review Proposal",
    "Review Reports",
  ];

  const proposalDetails = {
    id: 1,
    theme: "Project",
    title: "Reusable",
    description: "This section is dedicated to providing a comprehensive and detailed description of the proposal. Here, you will find a thorough explanation of the objectives, goals, scope, and potential impact of the proposal. It outlines the key elements, the rationale behind the proposal, and any supporting information that gives context to the initiative.",
  };


  const handleDropdownChange = (option: string) => {
    if (option === "Review Proposal") {
      setSelectedScreen("Proposals");
    } else if (option === "Review Reports") {
      setSelectedScreen("Reports");
    }
  };
  return (
    <div className="bg-background h-screen grid lg:grid-cols-[20%_auto]">
      {/* Sidebar Section */}
      <div className="flex flex-col items-center bg-[#CEE0F3]">
        <img src={LOGO} className="w-48 py-10" alt="Logo" />
                {/* Referee Section */}
                <div className="flex flex-col items-center">
          <img src={RefereeIcon} className="w-30 h-20" alt="Referee Icon" />
          <span className="font-semibold text-1xl font-bold text-[#003366] mb-5">Referee Name</span>
        </div>

        <div className="flex flex-col justify-between h-62 mb-40">
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
        <div className="flex space-x-4 w-full justify-between pr-40 pb-10 pl-5">
  <p className="text-2xl font-bold text-[#003366]">{`Proposal ${proposalDetails.id}`}</p>
  <p className="text-2xl font-bold text-[#003366]">{proposalDetails.theme}</p>
  <p className="text-2xl font-bold text-[#003366]">{`Proposal ${proposalDetails.title}`}</p>
        </div>
  {/* Proposal Details Section */}
        <div className="bg-[#CEE0F3] w-full max-w-4xl p-6 rounded-xl shadow-md mb-10">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-[#003366]">Description</h3>
            <p className="text-blue-900 text-lg pt-3">{proposalDetails.description}</p>
          </div>

        </div>

        {/* <div className="bg-[#CEE0F3] w-full max-w-4xl p-6 rounded-xl shadow-md"> */}

        {/* Action Buttons */}
        <div className="flex gap-4 mt-8 justify-between pr-40">
  <button className="bg-blue-900 text-white py-2 px-6 rounded-lg hover:bg-white hover:text-blue-900">
    Back to Reports
  </button>

</div>
      </div>
    </div>
  );
};

export default  DetailedReportsView ;
