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
import React, { startTransition } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const dnsSchema = z.object({
  domainId: z.number().min(1, 'Вкажіть домен'),
  host: z.string().min(1, 'Вкажіть хост'),
  type: z.string().min(1, 'Вкажіть тип'),
  server: z.string().min(1, 'Вкажіть сервер'),
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
interface domainDnsProps {
  data: domainType;
}
export const DomainDns = ({ data }: domainDnsProps) => {
  const form = useForm({
    resolver: zodResolver(dnsSchema),
    mode: 'onChange',
    defaultValues: {
      domainId: data.id,
      host: '@',
      type: '1',
      server: '',
    },
  });

  const onSubmit = (data: z.infer<typeof dnsSchema>) => {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        action: 'createFTPUser',
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
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="grid grid-cols-[auto_auto_auto_auto_24px_24px] gap-2">
            <div className="font-semibold">Хост</div>
            <div className="font-semibold">Тип</div>
            <div className="font-semibold">Сервер</div>
            <div className="font-semibold">Час життя TTL</div>
            <div></div>
            <div></div>
            {dnsRecords.map((item) => (
              <React.Fragment key={item.id}>
                <div>{item.host}</div>
                <div>{item.type}</div>
                <div>{item.server}</div>
                <div>{item.ttl}</div>
                <div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="hover:text-main-color w-6 h-6 items-center justify-center"
                  >
                    <Icon iconName="Pencil" width={20} height={20} />
                  </Button>
                </div>
                <div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="hover:text-main-color w-6 h-6 items-center justify-center"
                  >
                    <Icon iconName="TrashEmpty" width={20} height={20} />
                  </Button>
                </div>
              </React.Fragment>
            ))}
            <div>
              <FormField
                control={form.control}
                name="host"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Хост" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Тип" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {dnsTypes.map((item) => (
                          <SelectItem key={item.id} value={item.id.toString()}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div>
              <FormField
                control={form.control}
                name="server"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input {...field} type="text" placeholder="Сервер" />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="col-span-3 text-right">
              <Button
                type="button"
                variant="ghost"
                className="text-warning hover:text-main-dark w-6 h-6 items-center justify-center"
              >
                Відмінити
                <Icon iconName="DeleteCircle" width={20} height={20} />
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </>
  );
};
