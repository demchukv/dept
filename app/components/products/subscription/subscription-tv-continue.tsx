'use client';
import { subscriptionType } from '@/types/subscription';
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
import { UnsubscribeTv } from '@/app/components/products/subscription/unsubscribe-tv';

export const ContinueSubscriptionSchema = z.object({
  subscritionId: z.number().min(1),
  term: z.string().min(1, 'Виберіть зі списку термін продовження підписки'),
  auto: z.boolean(),
});

interface SubscriptionTvContinueProps {
  data: subscriptionType;
}
export const SubscriptionTvContinue = ({
  data,
}: SubscriptionTvContinueProps) => {
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
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
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center ">
            <div className="flex flex-col ">
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
            </div>

            <KeyValText
              k="Термін дії:"
              val="з 01.01.2023 до 01.06.2024"
              className="mb-4 justify-between sm:hidden"
            />

            <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-4">
              <KeyValText
                k={
                  <span className="text-base font-semibold">
                    Сума до списання:
                  </span>
                }
                val={
                  <span className="text-base font-semibold">299.00 грн</span>
                }
                className="mb-3 justify-between"
              />

              <Button type="submit" variant="default" className="mb-4">
                Продовжити зараз
              </Button>
            </div>
          </div>
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
        </form>
      </Form>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <UnsubscribeTv data={data} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
