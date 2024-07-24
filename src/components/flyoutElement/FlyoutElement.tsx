import React from 'react';
import { RootState } from 'src/store';
import style from 'src/components/flyoutElement/FlyoutElement.module.scss';
import { Button } from 'src/components/button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { allCartDelete } from 'src/store/reducers/ActiveCart.slice';

export const FlyoutElement: React.FC = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.states.activeCardId.length);

  if (count === 0) {
    return null;
  }

  return (
    <div className={style.flyout_element}>
      <p className={style.cart}>{count} items are selected</p>
      <Button
        className={style.button_remove}
        onClick={() => dispatch(allCartDelete())}
        title="Unselect all"
      />
      <Button className={style.button_download} title="Download" />
    </div>
  );
};
