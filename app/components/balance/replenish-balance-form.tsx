'use client';
import React from 'react';
import { useTransition } from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Icon } from '@/components/utils/icon';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ReplenishBalanseFormProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

const ReplenishBalansSchema = z.object({
  amount: z.coerce.number({
    invalid_type_error: 'Вкажіть коректну суму поповнення',
  }),
  card: z.coerce.number({
    required_error: 'Вкажіть rкартку з якої відбуватимеься оплата',
  }),
});

const cards = [
  {
    id: 1,
    name: 'Шевченко Василь Петрович',
    valute: 'UAH',
    type: 'Visa',
    number: '5556 **** **** 4567',
    status: 'Основна',
  },
  {
    id: 2,
    name: 'Шевченко Василь Петрович',
    valute: 'UAH',
    type: 'MC',
    number: '4441 **** **** 0065',
    status: 'Резервна',
  },
];

export const ReplenishBalanseForm = ({
  onClose,
}: ReplenishBalanseFormProps) => {
  const [isPendig, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ReplenishBalansSchema>>({
    resolver: zodResolver(ReplenishBalansSchema),
    defaultValues: {
      amount: 0,
      card: 0,
    },
  });
  function onSubmit(data: z.infer<typeof ReplenishBalansSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      toast({
        title: 'Ви відправили наступні значення:',
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-h-full flex flex-col gap-6 justify-between"
      >
        <ModalHeader>
          <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center mt-5">
            Поповнити баланс
          </ModalTitle>
          <ModalDescription className="hidden"></ModalDescription>
        </ModalHeader>
        <div className="min-h-full flex flex-col gap-6 w-full self-stretch">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-semibold text-sb text-gray-dark leading-main-lh">
                  Сума поповнення
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder=""
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="card"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel className="font-semibold text-sb text-gray-dark leading-main-lh">
                  Спосіб поповнення
                </FormLabel>
                <div className="flex gap-3 mb-3 justify-between">
                  <Button variant="secondary" className="w-full ">
                    <Icon
                      iconName="ApplePay"
                      width={24}
                      height={24}
                      className="fill-white"
                    />{' '}
                    Pay
                  </Button>
                  <Button variant="secondary" className="w-full">
                    <Icon
                      iconName="GooglePay"
                      width={24}
                      height={24}
                      className="fill-white"
                    />{' '}
                    Pay
                  </Button>
                </div>
                <div className="mb-6">
                  <Button type="button" className="w-full">
                    Згенерувати рахунок на оплату
                  </Button>
                </div>

                <Tabs
                  defaultValue="cardList"
                  className="w-full grid md:grid-rows-[minmax(0,72px)_auto] lg:grid-rows-[minmax(0,52px)_auto]"
                >
                  <TabsList className="justify-center">
                    <TabsTrigger value="cardList">Обрати картку</TabsTrigger>
                    <TabsTrigger value="cardAdd">
                      Ввести дані картки
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="cardList" className="h-full">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                        className="flex flex-col"
                      >
                        {cards.map((item) => (
                          <React.Fragment key={item.id}>
                            <FormItem className="flex items-center gap-x-2 gap-y-3">
                              <FormControl>
                                <RadioGroupItem value={String(item.id)} />
                              </FormControl>
                              <FormLabel className="w-full bg-white flex justify-between items-center border border-gray-light rounded p-3 shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)]">
                                <div className="flex flex-col gap-1">
                                  <p
                                    className={cn(
                                      'font-medium text-xs leading-[1.33]',
                                      item.status === 'Основна'
                                        ? 'text-green-additional-color'
                                        : 'text-blue-additional-color',
                                    )}
                                  >
                                    {item.status}
                                  </p>
                                  <p className="font-semibold text-base leading-normal text-main-dark">
                                    {item.name}
                                  </p>
                                  <p className="font-medium text-sm leading-[1.14] text-main-dark">
                                    {item.valute} {item.number}
                                  </p>
                                </div>
                                <div className="grid place-items-end">
                                  <div className="bg-bg-color rounded w-10 h-[26px] flex items-center">
                                    {item.type === 'Visa' && (
                                      <Image
                                        src="/img/visa.png"
                                        alt="Visa card"
                                        width={36}
                                        height={11}
                                      />
                                    )}
                                    {item.type === 'MC' && (
                                      <Image
                                        src="/img/mc.png"
                                        alt="MasterCard"
                                        width={32}
                                        height={20}
                                      />
                                    )}
                                  </div>
                                </div>
                              </FormLabel>
                            </FormItem>
                          </React.Fragment>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </TabsContent>
                  <TabsContent value="cardAdd" className="h-full">
                    <p>Tab 2 - Form to add card</p>
                  </TabsContent>
                </Tabs>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <ModalFooter className="flex flex-col gap-3 py-4 shadow-[0_-6px_20px_0_rgba(89,125,137,0.08)]">
          <Button type="submit" className="w-full">
            Поповнити баланс
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose(false, undefined)}
            className="w-full"
          >
            Відмінити
          </Button>
        </ModalFooter>
      </form>
    </Form>
  );
};
