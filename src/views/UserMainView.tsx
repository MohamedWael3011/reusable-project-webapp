
import TableUser from '@/components/ui/TableAdmin';
import UserSidepanel from '@/components/ui/UserSidepanel';
import { viewProjectThemes, Theme } from "../apis/admin.api";
import { useEffect, useState } from "react";
import { useUser } from "@/hooks/useUser";


const columns = [ "Name", "Deadline", "Duration", "Budget",];


export const UserMainView = () => {

    const [data, setData] = useState<Theme[]>([]);          
    const [loading, setLoading] = useState<boolean>(true);
    const { user } = useUser();
 

    useEffect(() => {
        const fetchThemes = async () => {
        setLoading(true);
        try {
            const themes = await viewProjectThemes(); 
            setData(themes);
            console.log("data>>" + data)
        } catch (error) {
            console.error("Error fetching themes:", error);
        } finally {
            setLoading(false);
        }
        };

        fetchThemes();
    }, []);


    return (
        <div className='flex grid grid-cols-12' >
        <UserSidepanel username={user?.email || "User"}/>
        <div className='col-span-9 flex items-start justify-center mt-44'>
            {loading ? (
                <p>Loading themes...</p>
                ) : (
                <TableUser title="Available Project Themes" columns={columns} data={data} />
            )}
            </div>
        </div>
    );
};
