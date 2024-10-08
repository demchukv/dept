import React from 'react';
import { Card } from '@/app/components/card/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Subscription } from '@/app/components/dashboard/subscription';
import { Server } from '@/app/components/dashboard/server';
import { Domain } from '@/app/components/dashboard/domain';
import { Certificate } from '@/app/components/dashboard/certificate';
import { Numbers } from '@/app/components/dashboard/numbers';

interface TabsProps {
  data: any;
}
export const TabsRight = ({ data }: TabsProps) => {
  return (
    <Tabs
      defaultValue="tab1"
      className="w-full grid md:grid-rows-[minmax(0,72px)_auto] lg:grid-rows-[minmax(0,52px)_auto]"
    >
      <TabsList className="justify-start">
        <TabsTrigger value="tab1">Підписки</TabsTrigger>
        <TabsTrigger value="tab2">Сервери</TabsTrigger>
        <TabsTrigger value="tab3">Домени</TabsTrigger>
        <TabsTrigger value="tab4">SSL-Сертифікати</TabsTrigger>
        <TabsTrigger value="tab5">Номери</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1" className="h-full">
        <Card className="h-full">
          <Subscription subscription={data.subscription} />
        </Card>
      </TabsContent>
      <TabsContent value="tab2" className="h-full">
        <Card className="h-full">
          <Server server={data.server} />
        </Card>
      </TabsContent>
      <TabsContent value="tab3" className="h-full">
        <Card className="h-full">
          <Domain domain={data.domain} />
        </Card>
      </TabsContent>
      <TabsContent value="tab4" className="h-full">
        <Card className="h-full">
          <Certificate certificate={data.certificate} />
        </Card>
      </TabsContent>
      <TabsContent value="tab5" className="h-full">
        <Card className="h-full">
          <Numbers numbers={data.numbers} />
        </Card>
      </TabsContent>
    </Tabs>
  );
};
