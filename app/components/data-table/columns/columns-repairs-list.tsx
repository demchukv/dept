'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { repairType } from '@/types/repair';
import {
  repairStatusList,
  RepairStatusLabelText,
} from '@/app/components/repair/repair-status-label';
import { compareAsc } from 'date-fns';
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

let statusSelect: { label: string; value: string }[] = [];
for (const status in repairStatusList) {
  statusSelect.push({ label: repairStatusList[status].name, value: status });
}

export const columns: ColumnDef<repairType>[] = [
  {
    accessorKey: 'number',
    header: 'Номер',
    cell: ({ getValue, row }) => {
      const number = getValue<string>();
      return <Link href={`/repair/${row.original.id}`}>{number}</Link>;
    },
  },
  {
    accessorKey: 'device',
    header: () => 'Пристрій',
    cell: ({ getValue }) => {
      const device = getValue<string>();
      return device;
    },
    footer: (props) => props.column.id,
  },

  {
    accessorKey: 'createdAt',
    header: 'Створено',
    cell: ({ getValue }) => {
      const createdAt = getValue<string>();
      return createdAt;
    },
    meta: {
      filterVariant: 'date',
    },
  },
  {
    accessorKey: 'action',
    header: () => 'Дія',
    cell: ({ getValue }) => {
      const action = getValue<string>();
      return action;
    },
    footer: (props) => props.column.id,
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ getValue }) => {
      const status = getValue<string>();
      return <RepairStatusLabelText status={status} />;
    },
    meta: {
      filterVariant: 'select',
      selectValues: statusSelect,
    },
  },
  {
    accessorKey: 'client',
    header: 'Клієнт/Співробітник',
    cell: (info) => info.getValue<string>(),
    meta: {
      filterVariant: 'autocomplete',
      selectValues: statusSelect,
    },
  },
  {
    accessorKey: 'deadline',
    header: 'Плановий термін',
    cell: ({ getValue }) => {
      const deadline = getValue<string>();
      const dmy = deadline.split('.').reverse().join('-');
      const cres = compareAsc(dmy, new Date().toISOString());
      if (cres === 1) {
        return deadline;
      } else {
        return <span className="text-warning">{deadline}</span>;
      }
    },
  },
  {
    accessorKey: 'cost',
    header: 'Вартість, грн',
    cell: ({ getValue }) => {
      const cost = getValue<string>();
      return cost;
    },
  },
  {
    accessorKey: 'payment',
    header: 'Оплата',
    cell: ({ getValue }) => {
      const cost = getValue<string>();
      return cost;
    },
  },
];
