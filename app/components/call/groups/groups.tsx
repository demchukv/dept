import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const groupsData = [
  { id: 1, name: 'Відділ продажів', lines: 2, whereUsed: [], groupID: '10x' },
  { id: 2, name: 'Бухгалтерія', lines: 1, whereUsed: [], groupID: '20x' },
];
export const Groups = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Телефонія. Групи
        </h1>
        <Button type="button">Створити групу</Button>
      </div>
    </>
  );
};
