import { Person } from 'src/types';

export const findPeople = (people: Person[], searchName: string) => {
  const peopleName = people.filter((person) => person.name === searchName);
  return peopleName;
};
