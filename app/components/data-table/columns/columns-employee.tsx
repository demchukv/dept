'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { EmployeeSettingsModal } from '@/app/components/settings/employee/employee-settings-modal';
import { roleList } from '@/app/components/settings/employee/employee';

export type employeeType = {
  id: number;
  name: string;
  role: number;
  phone: string;
  email: string;
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

export const columns: ColumnDef<employeeType>[] = [
  {
    accessorKey: 'name',

    cell: ({ getValue, row, table }) => {
      const id = getValue<string>();
      const name = row.original.name;
      const role = row.original.role;
      const phone = row.original.phone;
      const email = row.original.email;
      return (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-[3fr_1fr_2fr_auto] sm:gap-2 border border-gray-light rounded-[6px] sm:border-0 sm:py-2.5 mb-4 sm:mb-0 overflow-hidden">
            <div className="bg-bg-color sm:bg-transparent p-2 sm:p-0 border-b border-gray-light sm:border-0 flex items-center gap-2 justify-between">
              <div>
                <div className="text-base text-main-dark font-semibold">
                  {name}
                </div>
                <div
                  className={cn(
                    'text-sm text-gray-dark font-medium',
                    role === 1 && 'text-green-additional-color',
                    role === 3 && 'text-orange-additional-color',
                    role === 2 && 'text-blue-additional-color',
                  )}
                >
                  {roleList[role].label}
                </div>
              </div>
              <div className="sm:hidden">
                <EmployeeSettingsModal
                  data={row.original}
                  className="sm:hidden text-main-color hover:text-main-dark"
                />
              </div>
            </div>
            <div className="text-sm text-main-dark p-2 sm:p-0  border-b border-gray-light sm:border-0">
              {phone}
            </div>
            <div className="text-sm text-main-dark bg-bg-color sm:bg-transparent p-2 sm:p-0">
              {email}
            </div>
            <EmployeeSettingsModal
              data={row.original}
              className="hidden sm:flex self-start text-main-color hover:text-main-dark"
            />
          </div>
        </>
      );
    },
  },
];
