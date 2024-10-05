'use client';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import Image from 'next/image';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
import React, { Suspense, useState } from 'react';
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
import { Input } from '@/components/ui/input';
import ReactPlayer from 'react-player/lazy';

const integrationSchema = z.object({
  id: z.number(),
  apiKey: z.string().min(1, 'Вкажіть API ключ'),
  href: z.string().min(1, 'Вкажіть ендпойнт'),
});
interface IntegrationItemProps {
  item: any;
}
export const IntegrationItem = ({ item }: IntegrationItemProps) => {
  const [open, setOpen] = useState(false);
  const form = useForm<z.infer<typeof integrationSchema>>({
    resolver: zodResolver(integrationSchema),
    mode: 'all',
    defaultValues: {
      id: item.id,
      apiKey: item.data.apiKey,
      href: item.data.href,
    },
  });

  const onSubmit = (data: z.infer<typeof integrationSchema>) => {
    const values = { ...data };
    console.log(values);
  };

  const deleteIntegration = (id: number) => {
    console.log('delete integration with ID: ', id);
  };
  return (
    <>
      <Button
        type="button"
        variant="ghost"
        className="border border-gray-light rounded p-2 items-center relative"
        onClick={() => setOpen(true)}
      >
        <Image
          src={`/img/logos/${item.logo}`}
          width={100}
          height={57}
          alt={item.name}
          style={{ width: '100px', height: 'auto' }}
        />
        {item.state === 'active' && (
          <>
            <span className="border-l border-gray-medium ml-2 pl-2 pr-5 h-full flex items-center">
              <Icon
                iconName="EditIcon"
                width={20}
                height={20}
                className="fill-gray-medium"
              />
            </span>
            <span className="mr-[-24px] flex items-center justify-center bg-green-additional-color w-8 h-8 rounded-full">
              <Icon
                iconName="CheckIcon"
                width={24}
                height={24}
                className="fill-white"
              />
            </span>
          </>
        )}
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent className="sm:max-w-[566px] md:max-w-[566px]">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <ModalHeader className="mb-6">
                <ModalTitle className="text-center">
                  Підключення{' '}
                  <span className="text-main-color">{item.name}</span>
                </ModalTitle>
                <ModalDescription className="hidden"></ModalDescription>
              </ModalHeader>
              <ModalInner>
                <p className="mb-3">Інструкція з підключення</p>
                <div className="player-wrapper mb-4">
                  <ReactPlayer
                    className="react-player aspect-video "
                    url={item.instruction}
                    width="100%"
                    height="100%"
                  />
                </div>

                <FormField
                  control={form.control}
                  name="apiKey"
                  render={({ field }) => (
                    <FormItem className="mb-4 space-y-0">
                      <FormLabel className="text-xs text-gray-dark leading-none">
                        Ваш API ключ
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Вставте ключ сюди" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="href"
                  render={({ field }) => (
                    <FormItem className="mb-4 space-y-0">
                      <FormLabel className="text-xs text-gray-dark leading-none">
                        Система
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="Вставте адресу" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </ModalInner>
              <ModalFooter className="flex-col gap-4">
                <div className="w-full flex flex-col sm:flex-row-reverse sm:justify-between gap-3">
                  <Button type="submit" variant="default" className="w-full">
                    Зберегти
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setOpen(false)}
                    className="w-full"
                  >
                    Відмінити
                  </Button>
                </div>
                {item.state === 'active' && (
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => deleteIntegration(item.id)}
                    className="text-warning hover:text-main-dark gap-2 py-2 w-full font-semibold text-sm"
                  >
                    <Icon iconName="DeleteCircle" width={20} height={20} />
                    Видалити інтеграцію
                  </Button>
                )}
              </ModalFooter>
            </form>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
