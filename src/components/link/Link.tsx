import React from 'react';
import { NavLink } from 'react-router-dom';

type LinkProps = {
  to: string;
  className: string;
  onClick: (e: React.MouseEvent) => void;
  children: React.ReactNode;
};

export const Link: React.FC<LinkProps> = ({ to, className, children, onClick }) => {
  return (
    <NavLink to={to} className={className} onClick={onClick}>
      {children}
    </NavLink>
  );
};
