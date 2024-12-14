import React, { useState } from 'react';
import Calendar from "../components/Calendar"; // Use the Calendar component
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import AdminSidePanel from "../components/ui/AdminSidepanel";

const SendReportRef: React.FC = () => {
    const [reporttitle, ReportTitle] = useState("");
    const [content, setcontent ]= useState("")
    const [refreeid, setRefId] = useState("");
    const [deadline, setDeadline] = useState<string | null>(null);

    const handlesened = (date: Date) => {
        setDeadline(date.toDateString());
    };

    const handlesend = () => {
        // Logic for adding the theme
        console.log({ reporttitle,content, refreeid, deadline });
    };

    return (
        <div className="flex h-screen">
            {/* Left Section: Side Menu */}
            <div className="w-[510px] bg-gray-200">
                 <AdminSidePanel /> 
            </div>

        
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-3xl flex space-x-8">
                    
                    <div className="flex-1 space-y-6">
                        <h1 className="text-2xl text-[#033469] font-bold mb-6">Send Report To Referee</h1>
                        <div>
                            
                            <TextInput
                                value={reporttitle}
                                onChange={(e) => ReportTitle(e.target.value)}
                                placeholder="Enter Report Title"
                                label="Report Title"
                                required
                            />
                        </div>
                        
                        <div className="mt-6 space-y-4">
                        <h2 className="text-sm text-[#033469] font-semibold ">Report Content</h2>
    
    <textarea
        value={content}
        onChange={(e) => setcontent(e.target.value)}
        placeholder="Enter your report content"
        className="w-[400px] h-[340px] p-4 border rounded-lg bg-[#F8F8F8] text-[#033469] focus:outline-none focus:ring-2 focus:ring-[#033469]"
    />
</div>

            <div className="mt-6 flex space-x-4">
                <Button onClick={handlesend} className="bg-[#033469] text-white">
                    Send Report
                </Button>
                <Button 
                    className="border border-[#033469] text-[#033469] bg-transparent hover:bg-[#033469] hover:text-white">
                    Cancle
                </Button>
            </div>
                    </div>

                    
                    <div className="flex-1 space-y-2">
                        <div className='mt-14 '>
                                
                                <TextInput
                                    value={refreeid}
                                    onChange={(e) => setRefId(e.target.value)}
                                    placeholder="enter Referee ID"
                                    label="Referee ID"
                                    required
                                />
                        </div>
                        <div >
                           
                            <TextInput
                                value={deadline || ""}
                                onChange={(e) => e.target.blur()} // Disable manual input
                                placeholder="Select Theme Deadline"
                                label="Deadline"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Calendar onDateSelect={handlesened} className="w-full bg-[#CEE0F3] rounded-xl p-4"/>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendReportRef;
