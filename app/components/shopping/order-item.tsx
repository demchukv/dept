import { Tracker } from '@/app/components/shopping/tracker';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { OrderProduct } from '@/app/components/shopping/order-product';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { useState } from 'react';
import { KeyValText } from '../common/key-val-text';

interface OrderItemProps {
  order: any;
}
export const OrderItem = ({ order }: OrderItemProps) => {
  const accItemClass =
    'w-full bg-white rounded-[6px] p-4 md:pb-7 lg:py-8 lg:px-7';
  let currentStatus: any;
  for (const item of order.status) {
    if (item.date) {
      currentStatus = item;
    }
  }

  return (
    <AccordionItem value={`order-${order.id}`} className={accItemClass}>
      <AccordionTrigger className="gap-3 items-start">
        <div className="flex flex-col flex-grow items-start justify-start">
          <p>№ {order.number}</p>
          <p
            className={cn(
              'm-0 font-semibold text-sm leading-main-lh mb-2',
              currentStatus.id === 1 && 'text-attention',
              currentStatus.id === 2 && 'text-blue-additional-color',
              currentStatus.id === 3 && 'text-orange-additional-color',
              currentStatus.id === 4 && 'text-green-additional-color',
            )}
          >
            {currentStatus.name}
          </p>
          <div className="w-full text-left">
            {order.products.map((product: any) => (
              <div
                key={product.id}
                className="flex justify-between gap-3 text-main-dark font-normal text-sm leading-main-lh mb-2"
              >
                <div>{product.name}</div>
                <div>{currentStatus.name}</div>
              </div>
            ))}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Separator className="mb-4" />
        <p className="text-main-dark font-semibold text-sm leading-main-lh mb-4">
          Товари в замовленні
        </p>
        {order.products.map((product: any) => (
          <OrderProduct key={product.id} product={product} />
        ))}
        <Separator className="mb-4" />
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="font-normal text-sm leading-main-lh text-gray-dark">
            Статус оплати:
          </div>
          <div
            className={cn(
              'font-semibold text-sm leading-main-lh text-right',
              currentStatus.id === 1 && 'text-attention',
              currentStatus.id === 2 && 'text-blue-additional-color',
              currentStatus.id === 3 && 'text-orange-additional-color',
              currentStatus.id === 4 && 'text-green-additional-color',
            )}
          >
            {currentStatus.name}
          </div>
          <div className="font-normal text-sm leading-main-lh text-gray-dark">
            Додаткові послуги:
          </div>
          <div className="font-medium text-sm leading-main-lh text-main-dark text-right">
            {order.services} грн
          </div>
          <div className="font-normal text-sm leading-main-lh text-gray-dark">
            Доставка:
          </div>
          <div className="font-medium text-sm leading-main-lh text-main-dark text-right">
            {order.delivery} грн
          </div>
          <div className="font-normal text-sm leading-main-lh text-gray-dark">
            Разом:
          </div>
          <div className="font-medium text-sm leading-main-lh text-main-dark text-right">
            {Number(order.total.toFixed(2))} грн
          </div>
        </div>
        <Separator className="mb-4" />
        <div className="flex items-center gap-4 mb-4">
          <Button
            type="button"
            variant="ghost"
            className="font-semibold text-sm leading-main-lh text-main-color px-5"
          >
            Чек
          </Button>
          <Button type="button" variant="outline">
            Замовити налаштування
          </Button>
        </div>
        <Separator className="mb-4" />

        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 border-none"
        >
          <AccordionItem value="tracker">
            <AccordionTrigger className="gap-3 items-start">
              <p className="text-main-dark font-semibold text-sm leading-main-lh">
                Деталі замовлення
              </p>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 mb-4">
                <KeyValText k="Замовник:" val={order.client.name} />
                <KeyValText k="Дата створення:" val={order.status[0].date} />
                <KeyValText
                  k="Дата виконання:"
                  val={order.status[3].date ? order.status[3].date : '-'}
                />
              </div>
              <Tracker state={currentStatus.id} data={order.status} />
              <Separator className="mb-4" />
              <div className="flex gap-3 justify-between mb-5">
                <p className="text-main-dark font-medium text-sm leading-main-lh">
                  {order.deliveryType}
                </p>
                <Icon
                  width={24}
                  height={24}
                  iconName="Route"
                  className="fill-main-color flex-shrink-0"
                />
              </div>
              <p className="text-gray-dark font-normal text-sm leading-main-lh mb-2">
                Адреса доставки:
              </p>
              <p className="text-main-dark font-medium text-sm leading-main-lh">
                {order.address}
              </p>
              <Separator className="mb-4 mt-4" />
              <div className="flex gap-3 justify-between items-center">
                <div>
                  <p className="text-gray-dark font-normal text-sm leading-main-lh mb-2">
                    Отримувач замовлення:
                  </p>
                  <p className="text-main-dark font-medium text-sm leading-main-lh">
                    {order.fio}
                  </p>
                </div>
                <Icon
                  width={24}
                  height={24}
                  iconName="Info"
                  className="fill-main-color flex-shrink-0 w-6 h-6"
                />
              </div>
              <Separator className="mb-4 mt-4" />
              <div className="flex flex-col gap-3">
                <Button type="button" className="">
                  Повторити покупку
                </Button>
                <Button type="button" variant="outline" className="">
                  Залишити відгук
                </Button>
              </div>
              <Separator className="mb-4 mt-4" />
              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="border-transparent"
                >
                  Гарантійне звернення
                </Button>
                <Button type="button" variant="destructive" className="">
                  Повернути товар
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  );
};
