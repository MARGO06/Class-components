import React, { useContext, useEffect } from 'react';
import { Person } from 'src/types';
import style from 'src/components/resultPart/ResultPart.module.scss';
import { PeopleContext } from 'src/hooks/ContextHook';
import { useLocation, Link } from 'react-router-dom';
import { handleSearchParams } from 'src/utils/SearchParams';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { cartAdded, cartDelete } from 'src/store/reducers/ActiveCart.slice';

type PeopleResultProps = {
  people: Person[];
};

export const PeopleResult: React.FC<PeopleResultProps> = ({ people }) => {
  const { handleClickLink, isActive } = useContext(PeopleContext);
  const location = useLocation();
  const { searchName, page } = handleSearchParams(location.search);

  const dispatch = useDispatch();
  const activeCardId = useSelector((state: RootState) => state.states.activeCardId);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(activeCardId);
  }, [activeCardId]);

  const handleClickItem = (url: string) => {
    if (activeCardId.includes(url)) {
      dispatch(cartDelete(url));
      // eslint-disable-next-line no-console
      console.log(activeCardId);
    } else {
      dispatch(cartAdded(url));
    }
  };

  return (
    <>
      {people.map(({ url, name, birth_year, gender, eye_color, hair_color, mass, height }) => (
        <div
          className={`${style.person} ${activeCardId.includes(url) ? style.active : ''}`}
          key={url}
          onClick={() => handleClickItem(url)}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClickItem(url);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Main container"
        >
          <Link
            to={`details/name=${name}/?search=${searchName}&page=${page}`}
            className={`${style.name}${isActive ? style.active : ''}`}
            onClick={handleClickLink}
          >
            {name}
          </Link>
          <p className={style.description} data-testid={`description:${name}`}>
            This person was born in the year {birth_year}.{' '}
            {gender.charAt(0).toUpperCase() + gender.slice(1)} has {eye_color} eyes,
            {hair_color} hair, weighs {mass} kg, and is {height} cm tall.
          </p>
        </div>
      ))}
    </>
  );
};
