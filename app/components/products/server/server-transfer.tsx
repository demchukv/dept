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
import { startTransition } from 'react';
import { Button } from '@/components/ui/button';
import { ServerType } from '@/types/server';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '../../common/modal-new';
import { Info } from '../../common/info';
import { DatePicker } from '../../common/date-picker';
import { formatISO } from 'date-fns';

export const ContinueSubscriptionSchema = z.object({
  serverId: z.number().min(1),
  transferDate: z.date().min(new Date()),
});

interface SubscriptionTvContinueProps {
  data: ServerType;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}
export const ServerTransfer = ({
  data,
  onClose,
}: SubscriptionTvContinueProps) => {
  const form = useForm<z.infer<typeof ContinueSubscriptionSchema>>({
    resolver: zodResolver(ContinueSubscriptionSchema),
    mode: 'onChange',
    defaultValues: {
      serverId: data.id,
      transferDate: new Date(),
    },
  });

  function onSubmit(data: z.infer<typeof ContinueSubscriptionSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        action: 'transfer',
        transferDate: formatISO(data.transferDate),
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
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <ModalHeader className="flex-shrink-0">
            <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
              Перенести до dept
            </ModalTitle>
            <ModalDescription className="hidden"></ModalDescription>
          </ModalHeader>
          <ModalInner className="flex flex-col justify-center w-full font-normal text-sm text-main-dark leading-main-lh space-y-4 flex-grow">
            <FormField
              control={form.control}
              name="transferDate"
              render={({ field }) => (
                <FormItem className="flex flex-col mb-4">
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    Обрати дату:
                  </FormLabel>
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onSelect={(value: Date) => {
                        field.onChange(value);
                      }}
                      disabled={(date) => date < new Date()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Info>
              Буде створено тотожню за потужностями послугу і перенесено всі
              дані автоматично.{' '}
            </Info>
            <Info>
              Після переносу даних на електронну скриньку надійде сповіщення для
              переключення DNS записів, які були привʼязані до провайдера
              Hetzner.
            </Info>
          </ModalInner>

          <ModalFooter className="flex-col sm:flex-row justify-center gap-4 py-4 flex-shrink-0 self-end w-full">
            <Button type="submit" variant="default">
              Перенести
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
    </>
  );
};
