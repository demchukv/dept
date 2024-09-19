'use client';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalInner,
} from '@/app/components/common/modal-new';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Form } from '@/components/ui/form';
import { startTransition } from 'react';
import React from 'react';
import { domainType } from '@/types/domain';

const disconnectDomainShema = z.object({
  domainId: z.number().min(1),
});
interface DisconnectDomainProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
  data: domainType;
}
export const DomainCancel = ({ onClose, data }: DisconnectDomainProps) => {
  const form = useForm<z.infer<typeof disconnectDomainShema>>({
    resolver: zodResolver(disconnectDomainShema),
    mode: 'onChange',
    defaultValues: {
      domainId: data.id,
    },
  });

  function onSubmit(data: z.infer<typeof disconnectDomainShema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = { ...data, action: 'cancelDomain' };
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
        <ModalHeader className="flex-shrink-0">
          <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
            Скасувати послугу
          </ModalTitle>
          <ModalDescription className="hidden"></ModalDescription>
        </ModalHeader>

        <ModalInner className="flex items-center w-full font-normal text-base text-main-dark leading-main-lh space-y-4 self-center flex-grow">
          <input type="hidden" {...form.register('domainId')} />
          <p className="mb-3">
            Ви справді бажаєте скасувати послугу:{' '}
            <span className="font-medium">{data.domain}?</span>
          </p>
        </ModalInner>

        <ModalFooter className="flex-col sm:flex-row justify-center gap-4 py-4 flex-shrink-0 self-end w-full">
          <Button type="submit" variant="default">
            Продовжити
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
