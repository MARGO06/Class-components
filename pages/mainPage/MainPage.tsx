import { useState, useMemo, useCallback, useEffect } from 'react';
import { SearchPart } from 'src/components/searchPart/SearchPart';
import { People, Person } from 'src/types';
import { Pagination } from 'src/components/pagination/Pagination';
import style from 'src/components/resultPart/ResultPart.module.scss';
import styles from 'pages/mainPage/MainPage.module.scss';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';
import { PeopleContext } from 'src/hooks/ContextHook';
import { Loader } from 'src/components/loader/LoaderMain';
import { FlyoutElement } from 'src/components/flyoutElement/FlyoutElement';
import { useTheme } from 'src/hooks/ThemeHook';
import { useRouter } from 'next/router';
import InformationPage from 'src/details/InformationPage';

type MainPageProps = {
  people: People | null;
};

const MainPage: React.FC<MainPageProps> = ({ people }) => {
  const [showInformationPage, setShowInformationPage] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pageCurrent, setPageCurrent] = useState(1);
  const [isActive, setIsActive] = useState(false);
  const { isDark } = useTheme();
  const router = useRouter();
  const { query } = router;
  const searchName = query.search as string;

  useEffect(() => {
    if (typeof searchName === 'undefined') {
      router.replace(`/?search=&page=${pageCurrent}`);
    }
    setIsLoading(false);
  }, [searchName, pageCurrent, router]);

  useEffect(() => {
    if (query.page) {
      setPageCurrent(Number(query.page));
    }
    setIsLoading(false);
  }, [query.page]);

  const handleSearch = useCallback(
    (searchValue: string) => {
      setIsLoading(true);
      setPageCurrent(1);
      router.push(`/?search=${encodeURIComponent(searchValue)}&page=1`);
    },
    [router],
  );

  const handleClickLink = useCallback(
    (person: Person) => {
      setIsActive(true);
      setSelectedPerson(person);
      setShowInformationPage(true);
      const searchQuery = `/?search=${encodeURIComponent(searchName)}&page=${query.page}&${encodeURIComponent(person.name)}`;
      router.push(`${searchQuery}`, undefined, { shallow: true });
    },
    [query.page, router, searchName],
  );

  const handleMainClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const { search, page } = router.query;
      if (e.target === e.currentTarget) {
        setShowInformationPage(false);
        router.push(`/?search=${search}&page=${page}`);
      }
    },
    [router],
  );

  const handlePageClick = useCallback(
    (page: number) => {
      if (searchName !== undefined) {
        setIsLoading(true);
        router.push(`?search=${searchName}&page=${page}`);
        setPageCurrent(page);
      }
      router.push(`?search=&page=${page}`);
    },
    [router, searchName],
  );

  const contextValue = useMemo(() => {
    return { pageCurrent, handleClickLink, setIsActive, isActive, setShowInformationPage };
  }, [pageCurrent, handleClickLink, setIsActive, isActive, setShowInformationPage]);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (people) {
    content = (
      <>
        <section className={`${style.people} ${isActive ? style.active : ''}`} data-testid="people">
          <PeopleResult people={people.results} />
          <FlyoutElement />
        </section>
        <Pagination onClick={handlePageClick} count={people.count} />
      </>
    );
  } else {
    content = <p>No people found.</p>;
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
          <div className={styles.mainContent}>
            <SearchPart onSearchClick={handleSearch} />
            {content}
          </div>
        </div>
        {showInformationPage && selectedPerson && <InformationPage person={selectedPerson} />}
      </div>
    </PeopleContext.Provider>
  );
};

export default MainPage;
