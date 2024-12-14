import React from "react";

interface TableProps {
    title:string;
    columns: string[]; 
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
     data: Record<string, any>[];
}
  
const TableAdmin: React.FC<TableProps> = ({ title ,columns, data }) => {

    return(

            <div className=" flex justify-center w-11/12 flex-col">
                <h2 className=" ml-6 self-start text-primary text-2xl font-bold mb-6 text-center">{title}</h2>

                <table className=" w-11/12  bg-[#CEE0F3] rounded-xl border-separate border-spacing-y-4">
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
                                    <td key={cindex} className="px-4 py-2  text-black text-sm ">
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

