'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { electronicType } from '@/types/electronic';
import Link from 'next/link';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?:
      | 'text'
      | 'range'
      | 'select'
      | 'date'
      | 'autocomplete'
      | 'datalist'
      | undefined;
    selectValues?: { label: string; value: string }[];
  }
}

const listCategory: { label: string; value: string }[] = [
  { label: 'Комп’ютери', value: 'Комп’ютери' },
  { label: 'Телевізори', value: 'Телевізори' },
  { label: 'Планшети', value: 'Планшети' },
  { label: 'Смартфони', value: 'Смартфони' },
];
const listUsers: { label: string; value: string }[] = [
  { label: 'Остапенко Остап', value: 'Остапенко Остап' },
  { label: 'Петров Василь', value: 'Петров Василь' },
  { label: 'Пупкін Користувач', value: 'Пупкін Користувач' },
  { label: 'Галина Бухгалтерівна', value: 'Галина Бухгалтерівна' },
];
const listDepartments: { label: string; value: string }[] = [
  { label: 'Бухгалтерія', value: 'Бухгалтерія' },
  { label: 'Відділ продажів', value: 'Відділ продажів' },
  { label: 'Менеджмент', value: 'Менеджмент' },
  { label: 'Магазин', value: 'Магазин' },
];

export const columns: ColumnDef<electronicType>[] = [
  {
    accessorKey: 'category',
    header: 'Категорія',
    cell: ({ getValue, row }) => {
      const category = getValue<string>();
      return <Link href={`/electronic/${row.original.id}`}>{category}</Link>;
    },
    meta: {
      filterVariant: 'select',
      selectValues: listCategory,
    },
  },
  {
    accessorKey: 'brand',
    header: () => 'Бренд',
    cell: ({ getValue }) => {
      const brand = getValue<string>();
      return brand;
    },
    footer: (props) => props.column.id,
  },

  {
    accessorKey: 'title',
    header: 'Назва / Модель',
    cell: ({ getValue }) => {
      const title = getValue<string>();
      return <span className="text-main-color font-semibold">{title}</span>;
    },
  },
  {
    accessorKey: 'user',
    header: () => 'Користувач',
    cell: ({ getValue }) => {
      const user = getValue<string>();
      return user;
    },
    meta: {
      filterVariant: 'select',
      selectValues: listUsers,
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'department',
    header: 'Відділ',
    cell: ({ getValue }) => {
      const department = getValue<string>();
      return department;
    },
    meta: {
      filterVariant: 'select',
      selectValues: listDepartments,
    },
  },

  {
    accessorKey: 'cost',
    header: 'Плата за користування грн / міс',
    cell: ({ getValue }) => {
      const cost = getValue<string>();
      return cost;
    },
  },
];
