import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Person } from 'src/apiRequests/GetPeople';
import { Text } from 'src/components/text/Text';
import { getPerson } from 'src/apiRequests/SearchPerson';
import style from 'src/components/resultPart/ResultPart.module.scss';
import { PeopleContext } from 'src/hooks/ContextHook';
import { getPeopleOnPage } from 'src/apiRequests/GetPeoplePage';
import { Link } from 'src/components/link/Link';
import { useLocation } from 'react-router-dom';
import { handleSearchParams } from 'src/utils/SearchParams';

export const PeopleResult: React.FC = () => {
  const [peopleState, setPeopleState] = useState<Person[]>([]);
  const { people, pageCurrent, handleClickLink, isActive } = useContext(PeopleContext);
  const location = useLocation();

  const nameSearch = localStorage.getItem('searchName') ?? '';

  const handlePerson = useCallback(
    async (searchName: string) => {
      getPerson(searchName).then(() => {
        const searchLower = searchName.toLowerCase();
        const filterPeople = people.filter(
          (person) => person.name.toLowerCase().includes(searchLower) || person.name === searchName,
        );
        setPeopleState(filterPeople);
      });
    },
    [people],
  );

  const handlePeopleOnPage = useCallback(async () => {
    const result = await getPeopleOnPage(nameSearch, pageCurrent);
    setPeopleState(result);
  }, [nameSearch, pageCurrent]);

  useEffect(() => {
    if (nameSearch) {
      handlePerson(nameSearch);
    } else {
      handlePeopleOnPage();
    }
  }, [handlePeopleOnPage, handlePerson, nameSearch]);

  const { searchName, page } = handleSearchParams(location.search);

  return (
    <>
      {peopleState.map(({ url, name, birth_year, gender, eye_color, hair_color, mass, height }) => (
        <Link
          to={`details/name=${name}/?search=${searchName}&page=${page}`}
          className={`${style.person} ${isActive ? style.active : ''}`}
          key={url}
          onClick={handleClickLink}
        >
          <Text tag="h2" className={style.name} title={name} />
          <p className={style.description}>
            This person was born in the year {birth_year}.{' '}
            {gender.charAt(0).toUpperCase() + gender.slice(1)} has {eye_color} eyes,
            {hair_color} hair, weighs {mass} kg, and is
            {height} cm tall.
          </p>
        </Link>
      ))}
    </>
  );
};
