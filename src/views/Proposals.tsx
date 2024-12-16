import { useEffect, useState } from "react";
import { viewAllproposals, Proposals } from "@/apis/referee.api"; // Importing the API and interface
import { getRefProposals } from "@/apis/referee.api"; // Importing the getRefProposals API function
import RefereeSidepanel from "@/components/ui/RefereeSidepanel"; // Side panel component
import { useUser } from "@/hooks/useUser"; // Importing the UserContext to get the user information

const ProposalsPage = () => {
  const { user } = useUser(); // Get user info from context
  const [proposalData, setProposalData] = useState<Proposals[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // For handling error messages

  useEffect(() => {
    const fetchProposalData = async () => {
      setLoading(true);
      setError(null); // Reset the error when starting a new fetch

      try {
        if (user) {
          // Fetch the proposal ids related to the referee (current user)
          const refereeProposals = await getRefProposals(user.id);

          if (refereeProposals && Array.isArray(refereeProposals)) {
            // Fetch all proposals
            const allProposals = await viewAllproposals();

            if (allProposals) {
              // Filter proposals based on the ids we got from getRefProposals
              const filteredProposals = allProposals.filter((proposal) =>
                refereeProposals.some((refProposal) => refProposal.submissionId === proposal.submissionId)
              );

              setProposalData(filteredProposals); // Store the filtered proposals in state
            } else {
              setError("No proposals found for this referee.");
              setProposalData([]); // Set empty if no proposals found
            }
          } else {
            setError("No referee proposals found.");
            setProposalData([]); // Set empty if no referee proposals found
          }
        } else {
          setError("User is not logged in.");
        }
      } catch (error) {
        console.error("Error fetching proposals:", error);
        setError("An error occurred while fetching proposals.");
        setProposalData([]); // Fallback to empty proposals
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    if (user) {
      fetchProposalData(); // Fetch proposals only if there's a logged-in user
    }
  }, [user]); // Re-run the effect when user changes

  return (
    <div className="bg-background h-screen grid lg:grid-cols-[25%_auto]">
      <RefereeSidepanel />
      <div className="flex flex-col py-20 pl-6">
        <h2 className="text-2xl font-bold text-[#003366] mb-4 text-left pl-4">Proposals</h2>
        <p className="text-blue-900 mb-3 text-left pl-2">
          Select a proposal to review its content and send comments.
        </p>
        <div className="bg-[#CEE0F3] w-full max-w-4xl overflow-x-auto p-4 rounded-xl">
          <table className="table-auto w-full border-collapse text-black">
            <thead>
              <tr className="text-[#003366]">
                <th className="border-b-2 py-2 px-4 text-left">ID</th>
                <th className="border-b-2 py-2 px-4 text-left">Theme Name</th>
                <th className="border-b-2 py-2 px-4 text-left">Title</th>
                <th className="border-b-2 py-2 px-4 text-left">Status</th>
                <th className="border-b-2 py-2 px-4 text-right pr-9"></th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">Loading...</td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-red-500">{error}</td>
                </tr>
              ) : proposalData?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4">No proposals found for this referee.</td>
                </tr>
              ) : (
                proposalData?.map((item) => (
                  <tr key={item.submissionId} className="hover:bg-[#D1E8F7]">
                    <td className="border-b py-3 px-4 text-black">{item.submissionId}</td>
                    <td className="border-b py-3 px-4 text-black">{item.themename}</td>
                    <td className="border-b py-3 px-4 text-black">{item.title}</td>
                    <td className="border-b py-3 px-4 text-black">{item.status}</td>
                    <td className="text-lg border-b py-3 px-4 text-right pr-9 text-black">&gt;</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProposalsPage;
