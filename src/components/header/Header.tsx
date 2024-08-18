import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import style from 'src/components/header/Header.module.scss';

export const Header: React.FC = () => {
  const location = useLocation();

  const getClassName = (path: string) => {
    return `${style.link} ${location.pathname === path ? style.active : ''}`;
  };
  return (
    <header>
      <nav className={style.navigation}>
        <Link
          to="/RS-School_React/uncontrolled_page"
          className={getClassName('/RS-School_React/uncontrolled_page')}
        >
          Uncontrolled Form
        </Link>
        <Link to="/RS-School_React" className={getClassName('/RS-School_React')}>
          Main Page
        </Link>
        <Link
          to="/RS-School_React/react_hook_form"
          className={getClassName('/RS-School_React/react_hook_form')}
        >
          React Hook Form
        </Link>
      </nav>
    </header>
  );
};
