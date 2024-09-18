'use client';

import React from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { ModalLoading } from '@/app/components/common/modal-loading';
import { Loading } from '@/app/components/common/loading';

import { columns } from '@/app/components/data-table/columns/columns-order-doc-list';
import { DataTable } from '@/app/components/data-table/data-table';
import useSWR from 'swr';

interface ListOfDocsProps {
  docId: number | null;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

//TODO: query for API to get list of docs and render them
const fetcher = () =>
  fetch('/test-data/bag-doc.json').then((res) => res.json());

export const ListOfDocs = ({ docId, onClose }: ListOfDocsProps) => {
  const { data, error } = useSWR('/test-data/bag-doc.json', fetcher);

  if (error) return <ModalLoading type="error">Failed to load</ModalLoading>;
  if (!data)
    return (
      <ModalLoading type="loading">
        <Loading />
      </ModalLoading>
    );

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
    <div className="grid grid-cols-1 justify-center gap-6">
      <ModalHeader>
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center">
          Документи по замовленню{' '}
          <span className="text-main-color whitespace-nowrap">
            № 45 715 811
          </span>
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <DataTable
        columns={columns}
        data={data}
        rowCount={data.length}
        sorting={initSorting}
        pagination={initPagination}
        isPending={!data}
      />
      <ModalFooter className="hidden"></ModalFooter>
    </div>
  );
};
