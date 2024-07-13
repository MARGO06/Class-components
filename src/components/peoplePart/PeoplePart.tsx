import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Person } from 'src/apiRequests/GetPeople';
import { Text } from 'src/components/text/Text';
import { getPerson } from 'src/apiRequests/SearchPerson';
import style from 'src/components/resultPart/ResultPart.module.scss';
import { PeopleContext } from 'src/views/mainPage/MainPage';
import { getPeopleOnPage } from 'src/apiRequests/GetPeoplePage';

export const PeopleResult: React.FC = () => {
  const [peopleState, setPeopleState] = useState<Person[]>([]);
  const { people } = useContext(PeopleContext);
  const { pageCurrent } = useContext(PeopleContext);

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
    const search = localStorage.getItem('searchName') ?? '';
    const result = await getPeopleOnPage(search, pageCurrent);
    setPeopleState(result);
  }, [pageCurrent]);

  useEffect(() => {
    const searchName = localStorage.getItem('searchName');
    if (searchName) {
      handlePerson(searchName);
    } else {
      handlePeopleOnPage();
    }
  }, [handlePeopleOnPage, handlePerson]);

  return (
    <>
      {peopleState.map(({ url, name, birth_year, gender, eye_color, hair_color, mass, height }) => (
        <div className={style.person} key={url}>
          <Text tag="h2" className={style.name} title={name} />
          <p className={style.description}>
            This person was born in the year {birth_year}.{' '}
            {gender.charAt(0).toUpperCase() + gender.slice(1)} has {eye_color} eyes,
            {hair_color} hair, weighs {mass} kg, and is
            {height} cm tall.
          </p>
        </div>
      ))}
    </>
  );
};
