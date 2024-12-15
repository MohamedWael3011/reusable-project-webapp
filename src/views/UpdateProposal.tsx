import TextInput from "@/components/ui/TextInput";
import ComboBox from "@/components/ui/combobox";
import UserSidepanel from "@/components/ui/UserSidepanel";
import React, { useState } from 'react';
import { Button } from "../components/ui/button";


const Updateproposal: React.FC = () => {
    const [proposalID, setProposalId] = useState("");
    const [ProposalTitle, setProposalTitle] = useState("");
    const [projectTheme, setProjectTheme] = useState("");
    const [Proposalcontent, setProposalcontent] = useState("Lorem ipsum dolor sit amet consectetur. Elit at massa amet netus urna ornare vulputate arcu. Elit egestas non et ut pulvinar cursus non. Vitae id placerat ultrices elementum vel arcu libero. Sodales fermentum platea ultricies sed. Aliquam mattis pulvinar et vel parturient. At tincidunt venenatis et consectetur sit. Urna arcu vulputate at platea amet ipsum ultricies Velit eleifend sit purus enim sed maecenas. Scelerisque porttitor eu vel purus vel. Vitae quis quisque erat neque non dolor quis dui nec. Auctor at id a ac. Amet sed nisi mollis mi in id mauris ");

    
    const handleUpdate = () => {
        // Logic for adding the theme
        console.log({ proposalID,ProposalTitle,projectTheme,Proposalcontent});
    };

    return (

        <div className="flex h-screen">
            {/* Left Section: Side Menu */}
            <div className="w-[510px]">
                {/* <SideMenu /> */}
               <UserSidepanel/>
            </div>

        
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-3xl flex space-x-8">
                    
                    <div className="flex-1 space-y-8">
                       
                        <h1 className="text-2xl text-[#033469] font-bold mb-6">Update Proposal</h1>
                        <h1 className="text-2xl text-[#033469] font mb-6">Proposal Number: {proposalID}</h1>
                       
                        

                        <div className="flex space-x-4">
                        <div className="w-full">
                            
                            <TextInput
                                value={ProposalTitle}
                                onChange={(e) => setProposalTitle(e.target.value)}
                                placeholder="Enter Proposal ID"
                                label="Proposal ID"
                                required
                            />
                        </div>


                        <div className="w-full">
                            
                            <ComboBox
                              label="Project Theme"
                              value={projectTheme}
                              onChange={(e)=>setProjectTheme(e.target.value)}
                              options={["Reusbale","Maintenance","Agile","Managment"]}
                              placeholder="Select Project Theme"
                            />
                         </div>


                        </div>
                        
                       

                        <div className="mb-4 ">
                        <label className="block text-primary text-sm font-medium mb-1">Enter Your Proposal</label>
                        <textarea
                           placeholder="Content..."
                              value={Proposalcontent}
                             onChange={(e) => { setProposalcontent (e.target.value);
                           // e.target.style.height = "auto"; // Reset height to recalculate
                           // e.target.style.height = `${e.target.scrollHeight}px`; // Set height based on content
                          }}
                          required
                          className="w-full h-[100%] px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue text-black bg-blue-100  overflow-hidden"
                           style={{ minHeight: "4rem" }}
                          />
                           {/* // Minimum height for initial display */}
                     

                        

            <div className="mt-6 flex space-x-4">
                <Button onClick={handleUpdate} className="bg-[#033469] text-white">
                    Update
                </Button>
                <Button 
                    className="border border-[#033469] text-[#033469] bg-transparent hover:bg-[#033469] hover:text-white">
                    Cancel
                </Button>
          </div>
                   

                    
                   

                       
                      
                    </div>
                </div>
            </div>
        </div>
        </div>
    );
};

export default Updateproposal;
