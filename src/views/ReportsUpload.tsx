import React, { useState, useEffect } from "react";
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import ComboBox from "../components/ui/combobox";
import UserSidepanel from "../components/ui/UserSidepanel";
import Calendar from "@/components/Calendar";

// Assuming getAcceptedSubmissions is imported
import { getAcceptedSubmissions, Submission, submitReport } from "../apis/user.api";
import { useUser } from "../hooks/useUser"; // Importing the UserContext

const ReportsUpload: React.FC = () => {
  const { user } = useUser(); // Accessing user context
  const [AcceptedSubmissions, setAcceptedSubmission] = useState<{ name: string, id: number }>({ name: '', id: 0 });
  const [ReportTitle, setReportTitle] = useState('');
  const [ReportContent, setReportContent] = useState('');
  const [Date, setDate] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<Submission[]>([]);  // State for storing submissions data
  const [msg , setmsg]= useState("");

  // Fetch accepted submissions when component mounts
  useEffect(() => {
    const fetchAcceptedSubmissions = async () => {
      if (!user) {
        setErrorMessage("User not found. Please log in.");
        return;
      }

      try {
        const userId = user.id;
        const submissions = await getAcceptedSubmissions(userId); // Fetch submissions

        if (submissions.length > 0) {
          setData(submissions);  // Store the full submissions data
        } else {
          setErrorMessage("No valid submissions found.");
        }
      } catch (error) {
        setErrorMessage("Failed to fetch accepted submissions.");
      }
    };

    fetchAcceptedSubmissions();
  }, [user]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (AcceptedSubmissions.id === 0 || !ReportTitle || !ReportContent ||!Date) {
      setErrorMessage("Please select a valid project and fill in all fields.");
      setLoading(false);
      return;
    }

    try {
      const userId = user?.id;
      const success = await submitReport(
        userId!,
        AcceptedSubmissions.id,  // Use the selected submission ID
        ReportTitle,             // The report title
        ReportContent,            // The report content
        Date
      );
      if (success) {
        // Reset form after successful upload
        setAcceptedSubmission({ name: '', id: 0 });
        setReportTitle('');
        setReportContent('');
        setDate(null);
        console.log("Report successfully uploaded");
        setmsg("Report successfully uploaded")

      } else {
        setErrorMessage("Failed to upload the report. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      setErrorMessage("An error occurred while submitting the report.");
    } finally {
      setLoading(false);
    }
  };

  const handleDateSelect = (date: Date) => {
    setDate(date.toISOString().split("T")[0]);
  };

  return (
    <div className="min-h-screen flex items-center">
      <div className="w-[510px]"> 
            <UserSidepanel
                username={user?.name || "Unknown User"} 
                id={user?.id || 0} // ID or fallback
            />   
      </div>

      {/* Main */}
      <main className="w-full h-[100%]">
        <div className="max-w-full mx-auto p-8 rounded-md">
          <h2 className="text-2xl font-bold text-[#033469] mb-2">Upload Report</h2>
          <p className="text-gray-500 text-[16px]">
            Submit your bi-monthly progress reports for accepted projects.
          </p>
          <form onSubmit={handleUpload}>
            <div className="">
              {/* Input Row */}
              <div className="flex mb-6">
                {/* Accepted Submissions (ComboBox) */}
                <div className="flex-1 p-4 rounded-xl">
                  <ComboBox
                    label="Accepted Submissions"
                    value={AcceptedSubmissions.name}
                    onChange={(e) => {
                      const selectedSub = data.find(accepted => accepted.title === e.target.value);  // Match by title
                      if (selectedSub) {
                        setAcceptedSubmission({ name: selectedSub.title, id: selectedSub.submissionId });
                      }
                    }}
                    options={data.map(submission => submission.title)}  // Use the full submission list
                    required={true}
                    placeholder="Choose Project"
                  />
                </div>
                {/* Report Title */}
                <div className="flex-1 p-4 rounded-xl">
                  <TextInput
                    label="Report Title"
                    placeholder="Enter Report Title"
                    value={ReportTitle}
                    onChange={(e) => setReportTitle(e.target.value)}
                    required={true}
                  />
                </div>
              </div>

              {/* Proposal Text */}
              <div className="flex">
                <div className="flex-1 mb-4 mr-4">
                  <label className="block text-primary text-sm font-medium mb-1">Enter Your Proposal</label>
                  <textarea
                    placeholder="Content..."
                    value={ReportContent}
                    onChange={(e) => setReportContent(e.target.value)}
                    required
                    className="w-[90%] h-[100%] px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue text-black bg-blue-100"
                  ></textarea>
                </div>

                <div className="flex-1">
                  <div className='w-[45%]'>
                    <TextInput
                      value={Date || ""}
                      onChange={(e) => e.target.blur()} // Disable manual input
                      placeholder="Select Submission Date"
                      label="Report Upload Date"
                      required
                    />
                  </div>

                  <div className="mt-4">
                    <Calendar onDateSelect={handleDateSelect} className="w-full bg-[#CEE0F3] rounded-xl p-4" />
                  </div>

                </div>
              </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-48">
              <Button className="w-md mt-4" size={"lg"} type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Upload"}
              </Button>

              <Button
                className="w-md mt-4 border border-blue-800 text-blue-800 bg-white hover:bg-[#033469] hover:text-white"
                size={"lg"}
                type="button"
                onClick={() => {
                  setAcceptedSubmission({ name: '', id: 0 });
                  setReportTitle('');
                  setReportContent('');
                  setDate(null);
                }}
              >
                Cancel
              </Button>
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-red-600 mt-4 text-center">{errorMessage}</p>}
            {msg && <p className="text-green-600 mt-4 text-center">{msg}</p>}

          </form>
        </div>
      </main>

    </div>
  );
};

export default ReportsUpload;
