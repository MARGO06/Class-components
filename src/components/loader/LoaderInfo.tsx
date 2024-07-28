import React from 'react';
import style from 'src/views/informationPage/InformationPage.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={style.container} data-testid="loading">
      <div className={style.loading} />
    </div>
  );
};
