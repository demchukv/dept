import React from 'react';
import { Card } from '@/app/components/card/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const GroupForm = () => {
  return (
    <>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 border-none p-0"
          defaultValue="new-group-item"
        >
          <AccordionItem value={`new-group-item`} className="p-0">
            <AccordionTrigger className="p-0 gap-1 sm:gap-9">
              <p className="font-semibold text-base leading-normal whitespace-nowrap">
                Create new group
              </p>
            </AccordionTrigger>
            <AccordionContent className="border-t mt-8 pt-8">
              Create new group
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};
