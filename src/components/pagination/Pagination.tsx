import React, { useEffect, useState, useContext } from 'react';
import Link from 'next/link';
import { createPages } from 'src/utils/CreatePages';
import style from 'src/components/pagination/Pagination.module.scss';
import { PeopleContext } from 'src/hooks/ContextHook';
import { useTheme } from 'src/hooks/ThemeHook';
import { useRouter } from 'next/router';

type PaginationProps = {
  onClick: (page: number) => void;
  count: string;
};

export const Pagination: React.FC<PaginationProps> = ({ onClick, count }) => {
  const router = useRouter();
  const { query } = router;
  const nameSearch = query.search as string;
  const { isDark } = useTheme();
  const [pagesAll, setPagesAll] = useState<number[]>([]);
  const { pageCurrent } = useContext(PeopleContext);

  useEffect(() => {
    const showPages = () => {
      const pages = createPages(Number(count));
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
