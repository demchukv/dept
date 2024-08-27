import React from 'react';
import { Card } from '@/app/components/card/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Bag } from '@/app/components/dashboard/bag';
import { Task } from '@/app/components/dashboard/task';
import { Repair } from '@/app/components/dashboard/repair';

export interface TabsProps {
  data: any;
}
export const TabsLeft = ({ data }: TabsProps) => {
  return (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList>
        <TabsTrigger value="tab1">Покупки</TabsTrigger>
        <TabsTrigger value="tab2">Заявки/задачі</TabsTrigger>
        <TabsTrigger value="tab3">Ремонт техніки</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Card>
          <Bag bag={data.bag} />
        </Card>
      </TabsContent>
      <TabsContent value="tab2">
        <Card>
          <Task />
        </Card>
      </TabsContent>
      <TabsContent value="tab3">
        <Card>
          <Repair />
        </Card>
      </TabsContent>
    </Tabs>
  );
};
