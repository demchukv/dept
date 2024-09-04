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
import { parseISO, formatISO, compareAsc } from 'date-fns';

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
interface EditCardFormProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

const AddCardSchema = z.object({
  refundAmount: z.coerce
    .number({
      invalid_type_error: 'Вкажіть коректну суму повернення',
    })
    .gte(10, { message: 'Вкажіть коректну суму повернення' }),
  refundAdditional: z.string().optional(),
  refundReason: z.string(),
  refundPIB: z.string().min(2, 'Вкажіть ваше прізвище, ім&apos;я, по-батькові'),
  refundDB: z.date({
    required_error: 'Вкажіть коректну дату народження',
  }),
});
export const RefundStepOneForm = ({ onClose }: EditCardFormProps) => {
  const [currentForm, setCurrentForm] = React.useState(0);
  const addForm = useForm<z.infer<typeof AddCardSchema>>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(AddCardSchema),
    defaultValues: {
      refundAmount: 0,
      refundReason: '',
      refundAdditional: '',
      refundPIB: '',
      refundDB: new Date(),
    },
  });
  function onSubmit(data: z.infer<typeof AddCardSchema>) {
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
    <div
      className={cn('flex-grow flex flex-col justify-between', 'h-full mt-8')}
    >
      <ModalHeader className="mb-6">
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center flex gap-2 items-center justify-center">
          Повернення коштів
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>

      <Form {...addForm}>
        <form onSubmit={addForm.handleSubmit(onSubmit)} className="flex-grow">
          <div className="flex flex-col w-full">
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
                className="gap-2 w-full"
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
                |
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

            {currentForm === 0 && (
              <div>
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
                    <FormItem className="flex flex-col">
                      <FormLabel>Дата народження:</FormLabel>
                      <FormControl>
                        <DatePicker
                          selected={field.value}
                          onSelect={(value: Date) => {
                            field.onChange(value);
                            onSubmit(addForm.getValues());
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            )}

            {currentForm === 1 && <div>form2</div>}
          </div>
        </form>
      </Form>

      <ModalFooter
        className={cn(
          'flex flex-col md:flex-row-reverse md:justify-start gap-3 md:gap-4 py-4 shadow-[0_-6px_20px_0_rgba(89,125,137,0.08)]',
        )}
      >
        <Button type="button" onClick={addForm.handleSubmit(onSubmit)}>
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
  );
};
