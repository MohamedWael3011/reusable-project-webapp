import DropdownComponent from "@/components/ui/dropdown";
import LOGO from "../assets/logo.png";
import RefereeIcon from "../assets/referee-icon.png";
import { useState,useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { getProposal } from "@/apis/referee.api";
import { useLocation } from "react-router-dom";import RefereeSidepanel from "@/components/ui/RefereeSidepanel";



const  DetailedProposalView = () => {
  // const [proposalStatus, setProposalStatus] = useState("");
  // const [feedback, setFeedback] = useState(""); 
 
  const subId  = useLocation(); 
  const [selectedScreen, setSelectedScreen] = useState("Proposals"); // Default screen
  const [Proposals_desc, setProposalDetails] = useState({

    submissionId: "",
    themeid: "",
    title: "",
    proposal: "",
  });

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

  useEffect(() => {
    // Fetch proposal details when submissionId is available
    const fetchProposalDetails = async () => {
      if (subId) {
        try {
          const response = await getProposal(subId.state); // Fetch data using API
          console.log(response);
          const { submissionId, themeid, title, proposal } = response;
          setProposalDetails({ submissionId, themeid, title, proposal });
        } catch (error) {
          console.error("Error fetching proposal details:", error);
        }
      }
    };

    fetchProposalDetails();
  }, [subId]);

  const handleDropdownChange = (option:string) => {
    setSelectedScreen(option === "Review Proposal" ? "Proposals" : "Reports");
  };
  
  
  return (
    <div className="bg-background h-screen grid lg:grid-cols-[25%_auto]">
     {/* Sidebar Section */}
    <RefereeSidepanel/>

      {/* Main Content Section */}
      <div className="flex flex-col py-10 px-10">
        {/* Header Section */}
        <div className="flex space-x-4 w-full justify-between pr-40 pb-5 pl-5">
  <p className="text-2xl font-bold text-[#003366]">{`Proposal ${Proposals_desc.submissionId}`}</p>
  {/* <p className="text-2xl font-bold text-[#003366]">{Proposals_desc.themeid}</p> */}
  <p className="text-2xl font-bold text-[#003366]">{`${Proposals_desc.title}`}</p>
        </div>
  {/* Proposal Details Section */}
        <div className="bg-[#CEE0F3] w-full max-w-4xl p-6 rounded-xl shadow-md mb-10">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-[#003366]">Description</h3>
            <p className="text-blue-900 text-lg pt-3">{Proposals_desc.proposal}</p>
          </div>

        </div>

        {/* <div className="bg-[#CEE0F3] w-full max-w-4xl p-6 rounded-xl shadow-md"> */}
    <div className="mb-4">
        <h3 className="text-lg font-bold text-[#003366] pb-3 pl-2">Proposal Status</h3>
        <label htmlFor="proposal-status" className="bg-[#CEE0F3] block text-sm font-semibold text-[#003366]"></label>
    <select id="proposal-status" className=" p-3 mt-2 border border-[#003366] rounded-lg bg-[#CEE0F3] text-[#003366]">
      <option value="" disabled selected>Select Status of this Proposal to send</option>
      <option value="pending">pending</option>
      <option value="approved">accepted</option>
      <option value="rejected">rejected</option>
      <option value="in-progress">rquest modification</option>
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
