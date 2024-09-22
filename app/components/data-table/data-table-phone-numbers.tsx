'use client';

import * as React from 'react';
import { useEffect } from 'react';
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
  VisibilityState,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  ExpandedState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table-with-filters';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Filter } from '@/app/components/data-table/table-filters';
import { TablePagination } from '@/app/components/data-table/table-pagination';
import { Button } from '@/components/ui/button';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  pagination: PaginationState;
  sorting: SortingState;
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
  rowCount,
  pagination: { pageIndex, pageSize },
  sorting: [{ id, desc }],
  isPending,
}: DataTableProps<TData, TValue>) {
  const [expanded, setExpanded] = React.useState<ExpandedState>({});
  const [sorting, setSorting] = React.useState<SortingState>([{ id, desc }]);
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex,
    pageSize,
  });
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );

  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onExpandedChange: setExpanded,
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    filterFns: {},
    state: {
      sorting,
      pagination,
      columnVisibility,
      columnFilters,
      expanded,
    },
    pageCount: rowCount === 0 ? 0 : Math.ceil(rowCount / pagination.pageSize),
    rowCount: rowCount,
    enableMultiSort: true,
    manualSorting: false,
    manualPagination: false,
    manualFiltering: false,
    autoResetPageIndex: false,
    debugTable: false,
    debugHeaders: false,
  });

  const name = table.getHeaderGroups()[0].headers.find((header) => {
    return header.id === 'name';
  });

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between gap-4 mb-4">
        <Button
          type="button"
          variant="ghost"
          onClick={() => table.resetColumnFilters()}
          className="p-0 justify-start font-semibold text-base"
        >
          Всі країни
        </Button>
        {name?.column.getCanFilter() ? (
          <div className="w-full sm:w-[50%] md:w-[30%] flex flex-col justify-end gap-2">
            <Filter
              column={name.column}
              placeholder="Пошук по країні"
              icon="Search"
            />
          </div>
        ) : null}
      </div>

      <div className="rounded-[6px] shadow-[0_4px_15px_0_rgba(0,0,0,0.05)] bg-white overflow-hidden">
        <>
          <>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="font-normal text-sm leading-main-lh text-gray-dark bg-white px-1 py-[22px] first:pl-2 last:pr-2 sm:first:pl-8 sm:last:pr-8"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody className="max-h-full overflow-y-auto">
                {isPending ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 ">
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
                          className="odd:bg-bg-color"
                        >
                          {row.getVisibleCells().map((cell) => (
                            <TableCell
                              key={cell.id}
                              className="px-1 py-[14px] first:py-0 font-medium text-sm leading-main-lh text-main-dark first:pl-2 last:pr-2 sm:first:pl-8 sm:last:pr-8"
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </TableCell>
                          ))}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell
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
            </Table>
          </>
        </>
        <div className="w-full flex items-center justify-between gap-1 xs:gap-2 py-3 px-8 border-t border-gray-light">
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
            table={table}
            currentPage={pagination.pageIndex}
            key={'tab-pagination'}
          />
        </div>
      </div>
    </>
  );
}
