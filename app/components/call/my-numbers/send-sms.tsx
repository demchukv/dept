import { Card } from '@/app/components/card/card';
import { SendSmsSend } from '@/app/components/call/my-numbers/send-sms-send';
import { SmsList } from '@/app/components/call/my-numbers/sms-list';

export const SendSMS = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row-reverse sm:items-start gap-4">
        <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8">
          <SendSmsSend />
        </Card>
        <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8 bg-main-color">
          <SmsList />
        </Card>
      </div>
    </>
  );
};
