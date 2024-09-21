'use client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { startTransition, useState } from 'react';
import { Form } from '@/components/ui/form';
import { PhoneNumbers } from '@/types/call';
import {
  Modal,
  ModalContent,
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';

const transSchema = z.object({
  phoneNumberId: z.number().min(1),
});
export const MyNumberTransferInfo = ({ item }: { item: PhoneNumbers }) => {
  const [open, setOpen] = useState(false);

  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };

  const form = useForm<z.infer<typeof transSchema>>({
    resolver: zodResolver(transSchema),
    mode: 'onChange',
    defaultValues: {
      phoneNumberId: item.id,
    },
  });
  function onSubmit(vals: z.infer<typeof transSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...vals,
        action: 'stopTransferPhoneNumber',
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
      <Button
        type="button"
        variant="default"
        className="w-full sm:w-auto"
        onClick={() => setOpen(true)}
      >
        В процесі трансферу
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full flex flex-col"
            >
              <input type="hidden" {...form.register('phoneNumberId')} />
              <ModalHeader className="mb-6 flex-shrink-0">
                <ModalTitle className="text-center">
                  Відмінити трансфер номеру
                </ModalTitle>
                <ModalDescription className="hidden"></ModalDescription>
              </ModalHeader>
              <ModalInner className="h-full flex-grow">
                <p className="mb-5">
                  Передачу номера (трансфер) іншому користувачу буде відмінено.
                </p>
              </ModalInner>
              <ModalFooter className="w-full flex-shrink-0">
                <div className="w-full flex flex-col gap-4 sm:flex-row-reverse justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => onClose(false, undefined)}
                  >
                    Закрити
                  </Button>
                  <Button type="submit" className="w-full sm:w-auto">
                    Відмінити трансфер
                  </Button>
                </div>
              </ModalFooter>
            </form>
          </Form>
        </ModalContent>
      </Modal>
    </>
  );
};
