'use client';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { startTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ServerType } from '@/types/server';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '../../common/modal-new';
import { VirtualSelectBaseInfo } from '@/app/components/products/server/virtual/virtual-select-base-info';
import { KeyValText } from '../../common/key-val-text';
import { useAppSelector } from '@/store/hooks';
import { selectBalance } from '@/store/account/accountSlice';
import { ReplenishBalance } from '@/app/components/balance/replenish-balance';
import { Info } from '@/app/components/common/info';

// delete
import { orderTerm } from '@/app/components/products/server/virtual/virtual-select-tariff';
import { virtualTariffs } from '@/app/components/products/server/server-change-tariff';

const VirtualSelectTariffSchema = z.object({
  tariffType: z.string(),
  currentTariffId: z.number().min(1),
  tariffId: z.number().min(1),
  term: z.string().min(1),
});
interface ServerChangeInfoProps {
  data: ServerType;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}
export const ServerChangeInfo = ({ data, onClose }: ServerChangeInfoProps) => {
  const tariff = virtualTariffs.find(
    (item: any) => item.id === data.waitOnTariff,
  );
  const tariffs = virtualTariffs;
  const selectedTerm = 'b';

  const balance = useAppSelector(selectBalance);
  const [open, setOpen] = useState(false);
  const onBalanceClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };
  const form = useForm<z.infer<typeof VirtualSelectTariffSchema>>({
    resolver: zodResolver(VirtualSelectTariffSchema),
    mode: 'onChange',
    defaultValues: {
      tariffType: data.type,
      currentTariffId: data.tariff,
      tariffId: tariff?.id,
      term: selectedTerm,
    },
  });

  const currentTariff = tariffs.find((item: any) => item.id === data.tariff);
  const tariffTerm = orderTerm.find((item: any) => item.key === selectedTerm);

  function onSubmit(data: z.infer<typeof VirtualSelectTariffSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        action: 'stopChangeTariff',
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
          className="flex flex-col h-full space-y-0"
        >
          <input type="hidden" {...form.register('currentTariffId')} />
          <input type="hidden" {...form.register('tariffId')} />
          <input type="hidden" {...form.register('tariffType')} />
          <input type="hidden" {...form.register('term')} />
          <ModalHeader className="flex-shrink-0">
            <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
              Запланована зміна тарифу
            </ModalTitle>
            <ModalDescription className="hidden"></ModalDescription>
          </ModalHeader>
          <ModalInner className="max-w-[380px] m-auto flex flex-col justify-center w-full font-normal text-sm text-main-dark leading-main-lh flex-grow">
            <p className="mb-4">
              Після поповнення балансу, ваш тариф буде змінено на наступний:
            </p>

            <div>
              <VirtualSelectBaseInfo tariff={tariff} />
            </div>

            <KeyValText
              k="Термін замовлення тарифу:"
              val={tariffTerm.value}
              className="mb-3"
            />
            <KeyValText
              k="Вартість тарифу:"
              val={`${tariff?.promoPriceForYear} грн/рік`}
              className="mb-6"
            />

            {tariff?.promoPrice && balance < tariff?.promoPrice && (
              <>
                <Button type="button" onClick={() => setOpen(true)}>
                  Поповнити баланс
                </Button>
                <Info>
                  Поточний тариф буде змінено після поповнення балансу на
                  необхідну суму
                </Info>
                <ReplenishBalance onClose={onBalanceClose} open={open} />
              </>
            )}
          </ModalInner>

          <ModalFooter className="flex-col sm:flex-row-reverse justify-center gap-4 py-4 flex-shrink-0 self-end w-full">
            <Button
              type="button"
              variant="default"
              onClick={(e) => {
                onClose(false, undefined);
                e.stopPropagation();
              }}
            >
              Закрити
            </Button>
            <Button
              type="submit"
              variant="destructive"
              onClick={(e) => e.stopPropagation()}
            >
              Скасувати зміну тарифу
            </Button>
          </ModalFooter>
        </form>
      </Form>
    </>
  );
};
