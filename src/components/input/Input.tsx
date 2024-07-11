import React from 'react';

type InputProps = {
  id: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({ id, placeholder, value, onChange }) => {
  return <input id={id} placeholder={placeholder} value={value} onChange={onChange} />;
};
