
import TableUser from '@/components/ui/TableAdmin';
import UserSidepanel from '@/components/ui/UserSidepanel';

const columns = ["ID", "Name", "Deadline", "Duration", "Budget", "Status"];
const data = [
    { id: 1, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0", status:"pending" },
    { id: 4, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0", status:"pending" },
    { id: 4, name: "Reusable", deadline: "16/12/2024", duration: "4 Days", budget: "10000.0", status:"pending" },
];


export const UserMainView = () => {

    return (
        <div className='flex grid grid-cols-12' >
            <UserSidepanel />
            <div className='col-span-9 flex items-start justify-center mt-44'>
                <TableUser title="Your Projects" columns={columns} data={data} />
            </div>
        </div>
    );
};
