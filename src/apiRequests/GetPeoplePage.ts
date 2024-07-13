import { People } from 'src/apiRequests/GetPeople';

export const getPeopleOnPage = async (search: string, page: number) => {
  const response = await fetch(`https://swapi.dev/api/people/?search=${search}&page=${page}`, {
    method: 'GET',
  });
  const people: People = await response.json();
  const person = people.results;
  return person;
};
