'use client';
import { ServerType } from '@/types/server';
import { ServerPromotion } from '@/app/components/products/server/server-promotion';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { startTransition, useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { KeyValText } from '@/app/components/common/key-val-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { Modal, ModalContent } from '@/app/components/common/modal-new';
import { ServerCancel } from '@/app/components/products/server/server-cancel';
import { Warning } from '@/app/components/common/warning';
import { ReplenishBalance } from '../../balance/replenish-balance';
import { useAppSelector } from '@/store/hooks';
import { selectBalance } from '@/store/account/accountSlice';

export const ContinueSubscriptionSchema = z.object({
  subscritionId: z.number().min(1),
  term: z.string().min(1, 'Виберіть зі списку термін продовження підписки'),
  auto: z.boolean(),
});

interface ServerBillingProps {
  data: ServerType;
}
export const ServerBilling = ({ data }: ServerBillingProps) => {
  const currentBalance = useAppSelector(selectBalance);

  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const [openReplenish, setOpenReplenish] = useState(false);

  const onCloseReplenish = (
    state: boolean,
    e: React.MouseEvent | undefined,
  ) => {
    if (e) e.preventDefault();
    setOpenReplenish(state);
  };
  const form = useForm<z.infer<typeof ContinueSubscriptionSchema>>({
    resolver: zodResolver(ContinueSubscriptionSchema),
    mode: 'onChange',
    defaultValues: {
      subscritionId: data.id,
      term: 'month',
      auto: false,
    },
  });
  const termList = [
    { key: 'month', val: '1 місяць' },
    { key: 'quarter', val: '3 місяці' },
    { key: 'year', val: '1 рік' },
  ];
  function onSubmit(data: z.infer<typeof ContinueSubscriptionSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = { ...data, action: 'continue' };
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
      {data.state === 'active' && <ServerPromotion data={data} />}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col mt-4"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:gap-6 ">
            <div className="flex flex-col w-auto sm:w-[50%]">
              <FormField
                control={form.control}
                name="term"
                render={({ field }) => (
                  <FormItem className="flex gap-2 items-center justify-between space-y-0 mb-2">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormLabel className="whitespace-nowrap">
                        Подовжити на
                      </FormLabel>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Оберіть термін продовження підписки" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {termList.map((i) => (
                          <SelectItem key={i.key} value={String(i.key)}>
                            {i.val}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              {data.state === 'active' && (
                <FormField
                  control={form.control}
                  name="auto"
                  render={({ field }) => (
                    <FormItem className="flex flex-row gap-2 space-y-0 items-center justify-start mb-4">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel className="m-0">
                        Автоматичне подовження
                      </FormLabel>
                    </FormItem>
                  )}
                />
              )}
            </div>

            <KeyValText
              k="Термін дії:"
              val="з 01.01.2023 до 01.06.2024"
              className="mb-4 justify-between sm:hidden"
            />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4 sm:items-center">
              <div className="flex flex-col">
                <KeyValText
                  k={
                    <span className="text-base font-semibold">
                      {data.state === 'active'
                        ? 'Сума до списання'
                        : 'Вартість за період'}
                    </span>
                  }
                  val={
                    <span className="text-base font-semibold">
                      {data.price} грн
                    </span>
                  }
                  className="mb-3 justify-between"
                />
                {/* TODO: add amount and current balance for compare */}
                {data.price && currentBalance < data.price && (
                  <Warning className="mb-4 sm:mb-0">
                    Суми на балансі недостатньо для проведення операції.
                    Необхідно поповнити баланс на {data.price - currentBalance}{' '}
                    грн
                  </Warning>
                )}
              </div>
              <div className="flex flex-col">
                {data.price && currentBalance >= data.price && (
                  <Button type="submit" variant="default" className="mb-4">
                    {data.state === 'active'
                      ? 'Продовжити зараз'
                      : 'Відновити послугу'}
                  </Button>
                )}
                {data.price && currentBalance < data.price && (
                  <>
                    <Button
                      type="button"
                      variant="default"
                      className="mb-4"
                      onClick={() => setOpenReplenish(true)}
                    >
                      Поповнити баланс
                    </Button>
                    <ReplenishBalance
                      open={openReplenish}
                      onClose={onCloseReplenish}
                    />
                  </>
                )}
              </div>
            </div>
          </div>
          {data.state === 'active' && (
            <>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                <KeyValText
                  k="Термін дії:"
                  val="з 01.01.2023 до 01.06.2024"
                  className="mb-4 sm:mb-0 justify-between hidden sm:flex"
                />
                <Button
                  type="button"
                  variant="destructive"
                  className="text-warning"
                  onClick={() => setOpen(true)}
                >
                  <Icon
                    iconName="DeleteCircle"
                    width={20}
                    height={20}
                    className="w-5 h-5"
                  />
                  Скасувати послугу
                </Button>
              </div>
            </>
          )}
        </form>
      </Form>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <ServerCancel data={data} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
