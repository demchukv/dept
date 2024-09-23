'use client';
import { useEffect, useState, useTransition } from 'react';
import { Button } from '@/components/ui/button';

import { SortingState } from '@tanstack/react-table';
import { DataTable } from '@/app/components/data-table/data-table-sms';
import { columns } from '@/app/components/data-table/columns/columns-sms';
import { smsType } from '@/types/call';

import {
  SmsListRow,
  SmsListRowBig,
} from '@/app/components/call/my-numbers/sms-list-row';
import { Card } from '../../card/card';

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
          <Card className="sm:hidden shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 flex flex-col gap-4 overflow-hidden">
            <p className="sm:hidden text-base font-semibold">Повідомлення</p>
            {msgs.map((msg) => (
              <SmsListRow key={msg.id} msg={msg} />
            ))}
          </Card>
          <Card className="hidden sm:grid grid-cols-[auto_auto_auto_auto] shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-0 overflow-hidden">
            {msgs.map((msg, index) => (
              <SmsListRowBig key={msg.id} msg={msg} index={index} />
            ))}
          </Card>
        </>
      )}
      {/* {msgs && msgs.length > 0 && (
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
      )} */}
    </>
  );
};
