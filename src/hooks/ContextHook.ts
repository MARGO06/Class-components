import { createContext } from 'react';

export type PeopleContextType = {
  pageCurrent: number;
  handleClickLink: (e: React.MouseEvent) => void;
  setIsActive: (isActive: boolean) => void;
  isActive: boolean;
};
export const PeopleContext = createContext<PeopleContextType>({
  pageCurrent: 1,
  handleClickLink: () => {},
  setIsActive: () => {},
  isActive: false,
});
