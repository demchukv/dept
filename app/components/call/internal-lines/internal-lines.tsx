'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import React from 'react';
import { InternalLinesFilterList } from '@/app/components/call/internal-lines/internal-lines-filter-list';
import { LineForm } from '@/app/components/call/internal-lines/line-form';

const linesList = [
  {
    id: 1,
    lineNumber: '101',
    lineUser: 'Остап Остапченко',
    scenarios: [],
    groups: [],
    connectionData: {
      host: 'sip.dept.ua',
      login: 'admin',
      password: 'admin',
    },
    settings: { callOnly: true, monopoly: false, multyGroup: true },
    phone: {
      id: 1,
      type: 'sip',
      number: '380 68 527 65 61',
    },
    createdAt: '10.05.2024',
    state: 'online',
  },
  {
    id: 2,
    lineNumber: '206',
    lineUser: 'Сергій Сергієнко',
    scenarios: [],
    groups: [{ id: 1, name: 'Відділ продажів', groupNumber: '10x' }],
    connectionData: {
      host: 'sip.dept.ua',
      login: 'admin',
      password: 'admin',
    },
    settings: { callOnly: false, monopoly: false, multyGroup: false },
    phone: {
      id: 1,
      type: 'sip',
      number: '380 68 527 65 61',
    },
    createdAt: '10.05.2024',
    state: 'offline',
  },
  {
    id: 3,
    lineNumber: '302',
    lineUser: 'Василь Петренко',
    scenarios: [1],
    groups: [],
    connectionData: {
      host: 'sip.dept.ua',
      login: 'admin',
      password: 'admin',
    },
    settings: { callOnly: false, monopoly: false, multyGroup: false },
    phone: {
      id: 1,
      type: 'sip',
      number: '380 68 527 65 61',
    },
    createdAt: '10.05.2024',
    state: 'online',
  },
];

const startLine = {
  connectionData: {
    host: 'sip.dept.ua',
    login: 'admin',
    password: 'admin',
  },
};
export const InternalLines = () => {
  const [addForm, setAddForm] = React.useState(false);
  const [lines, setLines] = React.useState(linesList);
  const [sortKey, setSortKey] = React.useState('id');

  const onSort = (key: string) => {
    if (key === sortKey) {
      return;
    }
    setLines(
      [...lines].sort((a: any, b: any) => {
        if (key === 'alphabet') {
          return a.numberType.localeCompare(b.numberType);
        }
        if (key === 'lineNumber') {
          return a.operator.localeCompare(b.operator);
        }
        if (key === 'dateCreatedAt') {
          return a.country.localeCompare(b.country);
        }
        return 0;
      }),
    );
    setSortKey(key);
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Телефонія. Внутрішні лінії
        </h1>
        <Button type="button" onClick={() => setAddForm(!addForm)}>
          Створити лінію
        </Button>
      </div>
      <div className="flex gap-4 items-center justify-between mb-4">
        <InternalLinesFilterList onSort={onSort} sortKey={sortKey} />
        <Link
          href="/"
          className="flex items-center gap-2 font-semibold text-main-color hover:text-main-dark"
        >
          Завантажити дані для підключення ліній в Excel
          <Icon iconName="Doc" width={16} height={16} />
        </Link>
      </div>

      {addForm && (
        <div className="mb-4">
          <LineForm formType="new" line={startLine} />
        </div>
      )}

      <div className="flex flex-col gap-4">
        {lines.map((line) => (
          <React.Fragment key={line.id}>
            <LineForm formType="edit" line={line} />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
