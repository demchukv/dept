'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { repairType } from '@/types/repair';
import {
  repairStatusList,
  RepairStatusLabelText,
} from '@/app/components/repair/repair-status-label';
import { ActionsTaskMenu } from '@/app/components/task/actions-task-menu';
import { cn } from '@/lib/utils';
import { compareAsc } from 'date-fns';

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
export type RepairRowData = {
  subRows: any;
};

type TaskColumns = ColumnDef<RepairRowData, unknown>[];

export const columns: TaskColumns = [
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const task = row.original;
  //     return <ActionsTaskMenu task={task} />;
  //   },
  // },
  {
    accessorKey: 'number',
    header: 'Номер',
    cell: ({ getValue }) => {
      const number = getValue<string>();
      return number;
    },
    meta: {
      filterVariant: 'text',
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
  },

  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ getValue }) => {
      const status = getValue<string>();
      //   return repairStatusList[status].name;
      return <RepairStatusLabelText status={status} />;
    },
    meta: {
      filterVariant: 'select',
      selectValues: statusSelect,
    },
  },
  {
    accessorKey: 'deadline',
    header: 'Дедлайн',
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
    accessorKey: 'responsible',
    header: 'Відповідальний',
    cell: (info) => info.getValue<string>(),
    meta: {
      filterVariant: 'autocomplete',
      selectValues: statusSelect,
    },
  },
  {
    accessorKey: 'sheduledTime',
    header: 'Плановий час',
    cell: ({ getValue }) => {
      const sheduledTime = getValue<string>();
      return sheduledTime;
    },
  },
  {
    accessorKey: 'spentTime',
    header: 'Затрачений час',
    cell: ({ getValue }) => {
      const spentTime = getValue<string>();
      return spentTime;
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
    accessorKey: 'source',
    header: 'Джерело',
    cell: ({ getValue }) => {
      const source = getValue<number>();
      return source;
    },
  },

  {
    accessorKey: 'author',
    header: 'Автор',
    // cell: (info) => info.getValue<string>(),
    cell: ({ getValue }) => {
      const author = getValue<string>();
      return author;
    },
    meta: {
      filterVariant: 'autocomplete',
      selectValues: statusSelect,
    },
  },
];
