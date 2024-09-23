'use client';
import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';

import { SortingState } from '@tanstack/react-table';
import { DataTable } from '@/app/components/data-table/data-table-sms';
import { columns } from '@/app/components/data-table/columns/columns-sms';
import { smsType } from '@/types/call';

const msgs: smsType[] = [
  {
    id: 1,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 2,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 3,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 4,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 5,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 6,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 7,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 8,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 9,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 10,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 11,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 12,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
  {
    id: 13,
    numberFrom: '38068 578 47 85',
    numberTo: '38 098 567 34 44',
    date: '20.04.2024 18:23:49',
    text: 'New Thumbtack opportunity: Rylyn D. needs Business Tax Preparation (remote). Veiw in app: thmtk.com/GGrQtsKg, on web: thmtk.com/1Ng9hNNP',
    type: 'incoming',
    status: 'ok',
    price: 10,
  },
];

interface SmsListProps {
  listType: 'incoming' | 'outgoing';
}
export const SmsList = ({ listType }: SmsListProps) => {
  const initPagination = {
    pageIndex: 0,
    pageSize: 10,
  };
  const initSorting: SortingState = [
    {
      id: 'date',
      desc: false,
    },
  ];

  return (
    <>
      {msgs && msgs.length > 0 && (
        <>
          <DataTable
            columns={columns}
            data={msgs}
            rowCount={msgs.length}
            pagination={initPagination}
            sorting={initSorting}
            isPending={false}
          />
        </>
      )}
    </>
  );
};
