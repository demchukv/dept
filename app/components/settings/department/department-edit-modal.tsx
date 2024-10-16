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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

import { cn } from '@/lib/utils';
import { Info } from '@/app/components/common/info';

const transEmail = ['first@mail.com', 'second@mail.com'];
const employeeDeleteSchema = z.object({
  id: z.number(),
  deleteOption: z.string(),
  email: z.string(),
  opt1: z.boolean(),
  opt2: z.boolean(),
  opt3: z.boolean(),
});

interface EmployeeDeleteProps {
  id: any;
  className?: string;
}
export const DepartmentEditModal = ({ id, className }: EmployeeDeleteProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof employeeDeleteSchema>>({
    resolver: zodResolver(employeeDeleteSchema),
    mode: 'all',
    defaultValues: {
      id: id,
      deleteOption: '', // all, transfer
      email: '',
      opt1: false,
      opt2: false,
      opt3: false,
    },
  });
  const { watch } = form;
  const watchDeleteOption = watch('deleteOption');

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
        <Icon iconName="EditIcon" width={20} height={20} className="w-5 h-5" />
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent className="sm:max-w-[473px] md:max-w-[473px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader className="mb-6">
                <ModalTitle className="flex items-center justify-between">
                  <div>Редагування відділу</div>
                </ModalTitle>
                <ModalDescription className="hidden"></ModalDescription>
              </ModalHeader>
              <ModalInner>
                <FormField
                  control={form.control}
                  name="deleteOption"
                  render={({ field }) => (
                    <FormItem className="mb-4">
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-start space-x-3 space-y-0 mb-8">
                            <FormControl>
                              <RadioGroupItem value="all" />
                            </FormControl>
                            <FormLabel className="font-normal pt-0.5">
                              Видалити листи та дані поточного акаунту
                              <Info>
                                Всі дані акаунту будуть втрачені без можливості
                                відновлення
                              </Info>
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="transfer" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Передати листи та дані поточного акаунту
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="ml-8">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="mb-4 space-y-0">
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value.toString()}
                          disabled={watchDeleteOption !== 'transfer'}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Обрати акаунт для передачі" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {transEmail.map((item) => (
                              <SelectItem key={item} value={item}>
                                <span className={cn('font-medium')}>
                                  {item}
                                </span>
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="opt1"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={watchDeleteOption !== 'transfer'}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Призначити акаунту отримувача всі аліаси, що є у
                            поточного користувача
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="opt2"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={watchDeleteOption !== 'transfer'}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Зробити електронну адресу користувача аліасом в
                            отримувача даних
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="opt3"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center space-x-3 space-y-0 mb-5">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={watchDeleteOption !== 'transfer'}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Додати отримувача в групи, де був присутній
                            користувач, що видаляється
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </ModalInner>
              <ModalFooter>
                <div className="w-full flex flex-col sm:justify-between sm:flex-row gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="w-full"
                  >
                    Відмінити
                  </Button>
                  <Button
                    type="submit"
                    variant="destructive"
                    className="w-full bg-warning text-white"
                  >
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
