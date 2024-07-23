import React, { useEffect, useState, /* useCallback, */ useContext } from 'react';
import { Link } from 'react-router-dom';
import { createPages } from 'src/utils/CreatePages';
import { getName } from 'src/utils/GetLocalStorage';
import { People } from 'src/types';
import style from 'src/components/pagination/Pagination.module.scss';
import { PeopleContext } from 'src/hooks/ContextHook';
import { useGetPersonQuery } from 'src/store/apiRequests/GetPeople';

type PaginationProps = {
  onClick: (search: string, page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ onClick }) => {
  const nameSearch = getName('searchName');
  const { data } = useGetPersonQuery(nameSearch) as { data: People };
  const count = Number(data?.count || 0);
  const [currentPage, setCurrentPage] = useState<number[]>([]);
  const { pageCurrent } = useContext(PeopleContext);

  useEffect(() => {
    const showPages = () => {
      const pages = createPages(count);
      setCurrentPage(pages);
    };

    showPages();
  }, [count, nameSearch]);

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
