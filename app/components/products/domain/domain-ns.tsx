import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Icon } from '@/components/utils/icon';
import { domainType } from '@/types/domain';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { startTransition, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const nsSchema = z.object({
  ns1: z.string().min(1, 'Вкажіть хост'),
  ns2: z.string().min(1, 'Вкажіть хост'),
  allData: z.object({
    nsRecord: z
      .array(
        z.object({
          host: z.string().min(1, 'Вкажіть хост'),
        }),
      )
      .optional(),
  }),
});

type nsRecordsType = {
  host: string;
};
const nsRecords: nsRecordsType[] = [{ host: 'ns3.dept.com.ua' }];
const ns1 = 'NS1.DEPT.COM.UA';
const ns2 = 'NS2.DEPT.COM.UA';

interface domainNsProps {
  data: domainType;
}
export const DomainNs = ({ data }: domainNsProps) => {
  const form = useForm<z.infer<typeof nsSchema>>({
    resolver: zodResolver(nsSchema),
    mode: 'onChange',
    defaultValues: {
      ns1: ns1,
      ns2: ns2,
      allData: {
        nsRecord: nsRecords,
      },
    },
  });
  const {
    fields: fieldsNS,
    append: appendNS,
    remove: deleteNS,
  } = useFieldArray({
    control: form.control,
    name: 'allData.nsRecord',
    keyName: 'nsKey',
  });
  const onSubmit = (vals: z.infer<typeof nsSchema>) => {
    console.log(vals);
    startTransition(() => {
      //TODO: make API request and setData and reload data
      // const newData = getJson('/data/call-summary.json');
      const values = { ...vals };
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
      // form.reset();
    });
  };

  return (
    <>
      <p className="mb-2">
        Наразі використовуються наші NS сервери, ви можете керувати DNS доменом
        у сусідній вкладці.
      </p>
      <p className="mb-8">
        Не рекомендуємо змінювати ці записи. Ви повинні впевнитись, що внесення
        змін не спричинить помилок.
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="ns1"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <Input type="text" {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="ns2"
              render={({ field }) => (
                <FormItem className="space-y-1">
                  <FormControl>
                    <Input type="text" {...field} placeholder="" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <>
              {fieldsNS.map((field, i) => (
                <div
                  key={`b-${i}`}
                  className="flex flex-row items-center justify-between gap-4"
                >
                  <FormField
                    control={form.control}
                    name={`allData.nsRecord.${i}.host`}
                    render={({ field }) => (
                      <FormItem className="space-y-1 flex-grow">
                        <FormControl>
                          <Input type="text" {...field} placeholder="" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    className="p-0 w-6 h-6 bg-transparent text-warning flex-shrink-0"
                    onClick={() => deleteNS(i)}
                  >
                    <Icon
                      width={24}
                      height={24}
                      iconName="Trash"
                      className="w-6 h-6 flex-shrink-0"
                    />
                  </Button>
                </div>
              ))}
            </>
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              className="font-semibold w-full sm:w-auto"
              onClick={() => appendNS({ host: '' }, { shouldFocus: true })}
            >
              Додати
              <Icon iconName="Plus" width={20} height={20} />
            </Button>

            <Button
              type="submit"
              variant="default"
              className=" w-full sm:w-auto"
            >
              Зберегти зміни
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
