import React, { useContext } from 'react';
import { Person } from 'src/apiRequests/GetPeople';
import style from 'src/components/resultPart/ResultPart.module.scss';
import { PeopleContext } from 'src/hooks/ContextHook';
import { useLocation, Link } from 'react-router-dom';
import { handleSearchParams } from 'src/utils/SearchParams';

type PeopleResultProps = {
  peopleState: {
    people: Person[];
  };
};

export const PeopleResult: React.FC<PeopleResultProps> = ({ peopleState }) => {
  const { handleClickLink, isActive } = useContext(PeopleContext);
  const location = useLocation();
  const { searchName, page } = handleSearchParams(location.search);
  return (
    <>
      {peopleState.people.map(
        ({ url, name, birth_year, gender, eye_color, hair_color, mass, height }) => (
          <Link
            to={`details/name=${name}/?search=${searchName}&page=${page}`}
            className={`${style.person} ${isActive ? style.active : ''}`}
            key={url}
            onClick={handleClickLink}
            data-testid="link"
          >
            <h2 className={style.name} data-testid={`name:${name}`}>
              {name}
            </h2>
            <p className={style.description} data-testid={`description:${name}`}>
              This person was born in the year {birth_year}.{' '}
              {gender.charAt(0).toUpperCase() + gender.slice(1)} has {eye_color} eyes,
              {hair_color} hair, weighs {mass} kg, and is
              {height} cm tall.
            </p>
          </Link>
        ),
      )}
    </>
  );
};
