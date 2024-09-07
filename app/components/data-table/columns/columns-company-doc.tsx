'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { orderDocType } from '@/types/orders';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'date';
    selectValues?: { label: string; value: string }[];
  }
}

export const columns: ColumnDef<orderDocType>[] = [
  {
    accessorKey: 'number',
    header: 'Номер',
  },
  {
    accessorKey: 'name',
    header: 'Назва',
  },

  {
    accessorKey: 'date',
    header: 'Дата',
  },
  {
    accessorKey: 'file',
    header: '',
    cell: ({ getValue }) => {
      const file = getValue<string>();
      return (
        <Link href={file} download={file} title="Завантажити">
          <Icon
            width={24}
            height={24}
            iconName="Document"
            className="fill-main-color hover:fill-main-dark"
          />
        </Link>
      );
    },
  },
];
