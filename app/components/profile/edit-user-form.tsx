import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';
import { KeyValText } from '../common/key-val-text';
import { Icon } from '@/components/utils/icon';
import { Button } from '@/components/ui/button';
import React from 'react';

interface EditUserFormProps {
  addrData: {
    billing: {
      addr: string;
      id: number;
    }[];
    delivery: {
      addr: string;
      id: number;
    }[];
    recipients: {
      name: string;
      id: number;
    }[];
  };
  userData: {
    name: string;
    email: string;
    phone: string;
    id: number;
  };
}

const userEditShema = z.object({
  userData: z.object({
    name: z.string().min(1, "Вкажіть ваше прізвище, ім'я, по-батькові"),
    email: z.string().min(1, 'Вкажіть вашу електронну адресу'),
    phone: z.string().min(1, 'Вкажіть ваш номер телефону'),
  }),
  addrData: z.object({
    billing: z
      .array(
        z.object({
          addr: z.string().min(1, 'Вкажіть адресу доставки'),
          id: z.number(),
        }),
      )
      .optional(),
    delivery: z
      .array(
        z.object({
          addr: z.string().min(1, 'Вкажіть адресу доставки'),
          id: z.number(),
        }),
      )
      .optional(),
    recipients: z
      .array(
        z.object({
          id: z.number(),
          name: z.string().min(1, "Вкажіть ваше прізвище, ім'я, по-батькові"),
        }),
      )
      .optional(),
  }),
});

function onSubmit(data: z.infer<typeof userEditShema>) {
  startTransition(() => {
    //TODO: make API request and setData
    // const newData = getJson('/data/call-summary.json');
    toast({
      title: 'Ви відправили наступні значення:',
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  });
}

export const EditUserForm = ({ userData, addrData }: EditUserFormProps) => {
  const form = useForm<z.infer<typeof userEditShema>>({
    resolver: zodResolver(userEditShema),
    defaultValues: {
      userData: {
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
      },
      addrData: {
        billing: [
          {
            addr: '',
            id: 0,
          },
        ],
      },
    },
  });

  const {
    fields: fieldsBilling,
    append: appendBilling,
    prepend: prependBilling,
    remove: removeBilling,
    swap: swapBilling,
    move: moveBilling,
    insert: insertBilling,
  } = useFieldArray({
    control: form.control,
    name: 'addrData.billing',
    keyName: 'idKey',
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="userData.name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                ПІБ
              </FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder=""
                    type="text"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userData.phone"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Номер телефона
              </FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder=""
                    type="text"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="userData.email"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Електронна пошта
              </FormLabel>
              <FormControl>
                <div className="relative w-full">
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder=""
                    type="text"
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <>
          <div>
            <p className="font-semibold text-base leading-normal text-main-dark mb-4">
              Білінг адреси:
            </p>
            {addrData.billing.map((item, i) => (
              <div key={item.id}>
                <div className="mb-5">
                  <FormField
                    control={form.control}
                    name={`addrData.billing.${i}.addr`}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <div className="flex gap-x-2 gap-y-5 items-center">
                            <Icon
                              width={24}
                              height={24}
                              iconName="DragAndDrop"
                              className="fill-main-dark w-6 h-6 flex-shrink-0"
                            />
                            <Input
                              {...fieldsBilling}
                              placeholder=""
                              type="text"
                              value={item.addr}
                            />
                            <Input
                              type="hidden"
                              {...fieldsBilling}
                              placeholder=""
                              value={item.id}
                            />
                            <Icon
                              width={24}
                              height={24}
                              iconName="Trash"
                              className="fill-warning w-6 h-6 flex-shrink-0"
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              className="text-main-color font-semibold text-sm leading-main-lh"
              onClick={() => {
                console.log('try append field');
                console.log(fieldsBilling);
                appendBilling({ addr: '', id: 0 });
              }}
            >
              Додати білінг адресу{' '}
              <Icon width={20} height={20} iconName="Plus" />
            </Button>
          </div>

          <div>
            <p className="font-semibold text-base leading-normal text-main-dark mb-4">
              Адреси доставки:
            </p>
            <div className="mb-5">
              {addrData.delivery.map((item, i) => (
                <KeyValText
                  key={item.id}
                  k={`Адреса ${i + 1}: `}
                  val={item.addr}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              className="text-main-color font-semibold text-sm leading-main-lh"
            >
              Додати адресу доставки{' '}
              <Icon width={20} height={20} iconName="Plus" />
            </Button>
          </div>

          <div>
            <p className="font-semibold text-base leading-normal text-main-dark mb-4">
              Отримувачі замовлення:
            </p>
            <div className="mb-5">
              {addrData.recipients.map((item, i) => (
                <KeyValText
                  key={item.id}
                  k={`Отримувач ${i + 1}: `}
                  val={item.name}
                />
              ))}
            </div>
            <Button
              type="button"
              variant="ghost"
              className="text-main-color font-semibold text-sm leading-main-lh"
            >
              Додати отримувача замовлення{' '}
              <Icon width={20} height={20} iconName="Plus" />
            </Button>
          </div>
        </>
      </form>
    </Form>
  );
};
