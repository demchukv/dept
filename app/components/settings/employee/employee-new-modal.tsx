'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
import React, { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { roleList } from '@/app/components/settings/employee/employee';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { getAllFlags } from '@/action/get-flags';
import { FlagType } from '@/types/call';
import { Loading } from '../../common/loading';
import { FlagList } from '@/app/components/settings/employee/flag-list';

const newEmployeeSchema = z.object({
  name: z.string().min(1, "Вкажіть ім'я співробітника"),
  role: z.string(),
  iso2: z.string(),
  phone: z.string().min(1, 'Вкажіть телефон співробітника'),
  emailType: z.string(), // exists, fromlist, new
  newEmail: z.string().optional(),
  fromList: z.string().optional(),
});

const corporateEmails = ['admin@localhost.com', 'admin@localhost.ua'];

interface EmployeeNewProps {
  className?: string;
}
export const EmployeeNewModal = ({ className }: EmployeeNewProps) => {
  const [isPending, startTransition] = useTransition();
  const [flags, setFlags] = useState<FlagType[]>([]);
  const [phoneCode, setPhoneCode] = useState<string>('380');

  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>('');
  const router = useRouter();

  const form = useForm<z.infer<typeof newEmployeeSchema>>({
    resolver: zodResolver(newEmployeeSchema),
    mode: 'all',
    defaultValues: {
      name: '',
      role: '',
      iso2: 'UA',
      phone: '',
      emailType: 'exists',
      newEmail: '',
      fromList: '',
    },
  });
  const { watch } = form;
  const watchEmailType = watch('emailType');
  const watchRole = watch('role');

  const onSubmit = (data: z.infer<typeof newEmployeeSchema>) => {
    const values = { ...data };
    console.log(values);
  };

  const getFlags = async () => {
    startTransition(async () => {
      const data = await getAllFlags();
      setFlags(data);
    });
  };

  useEffect(() => {
    getFlags();
  }, []);

  useEffect(() => {
    if (watchRole?.toString() !== 'roles') {
      setUserRole(watchRole.toString());
      return;
    }
    form.setValue('role', userRole);
    router.push('/role');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watchRole]);

  return (
    <>
      <Button type="button" className={className} onClick={() => setOpen(true)}>
        Новий співробітник
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent className="sm:max-w-[532px] md:max-w-[532px]">
          {isPending && <Loading />}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader className="mb-6">
                <ModalTitle className="flex items-center justify-center">
                  Новий співробітник
                </ModalTitle>
                <ModalDescription className="hidden"></ModalDescription>
              </ModalHeader>
              <ModalInner>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="mb-4 space-y-0">
                      <FormLabel className="text-xs text-gray-dark leading-none">
                        ПІБ:
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="ПІБ" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem className="mb-4 space-y-0">
                      <FormLabel className="text-xs text-gray-dark leading-none">
                        Телефон:
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            +{phoneCode}
                          </span>
                          <Input
                            placeholder="(00) 000-00-00"
                            {...field}
                            className="pl-16 pr-16"
                            inputMode="tel"
                          />
                          <div className="absolute top-1/2 -translate-y-1/2 right-2">
                            {flags && flags.length > 0 && !isPending && (
                              <FlagList
                                flags={flags}
                                currentValue={phoneCode}
                                onChange={setPhoneCode}
                              />
                            )}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="role"
                  render={({ field }) => (
                    <FormItem className="mb-4 space-y-0">
                      <FormLabel className="text-xs text-gray-dark leading-none">
                        Роль співробітника:
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Виберіть роль співробітника" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {roleList.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              <span
                                className={cn(
                                  'font-medium',
                                  item.id === 1 &&
                                    'text-green-additional-color',
                                  item.id === 2 && 'text-blue-additional-color',
                                  item.id === 3 &&
                                    'text-orange-additional-color',
                                  item.id === 4 && 'text-warning',
                                )}
                              >
                                {item.label}
                              </span>
                            </SelectItem>
                          ))}
                          <SelectItem
                            key="roles"
                            id="roles"
                            value="roles"
                            className="bg-bg-color hover:cursor-pointer"
                          >
                            <Link href="/settings/roles">
                              <span className="flex gap-2 items-center">
                                <Icon
                                  iconName="SettingAlert"
                                  width={24}
                                  height={24}
                                />
                                Керування ролями
                              </span>
                            </Link>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailType"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormLabel className="text-xs text-gray-dark leading-none">
                        E-mail:
                      </FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="exists" />
                            </FormControl>
                            <FormLabel className="font-normal pt-0.5">
                              Використати існуючу адресу
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="fromlist" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Обрати зі списку корпоративних
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="new" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Створити нову корпоративну пошту
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newEmail"
                  render={({ field }) => (
                    <FormItem
                      className={cn(
                        'mb-4 space-y-0',
                        watchEmailType === 'exists' ? 'block' : 'hidden',
                      )}
                    >
                      <FormControl>
                        <Input
                          placeholder="Введіть електронну адресу"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="fromList"
                  render={({ field }) => (
                    <FormItem
                      className={cn(
                        'mb-4 space-y-0',
                        watchEmailType === 'fromlist' ? 'block' : 'hidden',
                      )}
                    >
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field?.value ?? ''}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Виберіть електронну пошту" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {corporateEmails.map((item) => (
                            <SelectItem key={item} value={item}>
                              {item}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ModalInner>
              <ModalFooter>
                <div className="w-full flex flex-col sm:flex-row-reverse gap-3">
                  <Button type="submit" variant="default">
                    Зберегти
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                  >
                    Відмінити
                  </Button>
                </div>
              </ModalFooter>
            </form>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
