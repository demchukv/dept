'use client';
import { useEffect, useState, useTransition } from 'react';

import { SortingState } from '@tanstack/react-table';
import { smsType } from '@/types/call';
import { SmsListPaging } from '@/app/components/call/my-numbers/sms-list-paging';

import {
  SmsListRow,
  SmsListRowBig,
} from '@/app/components/call/my-numbers/sms-list-row';
import { Card } from '../../card/card';
import { SmsListFilters } from '@/app/components/call/my-numbers/sms-list-filters';

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
    status: 'badnumber',
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
    status: 'notdelivered',
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

type filtersType = {
  id: string;
  name: string;
}[];
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
const initFilters: filtersType = [
  {
    id: 'startDate',
    name: new Date().toDateString(),
  },
  {
    id: 'endDate',
    name: new Date().toDateString(),
  },
];

interface SmsListProps {
  listType: 'incoming' | 'outgoing';
}
export const SmsList = ({ listType }: SmsListProps) => {
  const [pagination, setPagination] = useState(initPagination);
  const [sorting, setSorting] = useState<SortingState>(initSorting);
  const [filters, setFilters] = useState<filtersType>(initFilters);

  useEffect(() => {
    //TODO: fetch real data
    console.log(pagination, filters);
  }, [pagination, filters]);

  const onDeleteSms = (id: number) => {
    console.log('delete', id);
  };
  return (
    <>
      <SmsListFilters filters={filters} setFilters={setFilters} />
      {msgs && msgs.length > 0 && (
        <>
          <Card className="sm:hidden shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 flex flex-col gap-4 overflow-hidden">
            <p className="sm:hidden text-base font-semibold">Повідомлення</p>
            {msgs.map((msg) => (
              <SmsListRow
                key={msg.id}
                msg={msg}
                listType={listType}
                onDeleteSms={onDeleteSms}
              />
            ))}
            <SmsListPaging
              pagination={pagination}
              setPagination={setPagination}
              pages={Math.ceil(msgs.length / pagination.pageSize) || 0}
              className=""
            />
          </Card>
          <Card className="hidden sm:grid grid-cols-[auto_auto_auto_auto] shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-0 md:p-0 lg:p-0 overflow-hidden">
            <div className="pl-8 pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Від кого/кому
            </div>
            <div className="pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Повідомлення
            </div>
            <div className="pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Дата
            </div>
            <div className="pr-8 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light"></div>
            {msgs.map((msg, index) => (
              <SmsListRowBig
                key={msg.id}
                msg={msg}
                index={index}
                listType={listType}
                onDeleteSms={onDeleteSms}
              />
            ))}
            <SmsListPaging
              pagination={pagination}
              setPagination={setPagination}
              pages={Math.ceil(msgs.length / pagination.pageSize) || 0}
              className="col-span-4"
            />
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
