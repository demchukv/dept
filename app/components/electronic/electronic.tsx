'use client';

import React, { useEffect, useState, useTransition } from 'react';
import { electronicType } from '@/types/electronic';

import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
import {
  DataTable,
  PaginationState,
} from '@/app/components/data-table/data-table-electronic';
import { columns } from '@/app/components/data-table/columns/columns-electronic-list';
import { Button } from '@/components/ui/button';

export const dataElectronic: electronicType[] = [
  {
    id: 1,
    category: 'Комп’ютери',
    brand: 'Apple',
    title: 'Macbook Air A1466',
    user: 'Остапенко Остап',
    department: 'Відділ продажів',
    cost: '400',
    fromDate: '01.01.24',
    toDate: '01.11.24',
    progress: 50,
    progressTitle: 'Задовільний',
    serial: 'ARG0151051989460456',
    description:
      'Сколи, подряпини, вм’ятини на корпусі, можуть бути описані будь які дефекти, що ідентифікують пристрій',
    photoList: [
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 2,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f4/7c/3586030.jpeg',
      },
      {
        id: 3,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/8d/ad/3586032.jpeg',
      },
      {
        id: 4,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/c8/d8/3586031.jpeg',
      },
      {
        id: 5,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/b2/b7/1279725.png',
      },
      {
        id: 6,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
      {
        id: 7,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 8,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
    ],
    complect: ['Macbook Air 2017', 'Apple Magic Mouse 2', 'Зарядний пристрій'],
    characteristics: [
      { label: 'Процесор', value: 'Apple M1' },
      { label: 'Пам’ять', value: '8 Gb' },
      { label: 'Матриця', value: 'Retina' },
      { label: 'Жорсткий диск', value: '128 Gb' },
    ],
  },
  {
    id: 2,
    category: 'Комп’ютери',
    brand: 'Apple',
    title: 'Macbook Pro A1520',
    user: 'Остапенко Остап',
    department: 'Відділ продажів',
    cost: '400',
    fromDate: '01.01.24',
    toDate: '01.11.24',
    progress: 90,
    progressTitle: 'Хороший',
    serial: 'ARG0151051989460456',
    description:
      'Сколи, подряпини, вм’ятини на корпусі, можуть бути описані будь які дефекти, що ідентифікують пристрій',
    photoList: [
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 2,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f4/7c/3586030.jpeg',
      },
      {
        id: 3,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/8d/ad/3586032.jpeg',
      },
      {
        id: 4,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/c8/d8/3586031.jpeg',
      },
      {
        id: 5,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/b2/b7/1279725.png',
      },
      {
        id: 6,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
      {
        id: 7,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 8,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
    ],
    complect: ['Macbook Air 2017', 'Apple Magic Mouse 2', 'Зарядний пристрій'],
    characteristics: [
      { label: 'Процесор', value: 'Apple M1' },
      { label: 'Пам’ять', value: '8 Gb' },
      { label: 'Матриця', value: 'Retina' },
      { label: 'Жорсткий диск', value: '128 Gb' },
    ],
  },
  {
    id: 3,
    category: 'Комп’ютери',
    brand: 'HP',
    title: 'Elite Pro Book',
    user: 'Остапенко Остап',
    department: 'Відділ продажів',
    cost: '600',
    fromDate: '01.01.24',
    toDate: '01.11.24',
    progress: 30,
    progressTitle: 'Задовільний',
    serial: 'ARG0151051989460456',
    description:
      'Сколи, подряпини, вм’ятини на корпусі, можуть бути описані будь які дефекти, що ідентифікують пристрій',
    photoList: [
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 2,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f4/7c/3586030.jpeg',
      },
      {
        id: 3,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/8d/ad/3586032.jpeg',
      },
      {
        id: 4,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/c8/d8/3586031.jpeg',
      },
      {
        id: 5,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/b2/b7/1279725.png',
      },
      {
        id: 6,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
      {
        id: 7,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 8,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
    ],
    complect: ['Macbook Air 2017', 'Apple Magic Mouse 2', 'Зарядний пристрій'],
    characteristics: [
      { label: 'Процесор', value: 'Apple M1' },
      { label: 'Пам’ять', value: '8 Gb' },
      { label: 'Матриця', value: 'Retina' },
      { label: 'Жорсткий диск', value: '128 Gb' },
    ],
  },
  {
    id: 3,
    category: 'Смартфони',
    brand: 'Huawei',
    title: 'Elite Pro Book',
    user: 'Галина Бухгалтерівна',
    department: 'Магазин',
    cost: '600',
    fromDate: '01.01.24',
    toDate: '01.11.24',
    progress: 70,
    progressTitle: 'Задовільний',
    serial: 'ARG0151051989460456',
    description:
      'Сколи, подряпини, вм’ятини на корпусі, можуть бути описані будь які дефекти, що ідентифікують пристрій',
    photoList: [
      {
        id: 1,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 2,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f4/7c/3586030.jpeg',
      },
      {
        id: 3,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/8d/ad/3586032.jpeg',
      },
      {
        id: 4,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/c8/d8/3586031.jpeg',
      },
      {
        id: 5,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/b2/b7/1279725.png',
      },
      {
        id: 6,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
      {
        id: 7,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/f6/2b/3586029.png',
      },
      {
        id: 8,
        imgSrc:
          'https://stylus.ua/cdn-cgi/image/width=500,height=500,fit=pad,f=webp/gallery/95/21/1279728.png',
      },
    ],
    complect: ['Macbook Air 2017', 'Apple Magic Mouse 2', 'Зарядний пристрій'],
    characteristics: [
      { label: 'Процесор', value: 'Apple M1' },
      { label: 'Пам’ять', value: '8 Gb' },
      { label: 'Матриця', value: 'Retina' },
      { label: 'Жорсткий диск', value: '128 Gb' },
    ],
  },
];

export const Electronic = () => {
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<electronicType[]>([]);
  const [rowCount, setRowCount] = useState(0);

  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };

  const initPagination = {
    pageIndex: 0,
    pageSize: 10,
  };
  const initSorting: SortingState = [
    {
      id: 'title',
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
        let currentData: electronicType[] = [];
        // filter
        if (filters.length > 0) {
          return;
          // currentData = dataRepair.filter((item) => {
          //   return filters.every((filter) => {
          //     if (filter.id === 'status') {
          //       return item[filter.id] === filter.value;
          //     }
          //     if (filter.id === 'client') {
          //       return item[filter.id].includes(filter.value as string);
          //     }
          //     return;
          //   });
          // });
        } else {
          currentData = dataElectronic;
        }
        //pagination
        currentData = currentData.slice(
          pagination.pageIndex * pagination.pageSize,
          (pagination.pageIndex + 1) * pagination.pageSize,
        );
        //sorting
        // setdata
        setData(dataElectronic || []);
        setRowCount(dataElectronic.length || 0);
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Техніка у використанні
        </h1>
        <Button type="button">Отримати пристрій</Button>
      </div>

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
