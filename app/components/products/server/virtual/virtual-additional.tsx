'use client';
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
  FormMessage,
} from '@/components/ui/form';
import { Modal, ModalContent } from '@/app/components/common/modal-new';
import { startTransition, useState } from 'react';
import { ServerType } from '@/types/server';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/components/utils/icon';
import { VirtualAdditionalForm } from '@/app/components/products/server/virtual/virtual-additional-form';

const mainIP = '192.168.0.1';
const ipList = [
  { key: 1, value: '192.168.0.2' },
  { key: 2, value: '192.168.0.3' },
];

const additionalSchema = z.object({
  ip: z.string().min(1),
  storage: z.string().min(1),
});

const ipsList = [
  { key: 1, value: '1 адреса - 99 грн/міс' },
  { key: 2, value: 'Підмережа 4 адреси - 150 грн/міс ' },
  { key: 3, value: 'Підмережа 8 адрес - 200 грн/міс' },
];
const storageList = [
  { key: 1, value: '1 Tb - 99 грн/міс' },
  { key: 2, value: '5 Tb - 150 грн/міс' },
  { key: 3, value: '10 Tb - 200 грн/міс' },
];
interface VirtualAdditionalProps {
  data: ServerType;
}
export const VirtualAdditional = ({ data }: VirtualAdditionalProps) => {
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const form = useForm<z.infer<typeof additionalSchema>>({
    resolver: zodResolver(additionalSchema),
    mode: 'onChange',
    defaultValues: {
      ip: '',
      storage: '',
    },
  });

  function onSubmit(val: z.infer<typeof additionalSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...val,
        serverId: data.id,
        action: 'additionalFutures',
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
  function removeIP(val: number) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ipID: val,
        serverId: data.id,
        action: 'deleteAdditionalIP',
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
      <div className="flex flex-col gap-3 sm:hidden">
        <div className="flex flex-row justify-between">
          <div>IP-адреса:</div>
          <div className="text-right pr-9">{mainIP}</div>
        </div>
        {ipList.map((item) => (
          <div
            key={item.key}
            className="flex flex-row justify-between items-center"
          >
            <div>IP-адреса:</div>
            <div className="flex items-center gap-3 text-right">
              {item.value}
              <Button
                type="button"
                variant="ghost"
                className="text-main-color"
                onClick={() => removeIP(item.key)}
              >
                <Icon iconName="Close" width={24} height={24} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden sm:flex flex-start items-center">
        IP-адреси: {mainIP}
        {ipList.map((item) => (
          <React.Fragment key={item.key}>
            <span className="flex-inline w-2 h-2 rounded-full bg-gray-medium ml-3"></span>
            <span className="flex-inline flex-row items-center ml-3">
              <span className="flex items-center gap-2 text-right">
                {item.value}
                <Button
                  type="button"
                  variant="ghost"
                  className="text-gray-dark"
                  onClick={() => removeIP(item.key)}
                >
                  <Icon iconName="DeleteCircle" width={20} height={20} />
                </Button>
              </span>
            </span>
          </React.Fragment>
        ))}
      </div>

      <Separator className="my-4" />

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6"
        >
          <FormField
            control={form.control}
            name="ip"
            render={({ field }) => (
              <FormItem className="space-y-4 mt-1 mb-4">
                <FormLabel className="text-base font-semibold">
                  Замовити додаткові IP
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value as any}
                    className="flex flex-col gap-5"
                  >
                    {ipsList.map((item) => (
                      <React.Fragment key={item.key}>
                        <FormItem className="flex items-center gap-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={String(item.key)} />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent flex justify-between items-center border-0">
                            <p className="font-normal text-sm leading-main-lh text-main-dark">
                              {item.value.toString()}
                            </p>
                          </FormLabel>
                        </FormItem>
                      </React.Fragment>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="storage"
            render={({ field }) => (
              <FormItem className="space-y-4 mt-1 mb-4">
                <FormLabel className="text-base font-semibold">
                  Замовити додаткове сховище
                </FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value as any}
                    className="flex flex-col gap-5"
                  >
                    {storageList.map((item) => (
                      <React.Fragment key={item.key}>
                        <FormItem className="flex items-center gap-x-2 space-y-0">
                          <FormControl>
                            <RadioGroupItem value={String(item.key)} />
                          </FormControl>
                          <FormLabel className="w-full bg-transparent flex justify-between items-center border-0">
                            <p className="font-normal text-sm leading-main-lh text-main-dark">
                              {item.value.toString()}
                            </p>
                          </FormLabel>
                        </FormItem>
                      </React.Fragment>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-4 self-end md:flex-row-reverse md:gap-6">
            <Button type="submit" className="py-2.5 w-full sm:w-auto">
              Підтвердити замовлення
            </Button>
            <Button
              type="button"
              variant="ghost"
              className="py-2.5 w-full sm:w-auto text-main-color"
              onClick={() => setOpen(true)}
            >
              Допомога спеціаліста
            </Button>
          </div>
        </form>
      </Form>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6 max-w-[420px]">
          <VirtualAdditionalForm onClose={onClose} data={data} />
        </ModalContent>
      </Modal>
    </>
  );
};
