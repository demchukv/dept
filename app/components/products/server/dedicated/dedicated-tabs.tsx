import { ServerType } from '@/types/server';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-server';
import { ServerBilling } from '@/app/components/products/server/server-billing';
import { ServerChangeTariff } from '@/app/components/products/server/server-change-tariff';
import { VirtualAccess } from '@/app/components/products/server/virtual/virtual-access';

interface DedicatedTabsProps {
  data: ServerType;
}
export const DedicatedTabs = ({ data }: DedicatedTabsProps) => {
  return (
    <Tabs defaultValue="biling" className="w-full">
      <TabsList>
        <TabsTrigger value="biling">Білінг</TabsTrigger>
        <TabsTrigger value="access" disabled={data.state === 'inactive'}>
          Доступи
        </TabsTrigger>
        <TabsTrigger value="control" disabled={data.state === 'inactive'}>
          Керування
        </TabsTrigger>
        <TabsTrigger value="additional" disabled={data.state === 'inactive'}>
          Додаткові сервіси
        </TabsTrigger>
        <TabsTrigger value="history" disabled={data.state === 'inactive'}>
          Історія
        </TabsTrigger>
      </TabsList>
      <TabsContent value="biling">
        <ServerBilling data={data} />
        <ServerChangeTariff data={data} />
      </TabsContent>
      <TabsContent value="access">
        <VirtualAccess data={data} />
      </TabsContent>
      <TabsContent value="control">Change your password here.</TabsContent>
      <TabsContent value="additional">Change your password here.</TabsContent>
      <TabsContent value="history">Change your password here.</TabsContent>
    </Tabs>
  );
};
