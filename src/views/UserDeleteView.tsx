import React, { useState } from "react";
import TableUser from "@/components/ui/TableAdmin";
import UserSidepanel from "@/components/ui/UserSidepanel";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const columns = ["ID", "Name", "Budget", "Status", "Delete"];

export const UserDeleteView: React.FC = () => {
  const [data, setData] = useState([
    { id: 1, name: "Reusable", budget: "10000.0", status: "pending" },
    { id: 4, name: "Reusable", budget: "10000.0", status: "pending" },
    { id: 5, name: "Reusable", budget: "10000.0", status: "pending" },
  ]);

  const handleDelete = (id: number) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const tableData = data.map((item) => ({
    ...item,
    delete: (
      <FontAwesomeIcon 
      icon={faTrash}
      style={{color:'#ff0000'}}
      className="hover:cursor-pointer"
      onClick={() => handleDelete(item.id)}
       />
    ),
  }));

  return (
    <div className="flex grid grid-cols-12">
      <UserSidepanel />
      <div className="col-span-9 flex items-start justify-center mt-44">
        <TableUser title="Your Projects" columns={columns} data={tableData} />
      </div>
    </div>
  );
};

export default UserDeleteView;

