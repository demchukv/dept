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
    },
  });

  const onSubmit = (data: z.infer<typeof newCertSchema>) => {
    console.log(data);
  };

  return (
    <>
      <h2 className="font-semibold text-base leading-normal text-main-dark">
        Згенерувати новий CSR
      </h2>
      <Separator className="my-4" />
      <h2 className="font-semibold text-base leading-normal text-main-dark mb-2">
        Технічні дані
      </h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
              <FormItem>
                <FormLabel>E-mail власника:</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
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
          <p>
            Звертаємо вашу увагу, що підтвердження випуску сертифікату можливо
            лище на одну з цих пошт. Переконайтеся в тому що у вас є доступ
            принаймні до однієї з них перед надсиланням запиту.
          </p>
          <div className="flex items-center justify-between">
            <p className="font-semibold text-base leading-normal text-main-dark mb-2">
              Адмін
            </p>
            <Button type="button" variant="ghost" className="text-main-color">
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
          <Separator className="my-4" />
          <div className="pb-2">
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
            <ScrollArea className="resize-y h-20 border border-gray-light bg-bg-color rounded px-[18px] pr-[23px] py-2.5">
              {data.csr}
              <ScrollBar orientation="vertical" />
            </ScrollArea>
          </div>
          <p className="text-xs text-gray-dark pb-4">
            *Після перевипуску приватний ключ не змінюється
          </p>
          <Button type="submit" className="w-full sm:w-auto">
            Зберегти зміни
          </Button>
        </form>
      </Form>
    </>
  );
};
