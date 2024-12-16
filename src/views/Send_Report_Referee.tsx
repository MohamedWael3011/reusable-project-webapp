import React, { useState } from "react";
import Calendar from "../components/Calendar"; // Use the Calendar component
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import AdminSidepanel from "../components/ui/AdminSidepanel";
import { sendFinalReport } from "../apis/admin.api"; // Import the API call function
import { useUser } from "@/hooks/useUser";

const SendReportRef: React.FC = () => {
    const [reportTitle, setReportTitle] = useState("");
    const [content, setContent] = useState("");
    const [refereeId, setRefereeId] = useState("");
    const [deadline, setDeadline] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Track loading state
    const [message, setMessage] = useState<string | null>(null); // Success/error message
    const { user } = useUser();



    const handleDateSelection = (date: Date) => {
        setDeadline(date.toISOString()); // Save the date in ISO format
    };

    const handleSend = async () => {
        if (!reportTitle || !content || !refereeId || !deadline) {
            setMessage("All fields are required.");
            return;
        }

        setIsLoading(true);
        setMessage(null);

        try {
            const isSuccess = await sendFinalReport(reportTitle, content, deadline, parseInt(refereeId));
            console.log(isSuccess)
            setMessage(isSuccess ? "Report sent successfully!" : "Failed to send the report.");

        } catch (error) {
            console.error("Error sending report:", error);
            setMessage("An error occurred while sending the report.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex h-screen">
            {/* Left Section: Side Menu */}
            <div className="w-[510px] bg-gray-200">
            <AdminSidepanel username={user?.name||"3aw"} userId={user?.id||0} />
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-3xl flex space-x-8">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-2xl text-[#033469] font-bold mb-6">Send Report To Referee</h1>
                        <div>
                            <TextInput
                                value={reportTitle}
                                onChange={(e) => setReportTitle(e.target.value)}
                                placeholder="Enter Report Title"
                                label="Report Title"
                                required
                            />
                        </div>

                        <div className="mt-6 space-y-4">
                            <h2 className="text-sm text-[#033469] font-semibold">Report Content</h2>
                            <textarea
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Enter your report content"
                                className="w-[400px] h-[340px] p-4 border rounded-lg bg-[#F8F8F8] text-[#033469] focus:outline-none focus:ring-2 focus:ring-[#033469]"
                            />
                        </div>

                        <div className="mt-6 flex space-x-4">
                            <Button onClick={handleSend} disabled={isLoading} className="bg-[#033469] text-white">
                                {isLoading ? "Sending..." : "Send Report"}
                            </Button>
                            <Button className="border border-[#033469] text-[#033469] bg-transparent hover:bg-[#033469] hover:text-white">
                                Cancel
                            </Button>
                        </div>

                        {message && (
                            <div className={`mt-4  ${message.includes("successfully") ? "text-green-600" : "text-red-600"}`}>
                                {message}
                            </div>
                        )}
                    </div>

                    <div className="flex-1 space-y-2">
                        <div className="mt-14">
                            <TextInput
                                value={refereeId}
                                onChange={(e) => setRefereeId(e.target.value)}
                                placeholder="Enter Referee ID"
                                label="Referee ID"
                                required
                            />
                        </div>
                        <div>
                            <TextInput
                                value={deadline || ""}
                                onChange={(e) => e.target.blur()} // Disable manual input
                                placeholder="Select Deadline"
                                label="Deadline"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Calendar onDateSelect={handleDateSelection} className="w-full bg-[#CEE0F3] rounded-xl p-4" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendReportRef;
