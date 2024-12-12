import React from 'react';

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ label, checked, onChange }) => {
  return (
    <div className="flex items-center mb-4">
      <input type="checkbox" checked={checked} onChange={onChange} className="mr-2"/>
      <label className='text-primary'>{label}</label>
    </div>
  );
};

export default Checkbox;
