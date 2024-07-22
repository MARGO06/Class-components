import React, { useEffect, useState, useCallback, useContext } from 'react';
import { api } from 'src/apiRequests/GetPeople';
import { Link } from 'react-router-dom';
import { createPages } from 'src/utils/CreatePages';
import { getName } from 'src/utils/GetLocalStorage';
import style from 'src/components/pagination/Pagination.module.scss';
import { PeopleContext } from 'src/hooks/ContextHook';

type PaginationProps = {
  onClick: (search: string, page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ onClick }) => {
  const [currentPage, setCurrentPage] = useState<number[]>([]);
  const { pageCurrent } = useContext(PeopleContext);

  const nameSearch = getName('searchName');

  const countPagesSearch = useCallback(async (searchName: string) => {
    const result = await api.getPerson(searchName);
    const pages = createPages(result.count);
    setCurrentPage(pages);
  }, []);

  useEffect(() => {
    const showPages = async () => {
      if (nameSearch === ' ') {
        const response = await api.getPerson(nameSearch);
        const pages = createPages(response.count);
        setCurrentPage(pages);
      } else {
        countPagesSearch(nameSearch);
      }
    };

    showPages();
  }, [countPagesSearch, nameSearch]);

  return (
    <div className={style.pagination}>
      {currentPage.map((page) => (
        <li key={page} className={`${style.paginate} ${pageCurrent === page ? style.active : ' '}`}>
          <Link
            to={`?search=${nameSearch}&page=${page}`}
            className={style.page}
            onClick={() => onClick(nameSearch, page)}
          >
            {page}
          </Link>
        </li>
      ))}
    </div>
  );
};
