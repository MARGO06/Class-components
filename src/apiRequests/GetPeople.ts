export type Person = {
  name: string;
  birth_year: string;
  created: string;
  edited: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  homeworld: string;
  mass: string;
  skin_color: string;
  url: string;
};

export type People = {
  count: string;
  next: string;
  previous: string;
  results: Person[];
};

export const ALL_PEOPLE_URL = 'https://swapi.dev/api/people/';

export const api = {
  getAllPeople: async () => {
    const response = await fetch(ALL_PEOPLE_URL, {
      method: 'GET',
    });
    const { count, results }: People = await response.json();
    return { count, results };
  },
  getPeopleOnPage: async (search: string, page: number) => {
    const response = await fetch(`${ALL_PEOPLE_URL}?search=${search}&page=${page}`, {
      method: 'GET',
    });
    const { results }: People = await response.json();
    return { results };
  },
  getPerson: async (inputValue: string) => {
    const response = await fetch(`${ALL_PEOPLE_URL}?search=${inputValue}`, {
      method: 'GET',
    });
    const { count, results }: People = await response.json();
    return { count, results };
  },
};
