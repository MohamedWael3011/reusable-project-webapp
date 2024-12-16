import DropdownComponent from "@/components/ui/dropdown";
import LOGO from "../assets/logo.png";
import RefereeIcon from "../assets/referee-icon.png";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRecycle } from '@fortawesome/free-solid-svg-icons';
import RefereeSidepanel from "@/components/ui/RefereeSidepanel";
import { useLocation } from "react-router-dom";
import { getReport } from "@/apis/referee.api";
import { useNavigate } from "react-router-dom";

const DetailedReportsView = () => {
  const [selectedScreen, setSelectedScreen] = useState("Proposals"); // Default screen
  // const [proposalStatus, setProposalStatus] = useState("");
  // const [feedback, setFeedback] = useState(""); 




const repId = useLocation();

const [reportContent, setReportContent] = useState({

  ReportId:"",
  reportcontent:"",
  title:""

});

  useEffect(() => {
    // Fetch proposal details when submissionId is available
    const fetchReportDetails = async () => {
      if (repId) {
        try {
          const response = await getReport(repId.state); // Fetch data using API
          console.log(response);
          const { ReportId, reportcontent, title } = response;
          setReportContent({ ReportId, reportcontent, title });
        } catch (error) {
          console.error("Error fetching proposal details:", error);
        }
      }
    };

    fetchReportDetails();
  }, [repId]);



  return (
    <div className="bg-background h-screen grid lg:grid-cols-[25%_auto]">
      {/* Sidebar Section */}
      <div className="flex flex-col items-center bg-[#CEE0F3]">
      <RefereeSidepanel/>

      </div>

      {/* Main Content Section */}
      <div className="flex flex-col py-10 px-10">
        {/* Header Section */}
        <div className="flex space-x-4 w-full justify-between pr-40 pb-10 pl-5">
          <p className="text-2xl font-bold text-[#003366]">Report {reportContent.ReportId}</p>
          <p className="text-2xl font-bold text-[#003366]">{reportContent.title}</p>
          {/* <p className="text-2xl font-bold text-[#003366]">{Proposal ${proposalDetails.title}}</p> */}
        </div>
        {/* Proposal Details Section */}
        <div className="bg-[#CEE0F3] w-full max-w-4xl p-6 rounded-xl shadow-md mb-10">
          <div className="mb-4">
            <h3 className="text-lg font-bold text-[#003366]">Description</h3>
            <p className="text-blue-900 text-lg pt-3">{reportContent.reportcontent}</p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default DetailedReportsView;