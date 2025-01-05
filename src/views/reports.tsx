import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";
import { getRefReports, Reports } from "@/apis/referee.api";
import RefereeSidepanel from "@/components/ui/RefereeSidepanel";
import { useNavigate } from "react-router-dom";


const ReportsPage = () => {
  const { user } = useUser();
  const [reportsData, setReportsData] = useState<Reports[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useNavigate();

  useEffect(() => {
    const fetchReportsData = async () => {
      if (!user) {
        console.log("No user found, skipping fetch");
        return;
      }

      setLoading(true);
      try {
        console.log("Fetching reports for user:", user.id);
        const reports = await getRefReports(user.id);
        console.log("Fetched reports:", reports); // Check the fetched reports
        setReportsData(reports);
      } catch (error) {
        console.error("Error fetching reports:", error);
        setReportsData([]); // Set to an empty array in case of error
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, [user]);

  const handleRowClick = (reportId: number) => {
    router(`/referee/DetailedReportsView`,{state:reportId});
  };

  return (
    <div className="bg-background h-screen grid lg:grid-cols-[25%_auto]">
      <RefereeSidepanel refereeName={user?.name || "3aw"} refereeId={user?.id || 0} />
      <div className="flex flex-col py-20 pl-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-4 text-left pl-4">
          Reports
        </h2>
        <p className="text-blue-900 mb-3 text-left pl-2">
          Select a report to view its content
        </p>
        <div className="bg-[#CEE0F3] w-full max-w-4xl overflow-x-auto p-4 rounded-xl">
          <table className="table-auto w-full border-collapse text-black">
            <thead>
              <tr className="text-[#003366]">
                <th className="border-b-2 py-2 px-4 text-left">Report ID</th>
                {/* <th className="border-b-2 py-2 px-4 text-left">Submission ID</th> */}
                <th className="border-b-2 py-2 px-4 text-left">Report Title</th>
                <th className="border-b-2 py-2 px-4 text-right pr-9"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <div className="text-blue-900">Loading reports...</div>
                  </td>
                </tr>
              ) : reportsData && reportsData.length > 0 ? (
                reportsData.map((item, index) => (
                  <tr key={item.ReportId || index}
                   className="hover:bg-[#D1E8F7]"
                   onClick={() => handleRowClick(item.ReportId)}>
                    <td className="border-b py-3 px-4 text-black">{item.ReportId}</td>
                    {/* <td className="border-b py-3 px-4 text-black">{item.SubmissionID}</td> */}
                    <td className="border-b py-3 px-4 text-black">{item.title}</td>
                    <td className="text-lg border-b py-3 px-4 text-right pr-9 text-black">
                      &gt;
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    <div className="text-blue-900">No reports available.</div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
