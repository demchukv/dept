import { ServerType } from '@/types/server';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-server';
import { ServerBilling } from '@/app/components/products/server/server-billing';
import { ServerChangeTariff } from '@/app/components/products/server/server-change-tariff';

interface HostingTabsProps {
  data: ServerType;
}
export const HostingTabs = ({ data }: HostingTabsProps) => {
  return (
    <Tabs defaultValue="biling" className="w-full">
      <TabsList>
        <TabsTrigger value="biling">Білінг</TabsTrigger>
        <TabsTrigger value="sites">Сайти</TabsTrigger>
        <TabsTrigger value="ftp">FTP-доступ</TabsTrigger>
        <TabsTrigger value="databases">Бази даних</TabsTrigger>
        <TabsTrigger value="files">Файловий менеджер</TabsTrigger>
        <TabsTrigger value="transfer">Передати</TabsTrigger>
      </TabsList>
      <TabsContent value="biling">
        <ServerBilling data={data} />
        <ServerChangeTariff data={data} />
      </TabsContent>
      <TabsContent value="sites">Change your password here.</TabsContent>
      <TabsContent value="ftp">Change your password here.</TabsContent>
      <TabsContent value="databases">Change your password here.</TabsContent>
      <TabsContent value="files">Change your password here.</TabsContent>
      <TabsContent value="transfer">Change your password here.</TabsContent>
    </Tabs>
  );
};
