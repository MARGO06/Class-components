import { useState, useMemo, useCallback, useEffect } from 'react';
import { SearchPart } from 'src/components/searchPart/SearchPart';
import { People } from 'src/types';
import { Pagination } from 'src/components/pagination/Pagination';
import style from 'src/components/resultPart/ResultPart.module.scss';
import styles from 'pages/mainPage/MainPage.module.scss';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';
import { PeopleContext } from 'src/hooks/ContextHook';
import { useGetPeopleOnPageQuery } from 'src/store/apiRequests/GetPeople';
import { Loader } from 'src/components/loader/LoaderMain';
import { FlyoutElement } from 'src/components/flyoutElement/FlyoutElement';
import { useTheme } from 'src/hooks/ThemeHook';
import { useRouter } from 'next/router';

const MainPage: React.FC = () => {
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const { isDark } = useTheme();
  const router = useRouter();
  const { query } = router;
  const searchName = query.search as string;

  useEffect(() => {
    if (typeof searchName === 'undefined') {
      router.push(`/?search=&page=${pageCurrent}`);
    }
  }, [searchName, pageCurrent, router]);

  useEffect(() => {
    if (query.page) {
      setPageCurrent(Number(query.page));
    }
  }, [query.page]);

  const {
    data: peopleData,
    isFetching,
    isSuccess,
  } = useGetPeopleOnPageQuery({
    inputValue: searchName || '',
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
      router.push(`/?search=${encodeURIComponent(searchValue)}&page=1`);
    },
    [router],
  );

  const handleClickLink = useCallback(() => {
    setIsActive(true);
  }, []);

  const handleMainClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { search, page } = router.query;
      if (e.target === e.currentTarget) {
        setIsActive(false);
        router.push(`/?search=${search}&page=${page}`);
      }
    },
    [router],
  );

  const handlePageClick = useCallback(
    (page: number) => {
      setPageCurrent(page);
      const { search } = router.query;
      if (search !== undefined) {
        router.push(`?search=${search}&page=${page}`);
      } else {
        router.push(`?search=&page=${page}`);
      }
    },
    [router],
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
        <section className={`${style.people} ${isActive ? style.active : ''}`} data-testid="people">
          <PeopleResult people={peopleData.results} />
          <FlyoutElement />
        </section>
        <Pagination onClick={handlePageClick} />
      </>
    );
  }

  return (
    <PeopleContext.Provider value={contextValue}>
      <div
        className={`${styles.wrapper}  ${isActive ? styles.active : ''} ${isDark ? '' : styles.dark}`}
        data-testid="wrapper"
      >
        <div
          className={`${styles.main} ${isActive ? styles.active : ''} ${isDark ? '' : styles.dark}`}
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
      </div>
    </PeopleContext.Provider>
  );
};

export default MainPage;
