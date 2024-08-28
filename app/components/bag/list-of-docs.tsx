'use client';

import React, { useEffect } from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { ModalLoading } from '@/app/components/common/modal-loading';

import { columns } from '@/app/components/data-table/columns/columns-order-doc-list';
import {
  DataTable,
  PaginationState,
} from '@/app/components/data-table/data-table';
import { ColumnFiltersState, SortingState } from '@tanstack/react-table';
// import { getJson } from '@/data/get-json';
import { orderDocType } from '@/types/orders';
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
  if (!data) return <ModalLoading type="loading">Loading...</ModalLoading>;

  const initPagination = {
    pageIndex: 0,
    pageSize: 4,
  };

  return (
    <>
      <ModalHeader>
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center">
          Документи по замовленню{' '}
          <span className="text-main-color">№ 45 715 811</span>
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <DataTable
        columns={columns}
        data={data}
        rowCount={data.length}
        pagination={initPagination}
        isPending={!data}
      />

      <ModalFooter className="hidden"></ModalFooter>
    </>
  );
};
