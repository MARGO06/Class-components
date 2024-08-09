import { useState, useMemo, useCallback, useEffect } from 'react';
import { SearchPart } from 'src/components/searchPart/SearchPart';
import { People } from 'src/types';
import { Pagination } from 'src/components/pagination/Pagination';
import style from 'src/components/resultPart/ResultPart.module.scss';
import styles from 'pages/mainPage/MainPage.module.scss';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';
import { PeopleContext } from 'src/hooks/ContextHook';
import { Loader } from 'src/components/loader/LoaderMain';
import { FlyoutElement } from 'src/components/flyoutElement/FlyoutElement';
import { useTheme } from 'src/hooks/ThemeHook';
import { useRouter } from 'next/router';

type MainPageProps = {
  people: People;
};

const MainPage: React.FC<MainPageProps> = ({ people }) => {
  const [isLoading, setIsLoading] = useState(true);
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
    setIsLoading(false);
  }, [query.page]);

  const handleSearch = useCallback(
    (searchValue: string) => {
      setPageCurrent(1);
      router.push(`/?search=${encodeURIComponent(searchValue)}&page=1`);
      setIsLoading(false);
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
        setIsLoading(false);
      }
    },
    [router],
  );

  const handlePageClick = useCallback(
    (page: number) => {
      if (searchName !== undefined) {
        router.push(`?search=${searchName}&page=${page}`);
        setPageCurrent(page);
      }
      setIsLoading(false);
    },
    [router, searchName],
  );

  const contextValue = useMemo(() => {
    return { /* peopleData, */ pageCurrent, handleClickLink, setIsActive, isActive };
  }, [pageCurrent, handleClickLink, setIsActive, isActive]);

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
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <section
                className={`${style.people} ${isActive ? style.active : ''}`}
                data-testid="people"
              >
                <PeopleResult people={people.results} />
                <FlyoutElement />
              </section>
              <Pagination onClick={handlePageClick} count={people.count} />
            </>
          )}
        </div>
      </div>
    </PeopleContext.Provider>
  );
};

export default MainPage;
