import React, { useContext } from 'react';
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
  const activeCardDetails = useSelector((state: RootState) => state.states.activeCardDetails);

  const handleClickItem = (person: Person) => {
    const cardExist = activeCardDetails.some((card) => card.url === person.url);
    if (cardExist) {
      dispatch(cartDelete(person.url));
    } else {
      dispatch(cartAdded(person));
    }
  };

  return (
    <>
      {people.map(
        ({
          url,
          name,
          birth_year,
          gender,
          eye_color,
          hair_color,
          mass,
          height,
          created,
          edited,
          homeworld,
          skin_color,
        }) => (
          <div
            className={`${style.person} ${activeCardDetails.some((card) => card.url === url) ? style.active : ''}`}
            key={url}
            onClick={() =>
              handleClickItem({
                url,
                name,
                birth_year,
                gender,
                eye_color,
                hair_color,
                mass,
                height,
                created,
                edited,
                homeworld,
                skin_color,
              })
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClickItem({
                  url,
                  name,
                  birth_year,
                  gender,
                  eye_color,
                  hair_color,
                  mass,
                  height,
                  created,
                  edited,
                  homeworld,
                  skin_color,
                });
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
        ),
      )}
    </>
  );
};
