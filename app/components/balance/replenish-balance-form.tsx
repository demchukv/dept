'use client';
import React from 'react';
import { useTransition } from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { AddCardForm } from '@/app/components/balance/add-card-form';
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
import { CcInfo } from '@/app/components/balance/cc-info';

interface ReplenishBalanceFormProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

export const ReplenishBalansSchema = z.object({
  amount: z.coerce
    .number({
      invalid_type_error: 'Вкажіть коректну суму поповнення',
    })
    .gte(10, { message: 'Вкажіть коректну суму поповнення' }),
  card: z.coerce
    .number({
      required_error: 'Вкажіть картку з якої відбуватиметься оплата',
    })
    .gte(1, 'Вкажіть картку з якої відбуватиметься оплата'),
});

//TODO: get data from API
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

const selectedCard = cards.find((card) => card.status === 'Основна');

export const ReplenishBalanceForm = ({
  onClose,
}: ReplenishBalanceFormProps) => {
  const [isPendig, startTransition] = useTransition();
  const [currentForm, setCurrentForm] = React.useState(0);

  const form = useForm<z.infer<typeof ReplenishBalansSchema>>({
    mode: 'onChange',
    resolver: zodResolver(ReplenishBalansSchema),
    defaultValues: {
      amount: 500,
      card: selectedCard?.id || 0,
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
    <div className="h-full mt-8 flex flex-col justify-between">
      <ModalHeader className="mb-6">
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center">
          Поповнити баланс
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <div className="flex-grow flex flex-col">
        <Form {...form}>
          <form
            // onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6 justify-between"
          >
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
                      <div className="relative w-full">
                        <Input
                          {...field}
                          // disabled={isPending}
                          placeholder=""
                          type="text"
                          className="pr-12"
                        />
                        <div className="absolute top-1/2 right-4 -translate-y-1/2 text-main-dark text-sm font-medium leading-[1.57]">
                          грн
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="card"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-x-0 space-y-0">
                    <FormLabel
                      htmlFor=""
                      className="mb-4 font-semibold text-sb text-gray-dark leading-main-lh"
                    >
                      Спосіб поповнення
                    </FormLabel>
                    <div className="pb-3 space-y-0 flex gap-3 justify-between">
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
                    <div className="pb-6 mt-0">
                      <Button type="button" className="w-full">
                        Згенерувати рахунок на оплату
                      </Button>
                    </div>

                    <div className="pb-4 flex gap-4 items-center justify-center">
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setCurrentForm(0)}
                        className={cn(
                          'font-semibold text-sm leading-main-lh text-main-dark',
                          currentForm === 0 && 'text-main-color',
                        )}
                      >
                        Обрати картку
                      </Button>
                      |
                      <Button
                        type="button"
                        variant="ghost"
                        onClick={() => setCurrentForm(1)}
                        className={cn(
                          'font-semibold text-sm leading-main-lh text-main-dark',
                          currentForm === 1 && 'text-main-color',
                        )}
                      >
                        Ввести дані картки
                      </Button>
                    </div>
                    <div className={cn('hidden', currentForm === 0 && 'block')}>
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
                                  <CcInfo item={item} />
                                </FormLabel>
                              </FormItem>
                            </React.Fragment>
                          ))}
                        </RadioGroup>
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>

        {currentForm === 1 && (
          <AddCardForm form={form} onClose={() => onClose(false, undefined)} />
        )}
      </div>

      <ModalFooter
        className={cn(
          'hidden flex-col md:flex-row-reverse md:justify-start gap-3 md:gap-4 py-4 shadow-[0_-6px_20px_0_rgba(89,125,137,0.08)]',
          currentForm === 0 && 'flex',
        )}
      >
        <Button type="button" onClick={form.handleSubmit(onSubmit)}>
          Поповнити баланс
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onClose(false, undefined)}
        >
          Відмінити
        </Button>
      </ModalFooter>
    </div>
  );
};
