import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-sms';
import { SendSMS } from '@/app/components/call/my-numbers/send-sms';
import { SmsList } from '@/app/components/call/my-numbers/sms-list';

export const Sms = () => {
  return (
    <>
      <Tabs defaultValue="sendSMS" className="w-full">
        <TabsList className="">
          <TabsTrigger value="sendSMS">Відправити СМС</TabsTrigger>
          <TabsTrigger value="inSMS">Вхідні СМС</TabsTrigger>
          <TabsTrigger value="outSMS">Вихідні СМС</TabsTrigger>
        </TabsList>
        <TabsContent value="sendSMS">
          <SendSMS />
        </TabsContent>
        <TabsContent value="inSMS">
          <SmsList listType="incoming" />
        </TabsContent>
        <TabsContent value="outSMS">
          <SmsList listType="outgoing" />
        </TabsContent>
      </Tabs>
    </>
  );
};
