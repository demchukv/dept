'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { taskType } from '@/types/task';
import {
  statusList,
  StatusLabelText,
} from '@/app/components/task/status-label';
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
for (const status in statusList) {
  statusSelect.push({ label: statusList[status].name, value: status });
}
export type TaskRowData = {
  subRows: any;
};

type TaskColumns = ColumnDef<TaskRowData, unknown>[];

export const columns: TaskColumns = [
  // {
  //   id: 'actions',
  //   cell: ({ row }) => {
  //     const task = row.original;
  //     return <ActionsTaskMenu task={task} />;
  //   },
  // },
  {
    accessorKey: 'title',
    header: () => 'Назва',
    cell: ({ row, getValue }) => {
      if (row.getCanExpand() && !row.getIsExpanded()) {
        row.toggleExpanded();
      }
      const task = row.original;
      return (
        <div
          style={{
            marginLeft: `${row.depth * 1}rem`,
            height: '46px',
          }}
          className={cn(
            'flex gap-2 items-center',
            row.depth > 0 && 'border-l border-gray-light',
          )}
        >
          {/* {row.depth > 0 && <div className={cn('w-1 h-full rounded-full')} />} */}
          <ActionsTaskMenu task={task} />

          {getValue<string>()}
        </div>
      );
      // return (
      //   <div
      //     style={{
      //       // Since rows are flattened by default,
      //       // we can use the row.depth property
      //       // and paddingLeft to visually indicate the depth
      //       // of the row
      //       paddingLeft: `${row.depth * 2}rem`,
      //     }}
      //   >
      //     <div>
      //       {row.getCanExpand() ? (
      //         <button
      //           {...{
      //             onClick: row.getToggleExpandedHandler(),
      //             style: { cursor: 'pointer' },
      //           }}
      //         >
      //           {row.getIsExpanded() ? '👇' : '👉'}
      //         </button>
      //       ) : (
      //         ' '
      //       )}{' '}
      //       {getValue<string>()}
      //     </div>
      //   </div>
      // );
    },
    footer: (props) => props.column.id,
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
