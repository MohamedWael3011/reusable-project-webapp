import React from 'react';

interface ComboBoxProps {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
  placeholder: string;
}

const ComboBox: React.FC<ComboBoxProps> = ({ label, value, onChange, options, required, placeholder }) => {
  return (
    <div className="flex-1  rounded-xl">
      <label className="block text-primary text-sm font-medium mb-1">{label}</label>
      <select
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue text-black bg-blue-100"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;
