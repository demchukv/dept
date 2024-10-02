'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';

export type userRoleType = {
  userId: number;
  userName: string;
  userRoleId: number;
  roleName: string;
};

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
  interface TableMeta<TData extends RowData> {
    removeUserRole: (userId: number) => void;
  }
}

export const columns: ColumnDef<userRoleType>[] = [
  {
    accessorKey: 'userName',
    header: ({ column }) => {
      return (
        <div className="text-sm text-gray-dark hidden sm:flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            className="text-gray-dark"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <Icon
              iconName="TabSort"
              width={24}
              height={24}
              className={cn(
                'w-6 h-6',
                column.getIsSorted() === 'asc' && 'rotate-180',
              )}
            />
          </Button>
          <span>Співробітник</span>
        </div>
      );
    },
    cell: ({ getValue, row }) => {
      const userName = getValue<string>();
      const roleName = row.original.roleName;
      return (
        <>
          <div className="text-sm text-gray-dark">{userName}</div>
          <span className="font-semibold text-main-color text-sm sm:hidden">
            {roleName}
          </span>
        </>
      );
    },
  },
  {
    accessorKey: 'roleName',
    header: ({ column }) => {
      return (
        <div className="text-sm text-gray-dark hidden sm:flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            className="text-gray-dark"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            <Icon
              iconName="TabSort"
              width={24}
              height={24}
              className={cn(
                'w-6 h-6',
                column.getIsSorted() === 'asc' && 'rotate-180',
              )}
            />
          </Button>
          <span className="hidden sm:inline">Роль</span>
        </div>
      );
    },
    cell: ({ getValue }) => {
      const roleName = getValue<string>();
      return (
        <span className="hidden sm:inline font-semibold text-main-color text-sm">
          {roleName}
        </span>
      );
    },
  },
  {
    accessorKey: 'userId',
    header: '',
    cell: ({ getValue, table }) => {
      const userId = getValue<number>();
      return (
        <Button
          type="button"
          variant="ghost"
          className="text-warning hover:text-main-dark"
          onClick={() => {
            table.options.meta?.removeUserRole(userId);
          }}
        >
          <Icon iconName="Trash" width={24} height={24} className="w-6 h-6" />
        </Button>
      );
    },
  },
];
