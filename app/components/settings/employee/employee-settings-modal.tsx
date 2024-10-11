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
import React, { useEffect, useState } from 'react';
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
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Info } from '@/app/components/common/info';
import { roleList } from '@/app/components/settings/employee/employee';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const employeeSchema = z.object({
  id: z.number(),
  name: z.string().min(1, "Вкажіть ім'я співробітника"),
  role: z.string(),
  phone: z.string().min(1, 'Вкажіть телефон співробітника'),
  email: z.string().min(1, 'Вкажіть e-mail співробітника'),
  restrict: z.boolean().default(false),
});

interface EmployeeSettingsProps {
  data: any;
  className?: string;
}
export const EmployeeSettingsModal = ({
  data,
  className,
}: EmployeeSettingsProps) => {
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState<string>(data.role);
  const router = useRouter();

  const form = useForm<z.infer<typeof employeeSchema>>({
    resolver: zodResolver(employeeSchema),
    mode: 'all',
    defaultValues: {
      id: data.id,
      name: data.name,
      role: data.role,
      phone: data.phone,
      email: data.email,
      restrict: false,
    },
  });
  const { watch } = form;
  const watchRole = watch('role');

  const onSubmit = (data: z.infer<typeof employeeSchema>) => {
    const values = { ...data };
    console.log(values);
  };

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
      <Button
        type="button"
        variant="outline"
        className={cn('border-0 hover:shadow-none px-0 py-0', className)}
        onClick={() => setOpen(true)}
      >
        <Icon iconName="SettingAlert" width={24} height={24} />
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent className="sm:max-w-[834px] md:max-w-[834px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader className="mb-6">
                <ModalTitle className="flex items-center justify-between">
                  <div>
                    Налаштування{' '}
                    <span className="sm:hidden">співробітника</span>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    className="hidden sm:flex hover:shadow-none text-warning hover:text-main-dark gap-2 py-2.5 text-base"
                  >
                    <Icon iconName="Trash" width={24} height={24} />
                    Видалити співробітника
                  </Button>
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
                        <Input placeholder="Телефон" {...field} />
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
                      <FormLabel>Роль співробітника:</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
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
                  name="email"
                  render={({ field }) => (
                    <FormItem className="mb-4 space-y-0">
                      <FormLabel className="text-xs text-gray-dark leading-none">
                        Email:
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="restrict"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-5">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Обмежити доступ</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <Info>
                  Звертаємо увагу: обмеження доступу співробітника буде
                  застосовано для всіх продуктів співробітника, в тому числі і
                  до корпоративної пошти.
                </Info>
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
                  <Button
                    type="button"
                    variant="ghost"
                    className="sm:hidden hover:shadow-none text-warning hover:text-main-dark gap-2 py-2.5"
                  >
                    <Icon iconName="DeleteCircle" width={20} height={20} />
                    Видалити співробітника
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
