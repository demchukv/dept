'use client';
import { Button } from '@/components/ui/button';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
import React, { useState } from 'react';
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
import { AddEmployee } from '@/app/components/settings/role/add-employee';

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/utils/icon';

const employeeList = [
  { userId: 1, userName: 'Іванов Іван Іванович', userRoleId: 1 },
  { userId: 2, userName: 'Курбас Іван Леонідович', userRoleId: 2 },
  { userId: 3, userName: 'Петренко Ірина Василівна', userRoleId: 2 },
  { userId: 4, userName: 'Кононов Сергій Сергійович', userRoleId: 3 },
  { userId: 5, userName: 'Жадан Олексій Хомич ', userRoleId: 4 },
  { userId: 6, userName: 'Петров Іван Іванович', userRoleId: 1 },
  { userId: 7, userName: 'Іванов Степан Іванович', userRoleId: 1 },
  { userId: 8, userName: 'Іванов Іван Леонідович', userRoleId: 3 },
  { userId: 9, userName: 'Іванов Іван Леонідович', userRoleId: 4 },
  { userId: 10, userName: 'Іванов Іван Леонідович', userRoleId: 4 },
  { userId: 11, userName: 'Іванов Іван Леонідович', userRoleId: 3 },
  { userId: 12, userName: 'Іванов Іван Леонідович', userRoleId: 2 },
  { userId: 711, userName: 'Іванов Іван Леонідович', userRoleId: 1 },
  ,
] as any[];

const departmentSchema = z.object({
  id: z.number(),
  name: z.string(),
  managerId: z.coerce.number().min(0, 'Виберіть менеджера'),
});
interface DepartmentEitProps {
  id: any;
  department: any;
  className?: string;
}
export const DepartmentEditModal = ({
  id,
  department,
  className,
}: DepartmentEitProps) => {
  const [open, setOpen] = useState(false);
  const [usersForRole, setUsersForRole] = useState<object[]>([]);
  console.log(department);
  console.log(department?.manager?.id || department.id);
  const form = useForm<z.infer<typeof departmentSchema>>({
    resolver: zodResolver(departmentSchema),
    mode: 'all',
    defaultValues: {
      id: id,
      name: department.name,
      managerId: department?.manager?.id || department.id,
    },
  });

  const onSubmit = (data: z.infer<typeof departmentSchema>) => {
    const values = { ...data, roleUsers: usersForRole };
    console.log(values);
  };

  return (
    <>
      <Button
        variant="ghost"
        type="button"
        className="text-main-color"
        onClick={() => setOpen(true)}
      >
        <Icon iconName="EditIcon" width={20} height={20} className="w-5 h-5" />
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader className="mb-6">
                <ModalTitle className="flex items-center justify-center">
                  <div className="text-center">
                    Редагування відділу{'  '}
                    <span className="text-main-color">
                      &nbsp;{department.name}
                    </span>
                  </div>
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
                        Назва відділу:
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Назва відділу" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="managerId"
                  render={({ field }) => (
                    <FormItem className="mb-4 space-y-0">
                      <FormLabel className="text-xs text-gray-dark leading-none">
                        Керівник:
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Оберіть керівника" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {employeeList &&
                            employeeList?.map((item) => (
                              <SelectItem
                                key={item.userId}
                                value={item.userId.toString()}
                              >
                                <span className={cn('font-medium')}>
                                  {item.userName}
                                </span>
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <AddEmployee
                  usersList={employeeList}
                  usersForRole={usersForRole}
                  setUsersForRole={setUsersForRole}
                  from="department"
                />
              </ModalInner>
              <ModalFooter>
                <div className="w-full flex flex-col sm:flex-row-reverse gap-4 sm:justify-between">
                  <div className="w-full flex flex-col sm:justify-end sm:flex-row gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setOpen(false)}
                      className="w-full sm:w-auto"
                    >
                      Відмінити
                    </Button>
                    <Button type="submit" className="w-full sm:w-auto">
                      Зберегти зміни
                    </Button>
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    className="w-full sm:w-auto bg-white text-warning px-0"
                  >
                    <Icon iconName="DeleteCircle" width={20} height={20} />
                    Видалити відділ
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
