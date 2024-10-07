import { Button } from '@/components/ui/button';
import { Table } from '@tanstack/react-table';
import React from 'react';

interface TablePaginationProps {
  table?: Table<any>;
  setPagination?: ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  currentPage: number;
  pages?: number;
}

export const TablePagination = ({
  table,
  setPagination,
  currentPage,
  pages = 0,
}: TablePaginationProps) => {
  const totalPage = table ? table?.getPageCount() : pages;
  const pageList = [];

  const pagination = createPagination(currentPage, totalPage);

  for (let i = 0; i < pagination.length; i++) {
    if (pagination[i] === '...') {
      const pageBtn = (
        <Button
          key={`${i}-dots`}
          variant={'pagination'}
          size="sm"
          className="cursor-default"
        >
          {'...'}
        </Button>
      );
      pageList.push(pageBtn);
    } else {
      const pageBtn = (
        <Button
          key={pagination[i]}
          variant={
            Number(pagination[i]) === Number(currentPage)
              ? 'paginationActive'
              : 'pagination'
          }
          size="sm"
          onClick={() => {
            table
              ? table.setPageIndex(Number(pagination[i]))
              : setPagination &&
                setPagination({
                  pageIndex: Number(pagination[i]),
                  pageSize: 10,
                });
          }}
        >
          {Number(pagination[i]) + 1}
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
    for (let i = 0; i < totalPages; i++) {
      pages.push(i);
    }
  } else {
    if (currentPage <= 1) {
      pages = [0, 1, 2, '...', totalPages];
    } else if (currentPage >= totalPages - 1) {
      pages = [0, '...', totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [
        0,
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
