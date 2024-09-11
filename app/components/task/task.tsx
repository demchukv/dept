'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { taskType } from '@/types/task';

import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import {
  DataTable,
  PaginationState,
} from '@/app/components/data-table/data-table-with-filters';
import { columns } from '@/app/components/data-table/columns/columns-task-list';

const dataTask: taskType[] = [
  {
    id: 1,
    title: 'Зробити щось неабияке',
    number: '№ 4165',
    createdAt: '01.05.24',
    deadline: '10.05.24',
    status: 'wait',
    responsible: 'Розробник',
    sheduledTime: '01:00:00',
    spentTime: '00:16:32',
    cost: 'В пакеті підтримки',
    source: 'Бітрікс24',
    author: 'Сергій Сергієнко',
  },
  {
    id: 2,
    title: 'Вбити дракона',
    number: '№ 6545',
    createdAt: '01.05.24',
    deadline: '10.05.24',
    status: 'pause',
    responsible: 'Інтегратор',
    sheduledTime: '05:00:00',
    spentTime: '04:16:32',
    cost: '8000',
    source: 'ASANA',
    author: 'Вася Пупкін',
  },
  {
    id: 3,
    title: 'Знайти аліньку квточку',
    number: '№ 8888',
    createdAt: '01.05.24',
    deadline: '03.05.24',
    status: 'inwork',
    responsible: 'Інтегратор',
    sheduledTime: '05:00:00',
    spentTime: '04:16:32',
    cost: '2000',
    source: 'Особистий кабінет',
    author: 'Ібрагім Ібрагімович',
  },
  {
    id: 4,
    title: 'Сходити в сусіднє село',
    number: '№ 8889',
    createdAt: '01.05.24',
    deadline: '03.05.24',
    status: 'ready',
    responsible: 'Інтегратор',
    sheduledTime: '05:00:00',
    spentTime: '04:16:32',
    cost: '2000',
    source: 'Телеграм',
    author: 'Ібрагім Ібрагімович',
  },
  {
    id: 1,
    title: 'Зробити щось неабияке',
    number: '№ 4165',
    createdAt: '01.05.24',
    deadline: '10.05.24',
    status: 'wait',
    responsible: 'Розробник',
    sheduledTime: '01:00:00',
    spentTime: '00:16:32',
    cost: 'В пакеті підтримки',
    source: 'Бітрікс24',
    author: 'Сергій Сергієнко',
  },
  {
    id: 3,
    title: 'Знайти аліньку квточку',
    number: '№ 8888',
    createdAt: '01.05.24',
    deadline: '03.05.24',
    status: 'inwork',
    responsible: 'Інтегратор',
    sheduledTime: '05:00:00',
    spentTime: '04:16:32',
    cost: '2000',
    source: 'Особистий кабінет',
    author: 'Ібрагім Ібрагімович',
  },
  {
    id: 4,
    title: 'Сходити в сусіднє село',
    number: '№ 8889',
    createdAt: '01.05.24',
    deadline: '03.05.24',
    status: 'ready',
    responsible: 'Інтегратор',
    sheduledTime: '05:00:00',
    spentTime: '04:16:32',
    cost: '2000',
    source: 'Телеграм',
    author: 'Ібрагім Ібрагімович',
  },
  {
    id: 2,
    title: 'Вбити дракона',
    number: '№ 6545',
    createdAt: '01.05.24',
    deadline: '10.05.24',
    status: 'pause',
    responsible: 'Інтегратор',
    sheduledTime: '05:00:00',
    spentTime: '04:16:32',
    cost: '8000',
    source: 'ASANA',
    author: 'Вася Пупкін',
  },
];
export const Task = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<taskType[]>([]);
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
        let currentData: taskType[] = [];
        // filter
        if (filters.length > 0) {
          currentData = dataTask.filter((item) => {
            return filters.every((filter) => {
              if (filter.id === 'status') {
                return item[filter.id] === filter.value;
              }
              if (filter.id === 'author') {
                return item[filter.id].includes(filter.value as string);
              }
              if (filter.id === 'responsible') {
                return item[filter.id] === filter.value;
              }
              return;
            });
          });
        } else {
          currentData = dataTask;
        }
        //pagination
        currentData = currentData.slice(
          pagination.pageIndex * pagination.pageSize,
          (pagination.pageIndex + 1) * pagination.pageSize,
        );
        //sorting
        // setdata
        setData(currentData || []);
        setRowCount(dataTask.length || 0);
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
        Заявки / Задачі
      </h1>

      <DataTable
        columns={columns}
        data={data}
        rowCount={rowCount}
        pagination={initPagination}
        sorting={initSorting}
        handlePaginationChange={handlePaginationChange}
        isPending={isPending}
      />
    </>
  );
};
