import { Separator } from '@/components/ui/separator';
import { certificateType } from '@/types/certificate';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icon } from '@/components/utils/icon';
import copy from 'copy-to-clipboard';
import { startTransition } from 'react';
import { toast } from '@/components/ui/use-toast';

const ownerEmails = ['admin@localhost.com', 'admin@localhost.ua'];

const newCertSchema = z.object({
  domain: z.string().min(1),
  organisation: z.string().min(1),
  department: z.string().min(1),
  ownerEmail: z.string().min(1),
  pib: z.string().min(1),
  phone: z.string().min(1),
  city: z.string().min(1),
  email: z.string().min(1),
  privateKey: z.string().min(1),
});

interface certificateControlProps {
  data: certificateType;
}
export const CertificateControl = ({ data }: certificateControlProps) => {
  const form = useForm<z.infer<typeof newCertSchema>>({
    resolver: zodResolver(newCertSchema),
    mode: 'onChange',
    defaultValues: {
      domain: '',
      organisation: '',
      department: '',
      ownerEmail: '',
      pib: '',
      phone: '',
      city: '',
      email: '',
      privateKey: data.privateKey,
    },
  });

  const onSubmit = (data: z.infer<typeof newCertSchema>) => {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = { ...data, action: 'continueCertificate' };
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

  const setAdminData = () => {
    form.setValue('pib', data.pib);
    form.setValue('phone', data.phone);
    form.setValue('city', data.city);
    form.setValue('email', data.email);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h2 className="font-semibold text-base leading-normal text-main-dark sm:mb-8">
            Згенерувати новий CSR
          </h2>
          <Separator className="my-4 sm:hidden" />
          <div className="sm:grid sm:grid-cols-2 md:grid-cols-3 sm:gap-8 md:gap-[72px]">
            <div>
              <h2 className="font-semibold text-base leading-normal text-main-dark mb-2">
                Технічні дані
              </h2>
              <FormField
                control={form.control}
                name="domain"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Домен</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="example.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="organisation"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Організація</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Організація" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="department"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Відділ</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Відділ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ownerEmail"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>E-mail власника:</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={ownerEmails[0]}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a verified email to display" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {ownerEmails.map((email) => (
                          <SelectItem key={email} value={email}>
                            {email}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <p className="mb-2 sm:hidden">
              Звертаємо вашу увагу, що підтвердження випуску сертифікату можливо
              лище на одну з цих пошт. Переконайтеся в тому що у вас є доступ
              принаймні до однієї з них перед надсиланням запиту.
            </p>
            <div>
              <div className="flex items-center justify-between mb-2">
                <p className="font-semibold text-base leading-normal text-main-dark">
                  Адмін
                </p>
                <Button
                  type="button"
                  variant="ghost"
                  className="text-main-color"
                  onClick={() => setAdminData()}
                >
                  Автозаповнити з профілю
                </Button>
              </div>
              <FormField
                control={form.control}
                name="pib"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>ПІБ</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Відділ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Телефон</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Відділ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>Місто</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Відділ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mb-2">
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Відділ" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Separator className="my-4 sm:hidden" />

            <div className="mb-2 sm:col-span-2 md:col-span-1">
              <p className="flex items-center gap-3 mb-2 justify-between sm:justify-start">
                PRIVATE key{' '}
                <Button
                  type="button"
                  variant="ghost"
                  className="hover:text-main-color"
                  onClick={() => copy(data.privateKey)}
                >
                  <Icon iconName="Copy" width={20} height={20} />
                </Button>
              </p>
              <ScrollArea className="resize-y h-20 border border-gray-light bg-bg-color rounded px-[18px] pr-[23px] py-2.5 mb-2">
                {data.csr}
                <ScrollBar orientation="vertical" />
              </ScrollArea>
              <p className="text-xs text-gray-dark mb-4">
                *Після перевипуску приватний ключ не змінюється
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <p className="hidden sm:block gap-8">
              Звертаємо вашу увагу, що підтвердження випуску сертифікату можливо
              лище на одну з цих пошт. Переконайтеся в тому що у вас є доступ
              принаймні до однієї з них перед надсиланням запиту.
            </p>
            <Button type="submit" className="w-full sm:w-auto">
              Зберегти зміни
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};
