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
import Link from 'next/link';

interface DataTableProps<TData extends { subRows: any }, TValue> {
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

export function DataTable<TData extends { subRows: any }, TValue>({
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
    enableMultiSort: true,
    manualSorting: false,
    manualPagination: false,
    manualFiltering: false,
    autoResetPageIndex: false,
    debugTable: false,
    debugHeaders: false,
  });

  useEffect(() => {
    handlePaginationChange(pagination, sorting, columnFilters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pagination, sorting, columnFilters]);
  // console.log(table.getHeaderGroups()[0].headers);

  const createdAt = table.getHeaderGroups()[0].headers.find((header) => {
    return header.id === 'createdAt';
  });
  const status = table.getHeaderGroups()[0].headers.find((header) => {
    return header.id === 'status';
  });
  const client = table.getHeaderGroups()[0].headers.find((header) => {
    return header.id === 'client';
  });
  const action = table.getHeaderGroups()[0].headers.find((header) => {
    return header.id === 'action';
  });
  return (
    <>
      {/* <div className="mb-6 sm:mb-8 flex flex-col-reverse sm:flex-row sm:gap-6 sm:justify-between"> */}
      <div className="flex flex-col justify-between gap-2 sm:flex-row sm:gap-6 sm:mb-9">
        {createdAt?.column.getCanFilter() ? (
          <div className="w-full flex flex-col gap-2">
            <span className="text-xs leading-none">Відповідальний</span>
            <Filter column={createdAt.column} />
          </div>
        ) : null}

        {status?.column.getCanFilter() ? (
          <div className="w-full flex flex-col gap-2">
            <span className="text-xs leading-none">Статус</span>
            <Filter column={status.column} />
          </div>
        ) : null}
        {client?.column.getCanFilter() ? (
          <div className="w-full flex flex-col gap-2">
            <span className="text-xs leading-none">Автор</span>
            <Filter column={client.column} />
          </div>
        ) : null}
        {action?.column.getCanFilter() ? (
          <div className="w-full flex flex-col gap-2">
            <span className="text-xs leading-none">Пошук</span>
            <Filter column={action.column} icon="Search" />
          </div>
        ) : null}
      </div>
      {/* </div> */}

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
                          className="font-normal text-sm leading-main-lh text-gray-dark bg-white px-1 py-[22px] first:pl-2 last:pr-2 sm:first:pl-8 sm:last:pr-8 first:border-r first:border-gray-light"
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
                              className="px-1 py-[14px] first:py-0 font-medium text-sm leading-main-lh text-main-dark first:pl-2 last:pr-2 sm:first:pl-8 sm:last:pr-8 first:border-r first:border-gray-light"
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
