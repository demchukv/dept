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
import { Modal, ModalContent } from '@/app/components/common/modal';
import { AddCardForm } from '@/app/components/balance/add-card-form';
import { EditCardForm } from '@/app/components/balance/edit-card-form';
import { CcInfo } from '@/app/components/balance/cc-info';

interface CardsListProps {
  className?: string;
}
export const CardsList = ({ className }: CardsListProps) => {
  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [cardId, setCardId] = React.useState(0);

  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const onCloseEdit = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpenEdit(state);
  };

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
                  <CcInfo
                    item={item}
                    onClick={() => {
                      setCardId(item.id);
                      setOpenEdit(true);
                    }}
                    className="cursor-pointer"
                  />

                  <div className="hidden lg:grid place-items-end ">
                    <Button
                      variant="ghost"
                      className="w-6 h-6 bg-transparent"
                      onClick={() => {
                        setCardId(item.id);
                        setOpenEdit(true);
                      }}
                    >
                      <Icon
                        iconName="ActionMenu"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                    </Button>
                  </div>
                </React.Fragment>
              ))}
            </div>
            <Button
              variant="ghost"
              className="font-semibold text-sm leading-main-lh text-main-color hover:text-main-dark gap-1 mt-6"
              onClick={() => {
                setOpen(true);
              }}
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

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <AddCardForm onClose={onClose} />
        </ModalContent>
      </Modal>

      <Modal open={openEdit} onOpenChange={() => onCloseEdit(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <EditCardForm onClose={onCloseEdit} cardId={cardId} />
        </ModalContent>
      </Modal>
    </Card>
  );
};
