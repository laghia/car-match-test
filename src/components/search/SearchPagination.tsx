import { useState } from 'react';
import './SearchPagination.css';

type SearchPaginationProps = {
  totalPages?: number;
};

export function SearchPagination({ totalPages = 17 }: SearchPaginationProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const visiblePages = [1, 2, 3, 4, 5];

  return (
    <nav className="search-pagination" aria-label="Search results pages">
      <div className="search-pagination__numbers">
        {visiblePages.map((page) => (
          <button
            key={page}
            type="button"
            className={`search-pagination__page ${page === currentPage ? 'search-pagination__page--active' : ''}`}
            aria-current={page === currentPage ? 'page' : undefined}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <span className="search-pagination__ellipsis" aria-hidden="true">
          …
        </span>
        <button
          type="button"
          className="search-pagination__page"
          onClick={() => setCurrentPage(totalPages)}
        >
          {totalPages}
        </button>
      </div>
    </nav>
  );
}
