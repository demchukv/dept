'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { repairType } from '@/types/repair';

import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import {
  DataTable,
  PaginationState,
} from '@/app/components/data-table/data-table-repair';
import {
  columns,
  RepairRowData,
} from '@/app/components/data-table/columns/columns-repairs-list';

const dataRepair: repairType[] = [
  {
    id: 1,
    number: 'REP-590146',
    device: 'Xiaomi Redmi Note Pro 10',
    createdAt: '10.05.2024',
    deadline: '10.10.2024',
    status: 'inwork',
    action: 'Заміна екрану',
    client: 'Остап Остапченко',
    cost: 'В пакеті підтримки',
    payment: 'В тарифі',
  },
  {
    id: 2,
    number: 'REP-867278',
    device: 'MacBook Ait 2022',
    createdAt: '01.05.2024',
    deadline: '10.10.2024',
    status: 'send',
    action: 'Заміна модулю Wi-Fi',
    client: 'Галина Бухгалтерович',
    cost: '8000',
    payment: 'Сплачено',
  },
];
export const Repair = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<repairType[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const initPagination = {
    pageIndex: 0,
    pageSize: 4,
  };
  const initSorting: SortingState = [
    {
      id: 'createdAt',
      desc: true,
    },
  ];
  const initFiltering = [] as ColumnFiltersState;

  const getData = async (
    pagination: PaginationState,
    sorting: SortingState,
    filters: ColumnFiltersState,
  ) => {
    startTransition(() => {
      setTimeout(() => {
        let currentData: repairType[] = [];
        // filter
        if (filters.length > 0) {
          currentData = dataRepair.filter((item) => {
            return filters.every((filter) => {
              if (filter.id === 'status') {
                return item[filter.id] === filter.value;
              }
              if (filter.id === 'client') {
                return item[filter.id].includes(filter.value as string);
              }
              return;
            });
          });
        } else {
          currentData = dataRepair;
        }
        //pagination
        currentData = currentData.slice(
          pagination.pageIndex * pagination.pageSize,
          (pagination.pageIndex + 1) * pagination.pageSize,
        );
        //sorting
        // setdata
        setData(dataRepair || []);
        setRowCount(dataRepair.length || 0);
      }, 500);

      //   getTaskList(pagination, sorting, filters).then((res) => {
      //     if (res?.success) {
      //       setData(res.data || []);
      //       setRowCount(res.rowCount || 0);
      //     }
      //     if (res?.error) {
      //       // toast.error(res.error);
      //       console.log(res.error);
      //     }
      //   });
    });
  };
  const handlePaginationChange = (
    newPagination: PaginationState,
    newSorting: SortingState,
    columnFilters: ColumnFiltersState,
  ) => {
    // console.log(columnFilters);
    getData(newPagination, newSorting, columnFilters);
  };

  useEffect(() => {
    getData(initPagination, initSorting, initFiltering);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        Ремонт техніки
      </h1>

      <DataTable
        columns={columns}
        data={data as RepairRowData[]}
        rowCount={rowCount}
        pagination={initPagination}
        sorting={initSorting}
        handlePaginationChange={handlePaginationChange}
        isPending={isPending}
      />
    </>
  );
};
