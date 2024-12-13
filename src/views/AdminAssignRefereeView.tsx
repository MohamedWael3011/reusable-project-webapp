import TableAdmin from '@/components/ui/TableAdmin';
import AdminSidepanel from '@/components/ui/AdminSidepanel';
import TextInput from '@/components/ui/TextInput';
import { useState } from 'react';
import { Button } from "../components/ui/button";


const AvailableRefereescolumns = ["ID", "RefereeName"];
const AvailableRefereesData = [
  { id: 1, refereename: "Reusable"},
  { id: 4, refereename: "Reusable"},
  { id: 4, refereename: "Reusable"},
  ];

const columns = ["ID", "Name", "Deadline", "Duration", "Budget"];
const data = [
  { id: 1, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
  { id: 4, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
  { id: 4, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
  ];


export const AdminAssignRefereeView = () => {
  const [RefereeId, setRefereeId] = useState<string>('');
  

  return (
    <div className='flex grid grid-cols-12' >
      <AdminSidepanel/>
      <div className='col-span-9 flex flex-col gap-12 pt-10 pl-10'>
            
            <h2 className=" self-start ml-6  text-primary text-2xl font-bold mb-2 text-center">Assign Referees to Submissions</h2>
            
            <div className=' flex gap-60'>
                <div>
                    <TextInput  required label='Referee Id' placeholder="Enter Id"
                        value={RefereeId} onChange={(e)=>{ setRefereeId(e.target.value)}}/>
                    <Button className=" mt-4" size={"lg"} >
                        Assign
                    </Button>
                </div>
                <div>
                    <TextInput  required label='Referee Id' placeholder="Enter Id"
                        value={RefereeId} onChange={(e)=>{ setRefereeId(e.target.value)}}/>
                    <Button className=" mt-4 bg-white text-primary border border-primary hover:bg-slate-100 " size={"lg"} >
                        Unassign
                    </Button>
                </div>                
            </div>

            <div className='tables grid grid-cols-12 gap-4'>    
              <div className="col-span-4">
                <TableAdmin title="Available Submissions" columns={AvailableRefereescolumns} data={AvailableRefereesData} />
              </div>
              <div className="col-span-8">
                <TableAdmin title="Available Submissions" columns={columns} data={data} />
              </div>
            </div>
      </div>

    </div>

  );
};
