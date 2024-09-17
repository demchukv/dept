import { ServerType } from '@/types/server';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-server';
import { ServerBilling } from '@/app/components/products/server/server-billing';
import { ServerChangeTariff } from '@/app/components/products/server/server-change-tariff';
import { HostingSites } from '@/app/components/products/server/hosting/hosting-sites';

interface HostingTabsProps {
  data: ServerType;
}
export const HostingTabs = ({ data }: HostingTabsProps) => {
  return (
    <Tabs defaultValue="biling" className="w-full">
      <TabsList>
        <TabsTrigger value="biling">Білінг</TabsTrigger>
        <TabsTrigger value="sites" disabled={data.state === 'inactive'}>
          Сайти
        </TabsTrigger>
        <TabsTrigger value="ftp" disabled={data.state === 'inactive'}>
          FTP-доступ
        </TabsTrigger>
        <TabsTrigger value="databases" disabled={data.state === 'inactive'}>
          Бази даних
        </TabsTrigger>
        <TabsTrigger value="files" disabled={data.state === 'inactive'}>
          Файловий менеджер
        </TabsTrigger>
        <TabsTrigger value="transfer" disabled={data.state === 'inactive'}>
          Передати
        </TabsTrigger>
      </TabsList>
      <TabsContent value="biling">
        <ServerBilling data={data} />
        <ServerChangeTariff data={data} />
      </TabsContent>
      <TabsContent value="sites">
        <HostingSites data={data} />
      </TabsContent>
      <TabsContent value="ftp">Change your password here.</TabsContent>
      <TabsContent value="databases">Change your password here.</TabsContent>
      <TabsContent value="files">Change your password here.</TabsContent>
      <TabsContent value="transfer">Change your password here.</TabsContent>
    </Tabs>
  );
};
