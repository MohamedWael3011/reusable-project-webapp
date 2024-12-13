import Dropdown from "@/components/ui/dropdown";
import LOGO from "../../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane, faUser, faRecycle } from '@fortawesome/free-solid-svg-icons'
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons/faDownLeftAndUpRightToCenter";

const UserSidepanel: React.FC = () => {
  const dropdown1Title = "Proposals";
  const dropdown1Options = [
    {
      label: "Submit",
      icon: <FontAwesomeIcon icon={faPaperPlane} />
    },
    {
      label: "Update",
      icon: <FontAwesomeIcon icon={faRecycle} />
    },
    {
      label: "Delete",
      icon: <FontAwesomeIcon icon={faDownLeftAndUpRightToCenter} />
    }
  ];

  const dropdown2Title = "Reports";
  const dropdown2Options = [
    {
      label: "ay klam Dropdown",
      icon: <FontAwesomeIcon icon={faPaperPlane} />
    },
    {
      label: "sdsa",
      icon: <FontAwesomeIcon icon={faRecycle} />
    }
  ];

  const dropdown3Title = "Notifications";
  const dropdown3Options = [
    {
      label: "Email",
      icon: <FontAwesomeIcon icon={faEnvelope} />
    }
  ];


  return (
    <div className="bg-background h-screen w-full col-span-3 overflow-hidden">
      <div className="flex flex-col pt-5 pb-10 gap-5 justify-center items-center bg-[#CEE0F3] w-full ">
        <img src={LOGO} className="w-36" alt="Logo" />
        <div className="flex justify-center flex-col ">
          <FontAwesomeIcon icon={faUser} size="2xl" style={{ color: "#033469", }} />
          <span className="text-primary text-2xl text-center">User</span>
        </div>
        <div className="flex flex-col justify-center gap-0 ">
          <div>
            <Dropdown title={dropdown1Title} options={dropdown1Options} />
          </div>
          <div>
            <Dropdown title={dropdown2Title} options={dropdown2Options} />
          </div>
          <div>
            <Dropdown title={dropdown3Title} options={dropdown3Options} />
          </div>
          <div className="w-full flex justify-center -mt-10">
            <button className="h-10 w-40 text-white bg-green-500 rounded-lg" >Logout</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSidepanel;

