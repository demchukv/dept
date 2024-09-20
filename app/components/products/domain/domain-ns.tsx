import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { Icon } from '@/components/utils/icon';
import { domainType } from '@/types/domain';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { startTransition, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const nsSchema = z.object({
  allData: z.object({
    nsRecord: z
      .array(
        z.object({
          host: z.string().min(1, 'Вкажіть хост'),
          id: z.number().optional(),
        }),
      )
      .optional(),
  }),
});

type nsRecordsType = {
  id: number | undefined;
  host: string;
};
const nsRecords: nsRecordsType[] = [
  {
    id: 1,
    host: 'NS1.DEPT.COM.UA',
  },
  {
    id: 2,
    host: 'NS2.DEPT.COM.UA',
  },
];

interface domainNsProps {
  data: domainType;
}
export const DomainNs = ({ data }: domainNsProps) => {
  const form = useForm({
    resolver: zodResolver(nsSchema),
    mode: 'onChange',
    defaultValues: {
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
    keyName: 'dnsKey',
  });
  const onSubmit = (data: z.infer<typeof nsSchema>) => {
    startTransition(() => {
      //TODO: make API request and setData and reload data
      // const newData = getJson('/data/call-summary.json');
      const values = { ...data };
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
          <div className="sm:grid grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto_auto_24px_24px] gap-2">
            {fieldsNS.map((field, i) => (
              <React.Fragment key={`b-${i}`}>
                <div className="sm:hidden">Host</div>
                <div className="grid grid-cols-[auto_24px_24px] sm:grid-cols-1 gap-2">
                  <FormField
                    control={form.control}
                    name={`allData.nsRecord.${i}.host`}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
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
                    className="p-0 w-6 h-6 bg-transparent sm:hidden text-warning"
                    onClick={() => deleteNS(i)}
                  >
                    <Icon
                      width={24}
                      height={24}
                      iconName="Trash"
                      className="fill-warning w-6 h-6 flex-shrink-0"
                    />
                  </Button>
                </div>
                <FormField
                  control={form.control}
                  name={`allData.nsRecord.${i}.id`}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input type="hidden" {...field} placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="button"
                  variant="ghost"
                  className="p-0 w-6 h-6 bg-transparent hidden sm:flex text-main-dark"
                  onClick={() => deleteNS(i)}
                >
                  <Icon
                    width={24}
                    height={24}
                    iconName="TrashEmpty"
                    className="w-6 h-6 flex-shrink-0"
                  />
                </Button>
              </React.Fragment>
            ))}
          </div>
          <div className="w-full flex flex-col sm:flex-row gap-4 items-center justify-between mt-8">
            <Button
              type="button"
              variant="ghost"
              className="text-main-color font-semibold w-full sm:w-auto"
              onClick={() =>
                appendNS({ host: '@', id: undefined }, { shouldFocus: true })
              }
            >
              Додати запис
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
