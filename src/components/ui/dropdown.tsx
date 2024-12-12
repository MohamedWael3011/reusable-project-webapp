import React from "react";

interface DropdownComponentProps {
    title: string;
    options: string[];
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({ title, options }) => {
    return (
        <div className="flex justify-center w-full lg:max-w-sm">
            <select className="min-w-48 p-2.5 text-white-500 bg-primary border rounded-md shadow-sm outline-none focus:border-indigo-600">
                <option className="bg-primary text-white shadow-none outline-none focus:bg-primary hover:bg-primary" disabled>{title}</option>
                {options.map((option, index) => (
                    <option className="bg-white text-primary shadow-none outline-none focus:bg-primary hover:bg-primary" key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default DropdownComponent;
