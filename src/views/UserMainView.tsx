import DropdownComponent from "@/components/ui/dropdown";
import LOGO from "../assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faPaperPlane, faRecycle } from '@fortawesome/free-solid-svg-icons'
import { faDownLeftAndUpRightToCenter } from "@fortawesome/free-solid-svg-icons/faDownLeftAndUpRightToCenter";

const UserMainView: React.FC = () => {
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
      <div className="bg-background h-screen grid md:grid-cols-6 overflow-hidden">
        <div className="flex flex-col pt-10 pb-10 gap-5 justify-evenly items-center bg-[#CEE0F3] col-span-2">
          <img src={LOGO} className="w-48" alt="Logo" />
          <div className="flex flex-col justify-center gap-0 ">
            <div>
              <DropdownComponent title={dropdown1Title} options={dropdown1Options} />
            </div>
            <div>
              <DropdownComponent title={dropdown2Title} options={dropdown2Options} />
            </div>
            <div>
              <DropdownComponent title={dropdown3Title} options={dropdown3Options} />
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center col-span-4">
          <div className="flex w-full justify-evenly">

          </div>
        </div>
      </div>
    );
  };

export default UserMainView;


