'use client';

import * as React from 'react';
import { useEffect } from 'react';
import {
  Column,
  ColumnDef,
  SortingState,
  RowData,
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
  getExpandedRowModel,
  Row,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table-with-filters';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { Filter } from '@/app/components/data-table/table-filters';
import { TablePagination } from '@/app/components/data-table/table-pagination';
import { taskType } from '@/types/task';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowCount: number;
  pagination: PaginationState;
  sorting: SortingState;
  handlePaginationChange: (
    newPagination: PaginationState,
    newSorting: SortingState,
    columnFilters: ColumnFiltersState,
  ) => void;
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

export function DataTable<TData extends { subRows: TData[] }, TValue>({
  columns,
  data,
  rowCount,
  pagination: { pageIndex, pageSize },
  sorting: [{ id, desc }],
  handlePaginationChange,
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
    getSubRows: (row) => row.subRows,
    getExpandedRowModel: getExpandedRowModel(),
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
    manualSorting: true,
    enableMultiSort: true,
    manualPagination: true,
    manualFiltering: true,
    autoResetPageIndex: false,
    debugTable: false,
    debugHeaders: false,
  });

  useEffect(() => {
    handlePaginationChange(pagination, sorting, columnFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sorting, columnFilters]);
  // console.log(table.getHeaderGroups()[0].headers);

  const responsible = table.getHeaderGroups()[0].headers.find((header) => {
    return header.id === 'responsible';
  });
  const author = table.getHeaderGroups()[0].headers.find((header) => {
    return header.id === 'author';
  });
  const status = table.getHeaderGroups()[0].headers.find((header) => {
    return header.id === 'status';
  });
  const title = table.getHeaderGroups()[0].headers.find((header) => {
    return header.id === 'title';
  });
  return (
    <>
      <div className="mb-6 sm:mb-9 flex flex-col-reverse sm:flex-row sm:gap-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:gap-6 sm:mb-9">
          {responsible?.column.getCanFilter() ? (
            <div className="flex flex-col gap-2">
              <span className="text-xs leading-none">Відповідальний</span>
              <Filter column={responsible.column} />
            </div>
          ) : null}
          {status?.column.getCanFilter() ? (
            <div className="flex flex-col gap-2">
              <span className="text-xs leading-none">Статус</span>
              <Filter column={status.column} />
            </div>
          ) : null}
          {author?.column.getCanFilter() ? (
            <div className="flex flex-col gap-2">
              <span className="text-xs leading-none">Автор</span>
              <Filter column={author.column} />
            </div>
          ) : null}
          {title?.column.getCanFilter() ? (
            <div className="flex flex-col gap-2">
              <span className="text-xs leading-none">Пошук</span>
              <Filter column={title.column} icon="Search" />
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-2  items-end mb-6 sm:mb-0">
          <span className="text-xs leading-none">&nbsp;</span>
          <Button
            type="button"
            variant="default"
            className="w-full sm:w-auto py-2.5 sm:py-[8px]"
          >
            Додати заявку
          </Button>
        </div>
      </div>

      <div className="rounded-[6px] shadow-[0_4px_15px_0_rgba(0,0,0,0.05)] bg-white overflow-hidden">
        <>
          {/* <div className="flex items-center py-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div> */}
          {/* <>
          <div className="flex flex-row flex-wrap">
            {table.getHeaderGroups().map((headerGroup) => (
              <React.Fragment key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <div key={header.id}>
                      <div className="flex flex-col">
                        <div>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </div>
                        <div className="mb-1">
                          {header.column.getCanFilter() ? (
                            <Filter column={header.column} />
                          ) : null}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </> */}
          <>
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead
                          key={header.id}
                          className="font-normal text-sm leading-main-lh text-gray-dark bg-white px-1 py-[22px] first:pl-8 last:pr-8"
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
                              className="px-1 py-[14px] font-medium text-sm leading-main-lh text-main-dark first:pl-8  last:pr-8"
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