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

import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';

const transEmail = ['first@mail.com', 'second@mail.com'];

const employeeList = [
  { id: 2, name: 'Коливан Данило Петрович', avatar: '' },
  { id: 3, name: 'Хміль Пилип Олегович', avatar: '' },
  { id: 5, name: 'Рясна Олена Сергіївна', avatar: '' },
  { id: 6, name: 'Звір Кирило Петрович', avatar: '' },
];

const employeeDeleteSchema = z.object({
  parentId: z.number(),
  name: z.string(),
  managerId: z.coerce.number().min(0, 'Виберіть менеджера'),
});

interface EmployeeDeleteProps {
  parentId: any;
  parentDepartment: any;
  className?: string;
}
export const DepartmentAddModal = ({
  parentId,
  parentDepartment,
  className,
}: EmployeeDeleteProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof employeeDeleteSchema>>({
    resolver: zodResolver(employeeDeleteSchema),
    mode: 'all',
    defaultValues: {
      parentId: parentId,
      name: '',
      managerId: 0,
    },
  });

  const onSubmit = (data: z.infer<typeof employeeDeleteSchema>) => {
    const values = { ...data };
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
        <Icon iconName="Plus" width={20} height={20} className="w-5 h-5" />
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent className="sm:max-w-[473px] md:max-w-[473px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader className="mb-6">
                <ModalTitle className="flex items-center justify-center">
                  <div className="text-center">
                    Додати дочірній підрозділ{' '}
                    <span className="text-main-color">
                      &nbsp;{parentDepartment.name}
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
                          {employeeList.map((item) => (
                            <SelectItem
                              key={item.id}
                              value={item.id.toString()}
                            >
                              <span className={cn('font-medium')}>
                                {item.name}
                              </span>
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
                <div className="w-full flex flex-col sm:justify-end sm:flex-row gap-3">
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
              </ModalFooter>
            </form>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
