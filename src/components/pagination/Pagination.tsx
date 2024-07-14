import React, { useEffect, useState, useCallback } from 'react';
import { getAllPeople } from 'src/apiRequests/GetAllPeople';
import { getPerson } from 'src/apiRequests/SearchPerson';
import { Link } from 'src/components/link/Link';
import { createPages } from 'src/utils/CreatePages';
import style from 'src/components/pagination/Pagination.module.scss';

type PaginationProps = {
  onClick: (search: string, page: number) => void;
  pageCurrent: number;
};

export const Pagination: React.FC<PaginationProps> = ({ onClick, pageCurrent }) => {
  const [currentPage, setCurrentPage] = useState<number[]>([]);

  const nameSearch = localStorage.getItem('searchName') ?? '';

  const countPagesSearch = useCallback(async (searchName: string) => {
    const result = await getPerson(searchName);
    const pages = createPages(result.count);
    setCurrentPage(pages);
  }, []);

  useEffect(() => {
    if (!nameSearch) {
      getAllPeople().then((response) => {
        const pages = createPages(response.count);
        setCurrentPage(pages);
      });
    } else {
      countPagesSearch(nameSearch);
    }
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
