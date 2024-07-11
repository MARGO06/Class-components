import { useState, createContext, useMemo, useCallback } from 'react';
import { ResultPart } from 'src/components/resultPart/ResultPart';
import { SearchPart } from 'src/components/searchPart/SearchPart';
import { Person } from 'src/apiRequests/GetPeople';
import { getPerson } from 'src/apiRequests/SearchPerson';
import style from 'src/components/resultPart/ResultPart.module.scss';
import styles from 'src/views/mainPage/MainPage.module.scss';

export type PeopleContextType = {
  people: Person[];
  handleSearch: (searchValue: string) => void;
};
export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  handleSearch: () => {},
});

export const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);

  const handlePerson = useCallback(async (searchName: string) => {
    const result = await getPerson(searchName);
    setIsLoading(false);
    setPeople(result);
  }, []);

  const handleSearch = useCallback(
    (searchValue: string) => {
      localStorage.setItem('searchName', searchValue);
      setIsLoading(true);
      handlePerson(searchValue).catch(() => {
        setIsLoading(false);
      });
    },
    [handlePerson],
  );

  const contextValue = useMemo(() => {
    return { people, handleSearch };
  }, [people, handleSearch]);

  return (
    <PeopleContext.Provider value={contextValue}>
      <div className={styles.wrapper}>
        <SearchPart />
        {isLoading ? (
          <div className={style.container}>
            <div className={style.loading} />
          </div>
        ) : (
          <ResultPart />
        )}
      </div>
    </PeopleContext.Provider>
  );
};
