/* eslint-disable @typescript-eslint/no-explicit-any */
import TableAdmin from '@/components/ui/TableAdmin';
import AdminSidepanel from '@/components/ui/AdminSidepanel';
import TextInput from '@/components/ui/TextInput';
import { useEffect, useState } from 'react';
import { Button } from "../components/ui/button";
import { assignReferee, unassignReferee } from '@/apis/admin.api';
import { fetchRefereeUsers } from '../apis/admin.api'; 
import { fetchSubmissions } from '../apis/admin.api';
import { useUser } from "@/hooks/useUser";

const RefereeTColumns = ["user_id", "username"];
const SubmissionColumns = ["SubmissionId", "UserId", "ThemeName", "Title", "Status"]; // Columns for Submissions table

const AdminAssignRefereeView = () => {
  const [RefereeId, setRefereeId] = useState<string>('');
  const [ProjectId, setProjectId] = useState<string>('');
  const [message, setMessage] = useState<string>(''); 
  const [referees, setReferees] = useState<any[]>([]);
  const [submissions, setSubmissions] = useState<any[]>([]); // State for fetched submissions
  const { user } = useUser();

  useEffect(() => {
    const fetchReferees = async () => {
      try {
        const fetchedData = await fetchRefereeUsers();
        const formattedData = fetchedData.map((referee) => ({
          user_id: referee.user_id,
          username: referee.username,
        }));
        setReferees(formattedData);
      } catch (error) {
        console.error("Error fetching referees:", error);
      }
    };

    fetchReferees();
  }, []);


  useEffect(() => {
    const fetchSubmissionsData = async () => {
      try {
        const fetchedSubmissions = await fetchSubmissions();
        console.log(fetchedSubmissions)
        setSubmissions(fetchedSubmissions);
      } catch (error) {
        console.error("Error fetching submissions:", error);
      }
    };

    fetchSubmissionsData();
  }, []);




  const handleAssignReferee = async () => {
    if (RefereeId && ProjectId) {
      try {
        const response = await assignReferee(Number(RefereeId), Number(ProjectId));
        setMessage(response);
      } catch (error) {
        setMessage(`Error: ${error}`);
      }
    } else {
      setMessage("Please provide both Referee ID and Project ID");
    }
  };

  const handleUnassignReferee = async () => {
    if (RefereeId && ProjectId) {
      try {
        const response = await unassignReferee(Number(RefereeId), Number(ProjectId));
        setMessage(response);
      } catch (error) {
        setMessage(`Error: ${error}`);
      }
    } else {
      setMessage("Please provide both Referee ID and Project ID");
    }
  };

  return (
    <div className='grid grid-cols-12'>
      <AdminSidepanel username={user?.name || "3aw"} userId={user?.id || 0} />

      <div className='col-span-9 flex flex-col gap-12 pt-10 pl-10'>
        <h2 className="self-start ml-6 text-primary text-2xl font-bold mb-2 text-center">
          Assign Referees to Submissions
        </h2>

        <div className='grid grid-cols-12 gap-36'>
          <div className='col-span-4'>
            <TextInput
              required
              label='Referee Id'
              placeholder="Enter Referee Id"
              value={RefereeId}
              onChange={(e) => { setRefereeId(e.target.value) }}
            />
            <Button className="mt-4" size={"lg"} onClick={handleAssignReferee}>
              Assign
            </Button>
          </div>
          <div className='col-span-4'>
            <TextInput
              required
              label='Project Id'
              placeholder="Enter Project Id"
              value={ProjectId}
              onChange={(e) => { setProjectId(e.target.value) }}
            />
            <Button className="mt-4 bg-white text-primary border border-primary hover:bg-slate-100" size={"lg"} onClick={handleUnassignReferee}>
              Unassign
            </Button>
          </div>
        </div>
        {message && (
          <div className="mb-4 text-center text-primary text-lg font-medium">
            <span>{message}</span>
          </div>
        )}

        <div className='tables grid grid-cols-12 gap-4'>
          <div className="col-span-4">
            <TableAdmin title="Available Referees" columns={RefereeTColumns} data={referees} />
          </div>
          <div className="col-span-8 overflow-y-auto">
            <TableAdmin title="Available Submissions" columns={SubmissionColumns} data={submissions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAssignRefereeView;
