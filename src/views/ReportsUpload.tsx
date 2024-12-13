import React , {useState} from "react";
import TextInput from "../components/ui/TextInput";
import { Button } from "../components/ui/button";
import ComboBox from '../components/ui/combobox';
import UserSidepanel from "../components/ui/UserSidepanel";
import Calendar from "@/components/Calendar";


const ReportsUpload: React.FC = () => 
{
      const [AcceptedSubmissions, setAcceptedSubmission] = useState('');
      const [ReportTitle, setReportTitle] = useState('');
      const [ReportContent, setReportContent] = useState('');
      const [Date, setDate] = useState<string | null>(null);
    
      const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({ AcceptedSubmissions, ReportTitle, ReportContent });
        // Add your submission logic here
      };

      const handleDateSelect = (date: Date) => {
        setDate(date.toDateString());
    };

    return (
      <div className="min-h-screen flex items-center">
        {/* Side Menu */}
         <UserSidepanel></UserSidepanel>

         <main className="w-[70%] bg-gray-50 h-[100%]"> {/* 50% width and full height */}
         <div className="max-w-full mx-auto p-8 rounded-md">
         <h2 className="text-2xl font-bold text-[#033469] mb-2">Upload Report</h2>
         <p className="text-gray-500 text-[16px]">
         Submit your bi-monthly progress reports for accepted projects.
         </p>
         <form onSubmit={handleUpload}>
          <div className="">
            {/* Input Row */}
            <div className="flex mb-6">
                 {/* Accepted SubmissionsProject Theme (Combo Box) */}
              <div className="flex-1  rounded-xl">
              <ComboBox
                label="Accepted Submissions"
                value={AcceptedSubmissions}
                onChange={(e) => setAcceptedSubmission(e.target.value)}
                options={["Reusable","Maintenance","Agile","Managment"]}
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
                        <div className=' w-[45%]'>
                           
                            <TextInput
                                value={Date || ""}
                                onChange={(e) => e.target.blur()} // Disable manual input
                                placeholder="Select Submission Date"
                                label="Report Upload Date"
                                required
                            />
                        </div>

                        <div className="mt-4">
                            <Calendar onDateSelect={handleDateSelect} className="w-full bg-[#CEE0F3] rounded-xl p-4"/>
                        </div>
                      
                    </div>
            </div>

            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-48">

              <Button className="w-md mt-4" size={"lg"} type='submit'>
                Upload
              </Button>

              <Button  className="w-md mt-4 border border-blue-800 text-blue-800 bg-white hover:bg-[#033469] hover:text-white " size={"lg"} type='button'>
                Cancel
              </Button>         
              
            </div>

            
            </form>
        </div>
      </main>
     
      </div>
    );
};


export default ReportsUpload;
