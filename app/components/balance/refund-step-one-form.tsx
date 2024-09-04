'use client';
import React, { startTransition, useEffect, useState } from 'react';
import Image from 'next/image';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { Info } from '@/app/components/common/info';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Icon } from '@/components/utils/icon';
import { DatePicker } from '@/app/components/common/date-picker';
import { parseISO, formatISO } from 'date-fns';
import Link from 'next/link';

const refundReasonList = [
  { key: 1, val: 'Немає потреби використання коштів з балансу' },
  {
    key: 2,
    val: 'Завершення співпраці',
  },
  {
    key: 3,
    val: 'Інша причина',
  },
];
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
interface EditCardFormProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

const RefundFormSchema = z.object({
  refundAmount: z.coerce
    .number({
      invalid_type_error: 'Вкажіть коректну суму повернення',
    })
    .gte(10, { message: 'Вкажіть коректну суму повернення' }),
  refundAdditional: z.string().optional(),
  refundReason: z.string({
    required_error: 'Вкажіть причину повернення',
  }),
  refundPIB: z.string().min(2, 'Вкажіть ваше прізвище, ім&apos;я, по-батькові'),
  refundDB: z.date({
    required_error: 'Вкажіть коректну дату народження',
  }),
  refundIDNumber: z.string({
    required_error: 'Вкажіть коректний номер паспорту',
  }),
  refundIDWho: z.string({
    required_error: 'Вкажіть орган, що видав документ',
  }),
  refundPassSerial: z.string().optional(),
  refundPassDate: z.string().optional(),
  refundPassWho: z.string().optional(),
  refundCard: z.coerce.number().optional(),
});
export const RefundStepOneForm = ({ onClose }: EditCardFormProps) => {
  const [currentForm, setCurrentForm] = React.useState(0);
  const [refundForm, setRefundForm] = React.useState(0);
  const [step, setStep] = React.useState(1);

  const addForm = useForm<z.infer<typeof RefundFormSchema>>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(RefundFormSchema),
    defaultValues: {
      refundAmount: 0,
      refundReason: '',
      refundAdditional: '',
      refundPIB: '',
      refundDB: new Date(),
      refundPassSerial: '',
      refundPassDate: '',
      refundPassWho: '',
      refundCard: 0,
    },
  });
  function onSubmit(data: z.infer<typeof RefundFormSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        refundDB: formatISO(data.refundDB),
        refundDoc: currentForm,
        refundPayTo: refundForm,
      };
      toast({
        title: 'Ви відправили наступні значення:',
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        ),
      });
    });
  }

  return (
    <Form {...addForm}>
      <form
        onSubmit={addForm.handleSubmit(onSubmit)}
        className="flex-grow h-full"
      >
        {/* Refund Form - Step 1 */}
        {step == 1 && (
          <div
            className={cn(
              'flex-grow flex flex-col justify-between',
              'h-full mt-8',
            )}
          >
            <ModalHeader className="mb-6">
              <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center flex gap-2 items-center justify-center">
                Повернення коштів
              </ModalTitle>
              <ModalDescription className="hidden"></ModalDescription>
            </ModalHeader>

            <div className="flex-grow flex flex-col w-full">
              <FormField
                control={addForm.control}
                name="refundAmount"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                      Сума повернення
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
                control={addForm.control}
                name="refundReason"
                render={({ field }) => (
                  <FormItem className="space-y-4 mt-1 mb-4">
                    <FormLabel>Причина повернення</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col"
                      >
                        {refundReasonList.map((item) => (
                          <React.Fragment key={item.key}>
                            <FormItem className="flex items-center gap-x-1 gap-y-2">
                              <FormControl>
                                <RadioGroupItem value={String(item.key)} />
                              </FormControl>
                              <FormLabel className="w-full bg-transparent flex justify-between items-center border-0">
                                <p className="font-normal text-sm leading-main-lh text-main-dark">
                                  {item.val}
                                </p>
                              </FormLabel>
                            </FormItem>
                          </React.Fragment>
                        ))}
                      </RadioGroup>
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={addForm.control}
                name="refundAdditional"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                      Додаткова інформація
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
              <p className="font-semibold text-sm leading-main-lh text-main-dark mb-4">
                Документ особи для заяви на повернення
              </p>

              <div className="flex flex-col gap-2 lg:flex-row-reverse items-center">
                <Button
                  type="button"
                  variant="secondary"
                  className="gap-2 w-full mb-2"
                >
                  Авторизуватись через
                  <Icon iconName="Diia" width={24} height={24} />
                </Button>
                <div className="w-full flex items-center justify-center gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    className={cn(
                      'w-full font-semibold text-sm leading-main-lh text-main-dark',
                      currentForm === 0 && 'text-main-color',
                    )}
                    onClick={() => setCurrentForm(0)}
                  >
                    ID картка
                  </Button>
                  <div className="border-r border-gray-light h-[40px] w-[1px]"></div>
                  <Button
                    type="button"
                    variant="ghost"
                    className={cn(
                      'w-full font-semibold text-sm leading-main-lh text-main-dark',
                      currentForm === 1 && 'text-main-color',
                    )}
                    onClick={() => setCurrentForm(1)}
                  >
                    Паспорт
                  </Button>
                </div>
              </div>

              <FormField
                control={addForm.control}
                name="refundPIB"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                      ПІБ:
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
                control={addForm.control}
                name="refundDB"
                render={({ field }) => (
                  <FormItem className="flex flex-col mb-4">
                    <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                      Дата народження:
                    </FormLabel>
                    <FormControl>
                      <DatePicker
                        // captionLayout="dropdown-buttons"
                        // fromYear={1900}
                        // toYear={new Date().getFullYear()}
                        selected={field.value}
                        onSelect={(value: Date) => {
                          field.onChange(value);
                        }}
                        disabled={(date) => date > new Date()}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {currentForm === 0 && (
                <div className="w-full flex gap-4">
                  <div className="w-full">
                    <FormField
                      control={addForm.control}
                      name="refundIDNumber"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full">
                          <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                            Номер документа:
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
                  </div>
                  <div className="w-full">
                    <FormField
                      control={addForm.control}
                      name="refundIDWho"
                      render={({ field }) => (
                        <FormItem className="mb-4 w-full">
                          <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                            Орган, що видав:
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
                  </div>
                </div>
              )}
              {/* Refund Form, Step 1, Tab 2 */}
              {currentForm === 1 && (
                <>
                  <div className="w-full flex gap-4">
                    <div className="w-full">
                      <FormField
                        control={addForm.control}
                        name="refundPassSerial"
                        render={({ field }) => (
                          <FormItem className="mb-4 w-full">
                            <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                              Серія паспорта:
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
                    </div>
                    <div className="w-full">
                      <FormField
                        control={addForm.control}
                        name="refundPassDate"
                        render={({ field }) => (
                          <FormItem className="mb-4 w-full">
                            <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                              Номер паспорта:
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
                    </div>
                  </div>
                  <FormField
                    control={addForm.control}
                    name="refundPassWho"
                    render={({ field }) => (
                      <FormItem className="mb-4">
                        <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                          Ким виданий:
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
                </>
              )}

              <Info>
                {' '}
                Сформований документ необхідно роздрукувати, підписати та
                направити до{' '}
                <Link href="#" className="text-main-color font-semibold">
                  Служби турботи про клієнтів
                </Link>{' '}
                разом із поверненим товаром.
              </Info>
            </div>

            <ModalFooter
              className={cn(
                'flex flex-col md:flex-row-reverse md:justify-start gap-3 md:gap-4 py-4 shadow-[0_-6px_20px_0_rgba(89,125,137,0.08)]',
              )}
            >
              {/* <Button type="button" onClick={addForm.handleSubmit(onSubmit)}> */}
              <Button type="button" onClick={() => setStep(2)}>
                Продовжити
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => onClose(false, undefined)}
              >
                Скасувати
              </Button>
            </ModalFooter>
          </div>
        )}

        {/* Refund Form - Step 2 */}
        {step == 2 && (
          <div
            className={cn(
              'flex-grow flex flex-col justify-between',
              'h-full mt-8',
            )}
          >
            <ModalHeader className="mb-6">
              <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center flex gap-2 items-center justify-center">
                Повернення коштів
              </ModalTitle>
              <ModalDescription className="hidden"></ModalDescription>
            </ModalHeader>
            <div className="flex-grow flex flex-col w-full">
              <div className="mb-4 font-semibold text-sm text-main-dark leading-main-lh">
                Реквізити на які буде повернення коштів
              </div>
              <div className="mb-4 flex gap-4 items-center justify-center">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setRefundForm(0)}
                  className={cn(
                    'font-semibold text-sm leading-main-lh',
                    refundForm !== 0 ? 'text-gray-dark' : 'text-main-color',
                  )}
                >
                  Обрати картку
                </Button>
                <div className="border-r border-gray-light h-[40px] w-[1px]"></div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setRefundForm(1)}
                  className={cn(
                    'font-semibold text-sm leading-main-lh',
                    refundForm !== 1 ? 'text-gray-dark' : 'text-main-color',
                  )}
                >
                  Ввести дані картки
                </Button>
                <div className="border-r border-gray-light h-[40px] w-[1px]"></div>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setRefundForm(2)}
                  className={cn(
                    'font-semibold text-sm leading-main-lh',
                    refundForm !== 2 ? 'text-gray-dark' : 'text-main-color',
                  )}
                >
                  IBAN
                </Button>
              </div>
              {refundForm == 0 && (
                <div className="mb-4">
                  <FormField
                    control={addForm.control}
                    name="refundCard"
                    render={({ field }) => (
                      <FormItem className="flex flex-col space-x-0 space-y-0">
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
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}
              {refundForm == 1 && <div className="mb-4">Other card</div>}
              {refundForm == 2 && <div className="mb-4">IBAN</div>}
            </div>
            <ModalFooter
              className={cn(
                'flex flex-col md:flex-row-reverse md:justify-start gap-3 md:gap-4 py-4 shadow-[0_-6px_20px_0_rgba(89,125,137,0.08)]',
              )}
            >
              <Button type="button" onClick={addForm.handleSubmit(onSubmit)}>
                Згенерувати заяву на повернення
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => setStep(1)}
              >
                Попередній крок
              </Button>
              <Button
                className="border-0"
                type="button"
                variant="outline"
                onClick={() => onClose(false, undefined)}
              >
                Скасувати
              </Button>
            </ModalFooter>
          </div>
        )}
      </form>
    </Form>
  );
};
