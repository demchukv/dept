import React from 'react';
import { Card } from '@/app/components/card/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shopping } from '@/app/components/dashboard/shopping';
import { Task } from '@/app/components/dashboard/task';
import { Repair } from '@/app/components/dashboard/repair';

export interface TabsProps {
  data: any;
}
export const TabsLeft = ({ data }: TabsProps) => {
  return (
    <Tabs
      defaultValue="tab1"
      className="w-full grid md:grid-rows-[minmax(0,72px)_auto] lg:grid-rows-[minmax(0,52px)_auto]"
    >
      <TabsList className="justify-start">
        <TabsTrigger
          value="tab1"
          className="after:pl-5 after:border-r after:border-gray-light after:h-[40px] after:last:border-r-0"
        >
          Покупки
        </TabsTrigger>
        <TabsTrigger value="tab2">Заявки/задачі</TabsTrigger>
        <TabsTrigger value="tab3">Ремонт техніки</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="h-full">
        <Card className="h-full">
          <Shopping bag={data.bag} />
        </Card>
      </TabsContent>
      <TabsContent value="tab2" className="h-full">
        <Card className="h-full">
          <Task task={data.task} />
        </Card>
      </TabsContent>
      <TabsContent value="tab3" className="h-full">
        <Card className="h-full">
          <Repair repair={data.repair} />
        </Card>
      </TabsContent>
    </Tabs>
  );
};
