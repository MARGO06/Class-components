import { useState, createContext, useMemo, useCallback, useEffect } from 'react';
import { ResultPart } from 'src/components/resultPart/ResultPart';
import { SearchPart } from 'src/components/searchPart/SearchPart';
import { Person, getPeople } from 'src/apiRequests/GetPeople';
import { getPerson } from 'src/apiRequests/SearchPerson';
import { Pagination } from 'src/components/pagination/Pagination';
import style from 'src/components/resultPart/ResultPart.module.scss';
import styles from 'src/views/mainPage/MainPage.module.scss';
import { getPeopleOnPage } from 'src/apiRequests/GetPeoplePage';
import { useNavigate, useLocation } from 'react-router-dom';

export type PeopleContextType = {
  people: Person[];
  handleSearch: (searchValue: string) => void;
  pageCurrent: number;
};
export const PeopleContext = createContext<PeopleContextType>({
  people: [],
  handleSearch: () => {},
  pageCurrent: 1,
});

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const navigation = useNavigate();
  const location = useLocation();

  const handlePerson = useCallback(async (searchName: string) => {
    const result = await getPerson(searchName);
    setIsLoading(false);
    setPeople(result.person);
  }, []);

  const handleSearch = useCallback(
    (searchValue: string) => {
      localStorage.setItem('searchName', searchValue);
      setIsLoading(true);
      handlePerson(searchValue).catch(() => {
        setIsLoading(false);
      });
      setPageCurrent(1);
      navigation(`?search=${searchValue}&page=1`);
    },
    [handlePerson, navigation],
  );

  const handlePageClick = useCallback(
    async (searchValue: string, page: number) => {
      setIsLoading(true);
      const result = await getPeopleOnPage(searchValue, page);
      setIsLoading(false);
      setPeople(result);
      setPageCurrent(page);
      navigation(`?search=${searchValue}&page=${page}`);
    },
    [navigation],
  );

  const contextValue = useMemo(() => {
    return { people, handleSearch, pageCurrent };
  }, [people, handleSearch, pageCurrent]);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchName = searchParams.get('search') || '';
    const page = parseInt(searchParams.get('page') || '1', 10);

    if (!searchName) {
      getPeople().then((response) => {
        setPeople(response);
        setIsLoading(false);
        setPageCurrent(page);
      });
    }
  }, [location.search]);

  return (
    <PeopleContext.Provider value={contextValue}>
      <div className={styles.wrapper}>
        <SearchPart />
        {isLoading ? (
          <div className={style.container}>
            <div className={style.loading} />
          </div>
        ) : (
          <>
            <ResultPart />
            <Pagination onClick={handlePageClick} pageCurrent={pageCurrent} />
          </>
        )}
      </div>
    </PeopleContext.Provider>
  );
};

export default MainPage;
