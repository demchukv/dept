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
  { id: 1, name: 'Відділ продажів', lines: 2, used: true, groupID: '10x' },
  { id: 2, name: 'Бухгалтерія', lines: 1, used: true, groupID: '20x' },
];
export const Groups = () => {
  const [addForm, setAddForm] = React.useState(false);

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
          <GroupForm />
        </div>
      )}
      <div className="flex flex-col gap-4">
        {groupsData.map((group) => (
          <React.Fragment key={group.id}>
            <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8">
              <Accordion
                type="single"
                collapsible
                className="w-full flex flex-col gap-4 border-none p-0"
                defaultValue={undefined}
              >
                <AccordionItem value={`group-item-${group.id}`} className="p-0">
                  <div>
                    <AccordionTrigger className="p-0 gap-1 sm:gap-9">
                      <p className="font-semibold text-base leading-normal whitespace-nowrap">
                        {group.name}
                      </p>
                    </AccordionTrigger>
                  </div>
                  <AccordionContent className="border-t mt-8 pt-8">
                    <GroupForm />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>
          </React.Fragment>
        ))}
      </div>
    </>
  );
};
