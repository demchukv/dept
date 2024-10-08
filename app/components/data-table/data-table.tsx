'use client';

import * as React from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-tab';
import { TablePagination } from '@/app/components/data-table/table-pagination';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  sorting: SortingState;
  pagination: PaginationState;
  isPending: boolean;
}

export type PaginationState = {
  pageIndex: number;
  pageSize: number;
};

export type PaginationTableState = {
  pagination: PaginationState;
};

export type PaginationInitialTableState = {
  pagination?: Partial<PaginationState>;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  pagination: { pageIndex, pageSize },
  sorting: [{ id, desc }],
  isPending,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([{ id, desc }]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex,
    pageSize,
  });

  const table = useReactTable({
    data,
    columns,
    columnResizeMode: 'onChange',
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    state: {
      pagination,
      sorting,
    },
    manualPagination: false,
    manualSorting: false,
    enableMultiSort: true,
    autoResetPageIndex: false,
    debugTable: false,
    debugHeaders: false,
  });

  return (
    <div className="max-h-full">
      <div className="max-h-full">
        <div className="rounded-[6px] border border-gray-light overflow-hidden">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        <div className="flex items-center h-full">
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </div>
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody className="max-h-full overflow-y-auto">
              {isPending ? (
                <TableRow key={'loading-row'}>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 "
                    key={'loading-cell'}
                  >
                    <div className="flex items-center justify-center w-full gap-4">
                      <span>Loading data ...</span>
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                <>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow key={'empty-row'}>
                      <TableCell
                        key={'empty-cell'}
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </>
              )}
            </TableBody>
            {table.getPageCount() > 1 && (
              <TableCaption key={'caption'}>
                <div className="w-full flex items-center justify-between gap-1 xs:gap-2 py-4">
                  <div className="flex gap-1 xs:gap-2 items-center">
                    <div className="text-main-dark font-normal text-sm hidden sm:block">
                      Показувати по
                    </div>
                    <Select
                      key={'page-select'}
                      value={table.getState().pagination.pageSize.toString()}
                      onValueChange={(selectedValue) => {
                        table.setPageSize(Number(selectedValue));
                      }}
                    >
                      <SelectTrigger className="w-auto" key={'page-trigger'}>
                        <SelectValue
                          placeholder="Page size"
                          key={'def-value'}
                        />
                      </SelectTrigger>
                      <SelectContent key={'page-content'}>
                        {[1, 2, 4, 5, 6, 8, 10, 20, 30, 40, 50, 100].map(
                          (pageSize) => (
                            <SelectItem
                              key={pageSize.toString()}
                              value={pageSize.toString()}
                            >
                              {pageSize}
                            </SelectItem>
                          ),
                        )}
                      </SelectContent>
                    </Select>
                  </div>

                  <TablePagination
                    table={table}
                    currentPage={pagination.pageIndex}
                    key={'tab-pagination'}
                  />
                </div>
              </TableCaption>
            )}
          </Table>
        </div>
      </div>
    </div>
  );
}
