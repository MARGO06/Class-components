import React from 'react';
import style from 'src/components/flyoutElement/FlyoutElement.module.scss';
import { Button } from 'src/components/button/Button';

export const FlyoutElement: React.FC = () => {
  const count = 0;
  return (
    <div className={style.flyout_element}>
      <p className={style.cart}>{count} items are selected</p>
      <Button className={style.button_remove} title="Unselect all" />
      <Button className={style.button_download} title="Download" />
    </div>
  );
};
