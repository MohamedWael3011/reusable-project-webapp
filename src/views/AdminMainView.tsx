
import TableAdmin from '@/components/ui/TableAdmin';

import AdminSidepanel from '@/components/ui/AdminSidepanel';

const columns = ["ID", "Name", "Deadline", "Duration", "Budget"];
const data = [
  { id: 1, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
  { id: 4, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
  { id: 3, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
  ];


export const AdminMainView = () => {

  return (
    <div className='grid grid-cols-12' >
      <AdminSidepanel/>
      <div className='col-span-9 flex items-start justify-center mt-44'>
        <TableAdmin title="Available Project Themes"columns={columns} data={data}/>
      </div>

    </div>

  );
};
