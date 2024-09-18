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
import { VirtualControl } from '@/app/components/products/server/virtual/virtual-control';
import { VirtualAdditional } from '@/app/components/products/server/virtual/virtual-additional';

interface VirtualTabsProps {
  data: ServerType;
}
export const VirtualTabs = ({ data }: VirtualTabsProps) => {
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
      <TabsContent value="control">
        <VirtualControl data={data} />
      </TabsContent>
      <TabsContent value="additional">
        <VirtualAdditional data={data} />
      </TabsContent>
      <TabsContent value="history">Change your password here.</TabsContent>
    </Tabs>
  );
};
