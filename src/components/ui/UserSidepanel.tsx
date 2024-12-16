import Dropdown from "@/components/ui/dropdown";
import LOGO from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPaperPlane,
  faUser,
  faRecycle,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { useUser } from "../../hooks/useUser";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

interface UserSidepanelProps {
  username: string; // Define the prop for username (email)
  id: number; // Define the prop for ID
}

const UserSidepanel: React.FC<UserSidepanelProps> = ({ username, id }) => {
  const { logout } = useUser();
  const dropdown1Title = "Proposals";
  const dropdown1Options = [
    {
      label: "Submit Proposal",
      icon: <FontAwesomeIcon icon={faPaperPlane} />,
    },
    {
      label: "Update Proposal",
      icon: <FontAwesomeIcon icon={faRecycle} />,
    },
    {
      label: "Delete Proposal",
      icon: <FontAwesomeIcon icon={faTrash} />,
    },
  ];

  const dropdown2Title = "Reports";
  const dropdown2Options = [
    {
      label: "Submit Report",
      icon: <FontAwesomeIcon icon={faPaperPlane} />,
    },
  ];

  const dropdown3Title = "Notifications";
  const dropdown3Options = [
    {
      label: "Email",
      icon: <FontAwesomeIcon icon={faEnvelope} />,
    },
  ];

  const navigate = useNavigate();

  const handleManageSelect = (option: string) => {
    switch (option) {
      case "Submit Proposal":
        navigate("/user/submitproposal");
        break;
      case "Update Proposal":
        navigate("/user/updateproposal");
        break;
      case "Delete Proposal":
        navigate("/user/deleteproposal");
        break;
      case "Submit Report":
        navigate("/user/submitreport");
        break;
      case "Email":
        navigate("/user");
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-background h-fit w-full col-span-3 overflow-hidden">
      <div className="flex flex-col pt-5 pb-10 gap-3 justify-center items-center bg-[#CEE0F3] w-full">
        <img src={LOGO} className="w-36" alt="Logo" />
        <div className="flex justify-center flex-col items-center">
          <FontAwesomeIcon
            icon={faUser}
            size="2xl"
            style={{ color: "#033469" }}
          />
          <span className="text-primary text-2xl text-center">{username}</span>
          <span className="text-gray-500 text-lg">ID: {id}</span>
        </div>
        <div className="flex flex-col justify-center ">
          <div>
            <Dropdown
              title={dropdown1Title}
              options={dropdown1Options}
              onOptionSelect={handleManageSelect}
              onChange={handleManageSelect}
            />
          </div>
          <div>
            <Dropdown
              title={dropdown2Title}
              options={dropdown2Options}
              onOptionSelect={handleManageSelect}
              onChange={handleManageSelect}
            />
          </div>
          <div>
            <Dropdown
              title={dropdown3Title}
              options={dropdown3Options}
              onOptionSelect={handleManageSelect}
              onChange={handleManageSelect}
            />
          </div>
          <Button
            className="w-full flex justify-center items-center -mt-10 h-10 text-white bg-green-500 rounded-lg z-10"
            onClick={logout}
          >
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserSidepanel;
