'use client';
import { certificateType } from '@/types/certificate';
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
import { CertificateCancel } from '@/app/components/products/certificate/certificate-cancel';
import { Warning } from '@/app/components/common/warning';
import { ReplenishBalance } from '../../balance/replenish-balance';
import { useAppSelector } from '@/store/hooks';
import { selectBalance } from '@/store/account/accountSlice';

export const ContinueDomainSchema = z.object({
  id: z.number().min(1),
  term: z.string().min(1, 'Виберіть зі списку термін продовження підписки'),
  autoContinue: z.boolean(),
});

interface CertificateBillingProps {
  data: certificateType;
}
export const CertificateBilling = ({ data }: CertificateBillingProps) => {
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
  const form = useForm<z.infer<typeof ContinueDomainSchema>>({
    resolver: zodResolver(ContinueDomainSchema),
    mode: 'onChange',
    defaultValues: {
      id: data.id,
      term: 'one',
      autoContinue: false,
    },
  });
  const termList = [
    { key: 'one', val: '1 рік' },
    { key: 'two', val: '2 роки' },
    { key: 'three', val: '3 роки' },
  ];
  function onSubmit(data: z.infer<typeof ContinueDomainSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = { ...data, action: 'continueCertificate' };
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
      <KeyValText
        k="Термін дії:"
        val={`з ${data.activated} до ${data.activeTo}`}
        className="mb-4 justify-between sm:hidden"
      />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col mt-4"
        >
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center sm:gap-6 ">
            <div className="flex flex-col w-auto sm:w-[38%]">
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
                name="autoContinue"
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

            <div className="flex flex-col sm:flex-row sm:justify-between sm:gap-2 md:gap-4 sm:items-center">
              <div className="flex flex-col">
                <KeyValText
                  k={
                    <span className="text-base font-semibold">
                      Сума до списання
                    </span>
                  }
                  val={
                    <span className="text-base font-semibold">
                      {isNaN(Number(data.price))
                        ? data.price
                        : `${data.price} грн`}
                    </span>
                  }
                  className="mb-3 justify-between sm:justify-start"
                />
                {/* TODO: add amount and current balance for compare */}
                {!isNaN(Number(data.price)) &&
                  currentBalance < Number(data.price) && (
                    <Warning className="mb-4 sm:mb-0">
                      Суми на балансі недостатньо для проведення операції.
                      Необхідно поповнити баланс на{' '}
                      {Number(data.price) - currentBalance} грн
                    </Warning>
                  )}
              </div>
              <div className="flex flex-col">
                {isNaN(Number(data.price)) ||
                  (currentBalance >= Number(data.price) && (
                    <Button type="submit" variant="default" className="mb-4">
                      Продовжити зараз
                    </Button>
                  ))}
                {currentBalance < data.price && (
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
          <div className="flex justify-between">
            <KeyValText
              k="Термін дії:"
              val={`з ${data.activated} до ${data.activeTo}`}
              className="hidden sm:flex mb-4 justify-start"
            />
            <Button
              type="button"
              variant="destructive"
              className="text-warning w-full sm:w-auto"
              onClick={() => setOpen(true)}
            >
              <Icon
                iconName="DeleteCircle"
                width={20}
                height={20}
                className="w-5 h-5 "
              />
              Скасувати послугу
            </Button>
          </div>
        </form>
      </Form>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <CertificateCancel data={data} onClose={onClose} />
        </ModalContent>
      </Modal>
    </>
  );
};
