'use client';

import React, { useEffect } from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { ModalLoading } from '@/app/components/common/modal-loading';
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

  return (
    <>
      <ModalHeader>
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center">
          Документи по замовленню{' '}
          <span className="text-main-color">№ 45 715 811</span>
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <div>
        <div className="grid grid-cols-1">
          <div key="headrow" className="grid grid-cols-3 py-1">
            <div>Назва документу</div>
            <div>Деталі</div>
            <div></div>
          </div>
          {data.map((doc: orderDocType) => (
            <div key={doc.id} className="grid grid-cols-3 py-1">
              <div>{doc.name}</div>
              <div>{doc.info}</div>
              <div>{doc.file}</div>
            </div>
          ))}
        </div>
        <div>ID: {docId}</div>
      </div>
      <ModalFooter className="hidden"></ModalFooter>
    </>
  );
};
