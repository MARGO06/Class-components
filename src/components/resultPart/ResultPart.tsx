import style from 'src/components/resultPart/ResultPart.module.scss';
import { PeopleContext } from 'src/hooks/ContextHook';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { Person, api } from 'src/apiRequests/GetPeople';
import { getName } from 'src/utils/GetLocalStorage';
import { findPeople } from 'src/utils/FindPeople';
import { PeopleResult } from '../peoplePart/PeoplePart';

export const ResultPart: React.FC = () => {
  const [peopleState, setPeopleState] = useState<Person[]>([]);
  const { people, pageCurrent, isActive } = useContext(PeopleContext);

  const nameSearch = getName('searchName');

  const handlePerson = useCallback(
    async (searchName: string) => {
      await api.getPerson(searchName);
      const searchLower = searchName.toLowerCase();
      const filterPeople = findPeople(people, searchName, searchLower);
      setPeopleState(filterPeople);
    },
    [people],
  );

  const handlePeopleOnPage = useCallback(async () => {
    const resultPeople = await api.getPeopleOnPage(nameSearch, pageCurrent);
    setPeopleState(resultPeople.results);
  }, [nameSearch, pageCurrent]);

  useEffect(() => {
    if (nameSearch) {
      handlePerson(nameSearch);
    } else {
      handlePeopleOnPage();
    }
  }, [handlePeopleOnPage, handlePerson, nameSearch]);

  return (
    <section className={`${style.people} ${isActive ? style.active : ''}`}>
      <PeopleResult peopleState={{ people: peopleState }} />
    </section>
  );
};
