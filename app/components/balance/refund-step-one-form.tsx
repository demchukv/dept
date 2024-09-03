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
});
export const RefundStepOneForm = ({ onClose }: EditCardFormProps) => {
  const addForm = useForm<z.infer<typeof AddCardSchema>>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(AddCardSchema),
    defaultValues: {
      refundAmount: 0,
      refundReason: '',
      refundAdditional: '',
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
        <form
          onSubmit={addForm.handleSubmit(onSubmit)}
          className="flex-grow flex flex-col gap-6 justify-between"
        >
          <div className="flex flex-col gap-3 w-full">
            <FormField
              control={addForm.control}
              name="refundAmount"
              render={({ field }) => (
                <FormItem>
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

            {/* <FormField
              control={addForm.control}
              name="status"
              render={({ field }) => (
                <FormItem className="space-y-4 mt-1">
                  <FormLabel>
                    Оберіть статус, для зручності у подальшому керуванні
                    картками:
                  </FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col"
                    >
                      {cardsStatus.map((item) => (
                        <React.Fragment key={item.code}>
                          <FormItem className="flex items-center gap-x-1 gap-y-2">
                            <FormControl>
                              <RadioGroupItem
                                value={item.code}
                                onClick={(value) =>
                                  setDescription(value.currentTarget.value)
                                }
                              />
                            </FormControl>
                            <FormLabel className="w-full bg-transparent flex justify-between items-center border-0">
                              <p className="font-normal text-sm leading-main-lh text-main-dark">
                                {item.status}
                              </p>
                              <div className="grid place-items-end"></div>
                            </FormLabel>
                          </FormItem>
                        </React.Fragment>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            /> */}

            <FormField
              control={addForm.control}
              name="refundAdditional"
              render={({ field }) => (
                <FormItem>
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
