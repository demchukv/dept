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
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { AddEmployee } from '@/app/components/settings/role/add-employee';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const roleSchema = z.object({
  roleName: z.string().min(1, 'Вкажіть назву ролі'),
  roleUsers: z
    .array(
      z.object({
        userId: z.string().optional(),
      }),
    )
    .optional(),
});

export const NewRole = () => {
  const [open, setOpen] = useState(false);
  const [usersForRole, setUsersForRole] = useState<object[]>([]);

  const form = useForm<z.infer<typeof roleSchema>>({
    resolver: zodResolver(roleSchema),
    mode: 'all',
    defaultValues: {
      roleName: '',
      roleUsers: [],
    },
  });

  const onSubmit = (data: z.infer<typeof roleSchema>) => {
    const values = { ...data, roleUsers: usersForRole };
    console.log(values);
  };
  return (
    <>
      <Button
        type="button"
        variant="outline"
        className="border-0 hover:shadow-none px-0 py-0"
        onClick={() => setOpen(true)}
      >
        Створити нову роль <Icon iconName="Plus" width={20} height={20} />
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent className="sm:max-w-[834px] md:max-w-[834px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader className="mb-6">
                <ModalTitle>Створити нову роль</ModalTitle>
                <ModalDescription className="hidden"></ModalDescription>
              </ModalHeader>
              <ModalInner>
                <FormField
                  control={form.control}
                  name="roleName"
                  render={({ field }) => (
                    <FormItem className="mb-4 space-y-0">
                      <FormLabel className="text-xs text-gray-dark leading-none">
                        Назва ролі
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Вкажіть назву ролі" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <AddEmployee
                  usersForRole={usersForRole}
                  setUsersForRole={setUsersForRole}
                />
              </ModalInner>
              <ModalFooter>
                <div className="w-full flex flex-col sm:flex-row-reverse gap-3">
                  <Button type="submit" variant="default">
                    Створити роль
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
