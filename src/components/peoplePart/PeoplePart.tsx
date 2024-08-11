import React, { useContext } from 'react';
import { Person } from 'src/types';
import style from 'src/components/resultPart/ResultPart.module.scss';
import { PeopleContext } from 'src/hooks/ContextHook';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { cartAdded, cartDelete } from 'src/store/reducers/ActiveCart.slice';
import { useTheme } from 'src/hooks/ThemeHook';

type PeopleResultProps = {
  people: Person[];
};

export const PeopleResult: React.FC<PeopleResultProps> = ({ people }) => {
  const { isDark } = useTheme();
  const { handleClickLink, isActive } = useContext(PeopleContext);

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
      {people.map((person) => (
        <div
          className={`${style.person} ${activeCardDetails.some((card) => card.url === person.url) ? style.active : ''} ${isDark ? '' : style.dark}`}
          key={person.url}
          onClick={() => handleClickItem(person)}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleClickItem(person);
            }
          }}
          role="button"
          tabIndex={0}
          aria-label="Main container"
        >
          <div
            className={`${style.name} ${isActive ? style.active : ''} `}
            onClick={() => handleClickLink(person)}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleClickLink(person);
              }
            }}
            role="button"
            tabIndex={0}
            data-testid="name"
          >
            {person.name}
          </div>
          <p className={style.description} data-testid={`description:${person.name}`}>
            This person was born in the year {person.birth_year}.{' '}
            {person.gender.charAt(0).toUpperCase() + person.gender.slice(1)} has {person.eye_color}{' '}
            eyes,
            {person.hair_color} hair, weighs {person.mass} kg, and is {person.height} cm tall.
          </p>
        </div>
      ))}
    </>
  );
};
