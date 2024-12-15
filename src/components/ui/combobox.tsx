import React from 'react';

interface ComboBoxProps<T = string> {
  label: string;
  value: T;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: T[];
  required?: boolean;
  placeholder: string;
}

const ComboBox = <T,>({
  label,
  value,
  onChange,
  options,
  required,
  placeholder,
}: ComboBoxProps<T>) => {
  return (
    <div className="flex-1 rounded-xl">
      <label className="block text-primary text-sm font-medium mb-1">{label}</label>
      <select
        value={value as unknown as string} // Cast value to string for the select element
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue text-black bg-blue-100"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option, index) => (
          <option key={index} value={option as unknown as string}> {/* Cast option to string */}
            {option as unknown as string} {/* Render option as string */}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ComboBox;
