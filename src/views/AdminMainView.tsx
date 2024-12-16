import { useEffect, useState } from "react";
import TableAdmin from "@/components/ui/TableAdmin";
import AdminSidepanel from "@/components/ui/AdminSidepanel";
import { viewProjectThemes, Theme } from "../apis/admin.api";
import { useUser } from "@/hooks/useUser";

const columns = ["ThemeId", "Name", "Deadline", "Duration", "Budget"];

export const AdminMainView = () => {
  const [data, setData] = useState<Theme[]>([]); // State to hold fetched themes
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const { user } = useUser();


  useEffect(() => {
    const fetchThemes = async () => {
      setLoading(true);
      try {
        const themes = await viewProjectThemes(); // Fetch themes from the API
        setData(themes);
      } catch (error) {
        console.error("Error fetching themes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchThemes();
  }, []);


  return (
    <div className="grid grid-cols-12">
      <AdminSidepanel username={user?.name||"3aw"} userId={user?.id||0} />
      <div className="col-span-9 flex items-start justify-center mt-44">
        {loading ? (
          <p>Loading themes...</p>
        ) : (
          <TableAdmin title="Available Project Themes" columns={columns} data={data} />
        )}
      </div>
    </div>
  );
};
