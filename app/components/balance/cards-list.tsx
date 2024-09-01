import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/app/components/card/card';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/components/utils/icon';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import React from 'react';
import { Button } from '@/components/ui/button';

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
        className="border-none w-full "
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="w-full flex gap-2 font-semibold text-base leading-tight text-main-dark items-center">
              <Icon iconName="CardsList" width={24} height={24} />
              <p>Додані картки</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Separator className="mt-4 mb-4 border-gray-light" />
            <div className="grid grid-cols-[80%_20%] lg:grid-cols-[70%_20%_10%] gap-y-4 items-center">
              {cards.map((item) => (
                <React.Fragment key={item.id}>
                  <div className="flex flex-col gap-1">
                    <p
                      className={cn(
                        'font-medium text-xs leading-[1.33]',
                        item.status === 'Основна'
                          ? 'text-green-additional-color'
                          : 'text-blue-additional-color',
                      )}
                    >
                      {item.status}
                    </p>
                    <p className="font-semibold text-base leading-normal text-main-dark">
                      {item.name}
                    </p>
                    <p className="font-medium text-sm leading-[1.14] text-main-dark">
                      {item.valute} {item.number}
                    </p>
                  </div>
                  <div className="grid place-items-end">
                    <div className="bg-bg-color rounded w-10 h-[26px] flex items-center">
                      {item.type === 'Visa' && (
                        <Image
                          src="/img/visa.png"
                          alt="Visa card"
                          width={36}
                          height={11}
                        />
                      )}
                      {item.type === 'MC' && (
                        <Image
                          src="/img/mc.png"
                          alt="MasterCard"
                          width={32}
                          height={20}
                        />
                      )}
                    </div>
                  </div>
                  <div className="hidden lg:grid place-items-end ">
                    <Icon
                      iconName="ActionMenu"
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </div>
                </React.Fragment>
              ))}
            </div>
            <Button
              variant="ghost"
              className="font-semibold text-sm leading-main-lh text-main-color hover:text-main-dark gap-1 mt-6"
            >
              Додати картку{' '}
              <Icon
                iconName="Plus"
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </Button>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
