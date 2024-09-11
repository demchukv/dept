'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { operationType } from '@/types/orders';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { TooltipShow } from '@/app/components/common/tooltip-show';
import { format } from 'date-fns';

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

export const columns: ColumnDef<operationType>[] = [
  {
    accessorKey: 'date',
    header: 'Дата',
    cell: ({ getValue }) => {
      const date = getValue<string>();
      return (
        <div className="text-gray-dark text-xs md:text-sm hidden md:inline">
          {format(new Date(date), 'dd.MM.yyyy')}
        </div>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Назва документу',
    cell: ({ getValue, row }) => {
      const name = getValue<string>();
      const date = row.original.date;
      return (
        <div className="ml-[-16px]">
          <div className="md:hidden">
            {format(new Date(date), 'dd.MM.yyyy')}
          </div>
          <div className="text-main-dark font-medium">{name}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'file',
    header: '',
    cell: ({ getValue }) => {
      const file = getValue<string>();
      if (!file) return null;
      return (
        <TooltipShow
          content={<p>Акт про надання послуг</p>}
          className="max-w-[160px] text-center"
        >
          <Link href={file} download={file} aria-describedby="Завантажити">
            <Icon
              width={16}
              height={16}
              iconName="Doc"
              className="fill-main-color hover:fill-main-dark w-6 h-6 md:w-4 md:h-4"
            />
          </Link>
        </TooltipShow>
      );
    },
  },

  {
    accessorKey: 'amount',
    header: 'Сума',
    cell: ({ getValue, row }) => {
      const type = row.original.type;
      const amount = getValue<number>();
      return (
        <div className="text-main-dark font-semibold whitespace-nowrap text-right">
          {type === 'income' ? '+' : '-'} {Number(amount).toFixed(2)} грн
        </div>
      );
    },
  },
];
