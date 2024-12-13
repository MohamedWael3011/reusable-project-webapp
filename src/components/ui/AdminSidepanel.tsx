import DropdownComponent from "@/components/ui/dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPaperPlane, faRecycle, faTrash, faUser } from '@fortawesome/free-solid-svg-icons'
import LOGO from "../../assets/logo.png"
//import { useNavigate } from "react-router-dom";


const AdminSidepanel: React.FC = () => {
  //const navigate = useNavigate();

    const dropdown1Title = "Manage Themes";
    const dropdown1Options = [
      {
        label: "Add Theme",
        icon: <FontAwesomeIcon icon={faPaperPlane} />,
        //onclick: () => navigate("/AddTheme"),
        //onOptionSelect: () => navigate("/AddTheme")
      },
      {
        label: "Update Theme",
        icon: <FontAwesomeIcon icon={faRecycle} />
      },
      {
        label: "Delete Theme",
        icon: <FontAwesomeIcon icon={faTrash} />
      }
    ];

      const dropdown2Title = "Manage Submissions";
      const dropdown2Options = [
        {
          label: "Assign Referee",
          icon: <FontAwesomeIcon icon={faPaperPlane} />
        },
       
    ];

    const dropdown3Title = "Final Reports";
    const dropdown3Options = [
      {
        label: "Send Final Report",
        icon: <FontAwesomeIcon icon={faPaperPlane} />
      }
  ];

  
    return (
      <div className="bg-background h-screen overflow-hidden w-full col-span-3">
        <div className="flex flex-col pt-10 pb-10 gap-5 justify-evenly items-center bg-[#CEE0F3] w-full ">
          <img src={LOGO} className="w-48" alt="Logo" />
          <div className="flex justify-center flex-col ">
            <FontAwesomeIcon icon={faUser} size="2xl" style={{color: "#033469",}}/>
            <span className="  text-primary text-2xl  mb-6 text-center">Admin</span>
          </div>
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
      </div>
    );
  };

export default AdminSidepanel;


