'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { taskType } from '@/types/task';
import {
  statusList,
  StatusLabelText,
} from '@/app/components/task/status-label';
import { ActionsTaskMenu } from '@/app/components/task/actions-task-menu';

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
for (const status in statusList) {
  statusSelect.push({ label: statusList[status].name, value: status });
}

export const columns: ColumnDef<taskType>[] = [
  {
    id: 'actions',
    cell: ({ row }) => {
      const task = row.original;
      return <ActionsTaskMenu task={task} />;
    },
  },
  {
    accessorKey: 'title',
    header: () => 'Назва',
    cell: ({ getValue }) => {
      const title = getValue<string>();
      return title;
    },
  },
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
    accessorKey: 'createdAt',
    header: 'Створено',
    cell: ({ getValue }) => {
      const createdAt = getValue<string>();
      return createdAt;
    },
  },
  {
    accessorKey: 'deadline',
    header: 'Дедлайн',
    cell: ({ getValue }) => {
      const deadline = getValue<string>();
      return deadline;
    },
  },
  {
    accessorKey: 'status',
    header: 'Статус',
    cell: ({ getValue }) => {
      const status = getValue<string>();
      // return statusList[status].name;
      return <StatusLabelText status={status} />;
    },
    meta: {
      filterVariant: 'select',
      selectValues: statusSelect,
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
