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

import { columns } from '@/app/components/data-table/columns/columns-company-doc';
import { DataTable } from '@/app/components/data-table/data-table';
import useSWR from 'swr';

interface ListOfDocsProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
  companyData: any;
}

//TODO: query for API to get list of docs and render them
const fetcher = () =>
  fetch('/test-data/company-doc.json').then((res) => res.json());

export const ListCompanyDocs = ({ onClose, companyData }: ListOfDocsProps) => {
  const { data, error } = useSWR('/test-data/company-doc.json', fetcher);

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
          Договори та додаткові угоди{' '}
          <span className="text-main-color whitespace-nowrap">
            {companyData?.name}
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
