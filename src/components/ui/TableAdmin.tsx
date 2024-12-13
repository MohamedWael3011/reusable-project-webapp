import React from "react";

interface TableProps {
    columns: string[]; 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: Record<string, any>[];
}
  
const TableAdmin: React.FC<TableProps> = ({ columns, data }) => {

    return(

        <div className="overflow-x-auto ">
            <table className=" w-full bg-[#CEE0F3] rounded-xl border-separate border-spacing-y-4">
                <thead>
                    <tr>
                        {columns.map((columnname,index)=>(

                            <th key={index} className="px-4 py-2 text-left text-primary">
                                {columnname}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row,rindex)=>(
                        <tr key={rindex} className="bg-white ">

                            {columns.map((column,cindex)=>(
                                <td key={cindex} className="px-4  text-black text-sm ">
                                    {row[column.toLowerCase()] ?? "-"}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>

            </table>
        </div>

    );
}

export default TableAdmin;

