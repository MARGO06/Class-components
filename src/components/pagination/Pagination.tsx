import React, { useEffect, useState, useCallback } from 'react';
import { getAllPeople } from 'src/apiRequests/GetAllPeople';
import { getPerson } from 'src/apiRequests/SearchPerson';
import { Link } from 'src/components/link/Link';
import style from 'src/components/pagination/Pagination.module.scss';

type PaginationProps = {
  onClick: (search: string, page: number) => void;
  pageCurrent: number;
};

export const Pagination: React.FC<PaginationProps> = ({ onClick, pageCurrent }) => {
  const [currentPage, setCurrentPage] = useState<number[]>([]);

  const countPagesSearch = useCallback(async (searchName: string) => {
    const result = await getPerson(searchName);
    const countPage = Math.ceil(Number(result.count) / 10);
    const pages = Array.from({ length: countPage }, (_, i) => i + 1);
    setCurrentPage(pages);
  }, []);

  useEffect(() => {
    const searchName = localStorage.getItem('searchName');
    if (!searchName) {
      getAllPeople().then((response) => {
        const countPages = Math.ceil(Number(response.count) / 10);
        const pages = Array.from({ length: countPages }, (_, i) => i + 1);
        setCurrentPage(pages);
      });
    } else {
      countPagesSearch(searchName);
    }
  }, [countPagesSearch]);

  const search = localStorage.getItem('searchName') ?? '';

  return (
    <div className={style.pagination}>
      {currentPage.map((page) => (
        <li key={page} className={`${style.paginate} ${pageCurrent === page ? style.active : ' '}`}>
          <Link
            to={`?search=${search}&page=${page}`}
            className={style.page}
            onClick={() => onClick(search, page)}
          >
            {page}
          </Link>
        </li>
      ))}
    </div>
  );
};
