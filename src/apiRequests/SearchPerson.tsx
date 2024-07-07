import { People } from 'src/apiRequests/GetPeople';

export const getPerson = async (inputValue: string) => {
  const response = await fetch(`https://swapi.dev/api/people/?search=${inputValue}`, {
    method: 'GET',
  });
  const people: People = await response.json();
  const person = people.results;
  return person;
};
