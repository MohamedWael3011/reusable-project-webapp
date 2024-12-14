import React, { useState } from 'react';
import Calendar from "../components/Calendar";
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import AdminSidePanel from "../components/ui/AdminSidepanel";
import { updateTheme } from "../../src/apis/admin.api"; // Import the updateTheme function


const UpdateTheme: React.FC = () => {

    const [themeID, setThemeId] = useState("");
    const [themeName, setThemeName] = useState("");
    const [duration, setDuration] = useState("");
    const [budget, setBudget] = useState("");
    const [deadline, setDeadline] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const handleDateSelect = (date: Date) => {
        setDeadline(date.toISOString().split("T")[0]); 
    };

    const handleUpdate = async () => {
        if (!themeID || !themeName || !duration || !budget || !deadline) {
            setMessage("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const result = await updateTheme(
                Number(themeID),
                themeName,
                duration,
                deadline,
                parseFloat(budget)
            );

            if (result) {
                setMessage("Theme updated successfully.");
                
                setThemeId("");
                setThemeName("");
                setBudget("");
                setDeadline(null);
                setDuration("");
            } else {
                setMessage("Failed to update theme. Please try again.");
            }
        } catch (error) {
            console.error("Error updating theme:", error);
            setMessage("An error occurred while updating the theme.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-screen">

            <div className="w-[510px] bg-gray-200">
                <AdminSidePanel />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-3xl flex space-x-8">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-2xl text-[#033469] font-bold mb-6">Update Themes</h1>
                        <div>
                            <TextInput
                                value={themeID}
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
                                value={budget}
                                onChange={(e) => setBudget(e.target.value)}
                                placeholder="Enter Theme Budget"
                                label="Budget"
                                required
                            />
                        </div>

                        <div className="mt-6 flex space-x-4">
                            <Button
                                onClick={handleUpdate}
                                className="bg-[#033469] text-white"
                                disabled={loading}
                            >
                                {loading ? "Updating..." : "Update Theme"}
                            </Button>
                            <Button
                                className="border border-[#033469] text-[#033469] bg-transparent hover:bg-[#033469] hover:text-white"
                                >
                                    <a href="/admin">View All Themes</a>
                                
                            </Button>
                        </div>

                        {message && (
                            <p className={`mt-4 text-primary`}>
                                {message}
                            </p>
                        )}
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="m-14">
                            <TextInput
                                value={deadline || ""}
                                onChange={(e) => e.target.blur()} 
                                placeholder="Select Theme Deadline"
                                label="Deadline"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Calendar
                                onDateSelect={handleDateSelect}
                                className="w-full bg-[#CEE0F3] rounded-xl p-4"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UpdateTheme;
