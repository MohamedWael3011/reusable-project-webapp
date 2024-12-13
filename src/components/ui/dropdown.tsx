import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface DropdownComponentProps {
    title: string;
    options: { label: string; icon?: JSX.Element }[];
    onOptionSelect?: (option: string) => void;
    onChange: (option: string) => void; // Add the onChange prop here
}

const Dropdown: React.FC<DropdownComponentProps> = ({ title, options, onOptionSelect, onChange }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const toggleDropdown = () => {
        setIsOpen((x) => !x);
    };

    const handleOptionClick = (option: string) => {
        if (onOptionSelect) {
            onOptionSelect(option);
        }
        if (onChange) {
            onChange(option);  // Trigger the onChange callback when an option is clicked
        }
        setIsOpen(false); // Close the dropdown after selecting an option
    };

    return (
        <div className="w-72 font-medium h-44 relative">
            <div
                className="bg-primary w-full p-2 flex items-center justify-between rounded cursor-pointer text-white"
                onClick={toggleDropdown}
            >
                {title}
                <FontAwesomeIcon icon={faChevronDown} style={{ color: '#ffffff' }} />
            </div>
            {isOpen && (
                <ul className="bg-white mt-2 shadow-lg rounded overflow-hidden absolute w-full z-10">
                    {options.map((option, index) => (
                        <li
                            key={index}
                            className="text-primary p-2 text-sm hover:bg-primary hover:text-white cursor-pointer flex items-center gap-2"
                            onClick={() => handleOptionClick(option.label)} // Pass the option label to the click handler
                        >
                            {option.icon && <div>{option.icon}</div>}
                            {option.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Dropdown;
