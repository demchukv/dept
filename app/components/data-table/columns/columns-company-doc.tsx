'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { companyDocType } from '@/types/orders';
import { Icon } from '@/components/utils/icon';
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

export const columns: ColumnDef<companyDocType>[] = [
  {
    accessorKey: 'number',
    header: () => <div className="hidden sm:inline">Номер</div>,
    cell: ({ getValue }) => {
      const number = getValue<string>();
      return <div className="hidden sm:inline">{number}</div>;
    },
  },
  {
    accessorKey: 'name',
    header: () => <div className="hidden sm:inline">Назва</div>,
    cell: ({ getValue, row }) => {
      const name = getValue<string>();
      return (
        <>
          <div className="hidden sm:inline">{name}</div>
          <div className="grid grid-cols-2 sm:hidden">
            <div>Номер</div>
            <div>{row.original.number}</div>
            <div>Назва</div>
            <div>{row.original.name}</div>
            <div>Дата укладання</div>
            <div>{row.original.date}</div>
          </div>
        </>
      );
    },
  },

  {
    accessorKey: 'date',
    header: () => <div className="hidden sm:inline">Дата</div>,
    cell: ({ getValue, row }) => {
      const date = getValue<string>();
      return (
        <>
          <div className="hidden sm:inline">{date}</div>
        </>
      );
    },
  },
  {
    accessorKey: 'file',
    header: '',
    cell: ({ getValue }) => {
      const file = getValue<string>();
      return (
        <Link href={file} download={file} title="Завантажити">
          <Icon
            width={24}
            height={24}
            iconName="Document"
            className="fill-main-color hover:fill-main-dark"
          />
        </Link>
      );
    },
  },
];
