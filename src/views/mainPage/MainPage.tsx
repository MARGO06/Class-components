import { useState, useMemo, useCallback, useEffect } from 'react';
import { ResultPart } from 'src/components/resultPart/ResultPart';
import { SearchPart } from 'src/components/searchPart/SearchPart';
import { Person, api } from 'src/apiRequests/GetPeople';
import { Pagination } from 'src/components/pagination/Pagination';
import style from 'src/components/resultPart/ResultPart.module.scss';
import styles from 'src/views/mainPage/MainPage.module.scss';
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
    const resultPeople = await api.getPerson(searchName);
    setIsLoading(false);
    setPeople(resultPeople.results);
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
      const resultPeople = await api.getPeopleOnPage(searchValue, page);
      setIsLoading(false);
      setPeople(resultPeople.results);
      setPageCurrent(page);
      navigation(`?search=${searchValue}&page=${page}`);
    },
    [navigation],
  );

  const contextValue = useMemo(() => {
    return { people, pageCurrent, handleClickLink, setIsActive, isActive };
  }, [people, pageCurrent, handleClickLink, setIsActive, isActive]);

  useEffect(() => {
    const { page } = handleSearchParams(location.search);
    const searchName = localStorage.getItem('searchName');

    const showPeople = async () => {
      if (searchName) {
        const response = await api.getPerson(searchName);
        setPeople(response.results);
      }
      if (searchName === ' ') {
        const response = await api.getPerson(searchName);
        setPeople(response.results);
      }

      setIsLoading(false);
      setPageCurrent(page);
    };
    showPeople();
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
          <SearchPart onSearchClick={handleSearch} />
          {isLoading ? (
            <div className={style.container}>
              <div className={style.loading} />
            </div>
          ) : (
            <>
              <ResultPart />
              <Pagination onClick={handlePageClick} />
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
