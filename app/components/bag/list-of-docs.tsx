import React from 'react';

interface ListOfDocsProps {
  docId: number | null;
}
export const ListOfDocs = ({ docId }: ListOfDocsProps) => {
  if (docId === null) {
    return null;
  }
  //TODO: query for API to get list of docs and render them
  return <div>ListOfDocs for order {docId}</div>;
};
