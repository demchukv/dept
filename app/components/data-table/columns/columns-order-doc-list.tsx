'use client';

import { ColumnDef, RowData } from '@tanstack/react-table';
import { orderDocType } from '@/types/orders';
import { Button } from '@/components/ui/button';

declare module '@tanstack/react-table' {
  interface ColumnMeta<TData extends RowData, TValue> {
    filterVariant?: 'text' | 'range' | 'select' | 'date';
    selectValues?: { label: string; value: string }[];
  }
}

export const columns: ColumnDef<orderDocType>[] = [
  {
    accessorKey: 'name',
    header: 'Назва документу',
  },

  {
    accessorKey: 'info',
    header: 'Деталі',
  },
  {
    accessorKey: 'file',
    header: '',
  },
];
