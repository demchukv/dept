'use client';
import React, { startTransition, useState } from 'react';

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
import { useForm, UseFormReturn } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Icon } from '@/components/utils/icon';
import { cn } from '@/lib/utils';
import { ReplenishBalansSchema } from '@/app/components/balance/replenish-balance-form';

interface AddCardFormProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
  form?: UseFormReturn<z.infer<typeof ReplenishBalansSchema>>;
}

const AddCardSchema = z
  .object({
    amount: z.coerce
      .number({
        invalid_type_error: 'Вкажіть коректну суму поповнення',
      })
      .gte(10, { message: 'Вкажіть коректну суму поповнення' }),
    ownerName: z.string().min(2, 'Вкажіть ім’я власника'),
    cardNumber: z
      .string()
      .regex(/^\d{16}$/, 'Номер картки повинен мати 16 цифр'),
    cardCvv: z.string().regex(/^\d{3,4}$/, 'CVV повинен мати 3 або 4 цифри'),
    cardMonth: z.string().refine(
      (value) => {
        return Number(value) >= 1 && Number(value) <= 12;
      },
      {
        message: 'Місяць повинен бути від 01 до 12',
      },
    ),
    cardYear: z.string().refine(
      (value) => {
        return (
          Number('20' + value) >= new Date().getFullYear() &&
          Number('20' + value) <= new Date().getFullYear() + 10
        );
      },
      {
        message: 'Перевірте рік дії картки',
      },
    ),
    saveCard: z.boolean().optional(),
  })
  .refine(
    (data) => {
      const currentDate = new Date();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      if (
        Number('20' + data.cardYear) < currentYear ||
        (Number('20' + data.cardYear) === currentYear &&
          Number(data.cardMonth) < currentMonth)
      ) {
        return false;
      } else {
        return true;
      }
    },
    {
      message: 'Картка прострочена. Використайте іншу картку.',
      path: ['cardMonth'],
    },
  );

export const AddCardForm = ({ onClose, form }: AddCardFormProps) => {
  const [cvvVisible, setCvvVisible] = useState(false);

  const addForm = useForm<z.infer<typeof AddCardSchema>>({
    resolver: zodResolver(AddCardSchema),
    defaultValues: {
      amount: form?.getValues().amount || 500,
      ownerName: '',
      cardNumber: '',
      cardMonth: '',
      cardYear: '',
      cardCvv: '',
      saveCard: false,
    },
  });
  function onSubmit(data: z.infer<typeof AddCardSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      data.amount = form?.getValues().amount || 0;
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
      {!form && (
        <ModalHeader>
          <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center">
            Додати картку
          </ModalTitle>
          <ModalDescription className="hidden"></ModalDescription>
        </ModalHeader>
      )}
      <Form {...addForm}>
        <form
          onSubmit={addForm.handleSubmit(onSubmit)}
          className="min-h-full flex flex-col gap-6 justify-between"
        >
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
                      pattern="[0-9\s ]{13,19}"
                      autoComplete="cc-number"
                      maxLength={19}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-[1fr_1fr] grid_rows-[auto_auto_auto] gap-x-8">
              <div className="pb-2">
                <FormLabel
                  htmlFor="cardMonth"
                  className="font-normal text-xs text-gray-dark leading-none"
                >
                  Термін дії:
                </FormLabel>
              </div>
              <div className="pb-2">
                <FormLabel
                  htmlFor="cardCvv"
                  className="font-normal text-xs text-gray-dark leading-none"
                >
                  CVV код:
                </FormLabel>
              </div>
              <div className="grid grid-cols-[1fr_16px_1fr] items-center">
                <div>
                  <FormField
                    control={addForm.control}
                    name="cardMonth"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="_ _"
                            type="tel"
                            pattern="\d\d"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
                <div className="text-center text-main-dark">/</div>
                <div>
                  <FormField
                    control={addForm.control}
                    name="cardYear"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="_ _"
                            type="tel"
                            pattern="\d\d"
                          />
                        </FormControl>
                        {/* <FormMessage /> */}
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <div>
                <FormField
                  control={addForm.control}
                  name="cardCvv"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder="..."
                            type={cvvVisible === true ? 'text' : 'password'}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            className="w-5 h-5 p-0 bg-transparent absolute top-0 right-4 translate-y-1/2"
                            onClick={() => setCvvVisible(!cvvVisible)}
                            title="Показати/Приховати CVV код"
                          >
                            {cvvVisible === true ? (
                              <Icon
                                iconName="EyeClosed"
                                width={20}
                                height={20}
                                className="fill-main-dark"
                              />
                            ) : (
                              <Icon
                                iconName="EyeOpen"
                                width={20}
                                height={20}
                                className="fill-main-dark"
                              />
                            )}
                          </Button>
                        </div>
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
              </div>
              <div>
                {addForm.formState.errors?.cardMonth && (
                  <p className="text-[0.8rem] text-warning font-medium mt-1">
                    {addForm.formState.errors?.cardMonth.message}
                  </p>
                )}
                {addForm.formState.errors?.cardYear && (
                  <p className="text-[0.8rem] text-warning font-medium mt-1">
                    {addForm.formState.errors?.cardYear.message}
                  </p>
                )}
              </div>
              <div>
                {addForm.formState.errors?.cardCvv && (
                  <p className="text-[0.8rem] text-warning font-medium mt-1">
                    {addForm.formState.errors?.cardCvv.message}
                  </p>
                )}
              </div>
            </div>
            {form && (
              <FormField
                control={addForm.control}
                name="saveCard"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-4">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel className="font-normal text-sm text-main-dark">
                        Зберегти картку
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />
            )}
          </div>
        </form>
      </Form>

      <ModalFooter
        className={cn(
          'flex flex-col gap-3 py-4 shadow-[0_-6px_20px_0_rgba(89,125,137,0.08)]',
        )}
      >
        <Button
          type="button"
          onClick={addForm.handleSubmit(onSubmit)}
          className="w-full"
        >
          {!form ? 'Додати картку' : 'Поповнити баланс'}
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
    </>
  );
};
