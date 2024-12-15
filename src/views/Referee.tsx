import DropdownComponent from "@/components/ui/dropdown";
import LOGO from "../assets/logo.png";
import RefereeIcon from "../assets/referee-icon.png";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRecycle } from '@fortawesome/free-solid-svg-icons';
import { Button } from "@/components/ui/button";
import { useUser } from "../hooks/useUser";

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

  const [selectedScreen, setSelectedScreen] = useState("Proposals"); // Default screen

  const proposals = [
    { id: 2, theme: "assignment", title: "OS" },
    { id: 3, theme: "Project", title: "Sp" },
    { id: 4, theme: "assignment", title: "Spm" },
    { id: 5, theme: "assignment", title: "DS" },
    { id: 1, theme: "Project", title: "DB" },
    { id: 6, theme: "Project", title: "DB" },
  ];

  const reports = [
    { id: 2, theme: "assignment", title: "OS" },
    { id: 3, theme: "Project", title: "Sp" },
    { id: 4, theme: "assignment", title: "Spm" },
    { id: 5, theme: "assignment", title: "DS" },
    { id: 1, theme: "Project", title: "DB" },
    { id: 6, theme: "Project", title: "DB" },
  ];

  const handleDropdownChange = (option: string) => {
    if (option === "Review Proposal") {
      setSelectedScreen("Proposals");
    } else if (option === "Review Report") {
      setSelectedScreen("Reports");
    }
  };

  return (
    <div className="bg-background h-screen grid lg:grid-cols-[25%_auto]">
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
            onChange={handleDropdownChange} // Pass handleDropdownChange as the onChange handler
          />
        </div>
        <div className="flex flex-col justify-center gap-6">
        <Button
            className="w-full flex justify-center items-center -mt-10 h-10 text-white bg-green-500 rounded-lg z-10"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>

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
:  <tr className="text-[#003366]">
<th className="border-b-2 py-2 px-4 text-left">ID</th>
<th className="border-b-2 py-2 px-4 text-left">Reports</th>
<th className="border-b-2 py-2 px-4 text-left">Title</th>
<th className="border-b-2 py-2 px-4 text-right pr-9"></th>
 </tr>}

</thead>
            <tbody>
              {(selectedScreen === "Proposals" ? proposals : reports).map((item) => (
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
