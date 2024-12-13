import DropdownComponent from "@/components/ui/dropdown";
import LOGO from "../assets/logo.png";



const UserMainView = () => {
    const dropdownTitle = "Anso title";
    const dropdownOptions = [
        "ay klam Dropdown",
        "sdsa"
    ];
    
    return (
        <div className="bg-background h-screen grid lg:grid-cols-[30%_auto]">
            <div className="flex flex-col justify-evenly items-center gap-5">
                <img src={LOGO} className="w-48" />
                <div className="flex flex-col justify-between h-52">
                    <div className="">
                        <DropdownComponent title={dropdownTitle} options={dropdownOptions} />
                    </div>
                    <div className="">
                        <DropdownComponent title={dropdownTitle} options={dropdownOptions} />
                    </div>
                </div>
            </div>
            <div className="flex flex-col justify-center items-center gap-10 bg-[#CEE0F3]">
                <div className="flex w-full justify-evenly">
                </div>
            </div>
        </div>
    )
}

export default UserMainView
