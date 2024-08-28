import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
import React from 'react';

interface TablePaginationProps {
  table: Table<any>;
  currentPage: number;
}

export const TablePagination = ({
  table,
  currentPage,
}: TablePaginationProps) => {
  const totalPage = table.getPageCount();
  const pageList = [];
  const pagination = createPagination(currentPage, totalPage);
  //   console.log('pagination', pagination);
  for (let i = 0; i < pagination.length; i++) {
    if (pagination[i] === '...') {
      const pageBtn = (
        <Button key={i} variant={'pagination'} size="sm">
          {'...'}
        </Button>
      );
      pageList.push(pageBtn);
    } else {
      const pageBtn = (
        <Button
          key={i}
          variant={i === currentPage ? 'paginationActive' : 'pagination'}
          size="sm"
          onClick={() => {
            table.setPageIndex(i);
          }}
        >
          {i + 1}
        </Button>
      );
      pageList.push(pageBtn);
    }
  }

  return (
    <div className="flex gap-1 xs:gap-2">{pageList.map((item) => item)}</div>
  );
};

function createPagination(currentPage: number, totalPages: number) {
  const maxVisiblePages = 4;
  let pages = [];

  if (totalPages <= maxVisiblePages) {
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 2) {
      pages = [1, 2, 3, '...', totalPages];
    } else if (currentPage >= totalPages - 1) {
      pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
      ];
    }
  }

  return pages;
}
