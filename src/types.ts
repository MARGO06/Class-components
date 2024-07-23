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
