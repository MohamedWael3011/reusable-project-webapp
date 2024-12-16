import { useEffect, useState } from "react";
import DropdownComponent from "@/components/ui/dropdown";
import LOGO from "../assets/logo.png";
import RefereeIcon from "../assets/referee-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button";
import { useUser } from "../hooks/useUser";
import { viewAllproposals, getReport, Proposals } from "@/apis/referee.api";
import RefereeSidepanel from "@/components/ui/RefereeSidepanel";

const Referee = () => {
  const dropdownTitle = "Review";
  const { logout } = useUser();
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

  //const [selectedScreen, setSelectedScreen] = useState("Proposals"); // Default screen

  // const proposals = [
  //   { id: 2, theme: "assignment", title: "OS" },
  //   { id: 3, theme: "Project", title: "Sp" },
  //   { id: 4, theme: "assignment", title: "Spm" },
  //   { id: 5, theme: "assignment", title: "DS" },
  //   { id: 1, theme: "Project", title: "DB" },
  //   { id: 6, theme: "Project", title: "DB" },
  // ];

  // const reports = [
  //   { id: 2, theme: "assignment", title: "OS" },
  //   { id: 3, theme: "Project", title: "Sp" },
  //   { id: 4, theme: "assignment", title: "Spm" },
  //   { id: 5, theme: "assignment", title: "DS" },
  //   { id: 1, theme: "Project", title: "DB" },
  //   { id: 6, theme: "Project", title: "DB" },
  // ];


  const [proposalData, setProposalData] = useState<Proposals[] | null>([]);
  const [reportData, setReportData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedScreen, setSelectedScreen] = useState("Proposals");

  useEffect(() => {
    const fetchProposalData = async () => {
      setLoading(true);
      try {
        const proposals = await viewAllproposals(); // Fetch themes from the API
        setProposalData(proposals);
      } catch (error) {
        console.error("Error fetching themes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProposalData();
  }, [selectedScreen]);

  // const fetchProposalData = async () => {
  //   const data = await viewAllproposals(); // Pass the `subid` dynamically if needed
  //   if (data) {
  //     setProposalData(data.Table || []); // Adjust based on the response structure
  //   }
  // };

  const fetchReportData = async () => {
    const data = await getReport(1); // Pass the `reportid` dynamically if needed
    if (data) {
      setReportData(data.Table || []); // Adjust based on the response structure
    }
  };

  const handleDropdownChange = (option: string) => {
    if (option === "Review Proposal") {
      setSelectedScreen("Proposals");
    } else if (option === "Review Report") {
      setSelectedScreen("Reports");
    }
  };

  return (
    <div className="bg-background h-screen grid lg:grid-cols-[25%_auto]">
      <RefereeSidepanel />
      <div className="flex flex-col py-20 pl-6">

        <h2 className="text-2xl font-bold text-[#003366] mb-4 text-left pl-4">
          {selectedScreen === "Proposals" ? "Proposals" : "Reports"}
        </h2>
        <p className="text-blue-900 mb-3 text-left pl-2">
          {selectedScreen === "Proposals"
            ? "Select proposal to review its content and send its comments"
            : "Select report to view its content"}
        </p>

        <div className="bg-[#CEE0F3] w-full max-w-4xl overflow-x-auto p-4 rounded-xl">
          <table className="table-auto w-full border-collapse text-black">
            <thead>

              {selectedScreen === "Proposals"
                ?
                <tr className="text-[#003366]">
                  <th className="border-b-2 py-2 px-4 text-left">ID</th>
                  <th className="border-b-2 py-2 px-4 text-left">Theme Name</th>
                  <th className="border-b-2 py-2 px-4 text-left">Title</th>
                  <th className="border-b-2 py-2 px-4 text-right pr-9"></th>
                </tr>
                : <tr className="text-[#003366]">
                  <th className="border-b-2 py-2 px-4 text-left">ID</th>
                  <th className="border-b-2 py-2 px-4 text-left">Reports</th>
                  <th className="border-b-2 py-2 px-4 text-left">Title</th>
                  <th className="border-b-2 py-2 px-4 text-right pr-9"></th>
                </tr>}

            </thead>
            <tbody>
              {(selectedScreen === "Proposals" ? proposalData : reportData)?.map((item) => (
                <tr key={item.id} className="hover:bg-[#D1E8F7]">
                  <td className="border-b py-3 px-4 text-black">{item.id}</td>
                  <td className="border-b py-3 px-4 text-black">{item.theme}</td>
                  <td className="border-b py-3 px-4 text-black flex items-center">{item.title}</td>
                  <td className="text-lg border-b py-3 px-4 text-right pr-9 text-black">&gt;</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Referee;
