import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-sms';
import { SendSMS } from '@/app/components/call/my-numbers/send-sms';

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
          <p>In sms</p>
        </TabsContent>
        <TabsContent value="outSMS">
          <p>Out SMS</p>
        </TabsContent>
      </Tabs>
    </>
  );
};
