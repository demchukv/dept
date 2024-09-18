'use client';

import React from 'react';
import { Loading } from '@/app/components/common/loading';

import { columns } from '@/app/components/data-table/columns/columns-servers-history';
import { DataTable } from '@/app/components/data-table/data-table';
import useSWR from 'swr';
import { ErrorMessage } from '@/app/components/common/error-message';

interface VirtualHistoryProps {}

//TODO: query for API to get list of docs and render them
const fetcher = () =>
  fetch('/test-data/servers-history.json').then((res) => res.json());

export const VirtualHistory = ({}: VirtualHistoryProps) => {
  const { data, error } = useSWR('/test-data/servers-history.json', fetcher);

  if (error) return <ErrorMessage>Failed to load</ErrorMessage>;
  if (!data) return <Loading />;

  const initPagination = {
    pageIndex: 0,
    pageSize: 4,
  };
  const initSorting = [
    {
      id: 'createdAt',
      desc: true,
    },
  ];
  return (
    <>
      <p className="font-semibold text-base leading-normal text-main-dark mb-6">
        Логи
      </p>
      <DataTable
        columns={columns}
        data={data}
        rowCount={data.length}
        sorting={initSorting}
        pagination={initPagination}
        isPending={!data}
      />
    </>
  );
};
