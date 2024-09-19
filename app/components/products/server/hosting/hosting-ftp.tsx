'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { ServerType } from '@/types/server';
import { KeyValText } from '@/app/components/common/key-val-text';
import { Separator } from '@/components/ui/separator';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { startTransition, useState } from 'react';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';

const ftpUsers = [
  { id: 1, ftpLogin: 'first_usr', ftpPass: '', readOnly: false },
  { id: 2, ftpLogin: 'second_usr', ftpPass: '', readOnly: true },
];
const newFtpSchema = z.object({
  serverId: z.number().min(1),
  ftpLogin: z.string().min(1),
  ftpPass: z.string().min(1),
  readOnly: z.boolean().optional(),
});
interface HostingFtpProps {
  data: ServerType;
}
export const HostingFtp = ({ data }: HostingFtpProps) => {
  // const currentTariff = hostingTariff.find(
  //   (tariff) => tariff.id === data.tariff,
  // );
  // console.log(currentTariff);

  const form = useForm<z.infer<typeof newFtpSchema>>({
    resolver: zodResolver(newFtpSchema),
    defaultValues: {
      serverId: data.id,
      ftpLogin: '',
      ftpPass: '',
      readOnly: false,
    },
  });

  function onSubmit(data: z.infer<typeof newFtpSchema>) {
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
  }

  function onDelete(data: any) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        action: 'deleteFTPUser',
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
  }
  return (
    <>
      {/* Перший екран */}
      <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
        <div className="w-full sm:w-auto">
          <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-4">
            Доступно користувачів: <span>1/2</span>
          </p>
          <p className="font-semibold mb-2">FTP-користувачі</p>
          <p className="mb-2">
            Наразі тільки у вас є можливість підключення по FTP за вашим логіном
            особистого кабінету
          </p>
          <p className="mb-2">
            Для підключення використовуйте наступні налаштування, наприклад
            FileZilla:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <KeyValText k="host:" val="hosting.dept.com.ua" />
            <KeyValText k="port:" val="21" />
            <KeyValText k="login:" val="**ваш логін**" />
            <KeyValText k="password:" val="**ваш пароль**" />
          </div>
        </div>
        <div className="w-full sm:w-auto text-right">
          <p className="hidden sm:block text-xs text-gray-dark mb-2 whitespace-nowrap">
            Доступно користувачів: 1/2
          </p>
          <Button type="button" className="w-full sm:w-auto">
            Додати <span className="sm:hidden">&nbsp;користувача</span>
            <Icon
              iconName="Plus"
              width={20}
              height={20}
              className="hidden sm:inline"
            />
          </Button>
        </div>
      </div>

      <Separator className="my-6" />
      {/* Другий екран */}
      <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col sm:flex-row items-end justify-between gap-4"
          >
            <div className="w-full sm:w-auto">
              <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-4">
                Доступно користувачів: <span>1/2</span>
              </p>
              <p className="font-semibold mb-2">FTP-користувачі</p>
              <div className="mb-2 flex flex-col sm:flex-row sm:gap-4">
                <FormField
                  control={form.control}
                  name="ftpLogin"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Створіть логін"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="ftpPass"
                  render={({ field }) => (
                    <FormItem className="mb-2">
                      <FormControl>
                        <Input
                          {...field}
                          type="password"
                          placeholder="Створіть пароль"
                          className="w-full"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="readOnly"
                  render={({ field }) => (
                    <FormItem className="mb-2 flex items-center space-y-0 gap-2 ">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel>Тільки для читання</FormLabel>
                    </FormItem>
                  )}
                />
              </div>
              <p className="mb-2">
                Для підключення використовуйте наступні налаштування, наприклад
                FileZilla:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2 sm:mb-0">
                <KeyValText k="host:" val="hosting.dept.com.ua" />
                <KeyValText k="port:" val="21" />
                <KeyValText k="login:" val="**ваш логін**" />
                <KeyValText k="password:" val="**ваш пароль**" />
              </div>
            </div>
            <div className="w-full sm:w-auto text-right">
              <p className="hidden sm:block text-xs text-gray-dark mb-2 whitespace-nowrap">
                Доступно користувачів: 1/2
              </p>
              <Button type="submit" className="w-full sm:w-auto">
                Додати <span className="sm:hidden">&nbsp;користувача</span>
                <Icon
                  iconName="Plus"
                  width={20}
                  height={20}
                  className="hidden sm:inline"
                />
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <Separator className="my-6" />
      {/* Третій екран */}
      <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
        <div className="w-full sm:w-auto">
          <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-4">
            Доступно користувачів: <span>1/2</span>
          </p>
          <p className="font-semibold mb-2">FTP-користувачі</p>
          <div className="mb-2">
            <ul className="flex flex-col gap-2">
              {ftpUsers.map((user) => (
                <li
                  key={user.id}
                  className="flex items-center justify-between gap-4"
                >
                  <span className="flex-grow font-medium text-base">
                    {user.ftpLogin}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-main-color flex-shrink-0"
                  >
                    <Icon iconName="EditIcon" width={24} height={24} />
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-warning flex-shrink-0"
                    onClick={() => onDelete(user)}
                  >
                    <Icon iconName="Trash" width={24} height={24} />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
          <p className="mb-2">
            Для підключення використовуйте наступні налаштування, наприклад
            FileZilla:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <KeyValText k="host:" val="hosting.dept.com.ua" />
            <KeyValText k="port:" val="21" />
            <KeyValText k="login:" val="**ваш логін**" />
            <KeyValText k="password:" val="**ваш пароль**" />
          </div>
        </div>
        <div className="w-full sm:w-auto text-right">
          <p className="hidden sm:block text-xs text-gray-dark mb-2">
            Доступно користувачів: 1/2
          </p>
          <Button
            type="button"
            className="w-full sm:w-auto whitespace-nowrap"
            disabled
          >
            Додати <span className="sm:hidden">&nbsp;користувача</span>
            <Icon
              iconName="Plus"
              width={20}
              height={20}
              className="hidden sm:inline"
            />
          </Button>
        </div>
      </div>
    </>
  );
};
