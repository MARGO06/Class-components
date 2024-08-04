import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { createPages } from 'src/utils/CreatePages';
import { People } from 'src/types';
import style from 'src/components/pagination/Pagination.module.scss';
import { PeopleContext } from 'src/hooks/ContextHook';
import { useGetPersonQuery } from 'src/store/apiRequests/GetPeople';
import { useTheme } from 'src/hooks/ThemeHook';
import { useRouter } from 'next/router';

type PaginationProps = {
  onClick: (page: number) => void;
};

export const Pagination: React.FC<PaginationProps> = ({ onClick }) => {
  const router = useRouter();
  const { query } = router;
  const nameSearch = query.search as string;
  const { isDark } = useTheme();
  const { data } = useGetPersonQuery(nameSearch) as { data: People };
  const count = Number(data?.count || 0);
  const [pagesAll, setPagesAll] = useState<number[]>([]);
  const { pageCurrent } = useContext(PeopleContext);

  useEffect(() => {
    const showPages = () => {
      const pages = createPages(count);
      setPagesAll(pages);
    };

    showPages();
  }, [count, nameSearch]);

  return (
    <div className={`${style.pagination} ${isDark ? '' : style.dark}`}>
      {pagesAll.map((page) => (
        <li key={page} className={`${style.paginate} ${pageCurrent === page ? style.active : ' '}`}>
          <Link
            href={`?search=${nameSearch}&page=${page}`}
            className={style.page}
            onClick={() => onClick(page)}
          >
            {page}
          </Link>
        </li>
      ))}
    </div>
  );
};
