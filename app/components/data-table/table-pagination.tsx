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
  for (let i = 0; i < totalPage; i++) {
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

  return (
    <div className="flex gap-1 xs:gap-2">{pageList.map((item) => item)}</div>
  );
};
