'use client';
import React, { startTransition } from 'react';

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
import { Icon } from '@/components/utils/icon';
import { cn } from '@/lib/utils';

interface AddCardFormProps {
  amount: number;
}

const AddCardSchema = z.object({
  amount: z.coerce
    .number({
      invalid_type_error: 'Вкажіть коректну суму поповнення',
    })
    .gte(10, { message: 'Вкажіть коректну суму поповнення' }),
  ownerName: z.string().min(2, 'Вкажіть ім’я власника'),
  cardNumber: z.string().regex(/^\d{16}$/, 'Номер картки повинен мати 16 цифр'),
  cardCvv: z.string().regex(/^\d{3,4}$/, 'CVV повинен мати 3 або 4 цифри'),
  cardMonth: z.string().regex(/^\d{1,2}$/, 'Місяць повинен мати 2 цифри'),
  cardYear: z.string().regex(/^\d{4}$/, 'Рік повинен мати 4 цифри'),
});

export const AddCardForm = ({ amount }: AddCardFormProps) => {
  const addForm = useForm<z.infer<typeof AddCardSchema>>({
    resolver: zodResolver(AddCardSchema),
    defaultValues: {
      amount: amount,
      ownerName: '',
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
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
    <>
      <Form {...addForm}>
        <form
          onSubmit={addForm.handleSubmit(onSubmit)}
          className="min-h-full flex flex-col gap-6 justify-between"
        >
          <p>{amount}</p>
          <div className="min-h-full flex flex-col gap-3 w-full self-stretch">
            <FormField
              control={addForm.control}
              name="ownerName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    Ім’я власника латиницею:
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
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    Номер картки:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder=""
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9\s]{13,19}"
                      autoComplete="cc-number"
                      maxLength={19}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-8">
              <div className="flex gap-1.5 w-50%">
                <FormField
                  control={addForm.control}
                  name="cardMonth"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                        Термін дії:
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          // disabled={isPending}
                          placeholder="_ _"
                          type="tel"
                          pattern="\d\d"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="self-end">/</div>
                <FormField
                  control={addForm.control}
                  name="cardYear"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                        &nbsp;
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          // disabled={isPending}
                          placeholder="_ _"
                          type="tel"
                          pattern="\d\d"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={addForm.control}
                name="cardCvv"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                      CVV код:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        // disabled={isPending}
                        placeholder="..."
                        type="text"
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
    </>
  );
};
