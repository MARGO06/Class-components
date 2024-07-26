import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({ className, placeholder, value, onChange }) => {
  return (
    <input className={className} placeholder={placeholder} value={value} onChange={onChange} />
  );
};
