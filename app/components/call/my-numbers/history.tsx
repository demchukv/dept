'use client';
import { useEffect, useState, useTransition } from 'react';

import { SortingState } from '@tanstack/react-table';
import { callType } from '@/types/call';
import { SmsListPaging } from '@/app/components/call/my-numbers/sms-list-paging';

import {
  HistoryRow,
  HistoryRowBig,
} from '@/app/components/call/my-numbers/history-row';
import { Card } from '../../card/card';
import { HistoryFilters } from '@/app/components/call/my-numbers/history-filters';

const msgs: callType[] = [
  {
    id: 1,
    date: '20.04.2024 18:23:49',
    direction: 'incoming',
    number: '38 097 987 45 63',
    line: '102 - С. Сергієнко',
    status: 'skipped',
  },
  {
    id: 2,
    date: '30.04.2024 13:12',
    direction: 'outgoing',
    number: '38 098 765 54 14',
    line: '101 - О. Остапченко',
    status: 'noreply',
  },
  {
    id: 3,
    date: '30.04.2024 12:12',
    direction: 'outgoing',
    number: '38 098 765 54 14',
    line: '101 - О. Остапченко',
    status: 'ok',
    recording: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    doc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '00:12:11',
    price: 0.86,
  },
  {
    id: 4,
    date: '20.04.2024 18:23:49',
    direction: 'incoming',
    number: '38 097 987 45 63',
    line: '102 - С. Сергієнко',
    status: 'skipped',
  },
  {
    id: 5,
    date: '30.04.2024 12:12',
    direction: 'outgoing',
    number: '38 098 765 54 14',
    line: '101 - О. Остапченко',
    status: 'ok',
    recording: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    doc: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    duration: '00:12:11',
    price: 0.86,
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

interface SmsListProps {}
export const History = ({}: SmsListProps) => {
  const [pagination, setPagination] = useState(initPagination);
  const [sorting, setSorting] = useState<SortingState>(initSorting);
  const [filters, setFilters] = useState<filtersType>(initFilters);

  useEffect(() => {
    //TODO: fetch real data
    console.log(pagination, filters);
  }, [pagination, filters]);

  return (
    <>
      <HistoryFilters filters={filters} setFilters={setFilters} />
      {msgs && msgs.length > 0 && (
        <>
          <Card className="sm:hidden shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 flex flex-col gap-4 overflow-hidden">
            <p className="sm:hidden text-base font-semibold">Список дзвінків</p>
            {msgs.map((msg) => (
              <HistoryRow key={msg.id} msg={msg} />
            ))}
            <SmsListPaging
              pagination={pagination}
              setPagination={setPagination}
              pages={Math.ceil(msgs.length / pagination.pageSize) || 0}
              className=""
            />
          </Card>
          <Card className="hidden max-w-[100%] sm:grid grid-cols-[auto_auto_auto_auto_auto_auto_auto_auto_auto] shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-0 md:p-0 lg:p-0 overflow-hidden">
            <div className="pl-8 pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              #
            </div>
            <div className="pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Дата дзвінка
            </div>
            <div className="pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Напрямок
            </div>
            <div className="pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Номер телефону
            </div>
            <div className="pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Внутрішня лінія
            </div>
            <div className="pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Статус
            </div>
            <div className="pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Запис
            </div>
            <div className="pr-6 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Тривалість
            </div>
            <div className="pr-8 py-[18px] flex items-center justify-between gap-2 bg-white text-sm text-gray-dark border-b border-gray-light">
              Вартість
            </div>
            {msgs.map((msg, index) => (
              <HistoryRowBig key={msg.id} msg={msg} index={index} />
            ))}
            <SmsListPaging
              pagination={pagination}
              setPagination={setPagination}
              pages={Math.ceil(msgs.length / pagination.pageSize) || 0}
              className="col-span-9"
            />
          </Card>
        </>
      )}
    </>
  );
};
