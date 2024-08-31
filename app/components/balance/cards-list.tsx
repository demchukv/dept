import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/app/components/card/card';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/components/utils/icon';
import React from 'react';

interface CardsListProps {
  className?: string;
}
export const CardsList = ({ className }: CardsListProps) => {
  const cards = [
    {
      id: 1,
      name: 'Шевченко Василь Петрович',
      valute: 'UAH',
      type: 'Visa',
      number: '5556 **** **** 4567',
      status: 'Основна',
    },
    {
      id: 2,
      name: 'Шевченко Василь Петрович',
      valute: 'UAH',
      type: 'MC',
      number: '4441 **** **** 0065',
      status: 'Резервна',
    },
  ];
  return (
    <Card className={className}>
      <Accordion
        type="single"
        collapsible
        className="border-none"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex gap-2 font-semibold text-base leading-tight text-main-dark items-center">
              <Icon iconName="CardsList" width={24} height={24} />
              <p>Додані картки</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Separator className="mt-4 mb-4 border-gray-light" />
            <div className="grid grid-cols-[70%_20%_10%] gap-y-4">
              {cards.map((item) => (
                <React.Fragment key={item.id}>
                  <div>
                    <p>{item.status}</p>
                    <p>{item.name}</p>
                    <p>
                      {item.valute} {item.number}
                    </p>
                  </div>
                  <div>{item.type}</div>
                  <div>E</div>
                </React.Fragment>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
