'use client';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
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
import { VirtualSelectBaseInfo } from '@/app/components/products/server/virtual/virtual-select-base-info';

const VirtualSelectTariffSchema = z.object({
  tariffType: z.string(),
  currentTariffId: z.number().min(1),
  tariffId: z.number().min(1),
  term: z.string().min(1),
});
interface ServerChangeProps {
  data: ServerType;
  tariff: any;
  selectedTerm: string;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}
export const ServerChange = ({
  data,
  tariff,
  selectedTerm,
  onClose,
}: ServerChangeProps) => {
  const form = useForm<z.infer<typeof VirtualSelectTariffSchema>>({
    resolver: zodResolver(VirtualSelectTariffSchema),
    mode: 'onChange',
    defaultValues: {
      tariffType: data.type,
      currentTariffId: data.tariff,
      tariffId: tariff.id,
      term: selectedTerm,
    },
  });

  function onSubmit(data: z.infer<typeof VirtualSelectTariffSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        action: 'changeTariff',
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
          <input type="hidden" {...form.register('currentTariffId')} />
          <input type="hidden" {...form.register('tariffId')} />
          <input type="hidden" {...form.register('tariffType')} />
          <input type="hidden" {...form.register('term')} />
          <ModalHeader className="flex-shrink-0">
            <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
              Підтвердження зміни тарифу
            </ModalTitle>
            <ModalDescription className="hidden"></ModalDescription>
          </ModalHeader>
          <ModalInner className="flex flex-col justify-center w-full font-normal text-sm text-main-dark leading-main-lh space-y-4 flex-grow">
            <p>Ви замовляєте перехід на новий тариф</p>
            <div className="m-auto w-[280px]">
              <VirtualSelectBaseInfo tariff={tariff} />
            </div>
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
