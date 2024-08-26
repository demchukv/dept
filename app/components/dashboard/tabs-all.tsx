import React from 'react';
import { Bag } from '@/app/components/dashboard/bag';
import { Task } from '@/app/components/dashboard/task';
import { Repair } from '@/app/components/dashboard/repair';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const TabsAll = () => {
  const accItemClass =
    'w-full bg-white rounded-[6px] p-4 md:pb-7 lg:py-8 lg:px-7';
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-4 border-none"
    >
      <AccordionItem value="item-1" className={accItemClass}>
        <AccordionTrigger>Покупки</AccordionTrigger>
        <AccordionContent>
          <Bag />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2" className={accItemClass}>
        <AccordionTrigger>Заявки/задачі</AccordionTrigger>
        <AccordionContent>
          <Task />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3" className={accItemClass}>
        <AccordionTrigger>Ремонт техніки</AccordionTrigger>
        <AccordionContent>
          <Repair />
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-4" className={accItemClass}>
        <AccordionTrigger>Підписки</AccordionTrigger>
        <AccordionContent>TabsRight 1</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5" className={accItemClass}>
        <AccordionTrigger>Сервери</AccordionTrigger>
        <AccordionContent>TabsRight 2</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6" className={accItemClass}>
        <AccordionTrigger>Домени</AccordionTrigger>
        <AccordionContent>TabsRight 3</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-7" className={accItemClass}>
        <AccordionTrigger>SSL-Сертифікати</AccordionTrigger>
        <AccordionContent>TabsRight 4</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-8" className={accItemClass}>
        <AccordionTrigger>Номери</AccordionTrigger>
        <AccordionContent>TabsRight 5</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
