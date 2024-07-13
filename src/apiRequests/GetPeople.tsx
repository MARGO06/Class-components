export type Person = {
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  name: string;
  skin_color: string;
  url: string;
};

export type People = {
  count: string;
  next: string;
  previous: string;
  results: Person[];
};

export const getPeople = async () => {
  const response = await fetch('https://swapi.dev/api/people/', {
    method: 'GET',
  });
  const people: People = await response.json();
  const person = people.results;
  return person;
};
