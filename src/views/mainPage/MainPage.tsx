import { useState, useMemo, useCallback, useEffect } from 'react';
import { ResultPart } from 'src/components/resultPart/ResultPart';
import { SearchPart } from 'src/components/searchPart/SearchPart';
import { Person, getPeople } from 'src/apiRequests/GetPeople';
import { getPerson } from 'src/apiRequests/SearchPerson';
import { Pagination } from 'src/components/pagination/Pagination';
import style from 'src/components/resultPart/ResultPart.module.scss';
import styles from 'src/views/mainPage/MainPage.module.scss';
import { getPeopleOnPage } from 'src/apiRequests/GetPeoplePage';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { handleSearchParams } from 'src/utils/SearchParams';
import { PeopleContext } from 'src/hooks/ContextHook';

const MainPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [people, setPeople] = useState<Person[]>([]);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isActive, setIsActive] = useState(false);
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

  const handleClickLink = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleMainClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { searchName, page } = handleSearchParams(location.search);
      if (e.target === e.currentTarget) {
        setIsActive(false);
        navigation(`/RS-School_React/?search=${searchName}&page=${page}`);
      }
    },
    [location.search, navigation],
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
    return { people, handleSearch, pageCurrent, handleClickLink, setIsActive, isActive };
  }, [people, handleSearch, pageCurrent, handleClickLink, setIsActive, isActive]);

  useEffect(() => {
    const { searchName, page } = handleSearchParams(location.search);

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
      <div className={`${styles.wrapper}  ${isActive ? styles.active : ''}`}>
        <div
          className={`${styles.main} ${isActive ? styles.active : ''}`}
          onClick={handleMainClick}
          onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
            if (e.key === 'Enter' || e.key === ' ') {
              handleMainClick(e as unknown as React.MouseEvent<HTMLDivElement>);
            }
          }}
          role="button"
          tabIndex={0}
        >
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
        <div id="detail" className={style.detail}>
          <Outlet />
        </div>
      </div>
    </PeopleContext.Provider>
  );
};

export default MainPage;
