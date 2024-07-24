import React from 'react';
import { RootState } from 'src/store';
import style from 'src/components/flyoutElement/FlyoutElement.module.scss';
import { Button } from 'src/components/button/Button';
import { useSelector } from 'react-redux';

export const FlyoutElement: React.FC = () => {
  const count = useSelector((state: RootState) => state.states.activeCardId.length);

  if (count === 0) {
    return null;
  }

  return (
    <div className={style.flyout_element}>
      <p className={style.cart}>{count} items are selected</p>
      <Button className={style.button_remove} title="Unselect all" />
      <Button className={style.button_download} title="Download" />
    </div>
  );
};
