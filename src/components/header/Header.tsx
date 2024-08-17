import React from 'react';
import { Link } from 'react-router-dom';
import style from 'src/components/header/Header.module.scss';

export const Header: React.FC = () => {
  return (
    <nav className={style.navigation}>
      <Link to="/RS-School_React/uncontrolled_page" className={style.link}>
        Uncontrolled Form
      </Link>
      <Link to="/RS-School_React" className={style.link}>
        Main Page
      </Link>
      <Link to="/RS-School_React/react_hook_form" className={style.link}>
        React Hook Form
      </Link>
    </nav>
  );
};
