import { useEffect, useState } from "react";
import { viewAllreports,Reports } from "@/apis/referee.api"; // Importing the API and interface
import RefereeSidepanel from "@/components/ui/RefereeSidepanel"; // Side panel component


const ReportsPage = () => {
  const [ReportsData, setReportsData] = useState<Reports[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchReportsData = async () => {
      setLoading(true);
      try {
        const report = await viewAllreports(); // Fetch proposals from the API
        console.log("Data Fetched" , report)
        setReportsData(report); // Store the fetched proposals in state
      } catch (error) {
        console.error("Error fetching proposals:", error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchReportsData(); // Call the fetch function on component mount
  }, []);

  return (
    <div className="bg-background h-screen grid lg:grid-cols-[25%_auto]">
        
      <RefereeSidepanel />
      <div className="flex flex-col py-20 pl-6">
      
            <h2 className="text-2xl font-bold text-[#003366] mb-4 text-left pl-4">
             Reports
            </h2>
            <p className="text-blue-900 mb-3 text-left pl-2">
             Select report to view its content
            </p>
            <div className="bg-[#CEE0F3] w-full max-w-4xl overflow-x-auto p-4 rounded-xl">
              <table className="table-auto w-full border-collapse text-black">
                <thead>
                  <tr className="text-[#003366]">
                    <th className="border-b-2 py-2 px-4 text-left">ID</th>
                    <th className="border-b-2 py-2 px-4 text-left">Report Title</th>
                    <th className="border-b-2 py-2 px-4 text-left">Role</th>
                    <th className="border-b-2 py-2 px-4 text-right pr-9"></th>
                  </tr>
                </thead>
                <tbody>
                  {ReportsData?.map((item) => (
                    <tr key={item.ReportId} className="hover:bg-[#D1E8F7]">
                         <td className="border-b py-3 px-4 text-black">{item.ReportId}</td>
                      <td className="border-b py-3 px-4 text-black">{item.title}</td>
                      {/* <td className="border-b py-3 px-4 text-black">{item.role}</td> */}
                      <td className="text-lg border-b py-3 px-4 text-right pr-9 text-black">
                        &gt;
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
       
      
      </div>
    </div>
  );
};

export default ReportsPage;
