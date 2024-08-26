import React from 'react';
import { Card } from '@/app/components/card/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TabsLeft = () => {
  return (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList>
        <TabsTrigger value="tab1">Покупки</TabsTrigger>
        <TabsTrigger value="tab2">Заявки/задачі</TabsTrigger>
        <TabsTrigger value="tab3">Ремонт техніки</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Card>TabsLeft 1</Card>
      </TabsContent>
      <TabsContent value="tab2">
        <Card>TabsLeft 2</Card>
      </TabsContent>
      <TabsContent value="tab3">
        <Card>TabsLeft 3</Card>
      </TabsContent>
    </Tabs>
  );
};
