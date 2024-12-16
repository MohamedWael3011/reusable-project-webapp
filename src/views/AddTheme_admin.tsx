import React, { useState } from "react";
import Calendar from "../components/Calendar"; // Use the Calendar component
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import AdminSidePanel from "../components/ui/AdminSidepanel";
import { createTheme } from "../apis/admin.api";
import { useUser } from "@/hooks/useUser";


const AddThemePage: React.FC = () => {
  const [themeName, setThemeName] = useState("");
  const [duration, setDuration] = useState("");
  const [budget, setBudget] = useState("");
  const [deadline, setDeadline] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { user } = useUser();


  const handleDateSelect = (date: Date) => {
    setDeadline(date.toISOString().split("T")[0]); 
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate input
    if (!themeName || !duration || !budget || !deadline) {
      setError("All fields are required.");
      return;
    }

    setError(null); // Reset error message
    setLoading(true);

    try {
      const success = await createTheme(
        themeName,
        duration,
        deadline,
        parseFloat(budget)
      );
      if (success) {
        alert("Theme added successfully!");
        // Reset the form
        setThemeName("");
        setDuration("");
        setBudget("");
        setDeadline(null);
      } else {
        setError("Failed to add the theme.");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
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
            <h1 className="text-2xl text-[#033469] font-bold mb-6">
              Add Themes
            </h1>

            <form onSubmit={handleSubmit}>
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
                  type="submit"
                  className="bg-[#033469] text-white"
                  disabled={loading}
                >
                  {loading ? "Adding..." : "Add Theme"}
                </Button>
                <Button className="border border-[#033469] text-[#033469] bg-transparent hover:bg-[#033469] hover:text-white">
                  View All Themes
                </Button>
              </div>

              {error && <div className="text-red-500 mt-4">{error}</div>}
            </form>
          </div>

          <div className="flex-1 space-y-6">
            <div className="mt-14">
              <TextInput
                value={deadline || ""}
                onChange={(e) => e.target.blur()} // Disable manual input
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

export default AddThemePage;