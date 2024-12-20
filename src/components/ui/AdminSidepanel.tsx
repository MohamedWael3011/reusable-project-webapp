import DropdownComponent from "@/components/ui/dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaperPlane,
  faRecycle,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import LOGO from "../../assets/logo.png";
import { useUser } from "../../hooks/useUser";
import { Button } from "./button";
import { useNavigate } from "react-router-dom";

interface AdminSidepanelProps {
  username: string; // Prop for username
  userId: number; // Prop for user ID
}

const AdminSidepanel: React.FC<AdminSidepanelProps> = ({ username, userId }) => {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleManageSelect = (option: string) => {
    switch (option) {
      case "Add Theme":
        navigate("/admin/addtheme");
        break;
      case "Update Theme":
        navigate("/admin/updatetheme");
        break;
      case "Delete Theme":
        navigate("/admin/deletetheme");
        break;
      case "Assign Referee":
        navigate("/admin/assignreferee");
        break;
      case "Send Final Report":
        navigate("/admin/sendfinalreports");
        break;
      default:
        break;
    }
  };

  const dropdown1Title = "Manage Themes";
  const dropdown1Options = [
    {
      label: "Add Theme",
      icon: <FontAwesomeIcon icon={faPaperPlane} />,
    },
    {
      label: "Update Theme",
      icon: <FontAwesomeIcon icon={faRecycle} />,
    },
    {
      label: "Delete Theme",
      icon: <FontAwesomeIcon icon={faTrash} />,
    },
  ];

  const dropdown2Title = "Manage Submissions";
  const dropdown2Options = [
    {
      label: "Assign Referee",
      icon: <FontAwesomeIcon icon={faPaperPlane} />,
    },
  ];

  const dropdown3Title = "Final Reports";
  const dropdown3Options = [
    {
      label: "Send Final Report",
      icon: <FontAwesomeIcon icon={faPaperPlane} />,
    },
  ];

  return (
    <div className="bg-background h-auto overflow-hidden w-full col-span-3">
      <div className="flex flex-col pt-5 pb-10 gap-5 justify-center items-center bg-[#CEE0F3] w-full ">
        <img src={LOGO} className="w-36" alt="Logo" />
        <div className="flex justify-center flex-col items-center cursor-pointer" onClick={()=>navigate("/admin")}>
          <FontAwesomeIcon
            icon={faUser}
            size="2xl"
            style={{ color: "#033469" }}
          />
          {/* Display username and ID */}
          <span className="text-primary text-2xl text-center">{username}</span>
          <span className="text-gray-500 text-lg">ID: {userId}</span>
        </div>
        <div className="flex flex-col justify-center">
          <DropdownComponent
            title={dropdown1Title}
            options={dropdown1Options}
            onOptionSelect={handleManageSelect}
            onChange={handleManageSelect}
          />
          <DropdownComponent
            title={dropdown2Title}
            options={dropdown2Options}
            onOptionSelect={handleManageSelect}
            onChange={handleManageSelect}
          />
          <DropdownComponent
            title={dropdown3Title}
            options={dropdown3Options}
            onOptionSelect={handleManageSelect}
            onChange={handleManageSelect}
          />
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

export default AdminSidepanel;
