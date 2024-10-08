'use client';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalInner,
} from '@/app/components/common/modal-new';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { startTransition, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { ProductCard } from '@/app/components/shopping/product-card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import copy from 'copy-to-clipboard';
import { Icon } from '@/components/utils/icon';

const TTN = '50 465 6540654 465044';
const deliveryList = [
  { key: 1, val: 'Укрпошта' },
  {
    key: 2,
    val: 'Нова Пошта',
  },
  {
    key: 3,
    val: 'Meest Express',
  },
];

const addrTypeList = [
  { key: 1, val: 'Обрати адресу доставки' },
  { key: 2, val: 'Ввести нову адресу відправки' },
];

const addressList = [
  { key: 1, val: 'Збережена адреса відправки 1' },
  { key: 2, val: 'Збережена адреса відправки 2' },
];

const orderSettingShema = z.object({
  text: z.string().min(1, 'Вкажіть текст повідомлення'),
  products: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Виберіть хоча би один товар, що повертаєте по гарантії',
  }),
  delivery: z.string().min(1, 'Вкажіть причину повернення'),
  pib: z.string().min(3, 'Вкажіть ПІБ відправника'),
  phone: z.string().min(7, 'Вкажіть номер телефону відправника'),
  addrType: z.string().min(1, 'Вкажіть причину повернення'),
  newAddr: z.string().optional(),
  savedAddr: z.string().optional(),
});
interface OrderSettingsProps {
  order: any;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}
export const OrderGaranty = ({ order, onClose }: OrderSettingsProps) => {
  const [step, setStep] = useState(1);

  const form = useForm<z.infer<typeof orderSettingShema>>({
    resolver: zodResolver(orderSettingShema),
    mode: 'onChange',
    defaultValues: {
      products: [],
      text: '',
      delivery: '',
      pib: '',
      phone: '',
      addrType: '',
      newAddr: '',
      savedAddr: '',
    },
  });

  function onSubmit(data: z.infer<typeof orderSettingShema>) {
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
      setStep((prev) => prev + 1);
    });
  }

  const changeStep = (direction: 'next' | 'prev') => {
    if (direction === 'next' && step < 3) {
      setStep((prev) => prev + 1);
    }
    if (direction === 'prev' && step > 1) {
      setStep((prev) => prev - 1);
    }
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full"
      >
        <ModalHeader className="flex-shrink-0">
          <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
            Гарантійне звернення щодо товарів із замовлення{' '}
            <span className="text-main-color whitespace-nowrap">
              №{order.number}
            </span>
          </ModalTitle>
          <ModalDescription className="hidden"></ModalDescription>
        </ModalHeader>
        {step === 1 && (
          <ModalInner className="font-normal text-sm text-main-dark leading-main-lh space-y-4 self-start flex-grow">
            <div className="flex items-center justify-between text-base font-medium leading-normal mb-6">
              <div className="text-main-color">КРОК 1/3</div>
              <div className="text-main-dark">Інформація про товар</div>
            </div>
            <p className="font-semibold">Товари, що підлягають гарантії</p>
            <FormField
              control={form.control}
              name="products"
              render={() => (
                <FormItem>
                  {order.products.map((item: any) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="products"
                      render={({ field }) => {
                        const val = 'val_' + item.id;
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-center space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(val)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, val])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== val,
                                        ),
                                      );
                                }}
                              />
                            </FormControl>
                            <FormLabel className="w-full">
                              <ProductCard item={item} />
                            </FormLabel>
                          </FormItem>
                        );
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Пристрій</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Опишіть причину звернення"
                      className="resize-y"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </ModalInner>
        )}

        {step === 2 && (
          <ModalInner className="w-full font-normal text-sm text-main-dark leading-main-lh space-y-4 self-start flex-grow">
            <div className="flex items-center justify-between text-base font-medium leading-normal mb-6">
              <div className="text-main-color">КРОК 2/3</div>
              <div className="text-main-dark">Формування ТТН</div>
            </div>
            <p>
              Оберіть кур’єрську службу і ми допоможемо вам сформувати ТТН для
              відправки:
            </p>
            <FormField
              control={form.control}
              name="delivery"
              render={({ field }) => (
                <FormItem className="space-y-4 mt-1 mb-4">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value as any}
                      className="flex flex-col gap-5"
                    >
                      {deliveryList.map((item) => (
                        <React.Fragment key={item.key}>
                          <FormItem className="flex items-center gap-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={String(item.key)} />
                            </FormControl>
                            <FormLabel className="w-full bg-transparent flex justify-between items-center border-0">
                              <p className="font-normal text-sm leading-main-lh text-main-dark">
                                {item.val}
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
              name="pib"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    Відправник:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="ПІБ"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    Телефон відправника:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="Введіть номер телефону"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="addrType"
              render={({ field }) => (
                <FormItem className="space-y-4 mt-1 mb-4">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value as any}
                      className="flex flex-col gap-5"
                    >
                      {addrTypeList.map((item) => (
                        <React.Fragment key={item.key}>
                          <FormItem className="flex items-center gap-x-2 space-y-0">
                            <FormControl>
                              <RadioGroupItem value={String(item.key)} />
                            </FormControl>
                            <FormLabel className="w-full bg-transparent flex flex-col justify-start items-start border-0">
                              {item.key === 1 && (
                                <FormField
                                  control={form.control}
                                  name="savedAddr"
                                  render={({ field }) => (
                                    <FormItem>
                                      <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                                        {item.val}
                                      </FormLabel>
                                      <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                      >
                                        <FormControl>
                                          <SelectTrigger>
                                            <SelectValue placeholder="Оберіть адресу відправки" />
                                          </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                          {addressList.map((i) => (
                                            <SelectItem
                                              key={i.key}
                                              value={String(i.key)}
                                            >
                                              {i.val}
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>

                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              )}
                              {item.key === 2 && (
                                <FormField
                                  control={form.control}
                                  name="newAddr"
                                  render={({ field }) => (
                                    <FormItem className="mb-4 w-full">
                                      <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                                        {item.val}
                                      </FormLabel>
                                      <FormControl>
                                        <Input
                                          {...field}
                                          // disabled={isPending}
                                          placeholder="Нова адреса"
                                          type="text"
                                        />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                              )}
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
          </ModalInner>
        )}

        {step === 3 && (
          <ModalInner className="w-full font-normal text-sm text-main-dark leading-main-lh space-y-4 self-start flex-grow">
            <div className="flex items-center justify-between text-base font-medium leading-normal mb-6">
              <div className="text-main-color">КРОК 3/3</div>
              <div className="text-main-dark">Відправлення на ремонт</div>
            </div>
            <p className="text-base font-semibold leading-normal text-center text-main-dark">
              ТТН сформовано
            </p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="font-semibold text-2xl leading-none">{TTN}</div>
              <div>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-6 h-6 bg-transparent text-main-color"
                  title="Копіювати ТТН"
                  onClick={() => copy(TTN)}
                >
                  <Icon iconName="Copy" width={24} height={24} />
                </Button>
              </div>
            </div>
            <p className="mb-3">
              Залишилось тільки віднести пристриій до відділення кур’єрської
              служби
            </p>
            <p>
              Статус ремонту ви можете відслідковувати в розділі{' '}
              <Link href="/repair" className="text-main-color font-semibold">
                Ремонт техніки
              </Link>
            </p>
          </ModalInner>
        )}

        <ModalFooter className="flex-col sm:flex-row justify-center gap-4 py-4 flex-shrink-0 self-end w-full">
          {step === 1 && (
            <Button
              type="button"
              variant="default"
              onClick={() => changeStep('next')}
            >
              Перейти до кроку 2
            </Button>
          )}
          {step === 2 && (
            <Button
              type="submit"
              variant="default"
              // onClick={() => changeStep('next')}
            >
              Перейти до кроку 3
            </Button>
          )}
          {step === 3 && (
            <Button
              asChild
              type="button"
              variant="default"
              onClick={() => changeStep('next')}
            >
              <Link href="/repair">До списку заявок на ремонт</Link>
            </Button>
          )}
          {step === 1 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose(false, undefined)}
            >
              Скасувати
            </Button>
          )}
          {step === 2 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => changeStep('prev')}
            >
              Повернутись до кроку 1
            </Button>
          )}
        </ModalFooter>
      </form>
    </Form>
  );
};
