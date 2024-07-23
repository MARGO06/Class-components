import React from 'react';
import style from 'src/components/resultPart/ResultPart.module.scss';

export const Loader: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.loading} />
    </div>
  );
};
