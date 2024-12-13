
import TableAdmin from '@/components/ui/TableAdmin';

const columns = ["ID", "Name", "Deadline", "Duration", "Budget"];
const data = [
    { id: 1, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
    { id: 4, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
    { id: 4, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0" },
    ];


export const AdminMainView = () => {

  return (
    <>

        <TableAdmin columns={columns} data={data}/>

    </>

  );
};
