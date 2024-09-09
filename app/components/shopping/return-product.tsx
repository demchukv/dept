'use client';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Info } from '@/app/components/common/info';
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
import { startTransition } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { OrderProduct } from '@/app/components/shopping/order-product';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import React from 'react';
import { Icon } from '@/components/utils/icon';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { DatePicker } from '../common/date-picker';
import { formatISO } from 'date-fns';

const orderSettingShema = z
  .object({
    text: z.string().optional(),
    products: z
      .array(z.string())
      .refine((value) => value.some((item) => item), {
        message: 'Виберіть хоча би один товар, що потрребує налаштування',
      }),
    reason: z.string().min(1, 'Вкажіть причину повернення'),
    returnPIB: z.string().min(3, "Вкажіть ваше прізвище, ім'я, по-батькові"),
    returnDB: z.date({
      required_error: 'Вкажіть коректну дату народження',
    }),
    returnIDNumber: z.string().optional(),
    returnIDWho: z.string().optional(),
    returnPassSerial: z.string().optional(),
    returnPassNo: z.string().optional(),
    returnPassWho: z.string().optional(),
    docType: z.number().default(0),
  })
  .refine(
    (data) => {
      if (
        data.docType === 0 &&
        (data.returnIDNumber === undefined || data.returnIDNumber?.length < 13)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть номер ID картки',
      path: ['returnIDNumber'],
    },
  )
  .refine(
    (data) => {
      if (
        data.docType === 0 &&
        (data.returnIDWho === undefined || data.returnIDWho?.length < 5)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть орган, що видав документ',
      path: ['returnIDWho'],
    },
  )
  .refine(
    (data) => {
      if (
        data.docType === 1 &&
        (data.returnPassSerial === undefined ||
          data.returnPassSerial?.length < 2)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть серію паспорта',
      path: ['returnPassSerial'],
    },
  )
  .refine(
    (data) => {
      if (
        data.docType === 1 &&
        (data.returnPassNo === undefined || data.returnPassNo?.length < 5)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть номер паспорта',
      path: ['returnPassNo'],
    },
  )
  .refine(
    (data) => {
      if (
        data.docType === 1 &&
        (data.returnPassWho === undefined || data.returnPassWho?.length < 5)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть орган, що видав документ',
      path: ['returnPassWho'],
    },
  );

const reasonList = [
  { key: 1, val: 'Товар не такий, як я очікував (-ла)' },
  {
    key: 2,
    val: 'Товар не відповідає опису або фото',
  },
  {
    key: 3,
    val: 'Отримано товар, який я не оплачував (-ла)',
  },
  {
    key: 4,
    val: 'Товар неналежної якості, пошкоджений або в неповній комплектації',
  },
];

interface OrderSettingsProps {
  order: any;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}
export const ReturnProduct = ({ order, onClose }: OrderSettingsProps) => {
  const [currentForm, setCurrentForm] = React.useState(0);

  const form = useForm<z.infer<typeof orderSettingShema>>({
    resolver: zodResolver(orderSettingShema),
    mode: 'onChange',
    defaultValues: {
      text: '',
      products: [],
      reason: '',
      returnPIB: '',
      returnDB: new Date(),
      returnIDNumber: '',
      returnIDWho: '',
      returnPassSerial: '',
      returnPassNo: '',
      returnPassWho: '',
      docType: currentForm,
    },
  });

  function onSubmit(data: z.infer<typeof orderSettingShema>) {
    let values = {
      text: data.text,
      products: data.products,
      reason: data.reason,
      returnPIB: data.returnPIB,
      returnDB: formatISO(data.returnDB as Date),
      docType: data.docType,
    };
    if (currentForm === 0) {
      const rf = {
        returnIDNumber: data.returnIDNumber,
        returnIDWho: data.returnIDWho,
      };
      values = { ...values, ...rf };
    }
    if (currentForm === 1) {
      const rf = {
        returnPassSerial: data.returnPassSerial,
        returnPassNo: data.returnPassNo,
        returnPassWho: data.returnPassWho,
      };
      values = { ...values, ...rf };
    }
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col h-full"
      >
        <ModalHeader className="mt-6 flex-shrink-0  mb-6">
          <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
            Повернення товару із замовлення{' '}
            <span className="text-main-color whitespace-nowrap">
              №{order.number}
            </span>
          </ModalTitle>
          <ModalDescription className="hidden"></ModalDescription>
        </ModalHeader>
        <div className="font-normal text-sm text-main-dark leading-main-lh space-y-4 self-start flex-grow">
          <p className="font-semibold">Товари, що підлягають поверненню</p>
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
                            <OrderProduct product={item} garanty={false} />
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
            name="reason"
            render={({ field }) => (
              <FormItem className="space-y-4 mt-1 mb-4">
                <FormLabel>Причина повернення</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value as any}
                    className="flex flex-col"
                  >
                    {reasonList.map((item) => (
                      <React.Fragment key={item.key}>
                        <FormItem className="flex items-center gap-x-1 gap-y-2">
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
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Додаткова інформація</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Введіть текст"
                    className="resize-y"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <p className="font-semibold">Документи для повернення</p>
          <FormField
            control={form.control}
            name="docType"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                  ПІБ:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder=""
                    type="hidden"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex flex-col gap-2 lg:flex-row-reverse items-center">
            <Button
              type="button"
              variant="secondary"
              className="gap-2 w-full mb-2"
            >
              Авторизуватись через
              <Icon iconName="Diia" width={24} height={24} />
            </Button>
            <div className="w-full flex items-center justify-center gap-4">
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  'w-full font-semibold text-sm leading-main-lh text-main-dark',
                  currentForm === 0 && 'text-main-color',
                )}
                onClick={() => {
                  setCurrentForm(0);
                  form.setValue('docType', 0);
                }}
              >
                ID картка
              </Button>
              <div className="border-r border-gray-light h-[40px] w-[1px]"></div>
              <Button
                type="button"
                variant="ghost"
                className={cn(
                  'w-full font-semibold text-sm leading-main-lh text-main-dark',
                  currentForm === 1 && 'text-main-color',
                )}
                onClick={() => {
                  setCurrentForm(1);
                  form.setValue('docType', 1);
                }}
              >
                Паспорт
              </Button>
            </div>
          </div>

          <FormField
            control={form.control}
            name="returnPIB"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                  ПІБ:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder=""
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="returnDB"
            render={({ field }) => (
              <FormItem className="flex flex-col mb-4">
                <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                  Дата народження:
                </FormLabel>
                <FormControl>
                  <DatePicker
                    captionLayout="dropdown-buttons"
                    fromYear={1950}
                    toYear={new Date().getFullYear()}
                    selected={field.value as any}
                    onSelect={(value: Date) => {
                      field.onChange(value);
                    }}
                    disabled={(date) => date > new Date()}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {currentForm === 0 && (
            <div className="w-full flex gap-4">
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="returnIDNumber"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                        Номер документа:
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          // disabled={isPending}
                          placeholder=""
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="w-full">
                <FormField
                  control={form.control}
                  name="returnIDWho"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                        Орган, що видав:
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          // disabled={isPending}
                          placeholder=""
                          type="text"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          )}
          {/* Refund Form, Step 1, Tab 2 */}
          {currentForm === 1 && (
            <>
              <div className="w-full flex gap-4">
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="returnPassSerial"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                          Серія паспорта:
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder=""
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="w-full">
                  <FormField
                    control={form.control}
                    name="returnPassNo"
                    render={({ field }) => (
                      <FormItem className="mb-4 w-full">
                        <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                          Номер паспорта:
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            // disabled={isPending}
                            placeholder=""
                            type="text"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <FormField
                control={form.control}
                name="returnPassWho"
                render={({ field }) => (
                  <FormItem className="mb-4">
                    <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                      Ким виданий:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        // disabled={isPending}
                        placeholder=""
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </>
          )}

          <Info>
            Сформований документ необхідно роздрукувати, підписати та направити
            до{' '}
            <Link href="task" className="text-main-color font-semibold">
              Служби турботи про клієнтів
            </Link>{' '}
            разом із поверненим товаром.
          </Info>
        </div>
        <ModalFooter className="flex-col sm:flex-row justify-center gap-4 py-4 flex-shrink-0 self-end w-full">
          <Button type="submit" variant="default">
            Згенерувати заяву на повернення
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose(false, undefined)}
          >
            Скасувати
          </Button>
        </ModalFooter>
      </form>
    </Form>
  );
};
