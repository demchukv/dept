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
import { HostingFtp } from '@/app/components/products/server/hosting/hosting-ftp';
import { HostingDatabases } from '@/app/components/products/server/hosting/hosting-databases';
import { HostingFilemanager } from '@/app/components/products/server/hosting/hosting-filemanager';
import { HostingTransfer } from '@/app/components/products/server/hosting/hosting-transfer';

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
      <TabsContent value="ftp">
        <HostingFtp data={data} />
      </TabsContent>
      <TabsContent value="databases">
        <HostingDatabases data={data} />
      </TabsContent>
      <TabsContent value="files">
        <HostingFilemanager data={data} />
      </TabsContent>
      <TabsContent value="transfer">
        <HostingTransfer data={data} />
      </TabsContent>
    </Tabs>
  );
};
