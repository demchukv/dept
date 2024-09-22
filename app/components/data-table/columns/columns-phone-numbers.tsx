'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { FlagType } from '@/types/call';

import Link from 'next/link';
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
      return phoneCode.startsWith('+') ? phoneCode : `+${phoneCode}`;
    },
  },
  {
    accessorKey: 'name',
    header: 'Напрямок',
    cell: ({ getValue, row }) => {
      const name = getValue<string>();
      const flag = row.original.flag;
      return (
        <div className="flex gap-5 items-center">
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
        </div>
      );
    },
  },
  {
    accessorKey: 'priceForContract',
    header: 'Ціна підключення',
    cell: ({ getValue }) => {
      const priceForContract = getValue<string>();
      return `${priceForContract} грн.`;
    },
  },
  {
    accessorKey: 'priceForMonth',
    header: 'Абонплата.міс',
    cell: ({ getValue }) => {
      const priceForMonth = getValue<string>();
      return `${priceForMonth} грн.`;
    },
  },
  //   {
  //     accessorKey: 'device',
  //     header: () => 'Пристрій',
  //     cell: ({ getValue }) => {
  //       const device = getValue<string>();
  //       return device;
  //     },
  //     footer: (props) => props.column.id,
  //   },

  //   {
  //     accessorKey: 'createdAt',
  //     header: 'Створено',
  //     cell: ({ getValue }) => {
  //       const createdAt = getValue<string>();
  //       return createdAt;
  //     },
  //     meta: {
  //       filterVariant: 'date',
  //     },
  //   },
  //   {
  //     accessorKey: 'action',
  //     header: () => 'Дія',
  //     cell: ({ getValue }) => {
  //       const action = getValue<string>();
  //       return action;
  //     },
  //     footer: (props) => props.column.id,
  //   },
  //   {
  //     accessorKey: 'status',
  //     header: 'Статус',
  //     cell: ({ getValue }) => {
  //       const status = getValue<string>();
  //       return <RepairStatusLabelText status={status} />;
  //     },
  //     meta: {
  //       filterVariant: 'select',
  //       selectValues: statusSelect,
  //     },
  //   },
  //   {
  //     accessorKey: 'client',
  //     header: 'Клієнт/Співробітник',
  //     cell: (info) => info.getValue<string>(),
  //     meta: {
  //       filterVariant: 'autocomplete',
  //       selectValues: statusSelect,
  //     },
  //   },
  //   {
  //     accessorKey: 'deadline',
  //     header: 'Плановий термін',
  //     cell: ({ getValue }) => {
  //       const deadline = getValue<string>();
  //       const dmy = deadline.split('.').reverse().join('-');
  //       const cres = compareAsc(dmy, new Date().toISOString());
  //       if (cres === 1) {
  //         return deadline;
  //       } else {
  //         return <span className="text-warning">{deadline}</span>;
  //       }
  //     },
  //   },
  //   {
  //     accessorKey: 'cost',
  //     header: 'Вартість, грн',
  //     cell: ({ getValue }) => {
  //       const cost = getValue<string>();
  //       return cost;
  //     },
  //   },
  //   {
  //     accessorKey: 'payment',
  //     header: 'Оплата',
  //     cell: ({ getValue }) => {
  //       const cost = getValue<string>();
  //       return cost;
  //     },
  //   },
];
