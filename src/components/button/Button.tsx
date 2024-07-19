import React, { ButtonHTMLAttributes } from 'react';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  title: string;
};

export const Button: React.FC<ButtonProps> = ({ className, title, onClick }) => {
  return (
    <button type="button" className={className} onClick={onClick} title={title}>
      {title}
    </button>
  );
};
