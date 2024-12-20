import React from "react";

interface TextInputProps {
  label: string;
  type?: string;
  placeholder: string;
  value: string;
  required: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  required,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-primary text-sm  font-medium mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-3 py-2 border rounded-xl focus:outline-none focus:ring focus:border-blue text-black"
      />
    </div>
  );
};

export default TextInput;
