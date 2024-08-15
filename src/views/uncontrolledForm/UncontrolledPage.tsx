import React from 'react';
import style from 'src/views/uncontrolledForm/UncontrolledPage.module.scss';

export const UncontrolledForm: React.FC = () => {
  return (
    <div className={style.wrapper} data-testid="wrapper">
      Uncontrolled Form
    </div>
  );
};
