'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { ServerType } from '@/types/server';
import { KeyValText } from '@/app/components/common/key-val-text';
import { Input } from '@/components/ui/input';
import { startTransition, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { Separator } from '@/components/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-server';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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

const dbUsers = [{ id: 1, dbLogin: 'user_one' }];
const dbList = [{ id: 1, dbName: 'mydb' }];
interface HostingDatabasesProps {
  data: ServerType;
}

const newDbUserSchema = z.object({
  serverId: z.number().min(1),
  dbLogin: z.string().min(1),
  dbPass: z.string().min(1),
  db: z.string().min(1),
});
export const HostingDatabases = ({ data }: HostingDatabasesProps) => {
  const [newDB, setNewDB] = useState('');

  const form = useForm<z.infer<typeof newDbUserSchema>>({
    resolver: zodResolver(newDbUserSchema),
    defaultValues: {
      serverId: data.id,
      dbLogin: '',
      dbPass: '',
      db: '',
    },
  });

  // const currentTariff = hostingTariff.find(
  //   (tariff) => tariff.id === data.tariff,
  // );
  // console.log(currentTariff);
  function onSubmit(data: z.infer<typeof newDbUserSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        action: 'createNewDbUser',
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

  const onSaveNewDB = () => {
    if (newDB.trim() === '') return;
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        serverId: data.id,
        newDB: newDB.trim(),
        action: 'createNewDB',
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

  const onDeleteDb = (data: any) => {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        serverId: data.id,
        action: 'deleteDB',
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

  const onDeleteUserDb = (data: any) => {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        serverId: data.id,
        action: 'deleteUserDB',
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
      <Tabs defaultValue="dbs" className="sm:-[-32px] md:mt-[-68px]">
        <TabsList className="grid w-full grid-cols-2 mb-2 sm:flex sm:justify-end">
          <TabsTrigger
            value="dbs"
            className="bg-transparent text-main-dark data-[state=active]:bg-transparent data-[state=active]:text-main-color text-sm"
          >
            Ваші бази даних
          </TabsTrigger>
          <TabsTrigger
            value="dbu"
            className="bg-transparent text-main-dark data-[state=active]:bg-transparent data-[state=active]:text-main-color text-sm"
          >
            Користувачі БД
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dbs">
          {/* Перший екран */}
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
            <div className="w-full sm:w-auto">
              <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-2">
                Доступно БД: <span>2/2</span>
              </p>
              <p className="mb-2">
                Наразі у вас немає створених баз даних до послуги хостингу
              </p>
              <p className="mb-2">
                Для підключення використовуйте наступні налаштування:
              </p>
              <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                <p className="font-medium">
                  https://hosting.dept.com.ua/phpmyadmin
                </p>

                <KeyValText
                  k="login:"
                  val={<span className="font-medium">**ваш логін**</span>}
                />
                <KeyValText
                  k="password:"
                  val={<span className="font-medium">**ваш пароль**</span>}
                />
              </div>
            </div>
            <div className="text-right w-full sm:w-auto">
              <p className="hidden sm:block text-xs text-gray-dark mb-2">
                Доступно БД: 2/2
              </p>
              <Button type="button" className="w-full sm:w-auto">
                Додати<span className="sm:hidden">&nbsp;базу даних</span>
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
            <div className="w-full sm:w-auto">
              <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-2">
                Доступно БД: <span>2/2</span>
              </p>
              <div className="mb-2">
                <Input
                  type="text"
                  placeholder="Введіть назву бази даних"
                  value={newDB}
                  onChange={(e) => setNewDB(e.target.value)}
                />
                <p className="text-xs text-gray-dark mt-2">*Приклад “mybd”</p>
              </div>
              <p className="mb-2">
                Для підключення використовуйте наступні налаштування:
              </p>
              <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                <p className="font-medium">
                  https://hosting.dept.com.ua/phpmyadmin
                </p>
                <KeyValText
                  k="login:"
                  val={<span className="font-medium">**ваш логін**</span>}
                />
                <KeyValText
                  k="password:"
                  val={<span className="font-medium">**ваш пароль**</span>}
                />
              </div>
            </div>
            <div className="text-right w-full sm:w-auto">
              <p className="hidden sm:block text-xs text-gray-dark mb-2">
                Доступно БД: 2/2
              </p>
              <Button
                type="button"
                className="w-full sm:w-auto"
                onClick={() => {
                  onSaveNewDB();
                }}
              >
                Зберегти
              </Button>
            </div>
          </div>

          <Separator className="my-6" />
          {/* Третій екран */}
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
            <div className="w-full sm:w-auto">
              <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-2">
                Доступно БД: <span>2/2</span>
              </p>
              <div className="mb-2">
                <ul>
                  {dbList.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 hover:bg-bg-color"
                    >
                      <span className="flex-grow font-medium text-base">
                        {item.dbName}
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
                        onClick={() => onDeleteDb(item)}
                      >
                        <Icon iconName="Trash" width={24} height={24} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mb-2">
                Для підключення використовуйте наступні налаштування:
              </p>
              <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                <p className="font-medium">
                  https://hosting.dept.com.ua/phpmyadmin
                </p>
                <KeyValText
                  k="login:"
                  val={<span className="font-medium">**ваш логін**</span>}
                />
                <KeyValText
                  k="password:"
                  val={<span className="font-medium">**ваш пароль**</span>}
                />
              </div>
            </div>
            <div className="text-right w-full sm:w-auto">
              <p className="hidden sm:block text-xs text-gray-dark mb-2">
                Доступно БД: 2/2
              </p>
              <Button type="button" className="w-full sm:w-auto">
                Додати<span className="sm:hidden">&nbsp;базу даних</span>
                <Icon
                  iconName="Plus"
                  width={20}
                  height={20}
                  className="hidden sm:inline"
                />
              </Button>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="dbu">
          {/* Перший екран */}
          <div className="flex flex-col sm:flex-row items-end justify-between gap-4">
            <div className="w-full sm:w-auto">
              <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-2">
                Доступно БД: <span>2/2</span>
              </p>
              <p className="mb-2">
                Наразі у вас немає створених користувачів баз даних
              </p>
              <p className="mb-2">
                Для підключення використовуйте наступні налаштування:
              </p>
              <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                <p className="font-medium">
                  https://hosting.dept.com.ua/phpmyadmin
                </p>

                <KeyValText
                  k="login:"
                  val={<span className="font-medium">**ваш логін**</span>}
                />
                <KeyValText
                  k="password:"
                  val={<span className="font-medium">**ваш пароль**</span>}
                />
              </div>
            </div>
            <div className="text-right w-full sm:w-auto">
              <p className="hidden sm:block text-xs text-gray-dark mb-2">
                Доступно БД: 2/2
              </p>
              <Button type="button" className="w-full sm:w-auto">
                Додати<span className="sm:hidden">&nbsp;базу даних</span>
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
                className="w-full flex flex-col sm:flex-row items-end justify-between gap-4"
              >
                <div className="w-full sm:w-auto flex-grow">
                  <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-4">
                    Доступно користувачів: <span>1/2</span>
                  </p>
                  <div className="mb-2 flex flex-col sm:flex-row sm:gap-4">
                    <FormField
                      control={form.control}
                      name="dbLogin"
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
                      name="dbPass"
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
                      name="db"
                      render={({ field }) => (
                        <FormItem className="w-full flex items-center gap-2 space-y-0 mb-2">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormLabel className="whitespace-nowrap">
                              Прив&#39;язка до БД
                            </FormLabel>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {dbList.map((db) => (
                                <SelectItem
                                  key={db.id}
                                  value={db.id.toString()}
                                >
                                  {db.dbName}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <p className="mb-2">
                    Для підключення використовуйте наступні налаштування,
                    наприклад FileZilla:
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
              <p className="flex justify-between sm:hidden text-xs text-gray-dark mb-2">
                Доступно БД: <span>2/2</span>
              </p>
              <div className="mb-2">
                <ul>
                  {dbUsers.map((item) => (
                    <li
                      key={item.id}
                      className="flex items-center justify-between gap-4 hover:bg-bg-color"
                    >
                      <span className="flex-grow font-medium text-base">
                        {item.dbLogin}
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
                        onClick={() => onDeleteUserDb(item)}
                      >
                        <Icon iconName="Trash" width={24} height={24} />
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
              <p className="mb-2">
                Для підключення використовуйте наступні налаштування:
              </p>
              <div className="flex flex-col md:flex-row gap-2 md:gap-6">
                <p className="font-medium">
                  https://hosting.dept.com.ua/phpmyadmin
                </p>
                <KeyValText
                  k="login:"
                  val={<span className="font-medium">**ваш логін**</span>}
                />
                <KeyValText
                  k="password:"
                  val={<span className="font-medium">**ваш пароль**</span>}
                />
              </div>
            </div>
            <div className="text-right w-full sm:w-auto">
              <p className="hidden sm:block text-xs text-gray-dark mb-2">
                Доступно БД: 2/2
              </p>
              <Button type="button" className="w-full sm:w-auto">
                Додати<span className="sm:hidden">&nbsp;базу даних</span>
                <Icon
                  iconName="Plus"
                  width={20}
                  height={20}
                  className="hidden sm:inline"
                />
              </Button>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
};
