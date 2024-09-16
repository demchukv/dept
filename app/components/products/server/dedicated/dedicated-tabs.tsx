import { ServerType } from '@/types/server';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-server';

interface DedicatedTabsProps {
  data: ServerType;
}
export const DedicatedTabs = ({ data }: DedicatedTabsProps) => {
  return (
    <Tabs defaultValue="biling" className="w-full">
      <TabsList>
        <TabsTrigger value="biling">Білінг</TabsTrigger>
        <TabsTrigger value="access">Доступи</TabsTrigger>
        <TabsTrigger value="control">Керування</TabsTrigger>
        <TabsTrigger value="additional">Додаткові сервіси</TabsTrigger>
        <TabsTrigger value="history">Історія</TabsTrigger>
      </TabsList>
      <TabsContent value="biling">
        Make changes to your account here.
      </TabsContent>
      <TabsContent value="access">Change your password here.</TabsContent>
      <TabsContent value="control">Change your password here.</TabsContent>
      <TabsContent value="additional">Change your password here.</TabsContent>
      <TabsContent value="history">Change your password here.</TabsContent>
    </Tabs>
  );
};