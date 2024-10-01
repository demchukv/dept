import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/app/components/card/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/components/utils/icon';

const rolesList = [
  { id: 1, roleName: 'Адміністратор', roleCountsers: 2 },
  { id: 2, roleName: 'Фінансист', roleCountsers: 3 },
  { id: 3, roleName: 'Тімлід', roleCountsers: 1 },
  { id: 4, roleName: 'Девелопер', roleCountsers: 2 },
];
export const Role = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Налаштування. Ролі
        </h1>
      </div>
      <div className="flex flex-col sm:flex-row gap-6">
        <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4 border-none p-0"
            defaultValue="rolesList"
          >
            <AccordionItem value="rolesList" className="p-0">
              <div className="w-full items-start flex flex-1 gap-2.5 justify-between">
                <p className="font-semibold text-base leading-normal">
                  Перелік ролей
                </p>
                <AccordionTrigger
                  className="p-0 gap-1 sm:gap-9"
                  headClassName="w-auto"
                ></AccordionTrigger>
              </div>
              <AccordionContent className="border-t mt-4 pt-8">
                <div className="flex flex-col gap-4 pb-4">
                  {rolesList.map((role) => (
                    <Button
                      key={role.id}
                      type="button"
                      variant="outline"
                      className="w-full"
                    >
                      {role.roleName} ({role.roleCountsers})
                    </Button>
                  ))}
                </div>
                <Separator className="my-4" />
                <Button
                  type="button"
                  variant="outline"
                  className="border-0 hover:shadow-none px-0 py-0"
                >
                  Створити нову роль{' '}
                  <Icon iconName="Plus" width={20} height={20} />
                </Button>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
        <div>
          <p className="font-semibold text-base leading-normal mb-6">
            Призначені ролі для співробітників
          </p>
        </div>
      </div>
    </>
  );
};
