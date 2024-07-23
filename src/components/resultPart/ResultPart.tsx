import style from 'src/components/resultPart/ResultPart.module.scss';
import { PeopleContext } from 'src/hooks/ContextHook';
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { People, Person } from 'src/types';
import { getName } from 'src/utils/GetLocalStorage';
import { findPeople } from 'src/utils/FindPeople';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';
import { useGetPeopleOnPageQuery } from 'src/store/apiRequests/GetPeople';

export const ResultPart: React.FC = () => {
  const nameSearch = getName('searchName');
  const [peopleState, setPeopleState] = useState<Person[]>([]);
  const { people, pageCurrent, isActive } = useContext(PeopleContext);
  const { data } = useGetPeopleOnPageQuery({ inputValue: nameSearch, page: pageCurrent }) as {
    data: People;
  };

  const handlePerson = useCallback(
    (searchName: string) => {
      const filterPeople = findPeople(people, searchName);
      setPeopleState(filterPeople);
    },
    [people],
  );

  const handlePeopleOnPage = useCallback(async () => {
    setPeopleState(data?.results ?? []);
  }, [data]);

  useEffect(() => {
    if (nameSearch) {
      handlePerson(nameSearch);
    } else {
      handlePeopleOnPage();
    }
  }, [handlePeopleOnPage, handlePerson, nameSearch, data]);

  return (
    <section className={`${style.people} ${isActive ? style.active : ''}`}>
      <PeopleResult peopleState={{ people: peopleState }} />
    </section>
  );
};
