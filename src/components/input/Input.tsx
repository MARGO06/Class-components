import React, { InputHTMLAttributes } from 'react';

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({ id, placeholder, value, onChange }) => {
  return <input id={id} placeholder={placeholder} value={value} onChange={onChange} />;
};
