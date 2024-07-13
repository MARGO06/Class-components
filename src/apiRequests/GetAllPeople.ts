import { People } from 'src/apiRequests/GetPeople';

export const getAllPeople = async () => {
  const response = await fetch('https://swapi.dev/api/people/', {
    method: 'GET',
  });
  const people: People = await response.json();
  return people;
};
