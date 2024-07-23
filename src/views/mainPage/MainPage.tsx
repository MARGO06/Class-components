import { useState, useMemo, useCallback } from 'react';
import { SearchPart } from 'src/components/searchPart/SearchPart';
import { People } from 'src/types';
import { Pagination } from 'src/components/pagination/Pagination';
import style from 'src/components/resultPart/ResultPart.module.scss';
import styles from 'src/views/mainPage/MainPage.module.scss';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';
import { handleSearchParams } from 'src/utils/SearchParams';
import { PeopleContext } from 'src/hooks/ContextHook';
import { useGetPeopleOnPageQuery } from 'src/store/apiRequests/GetPeople';
import { Loader } from 'src/components/loader/LoaderMain';

const MainPage: React.FC = () => {
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const navigation = useNavigate();
  const location = useLocation();
  const { search } = location;
  const nameS = new URLSearchParams(search).get('search') || '';

  const {
    data: peopleData,
    isFetching,
    isSuccess,
  } = useGetPeopleOnPageQuery({
    inputValue: nameS,
    page: pageCurrent,
  }) as {
    data: People;
    isFetching: boolean;
    isSuccess: boolean;
  };

  const handleSearch = useCallback(
    (searchValue: string) => {
      localStorage.setItem('searchName', searchValue);
      setPageCurrent(1);
      navigation(`?search=${searchValue}&page=1`);
    },
    [navigation],
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
    (searchValue: string, page: number) => {
      setPageCurrent(page);
      navigation(`?search=${searchValue}&page=${page}`);
    },
    [navigation],
  );

  const contextValue = useMemo(() => {
    return { peopleData, pageCurrent, handleClickLink, setIsActive, isActive };
  }, [peopleData, pageCurrent, handleClickLink, setIsActive, isActive]);

  let content;

  if (isFetching) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <>
        <section className={`${style.people} ${isActive ? style.active : ''}`}>
          <PeopleResult people={peopleData.results} />
        </section>
        <Pagination onClick={handlePageClick} />
      </>
    );
  }

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
          aria-label="Main container"
        >
          <SearchPart onSearchClick={handleSearch} />
          {content}
        </div>
        <div id="detail" className={style.detail}>
          <Outlet />
        </div>
      </div>
    </PeopleContext.Provider>
  );
};

export default MainPage;
