'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { FlagType } from '@/types/call';
import { cn } from '@/lib/utils';

import Image from 'next/image';

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

export const columns: ColumnDef<FlagType>[] = [
  {
    accessorKey: 'phoneCode',
    header: 'Код',
    cell: ({ getValue }) => {
      const phoneCode = getValue<string>();
      return (
        <span className="text-sm sm:ext-base text-main-dark font-medium">
          {phoneCode.startsWith('+') ? phoneCode : `+${phoneCode}`}
        </span>
      );
    },
  },
  {
    accessorKey: 'name',
    header: 'Напрямок',
    cell: ({ getValue, row }) => {
      const name = getValue<string>();
      const flag = row.original.flag;
      return (
        <button className="flex gap-2 items-center text-sm sm:text-base text-main-dark font-medium">
          <div className="flex items-center justify-center w-6 h-6 text-center overflow-hidden rounded-full object-cover flex-shrink-0">
            <Image
              src={flag}
              alt={name}
              width={24}
              height={24}
              style={{
                objectFit: 'cover',
                height: '24px',
                width: 'auto',
              }}
            />
          </div>
          <p>{name}</p>
        </button>
      );
    },
  },
  {
    accessorKey: 'priceForContract',
    header: () => (
      <>
        <span className="hidden sm:inline">Ціна підключення</span>
      </>
    ),
    cell: ({ getValue }) => {
      const priceForContract = getValue<number>();
      return (
        <span
          className={cn(
            'hidden sm:inline text-sm sm:text-base text-main-dark font-medium',
            !priceForContract || (priceForContract === 0 && 'text-gray-medium'),
          )}
        >
          {priceForContract && priceForContract > 0 ? priceForContract : 0} грн
        </span>
      );
    },
  },
  {
    accessorKey: 'priceForMonth',
    header: () => (
      <>
        <span className="hidden sm:inline">Абонплата/міс</span>
        <p className="sm:hidden text-right">
          Підключення
          <br />
          Плата/міс
        </p>
      </>
    ),
    cell: ({ getValue, row }) => {
      const priceForMonth = getValue<number>();
      const priceForContract = row.original.priceForContract;
      return (
        <>
          <span
            className={cn(
              'sm:hidden block text-sm sm:text-base text-main-dark font-medium text-right',
              !priceForContract ||
                (priceForContract === 0 && 'text-gray-medium'),
            )}
          >
            {priceForContract && priceForContract > 0 ? priceForContract : 0}{' '}
            грн
          </span>
          <span
            className={cn(
              'text-sm block sm:text-base text-main-dark font-medium text-right',
              !priceForMonth || (priceForMonth === 0 && 'text-gray-medium'),
            )}
          >
            {priceForMonth && priceForMonth > 0 ? priceForMonth : 0} грн
          </span>
        </>
      );
    },
  },
];
