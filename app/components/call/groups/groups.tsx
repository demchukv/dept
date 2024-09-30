'use client';
import { Button } from '@/components/ui/button';
import React from 'react';
import { Card } from '@/app/components/card/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GroupForm } from '@/app/components/call/groups/group-form';

const groupsData = [
  {
    id: 1,
    name: 'Відділ продажів',
    lines: [
      { id: 1, lineNumber: '301', lineUser: 'Сергій Сергійченко' },
      { id: 2, lineNumber: '101', lineUser: 'Остап Остапченко' },
    ],
    used: true,
    groupID: '10x',
  },
  {
    id: 2,
    name: 'Бухгалтерія',
    lines: [{ id: 3, lineNumber: '305', lineUser: 'Петро Петренко' }],
    used: true,
    groupID: '20x',
  },
];
export const Groups = () => {
  const [addForm, setAddForm] = React.useState(false);
  const [groups, setGroups] = React.useState(groupsData);

  const updateGroup = (id: number, updValues: any) => {
    setGroups(
      groups.map((item: any) =>
        item.id === id ? { ...item, ...updValues } : item,
      ),
    );
  };
  const appendGroup = (newGroup: any) => {
    setGroups([...groups, newGroup]);
  };
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Телефонія. Групи
        </h1>
        <Button type="button" onClick={() => setAddForm(!addForm)}>
          Створити групу
        </Button>
      </div>
      {addForm && (
        <div className="mb-4">
          <GroupForm appendGroup={appendGroup} />
        </div>
      )}
      <div className="flex flex-col gap-4">
        {groups.map((group) => (
          <React.Fragment key={group.id}>
            <GroupForm
              group={group}
              setGroups={setGroups}
              appendGroup={appendGroup}
              updateGroup={updateGroup}
            />
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
