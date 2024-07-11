import React, { useEffect, useState, useContext, useCallback } from 'react';
import { getPeople, Person } from 'src/apiRequests/GetPeople';
import { Text } from 'src/components/text/Text';
import { getPerson } from 'src/apiRequests/SearchPerson';
import style from 'src/components/resultPart/ResultPart.module.scss';
import { PeopleContext } from 'src/views/mainPage/MainPage';

export const PeopleResult: React.FC = () => {
  const [peopleState, setPeopleState] = useState<Person[]>([]);
  const { people } = useContext(PeopleContext);

  const handlePerson = useCallback(
    (searchName: string) => {
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

  useEffect(() => {
    const searchName = localStorage.getItem('searchName');
    if (searchName) {
      handlePerson(searchName);
    } else {
      getPeople().then((response) => {
        setPeopleState(response);
      });
    }
  }, [handlePerson]);

  return (
    <>
      {peopleState.map(({ url, name, birth_year, gender, eye_color, hair_color, mass, height }) => (
        <div className="person" key={url}>
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
