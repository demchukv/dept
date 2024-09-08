'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Icon } from '@/components/utils/icon';
import { Button } from '@/components/ui/button';
import React from 'react';

const filterOrdersShema = z.object({
  text: z.string().min(1, 'Вкажіть пошуковий запит'),
});

function onSubmit(data: z.infer<typeof filterOrdersShema>) {
  startTransition(() => {
    //TODO: make API request and setData
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

export const FilterForm = () => {
  const form = useForm<z.infer<typeof filterOrdersShema>>({
    resolver: zodResolver(filterOrdersShema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      text: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormLabel
          htmlFor="text"
          className="hidden lg:flex font-normal text-xs text-gray-dark leading-none mb-2"
        >
          Пошук
        </FormLabel>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row items-start">
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem className="w-full min-w-72 md:w-auto">
                <FormControl>
                  <div className="relative w-full">
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="Введіть дані для пошуку"
                      type="text"
                    />
                    <Icon
                      className="absolute right-4 top-1/2 -translate-y-1/2 fill-main-dark"
                      iconName="Search"
                      width={20}
                      height={20}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="w-full md:w-auto py-3 border-0">
            Знайти покупку
          </Button>
        </div>
      </form>
    </Form>
  );
};
