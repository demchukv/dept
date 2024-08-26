'use client';

import React from 'react';
import { Card, CardHeader, CardSeparator } from '@/app/components/card/card';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { callType } from '@/types/account';
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

import { DatePicker } from '@/app/components/common/date-picker';
import { parseISO, formatISO } from 'date-fns';

interface callInfoType {
  callInfo: callType;
}
const FormSchema = z.object({
  startDate: z.date({
    required_error: 'Вкажіть коректну початкову дату',
  }),
  endDate: z.date({
    required_error: 'Вкажіть коректну кінцеву дату',
  }),
});

export const Call = ({ callInfo }: callInfoType) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      startDate: callInfo.startDate ? parseISO(callInfo.startDate) : new Date(),
      endDate: callInfo.endDate ? parseISO(callInfo.endDate) : new Date(),
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    toast({
      title: 'Ви відправили наступні значення:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">
            startDate: {formatISO(data.startDate)}
            {'\n'}
            endtDate: {formatISO(data.endDate)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <Card>
      <CardHeader>
        <span className="flex gap-2 items-center">
          <Icon width={24} height={24} iconName="Call" />
          Телефонія
        </span>
        <Link href="/my-numbers" className="hover:text-main-color">
          <Icon width={24} height={24} iconName="RoundedRrrowRigth" />
        </Link>
      </CardHeader>
      <CardSeparator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          onChange={() => alert('form submitted')}
          className=""
        >
          <div className="flex flex-row gap-2 mb-5 justify-between items-center w-full">
            <div className="flex-grow">
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="hidden">Select start date</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onSelect={(value: Date) => {
                          field.onChange(value);
                          onSubmit(form.getValues());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex-shrink-0">–</div>
            <div className="flex-grow">
              <FormField
                control={form.control}
                name="endDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel className="hidden">Select end date</FormLabel>
                    <FormControl>
                      <DatePicker
                        selected={field.value}
                        onSelect={(value: Date) => {
                          field.onChange(value);
                          onSubmit(form.getValues());
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </form>
      </Form>
      <div className="flex flex-col gap-3 md:gap-4">
        <div className="flex justify-between gap-2 items-center">
          <span className="font-normal text-sm leading-[1.14] text-main-dark">
            Вхідні
          </span>
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            {callInfo.incoming}
          </span>
        </div>

        <div className="flex justify-between gap-2 items-center">
          <span className="font-normal text-sm leading-[1.14] text-main-dark">
            Вихідні
          </span>
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            {callInfo.outgoing}
          </span>
        </div>

        <div className="flex justify-between gap-2 items-center">
          <span className="font-normal text-sm leading-[1.14] text-main-dark">
            Витрати
          </span>
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            {callInfo.total.toFixed(2)} грн
          </span>
        </div>

        <div className="flex justify-end gap-2 items-center pt-7 lg:pt-5">
          <span className="font-medium text-sm leading-[1.14] text-main-dark">
            <Link href="#" className="text-main-color hover:text-main-dark">
              Журнал дзвінків
            </Link>
          </span>
        </div>
      </div>
    </Card>
  );
};
