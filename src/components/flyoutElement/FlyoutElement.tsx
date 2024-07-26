import React from 'react';
import { RootState } from 'src/store';
import style from 'src/components/flyoutElement/FlyoutElement.module.scss';
import { Button } from 'src/components/button/Button';
import { useSelector, useDispatch } from 'react-redux';
import { allCartDelete } from 'src/store/reducers/ActiveCart.slice';
import { useTheme } from 'src/hooks/ThemeHook';
import { convertToCSV } from 'src/utils/ConvertToCSV';

export const FlyoutElement: React.FC = () => {
  const { isDark } = useTheme();
  const dispatch = useDispatch();
  const activeCardDetails = useSelector((state: RootState) => state.states.activeCardDetails);
  const count = activeCardDetails.length;

  if (count === 0) {
    return null;
  }

  return (
    <div className={`${style.flyout_element} ${isDark ? '' : style.dark}`}>
      <p className={style.cart}>{count} items are selected</p>
      <Button
        className={style.button_remove}
        onClick={() => dispatch(allCartDelete())}
        title="Unselect all"
      />
      <a
        href={convertToCSV(activeCardDetails)}
        download={`${count}_persons.csv`}
        className={style.button_download}
      >
        Download
      </a>
    </div>
  );
};
