import { createContext } from 'react';
import { Person } from 'src/types';

export type PeopleContextType = {
  pageCurrent: number;
  handleClickLink: (person: Person) => void;
  setIsActive: (isActive: boolean) => void;
  setShowInformationPage: (showInformationPage: boolean) => void;
  isActive: boolean;
};
export const PeopleContext = createContext<PeopleContextType>({
  pageCurrent: 1,
  handleClickLink: () => {},
  setIsActive: () => {},
  setShowInformationPage: () => {},
  isActive: false,
});
