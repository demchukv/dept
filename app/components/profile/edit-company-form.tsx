import {
  Form,
  FormControl,
  FormDescription,
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
import { Icon } from '@/components/utils/icon';
import { Button } from '@/components/ui/button';
import React from 'react';
import { CardHeader } from '../card/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import Link from 'next/link';

interface EditCompanyFormProps {
  addrData: {
    billing: {
      addr: string;
      id: number | undefined;
    }[];
    delivery: {
      addr: string;
      id: number | undefined;
    }[];
    recipients: {
      name: string;
      id: number | undefined;
    }[];
  };
  companyData: {
    id: number;
    name: string;
    email: string;
    phone: string;
    edrpou: string;
    contract: string;
    form: string;
    ipn: string;
    bank: string;
    iban: string;
    pib: string;
    doc: string;
    addr: string;
  };
  view: 'data' | 'edit';
  setView: (view: 'data' | 'edit') => void;
}

const companyEditShema = z.object({
  companyData: z.object({
    name: z.string().min(1, "Вкажіть ваше прізвище, ім'я, по-батькові"),
    email: z.string().min(1, 'Вкажіть вашу електронну адресу'),
    phone: z.string().min(1, 'Вкажіть ваш номер телефону'),
    edrpou: z.string().min(1, 'Вкажіть ваше ЄДРПОУ'),
    contract: z.string().min(1, 'Вкажіть ваш контракт'),
    form: z.string().min(1, 'Вкажіть форму реєстрації компанії'),
    ipn: z.string().min(1, 'Вкажіть ваш ІПН'),
    bank: z.string().min(1, 'Вкажіть ваш банк'),
    iban: z.string().min(1, 'Вкажіть ваш IBAN'),
    pib: z.string().min(1, 'Вкажіть ПІБ керівника компанії'),
    doc: z.string().min(1, 'Вкажіть ваш документ'),
    addr: z.string().min(1, 'Вкажіть вашу адресу'),
  }),

  addrData: z.object({
    billing: z
      .array(
        z.object({
          addr: z.string().min(1, 'Вкажіть білінг адресу'),
          id: z.number().optional(),
        }),
      )
      .optional(),
    delivery: z
      .array(
        z.object({
          addr: z.string().min(1, 'Вкажіть адресу доставки'),
          id: z.number().optional(),
        }),
      )
      .optional(),
    recipients: z
      .array(
        z.object({
          id: z.number().optional(),
          name: z.string().min(1, "Вкажіть ваше прізвище, ім'я, по-батькові"),
        }),
      )
      .optional(),
  }),
});

function onSubmit(data: z.infer<typeof companyEditShema>) {
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

export const EditCompanyForm = ({
  companyData,
  addrData,
  view,
  setView,
}: EditCompanyFormProps) => {
  const form = useForm<z.infer<typeof companyEditShema>>({
    resolver: zodResolver(companyEditShema),
    mode: 'onChange',
    defaultValues: {
      companyData: {
        name: companyData.name,
        email: companyData.email,
        phone: companyData.phone,
        edrpou: companyData.edrpou,
        contract: companyData.contract,
        form: companyData.form,
        ipn: companyData.ipn,
        bank: companyData.bank,
        iban: companyData.iban,
        pib: companyData.pib,
        doc: companyData.doc,
        addr: companyData.addr,
      },
      addrData: addrData,
    },
  });

  const {
    fields: fieldsBilling,
    append: appendBilling,
    remove: removeBilling,
    move: moveBilling,
  } = useFieldArray({
    control: form.control,
    name: 'addrData.billing',
    keyName: 'bKey',
  });
  const {
    fields: fieldsDelivery,
    append: appendDelivery,
    remove: removeDelivery,
    move: moveDelivery,
  } = useFieldArray({
    control: form.control,
    name: 'addrData.delivery',
    keyName: 'dKey',
  });
  const {
    fields: fieldsRecipients,
    append: appendRecipients,
    remove: removeRecipients,
    move: moveRecipients,
  } = useFieldArray({
    control: form.control,
    name: 'addrData.recipients',
    keyName: 'rKey',
  });

  return (
    <Form {...form}>
      <CardHeader className="border-b border-gray-light pb-4 mb-4">
        Редагувати дані компанії
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
        <FormField
          control={form.control}
          name="companyData.name"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Назва компанії
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
          name="companyData.phone"
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
          name="companyData.email"
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
        <p className="font-semibold text-base leading-normal text-main-dark mb-4">
          Реквізити
        </p>
        <FormField
          control={form.control}
          name="companyData.form"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Форма реєстрації компанії
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
          name="companyData.form"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Форма реєстрації компанії</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="m@example.com">m@example.com</SelectItem>
                  <SelectItem value="m@google.com">m@google.com</SelectItem>
                  <SelectItem value="m@support.com">m@support.com</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{' '}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-between">
          <FormField
            control={form.control}
            name="companyData.edrpou"
            render={({ field }) => (
              <FormItem className="space-y-1 w-full">
                <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                  ЄДРПОУ
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
            name="companyData.ipn"
            render={({ field }) => (
              <FormItem className="space-y-1 w-full">
                <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                  ІПН
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
        </div>
        <FormField
          control={form.control}
          name="companyData.bank"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Банк
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
          name="companyData.iban"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Рахунок IBAN
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
          name="companyData.pib"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                ПІБ керівника або посадової особи:
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
          name="companyData.doc"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Документ за підставі якого діє
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
          name="companyData.addr"
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Юридична адреса:
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
            {fieldsBilling.map((field, i) => (
              <div key={`b-${i}`} className="mb-5">
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
                          <Input type="text" {...field} placeholder="" />
                          <Button
                            type="button"
                            variant="ghost"
                            className="p-0 w-6 h-6 bg-transparent"
                            onClick={() => removeBilling(i)}
                          >
                            <Icon
                              width={24}
                              height={24}
                              iconName="Trash"
                              className="fill-warning w-6 h-6 flex-shrink-0"
                            />
                          </Button>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`addrData.billing.${i}.id`}
                  render={({ field }) => (
                    <FormItem className="space-y-1">
                      <FormControl>
                        <Input type="hidden" {...field} placeholder="" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            ))}
            <Button
              type="button"
              variant="ghost"
              className="text-main-color font-semibold text-sm leading-main-lh"
              onClick={() => {
                appendBilling(
                  { addr: '', id: undefined },
                  { shouldFocus: true },
                );
              }}
            >
              Додати білінг адресу{' '}
              <Icon width={20} height={20} iconName="Plus" />
            </Button>
          </div>

          <>
            <div>
              <p className="font-semibold text-base leading-normal text-main-dark mb-4">
                Адреси доставки:
              </p>
              {fieldsDelivery.map((field, i) => (
                <div key={`d-${i}`} className="mb-5">
                  <FormField
                    control={form.control}
                    name={`addrData.delivery.${i}.addr`}
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
                            <Input type="text" {...field} placeholder="" />
                            <Button
                              type="button"
                              variant="ghost"
                              className="p-0 w-6 h-6 bg-transparent"
                              onClick={() => removeDelivery(i)}
                            >
                              <Icon
                                width={24}
                                height={24}
                                iconName="Trash"
                                className="fill-warning w-6 h-6 flex-shrink-0"
                              />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`addrData.delivery.${i}.id`}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <Input type="hidden" {...field} placeholder="" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                className="text-main-color font-semibold text-sm leading-main-lh"
                onClick={() => {
                  appendDelivery(
                    { addr: '', id: undefined },
                    { shouldFocus: true },
                  );
                }}
              >
                Додати адресу доставки{' '}
                <Icon width={20} height={20} iconName="Plus" />
              </Button>
            </div>
          </>

          <>
            <div>
              <p className="font-semibold text-base leading-normal text-main-dark mb-4">
                Отримувачі замовлення:
              </p>
              {fieldsRecipients.map((field, i) => (
                <div key={`r-${i}`} className="mb-5">
                  <FormField
                    control={form.control}
                    name={`addrData.recipients.${i}.name`}
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
                            <Input type="text" {...field} placeholder="" />
                            <Button
                              type="button"
                              variant="ghost"
                              className="p-0 w-6 h-6 bg-transparent"
                              onClick={() => removeRecipients(i)}
                            >
                              <Icon
                                width={24}
                                height={24}
                                iconName="Trash"
                                className="fill-warning w-6 h-6 flex-shrink-0"
                              />
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`addrData.recipients.${i}.id`}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <Input type="hidden" {...field} placeholder="" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              ))}
              <Button
                type="button"
                variant="ghost"
                className="text-main-color font-semibold text-sm leading-main-lh"
                onClick={() => {
                  appendRecipients(
                    { name: '', id: undefined },
                    { shouldFocus: true },
                  );
                }}
              >
                Додати отримувача замовлення{' '}
                <Icon width={20} height={20} iconName="Plus" />
              </Button>
            </div>
          </>
        </>
        <div className="flex gap-4 justify-end mt-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => setView('data')}
          >
            Відмінити
          </Button>
          <Button type="submit">Зберегти</Button>
        </div>
      </form>
    </Form>
  );
};
