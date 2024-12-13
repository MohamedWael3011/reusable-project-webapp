import React, { useState } from 'react';
import Calendar from "../components/Calendar"; // Use the Calendar component
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";

const UpdateTheme: React.FC = () => {
    const [themID, setThemeId] = useState("");
    const [themeName, setThemeName] = useState("");
    const [duration, setDuration] = useState("");
    const [budget, setBudget] = useState("");
    const [deadline, setDeadline] = useState<string | null>(null);

    const handleDateSelect = (date: Date) => {
        setDeadline(date.toDateString());
    };

    const handleUpdate = () => {
        // Logic for adding the theme
        console.log({ themID,themeName, duration, budget, deadline });
    };

    return (
        <div className="flex h-screen">
            {/* Left Section: Side Menu */}
            <div className="w-[510px] bg-gray-200">
                {/* <SideMenu /> */}
            </div>

        
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-3xl flex space-x-8">
                    
                    <div className="flex-1 space-y-6">
                        <h1 className="text-2xl text-[#033469] font-bold mb-6">Update Themes</h1>
                        <div>
                            
                            <TextInput
                                value={themeName}
                                onChange={(e) => setThemeId(e.target.value)}
                                placeholder="Enter Theme ID"
                                label="Theme ID"
                                required
                            />
                        </div>
                        <div>
                            
                            <TextInput
                                value={themeName}
                                onChange={(e) => setThemeName(e.target.value)}
                                placeholder="Enter Theme Name"
                                label="Theme Name"
                                required
                            />
                        </div>

                        <div>
                         
                            <TextInput
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="Enter Theme Duration"
                                label="Duration"
                                required
                            />
                        </div>

                        <div>
                            <TextInput
                                //className="bg-[#CEE0F3]"
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                placeholder="Enter Theme Budget"
                                label="Budget"
                                required
                            />
                        </div>

            <div className="mt-6 flex space-x-4">
                <Button onClick={handleUpdate} className="bg-[#033469] text-white">
                    Update Theme
                </Button>
                <Button 
                    className="border border-[#033469] text-[#033469] bg-transparent hover:bg-[#033469] hover:text-white">
                    View All Themes
                </Button>
            </div>
                    </div>

                    
                    <div className="flex-1 space-y-2">
                        <div className=' m-14'>
                           
                            <TextInput
                                value={deadline || ""}
                                onChange={(e) => e.target.blur()} // Disable manual input
                                placeholder="Select Theme Deadline"
                                label="Deadline"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Calendar onDateSelect={handleDateSelect} className="w-full bg-[#CEE0F3] rounded-xl p-4"/>
                        </div>
                      
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTheme;
