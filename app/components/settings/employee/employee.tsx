'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { SortingState } from '@tanstack/react-table';
import { DataTable } from '@/app/components/data-table/data-table-employee';
import { columns } from '@/app/components/data-table/columns/columns-employee';
import { Card } from '@/app/components/card/card';

const employeeList = [
  {
    id: 1,
    name: 'Шевченко Василь Петрович',
    role: 1,
    phone: '+380123456789',
    email: 'QYnKw@example.com',
  },
  {
    id: 2,
    name: 'Романюк Олеся Григорівна',
    role: 2,
    phone: '+380123456789',
    email: 'address@gmail.com',
  },
  {
    id: 3,
    name: 'Пупкін Василь Іванович',
    role: 3,
    phone: '+380123456789',
    email: 'mail_test_564936@gmail.com',
  },
  {
    id: 4,
    name: 'Шевченко Василь Петрович',
    role: 1,
    phone: '+380123456789',
    email: 'QYnKw@example.com',
  },
  {
    id: 5,
    name: 'Романюк Олеся Григорівна',
    role: 3,
    phone: '+380123456789',
    email: 'address@gmail.com',
  },
  {
    id: 6,
    name: 'Пупкін Василь Іванович',
    role: 3,
    phone: '+380123456789',
    email: 'QYnKw@example.com',
  },
  {
    id: 7,
    name: 'Шевченко Василь Петрович',
    role: 1,
    phone: '+380123456789',
    email: 'QYnKw@example.com',
  },
  {
    id: 8,
    name: 'Романюк Олеся Григорівна',
    role: 3,
    phone: '+380123456789',
    email: 'address@gmail.com',
  },
];

export const roleList = [
  { id: 1, label: 'Адміністратор', color: 'text-' },
  { id: 2, label: 'Менеджер проєкту' },
  { id: 3, label: 'Фінансист' },
  { id: 4, label: 'Керівник' },
];

export const Employee = () => {
  const initPagination = {
    pageIndex: 0,
    pageSize: 5,
  };
  const initSorting: SortingState = [
    {
      id: 'name',
      desc: false,
    },
  ];
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Налаштування. Співробітники
        </h1>
        <Button type="button">Новий співробітник</Button>
      </div>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8">
        <DataTable
          columns={columns}
          data={employeeList}
          rowCount={employeeList.length}
          pagination={initPagination}
          sorting={initSorting}
          isPending={false}
        />
      </Card>
    </>
  );
};
