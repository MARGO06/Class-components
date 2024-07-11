import React from 'react';

type ButtonProps = {
  className: string;
  title: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
};

export const Button: React.FC<ButtonProps> = ({ className, title, onClick }) => {
  return (
    <button type="button" className={className} onClick={onClick} title={title}>
      {title}
    </button>
  );
};
