import { Person } from 'src/apiRequests/GetPeople';

export const findPeople = (people: Person[], searchName: string, searchLower: string) => {
  const peopleName = people.filter(
    (person) => person.name.toLowerCase().includes(searchLower) || person.name === searchName,
  );
  return peopleName;
};
