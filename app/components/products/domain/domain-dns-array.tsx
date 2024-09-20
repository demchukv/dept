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

const dnsSchema = z.object({
  allData: z.object({
    dnsRecord: z
      .array(
        z.object({
          host: z.string().min(1, 'Вкажіть хост'),
          type: z.string().min(1, 'Вкажіть тип'),
          server: z.string().min(1, 'Вкажіть сервер'),
          id: z.number().optional(),
        }),
      )
      .optional(),
  }),
});
const dnsRecords = [
  { id: 1, host: '@', type: 'A', server: '192.168.0.1', ttl: 3600 },
  { id: 2, host: 'www', type: 'A', server: '192.168.0.1', ttl: 3600 },
  { id: 3, host: '@', type: 'MX', server: 'mail.dept.com.ua', ttl: 3600 },
];
const dnsTypes = [
  { id: 1, name: 'A' },
  { id: 2, name: 'MX' },
  { id: 3, name: 'CNAME' },
  { id: 4, name: 'TXT' },
  { id: 5, name: 'NS' },
  { id: 6, name: 'SOA' },
  { id: 7, name: 'SRV' },
  { id: 8, name: 'AAAA' },
  { id: 9, name: 'CAA' },
];

type dnsRecordsType = {
  id: number | undefined;
  host: string;
  type: string;
  server: string;
};

interface domainDnsProps {
  data: domainType;
}
export const DomainDns = ({ data }: domainDnsProps) => {
  const [dns, setDns] = useState<dnsRecordsType[]>(dnsRecords);
  const form = useForm({
    resolver: zodResolver(dnsSchema),
    mode: 'onChange',
    defaultValues: {
      allData: {
        dnsRecord: dns,
      },
    },
  });
  const {
    fields: fieldsDNS,
    append: appendDNS,
    remove: deleteDNS,
  } = useFieldArray({
    control: form.control,
    name: 'allData.dnsRecord',
    keyName: 'dnsKey',
  });
  const onSubmit = (data: z.infer<typeof dnsSchema>) => {
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="sm:grid grid-cols-[auto_auto] sm:grid-cols-[auto_auto_auto_auto_24px_24px] gap-2">
            <div className="hidden sm:block font-semibold">Хост</div>
            <div className="hidden sm:block font-semibold">Тип</div>
            <div className="hidden sm:block font-semibold">Сервер</div>
            <div className="hidden sm:block font-semibold">Час життя TTL</div>
            <div className="hidden sm:block font-semibold"></div>
            <div className="hidden sm:block font-semibold"></div>
            {fieldsDNS.map((field, i) => (
              <React.Fragment key={`b-${i}`}>
                <div className="sm:hidden">Host</div>
                <div className="grid grid-cols-[auto_24px_24px] sm:grid-cols-1 gap-2">
                  <FormField
                    control={form.control}
                    name={`allData.dnsRecord.${i}.host`}
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
                    className="p-0 w-6 h-6 bg-transparent sm:hidden text-main-color"
                  >
                    <Icon
                      width={24}
                      height={24}
                      iconName="EditIcon"
                      className="w-6 h-6 flex-shrink-0"
                    />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="p-0 w-6 h-6 bg-transparent sm:hidden text-warning"
                    onClick={() => deleteDNS(i)}
                  >
                    <Icon
                      width={24}
                      height={24}
                      iconName="Trash"
                      className="fill-warning w-6 h-6 flex-shrink-0"
                    />
                  </Button>
                </div>
                <div className="sm:hidden">Type</div>
                <FormField
                  control={form.control}
                  name={`allData.dnsRecord.${i}.type`}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <Select
                        onValueChange={() => {
                          field.onChange;
                          console.log(field);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Тип" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {dnsTypes.map((item) => (
                            <SelectItem key={item.id} value={item.name}>
                              {item.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="sm:hidden">Server</div>
                <FormField
                  control={form.control}
                  name={`allData.dnsRecord.${i}.server`}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input type="text" {...field} placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="sm:hidden">TTL</div>
                <FormField
                  control={form.control}
                  name={`allData.dnsRecord.${i}.id`}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <div>3600</div>
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
                >
                  <Icon
                    width={24}
                    height={24}
                    iconName="Pencil"
                    className="w-6 h-6 flex-shrink-0"
                  />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="p-0 w-6 h-6 bg-transparent hidden sm:flex text-main-dark"
                  onClick={() => deleteDNS(i)}
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
                appendDNS(
                  { host: '@', type: 'A', server: '', id: undefined },
                  { shouldFocus: true },
                )
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
