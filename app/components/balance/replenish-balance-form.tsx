'use client';

import { useTransition } from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface ReplenishBalanseFormProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

const ReplenishBalansSchema = z.object({
  amount: z.coerce.number({
    invalid_type_error: 'Вкажіть коректну суму поповнення',
  }),
  card: z.coerce.number({
    required_error: 'Вкажіть rкартку з якої відбуватимеься оплата',
  }),
});

export const ReplenishBalanseForm = ({
  onClose,
}: ReplenishBalanseFormProps) => {
  const [isPendig, startTransition] = useTransition();

  const form = useForm<z.infer<typeof ReplenishBalansSchema>>({
    resolver: zodResolver(ReplenishBalansSchema),
    defaultValues: {
      amount: 0,
      card: 0,
    },
  });
  function onSubmit(data: z.infer<typeof ReplenishBalansSchema>) {
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
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="min-h-full flex flex-col gap-6 justify-between"
      >
        <ModalHeader>
          <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center mt-5">
            Поповнити баланс
          </ModalTitle>
          <ModalDescription className="hidden"></ModalDescription>
        </ModalHeader>
        <div className="min-h-full flex flex-col gap-6 w-full self-stretch">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Сума поповнення</FormLabel>
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
        <ModalFooter className="flex flex-col gap-3 py-4 shadow-[0_-6px_20px_0_rgba(89,125,137,0.08)]">
          <Button type="submit" className="w-full">
            Поповнити баланс
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onClose(false, undefined)}
            className="w-full"
          >
            Відмінити
          </Button>
        </ModalFooter>
      </form>
    </Form>
  );
};
