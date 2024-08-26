import React from 'react';
import { Card } from '@/app/components/card/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const TabsRight = () => {
  return (
    <Tabs defaultValue="tab1" className="w-full">
      <TabsList>
        <TabsTrigger value="tab1">Підписки</TabsTrigger>
        <TabsTrigger value="tab2">Сервери</TabsTrigger>
        <TabsTrigger value="tab3">Домени</TabsTrigger>
        <TabsTrigger value="tab4">SSL-Сертифікати</TabsTrigger>
        <TabsTrigger value="tab5">Номери</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Card>TabsRight 1</Card>
      </TabsContent>
      <TabsContent value="tab2">
        <Card>TabsRight 2</Card>
      </TabsContent>
      <TabsContent value="tab3">
        <Card>TabsRight 3</Card>
      </TabsContent>
      <TabsContent value="tab4">
        <Card>TabsRight 4</Card>
      </TabsContent>
      <TabsContent value="tab5">
        <Card>TabsRight 5</Card>
      </TabsContent>
    </Tabs>
  );
};
