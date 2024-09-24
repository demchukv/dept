import { Button } from '@/components/ui/button';
import React from 'react';
import { Card } from '@/app/components/card/card';
import { Icon } from '@/components/utils/icon';

const scenarios = [
  {
    id: 1,
    name: 'Технічна підтримка',
    numbers: [
      { id: 1, phoneNumber: '+380 97 123 45 67' },
      { id: 2, phoneNumber: '+380 97 123 45 68' },
    ],
  },
  {
    id: 2,
    name: 'Обслуговування та ремонт',
    numbers: [{ id: 1, phoneNumber: '+380 97 123 45 66' }],
  },
  {
    id: 3,
    name: 'Замовлення послуг',
    numbers: [
      { id: 1, phoneNumber: '+380 97 123 45 67' },
      { id: 2, phoneNumber: '+380 97 123 45 68' },
      { id: 3, phoneNumber: '+380 97 123 45 70' },
    ],
  },
];
export const Scenario = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Телефонія. Сценарії
        </h1>
        <Button type="button">Створити сценарій</Button>
      </div>

      <div className="flex flex-col gap-4">
        {scenarios.map((scenario) => (
          <Card
            key={scenario.id}
            className="flex items-center justify-between gap-6"
          >
            <div className="w-full flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="text-base font-semibold leading-normal">
                {scenario.name}
              </div>
              <div>{scenario.numbers.length} номери</div>
            </div>
            <div className="flex items-center flex-shrink-0 gap-6">
              <Button type="button" className="hidden sm:flex">
                Редагувати
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="text-main-color sm:hidden"
              >
                <Icon
                  iconName="EditIcon"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Button>
              <Button type="button" variant="ghost" className="text-main-color">
                <Icon
                  iconName="Copy"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Button>
              <Button
                type="button"
                variant="ghost"
                className="text-warning hover:text-main-dark"
              >
                <Icon
                  iconName="Trash"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </>
  );
};
