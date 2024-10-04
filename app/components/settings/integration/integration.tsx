import React from 'react';
import { Card } from '@/app/components/card/card';
import { Info } from '../../common/info';
import { Separator } from '@/components/ui/separator';

export const Integration = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Налаштування. Інтеграції
        </h1>
      </div>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8 mb-9">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justifay-between gap-6">
          <div className="text-base font-semibold leading-normal">Заявки</div>
          <Info className="text-sm text-main-dark mt-0 sm:items-center">
            Підключити імпорт тікетів із вашої системи. Наприклад, якщо ви
            ведете роботу у своєму корпоративному середовищі і не хочете
            відволікатись на створення тікета.
          </Info>
        </div>
        <Separator className="my-8" />
      </Card>

      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8 mb-9">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justifay-between gap-6">
          <div className="text-base font-semibold leading-normal">
            Датацентри
          </div>
          <Info className="text-sm text-main-dark mt-0 sm:items-center">
            Підключити керування послугами, які замовлені в сторонніх
            провайдерів.
          </Info>
        </div>
        <Separator className="my-8" />
      </Card>

      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justifay-between gap-6">
          <div className="text-base font-semibold leading-normal">
            Телефонія
          </div>
          <Info className="text-sm text-main-dark mt-0 sm:items-center">
            Підключити телефонну систему для вашого бізнесу, щоб приймати та
            здійснювати дзвінки через інтернет.
          </Info>
        </div>
        <Separator className="my-8" />
      </Card>
    </>
  );
};
