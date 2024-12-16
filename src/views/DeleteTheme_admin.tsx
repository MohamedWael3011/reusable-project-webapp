import React, { useState, useCallback } from 'react';
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import AdminSidepanel from "../components/ui/AdminSidepanel";
import { deleteTheme } from "../../src/apis/admin.api";
import { useUser } from "@/hooks/useUser";


const DeleteTheme: React.FC = () => {
    const [themID, setThemeId] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const { user } = useUser();


    const handleDelete = useCallback(async () => {
        if (!themID) {
            setMessage("Theme ID is required to delete a theme.");
            return;
        }

        setLoading(true);
        try {
            const result = await deleteTheme(Number(themID));
            setMessage(result ? `Theme with Id ${themID} deleted successfully.` : "Failed to delete theme. Please try again.");
            if (result) setThemeId(""); // Reset theme ID only if delete was successful
        } catch (error) {
            console.error("Error deleting theme:", error);
            setMessage("An error occurred while deleting the theme.");
        } finally {
            setLoading(false);
        }
    }, [themID]); 

    return (
        <div className="flex h-screen">
            <div className="w-[510px] bg-gray-200">
            <AdminSidepanel username={user?.name||"3aw"} userId={user?.id||0} />
            </div>
            <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                <div className="w-full max-w-3xl flex space-x-8">
                    <div className="flex-1 space-y-6">
                        <h1 className="text-2xl text-[#033469] font-bold mb-6">Delete Theme</h1>
                        <TextInput
                            value={themID}
                            onChange={(e) => setThemeId(e.target.value)}
                            placeholder="Enter Theme ID"
                            label="Theme ID"
                            required
                        />
                        <Button onClick={handleDelete} className="bg-[#033469] text-white">
                            {loading ? "Deleting..." : "Delete Theme"}
                        </Button>
                        {message && (
                            <p className={`mt-4 ${message.includes("successfully") ? "text-primary" : "text-red-600"}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteTheme;
