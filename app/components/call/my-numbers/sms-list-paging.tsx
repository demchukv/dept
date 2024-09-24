import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import React from 'react';
import { TablePagination } from '@/app/components/data-table/table-pagination';
import { cn } from '@/lib/utils';

interface SmsListPagingProps {
  pagination: {
    pageIndex: number;
    pageSize: number;
  };
  setPagination: ({
    pageIndex,
    pageSize,
  }: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  pages: number;
  className?: string;
}
export const SmsListPaging = ({
  pagination,
  setPagination,
  pages,
  className,
}: SmsListPagingProps) => {
  return (
    <>
      <div
        className={cn(
          'w-full flex items-center justify-between gap-1 xs:gap-2 py-3 px-8 border-t border-gray-light',
          className,
        )}
      >
        <div className="flex gap-1 xs:gap-2 items-center">
          <div className="text-main-dark font-normal text-sm hidden sm:block">
            Показувати по
          </div>
          <Select
            key={'page-select'}
            value={pagination.pageSize.toString()}
            onValueChange={(selectedValue) => {
              setPagination({ ...pagination, pageSize: Number(selectedValue) });
            }}
          >
            <SelectTrigger className="w-auto" key={'page-trigger'}>
              <SelectValue placeholder="Page size" key={'def-value'} />
            </SelectTrigger>
            <SelectContent key={'page-content'}>
              {[1, 2, 4, 5, 6, 8, 10, 20, 30, 40, 50, 100].map((pageSize) => (
                <SelectItem
                  key={pageSize.toString()}
                  value={pageSize.toString()}
                >
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TablePagination
          setPagination={setPagination}
          currentPage={pagination.pageIndex}
          pages={pages}
          key={'tab-pagination'}
        />
      </div>
    </>
  );
};
