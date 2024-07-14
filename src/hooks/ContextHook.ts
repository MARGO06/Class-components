import { createContext } from 'react';
import { Person } from 'src/apiRequests/GetPeople';

export type PeopleContextType = {
  people: Person[];
  handleSearch: (searchValue: string) => void;
  pageCurrent: number;
  handleClickLink: (e: React.MouseEvent) => void;
  setIsActive: (isActive: boolean) => void;
  isActive: boolean;
};
export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  handleSearch: () => {},
  pageCurrent: 1,
  handleClickLink: () => {},
  setIsActive: () => {},
  isActive: false,
});
