'use client';
import { Card } from '@/app/components/card/card';
import { startTransition, useState } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SmsMessage } from '@/app/components/call/my-numbers/sms-message';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { Icon } from '@/components/utils/icon';
import { toast } from '@/components/ui/use-toast';

const msgs = [
  {
    id: 1,
    text: 'Представляємо нашу нову послугу зв&#39;язку! Надійне з&#39;єднання зі світом, інноваційний продукт переосмислює комунікації. З передовими функціями, призначеними для сучасних потреб, ви без зусиль',
  },
  {
    id: 2,
    text: 'залишатиметесь на зв&#39;язку, насолоджуючись чіткими голосовими дзвінками та швидкістю передачі даних, що б&#39;є рекорди.',
  },
];
const SMSLEN = 160;
const MAXLEN = 786;
const SMSPRICE = 10;

export const SendSMS = () => {
  const [valueSMS, setValueSMS] = useState('');
  const [valueWhom, setValueWhom] = useState('');
  const [valueFrom, setValueFrom] = useState('');
  const [symbolsSMS, setSymbolsSMS] = useState(0);
  const [totalSMS, setTotalSMS] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [smsError, setSMSError] = useState('');
  const [fromError, setFromError] = useState('');
  const [whomError, setWhomError] = useState('');

  const calcSMS = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length > MAXLEN) {
      setSMSError('Максимальна кількість символів 786');
      return;
    } else {
      setSMSError('');
    }
    setValueSMS(e.target.value);
    setSymbolsSMS(e.target.value.length);
    setTotalSMS(Math.ceil(e.target.value.length / SMSLEN));
    setTotalPrice(totalSMS * SMSPRICE);
  };

  const onSendSMS = () => {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      if (valueWhom === '') {
        setWhomError('Введіть номер отримувача');
        return;
      }
      if (valueFrom === '') {
        setFromError('Виберіть номер відправника');
        return;
      }
      if (valueSMS === '') {
        setSMSError('Введіть повідомлення');
        return;
      }
      setWhomError('');
      setFromError('');
      setSMSError('');
      const data = {
        SMSMessage: valueSMS,
        SMSWhom: valueWhom,
        SMSFrom: valueFrom,
      };
      toast({
        title: 'Ви відправили наступні значення:',
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    });
  };

  return (
    <>
      <div className="flex flex-col sm:flex-row-reverse sm:items-start gap-4 sm:gap-6">
        <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8">
          <div className="rounded border border-gray-light bg-bg-color px-5 pt-4 pb-6 mb-5">
            <p className="font-semibold text-base leading-normal mb-4">
              Повідомлення
            </p>
            <Textarea
              name="SMSMessage"
              value={valueSMS}
              onChange={(e) => calcSMS(e)}
              className="h-32 bg-white text-main-dark leadung-[1.29] resize-y"
            ></Textarea>
            <div className="text-xs text-warning">{smsError}</div>
          </div>
          <p className="font-semibold text-gray-dark w-[200px] flex justify-between">
            Символів:{' '}
            <span className="text-main-color">
              {symbolsSMS}/{MAXLEN}
            </span>
          </p>
          <p className="font-semibold text-gray-dark w-[200px] flex justify-between">
            Кількість СМС: <span className="text-main-color">{totalSMS}</span>
          </p>
        </Card>

        <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8 bg-main-color sm:w-min">
          <p className="font-semibold text-base leading-normal text-white text-center mb-4">
            Повідомлення
          </p>
          <div className="rounded border border-gray-light bg-white px-3 pt-2 pb-4 mb-4 h-[468px] sm:w-[322px] flex flex-col justify-between">
            <div className="flex-shrink-0 px-3 py-2.5">
              <div className=" flex items-center justify-between">
                <div className="font-medium leading-[1.43]">9:30</div>
                <div className="flex items-center justify-end">
                  <Icon iconName="PhoneWifi" width={17} height={17} />
                  <Icon iconName="PhoneNetwork" width={17} height={17} />
                  <Icon
                    iconName="PhoneBattery"
                    width={8}
                    height={15}
                    className="ml-[5px]"
                  />
                </div>
              </div>

              <div className="">
                <label
                  htmlFor="whom"
                  className="text-gray-medium text-xs my-2 leading-none"
                >
                  Від кого
                </label>
                <Select onValueChange={(value) => setValueFrom(value)}>
                  <SelectTrigger
                    name="from"
                    value={valueFrom}
                    className="w-full"
                  >
                    <SelectValue placeholder="Немає замовлених номерів" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Number 1</SelectItem>
                    <SelectItem value="dark">Number 2</SelectItem>
                    <SelectItem value="system">Number 3</SelectItem>
                  </SelectContent>
                </Select>
                <div className="text-xs text-warning">{fromError}</div>
              </div>
            </div>
            <div className="h-full overflow-y-auto overflow-x-visible pl-[6px]">
              {msgs &&
                msgs.map((msg) => (
                  <SmsMessage key={msg.id}>{msg.text}</SmsMessage>
                ))}
            </div>
            <div className="flex-shrink-0">
              <label
                htmlFor="whom"
                className="text-gray-medium text-xs my-2 leading-none"
              >
                Кому
              </label>
              <Input
                name="whom"
                placeholder="Введіть номер"
                className="w-full"
                value={valueWhom}
                onChange={(e) => setValueWhom(e.target.value)}
              />
              <div className="text-xs text-warning">{whomError}</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:gap-4 sm:justify-between sm:items-center">
            <p className="font-semibold text-base leading-normal text-white text-center mb-4 sm:mb-0">
              Вартість {totalPrice} грн
            </p>
            <Button
              type="button"
              variant="outline"
              className="w-full sm:w-auto"
              onClick={onSendSMS}
            >
              Відправити
            </Button>
          </div>
        </Card>
      </div>
    </>
  );
};
