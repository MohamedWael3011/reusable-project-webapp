import TableAdmin from '@/components/ui/TableAdmin';
import AdminSidepanel from '@/components/ui/AdminSidepanel';
import TextInput from '@/components/ui/TextInput';
import { useState } from 'react';
import { Button } from "../components/ui/button";
import { assignReferee, unassignReferee } from '@/apis/admin.api'; // Import the API functions
import { useUser } from "@/hooks/useUser";

const AvailableRefereescolumns = ["ID", "RefereeName"];
const AvailableRefereesData = [
  { id: 1, refereename: "Reusable" },
  { id: 4, refereename: "Reusable" },
  { id: 3, refereename: "Reusable" },
];

const AvailableSubmissionsData = [
  { id: 1, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
  { id: 4, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
  { id: 3, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
];

const AvailableSubmissionscolumns = ["ID", "Name", "Deadline", "Duration", "Budget"];

const AdminAssignRefereeView = () => {
  const [RefereeId, setRefereeId] = useState<string>('');
  const [ProjectId, setProjectId] = useState<string>('');
  const [message, setMessage] = useState<string>(''); // For showing success or error messages
  const { user } = useUser();

  // Handler for Assign button
  const handleAssignReferee = async () => {
    if (RefereeId && ProjectId) {
      try {
        const response = await assignReferee(Number(RefereeId), Number(ProjectId)); // Call the API
        setMessage(response); // Set the response message (success or error)
      } catch (error) {
        setMessage(`Error: ${error}`);
      }
    } else {
      setMessage("Please provide both Referee ID and Project ID");
    }
  };

  // Handler for Unassign button
  const handleUnassignReferee = async () => {
    if (RefereeId && ProjectId) {
      try {
        const response = await unassignReferee(Number(RefereeId), Number(ProjectId)); // Call the API
        setMessage(response); // Set the response message (success or error)
      } catch (error) {
        setMessage(`Error: ${error}`);
      }
    } else {
      setMessage("Please provide both Referee ID and Project ID");
    }
  };

  return (
    <div className='grid grid-cols-12'>
       <AdminSidepanel username={user?.email || "Admin"}/>

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
            <TableAdmin title="Available Referees" columns={AvailableRefereescolumns} data={AvailableRefereesData} />
          </div>
          <div className="col-span-8">
            <TableAdmin title="Available Submissions" columns={AvailableSubmissionscolumns} data={AvailableSubmissionsData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAssignRefereeView;
