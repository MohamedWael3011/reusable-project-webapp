import React, { useState } from 'react';
import Calendar from "../components/Calendar";
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import AdminSidePanel from "../components/ui/AdminSidepanel";
import { getTheme, Theme, updateTheme } from "../../src/apis/admin.api"; // Updated API import
import { useUser } from "@/hooks/useUser";

const UpdateTheme: React.FC = () => {
    const [themeID, setThemeId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const { user } = useUser();

    const [themeDetails, setThemeDetails] = useState({
        Name: "",
        Duration: "",
        Budget: "",
        Deadline: "",
    });

    const handleDateSelect = (date: Date) => {
        setThemeDetails((prev) => ({ ...prev, deadline: date.toISOString().split("T")[0] }));
    };

    const fetchThemeDetails = async () => {
        try {
            const parsedThemeID = Number(themeID);
            if (isNaN(parsedThemeID)) {
                setMessage("Please enter a valid Theme ID.");
                return;
            }
            setLoading(true);
            setMessage(null);

            const theme: Theme | null = await getTheme(Number(themeID));
            if (theme) {
                setThemeDetails({
                    Name: theme.Name || "",
                    Duration: theme.Duration?.toString() || "",
                    Budget: theme.Budget?.toString() || "",
                    Deadline: theme.Deadline || "",
                });
                setMessage(`Theme details for ID ${themeID} loaded successfully.`);
            } else {
                setMessage("No theme found with the given ID.");
            }
        } catch (error) {
            console.error("Error fetching theme details:", error);
            setMessage("An error occurred while fetching theme details.");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async () => {
        const { Name, Duration, Budget, Deadline } = themeDetails;

        if (!themeID || !Name || !Duration || !Budget || !Deadline) {
            setMessage("Please fill in all fields.");
            return;
        }

        setLoading(true);
        setMessage(null);

        try {
            const result = await updateTheme(
                Number(themeID), Name, Duration, Deadline, Number(Budget)
            );

            if (result) {
                setMessage(`Theme with ID ${themeID} updated successfully.`);
                setThemeId("");
                setThemeDetails({
                    Name: "",
                    Duration: "",
                    Budget: "",
                    Deadline: "",
                });
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
            <AdminSidePanel username={user?.name||"3aw"} userId={user?.id||0} />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-3xl flex space-x-8">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-2xl text-[#033469] font-bold mb-6">Update Themes</h1>
                        <div>
                            <TextInput
                                value={`${themeID}`}
                                onChange={(e) => setThemeId(e.target.value)}
                                placeholder="Enter Theme ID"
                                label="Theme ID"
                                required
                            />
                            <Button
                                onClick={fetchThemeDetails}
                                className="mt-2 bg-[#033469] text-white"
                                disabled={loading}
                            >
                                {loading ? "Loading..." : "Fetch Details"}
                            </Button>
                        </div>

                        <div>
                            <TextInput
                                value={themeDetails.Name}
                                onChange={(e) =>
                                    setThemeDetails((prev) => ({ ...prev, Name: e.target.value }))
                                }
                                placeholder="Enter Theme Name"
                                label="Theme Name"
                                required
                            />
                        </div>

                        <div>
                            <TextInput
                                value={themeDetails.Duration}
                                onChange={(e) =>
                                    setThemeDetails((prev) => ({ ...prev, Duration: e.target.value }))
                                }
                                placeholder="Enter Theme Duration"
                                label="Duration"
                                required
                            />
                        </div>

                        <div>
                            <TextInput
                                value={themeDetails.Budget}
                                onChange={(e) =>
                                    setThemeDetails((prev) => ({ ...prev, Budget: e.target.value }))
                                }
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
                                value={themeDetails.Deadline || ""}
                                onChange={(e) => setThemeDetails((prev) => ({ ...prev, Deadline: e.target.value }))
                                }
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
