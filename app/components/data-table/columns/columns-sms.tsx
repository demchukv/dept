'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { smsType } from '@/types/call';
import { cn } from '@/lib/utils';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';

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

export const columns: ColumnDef<smsType>[] = [
  {
    accessorKey: 'numberFrom',
    header: 'Від кого/кому',
    cell: ({ getValue, row }) => {
      const numberFrom = getValue<string>();
      const numberTo = row.original.numberTo;
      return (
        <span className="font-medium whitespace-nowrap">
          від <span className="text-main-color">{numberFrom}</span>
          <br />
          на {numberTo}
        </span>
      );
    },
  },
  {
    accessorKey: 'text',
    header: 'Повідомлення',
    cell: ({ getValue }) => {
      const text = getValue<string>();
      return <span className="text-sm text-main-dark">{text}</span>;
    },
  },
  {
    accessorKey: 'date',
    header: 'Дата',
    cell: ({ getValue }) => {
      const date = getValue<string>();
      return <span className="text-sm text-main-dark">{date}</span>;
    },
    meta: {
      filterVariant: 'date',
    },
  },
  {
    accessorKey: 'id',
    header: '',
    cell: ({ getValue }) => {
      const id = getValue<string>();
      return (
        <Button
          type="button"
          variant="ghost"
          className="text-warning hover:text-main-dark"
        >
          <Icon iconName="Trash" width={24} height={24} />
        </Button>
      );
    },
  },
];
