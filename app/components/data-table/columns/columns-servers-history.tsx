'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { serversHistoryType } from '@/types/servers-history';
import { Icon } from '@/components/utils/icon';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?:
      | 'text'
      | 'range'
      | 'select'
      | 'date'
      | 'autocomplete'
      | 'datalist';
    selectValues?: { label: string; value: string }[];
  }
}

export const columns: ColumnDef<serversHistoryType>[] = [
  {
    accessorKey: 'date',
    header: ({ column }) => {
      return (
        <Button
          type="button"
          variant="ghost"
          className="flex items-center gap-1"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <Icon
            iconName="TabSort"
            width={20}
            height={20}
            className={cn(column.getIsSorted() === 'asc' && 'rotate-180')}
          />
          Дата
        </Button>
      );
    },
  },
  {
    accessorKey: 'info',
    header: () => {
      return (
        <span className="flex flex-col gap-1">
          Дія
          <span className="sm:hidden">Користувач</span>
        </span>
      );
    },
    cell: ({ getValue, row }) => {
      const info = getValue<string>();
      const user = row.original.name;
      return (
        <span className="flex flex-col gap-1">
          {info}
          <span className="sm:hidden">{user}</span>
        </span>
      );
    },
  },
  {
    accessorKey: 'name',
    header: () => {
      return <span className="hidden sm:inline">Користувач</span>;
    },
    cell: ({ getValue }) => {
      const user = getValue<string>();
      return <span className="hidden sm:inline">{user}</span>;
    },
  },
  {
    accessorKey: 'state',
    header: 'Статус',
  },
];
