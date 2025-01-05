import DropdownComponent from "@/components/ui/dropdown";
import LOGO from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faRecycle, faUser } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks/useUser";
import { Button } from "./button";

interface RefereeSidepanelProps {
  refereeName: string;
  refereeId: string | number; // Use number if IDs are numeric
}

const RefereeSidepanel: React.FC<RefereeSidepanelProps> = ({ refereeName, refereeId }) => {
  const dropdown1Title = "Review";
  const dropdown1Options = [
    {
      label: "Review Proposal",
      icon: <FontAwesomeIcon icon={faPaperPlane} />,
    },
    {
      label: "Review Report",
      icon: <FontAwesomeIcon icon={faRecycle} />,
    },
  ];

  const { logout } = useUser();
  const navigate = useNavigate();

  const handleManageSelect = (option: string) => {
    switch (option) {
      case "Review Proposal":
        navigate("/referee/Proposals");
        break;
      case "Review Report":
        navigate("/referee/ReportsPage");
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-background h-[100%] overflow-hidden w-full">
      <div className="flex flex-col h-[100%] pt-10 pb-10  justify-evenly items-center bg-[#CEE0F3] w-full ">
        <img src={LOGO} className="w-48" alt="Logo" />
        <div className="flex justify-center flex-col cursor-pointer" onClick={() => navigate("/referee")}>
          <FontAwesomeIcon
            icon={faUser}
            size="2xl"
            style={{ color: "#033469" }}
          />


          <span className="text-primary text-2xl text-center">{refereeName} <br/> ID: {refereeId}</span>
        </div>
        <div className="flex flex-col justify-center gap-0">
          <div>
            <DropdownComponent 
              title={dropdown1Title} 
              options={dropdown1Options} 
              onOptionSelect={handleManageSelect} 
              onChange={handleManageSelect} 
            />
          </div>
        </div>
        <Button
          className="w-[50%] flex justify-center items-center -mt-10 h-10 text-white bg-green-500 rounded-lg z-10"
          onClick={logout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default RefereeSidepanel;
