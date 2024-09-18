'use client';
import { Button } from '@/components/ui/button';
import { ServerType } from '@/types/server';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { startTransition, useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Info } from '@/app/components/common/info';
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
  idType: z.string().min(1, 'Виберіть ID користувача або ЄДРПОУ компаніїї'),
  id: z.string().min(1, 'Вкажіть номер ID користувача або ЄДРПОУ компаніїї'),
});
interface HostingTransferProps {
  data: ServerType;
}
export const HostingTransfer = ({ data }: HostingTransferProps) => {
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };

  const form = useForm<z.infer<typeof transSchema>>({
    resolver: zodResolver(transSchema),
    mode: 'onChange',
    defaultValues: {
      idType: '',
      id: '',
    },
  });
  function onSubmit(vals: z.infer<typeof transSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = { ...vals, serverId: data.id, action: 'transferHosting' };
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
      setOpen(true);
      form.reset();
    });
  }

  return (
    <>
      <div className="flex flex-row items-end justify-between gap-4">
        <div>
          <p className="mb-4">
            Для зміни власника послуги (трансферу) введіть ID нового власника
            або ЄДРПОУ компанії, до якої вона передається.
          </p>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col"
            >
              <FormField
                control={form.control}
                name="idType"
                render={({ field }) => (
                  <FormItem className="flex flex-col space-x-0 space-y-0 mb-4">
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={String(field.value)}
                        className="flex flex-col"
                      >
                        <FormItem className="flex items-center space-y-0 gap-x-2 gap-y-3">
                          <FormControl>
                            <RadioGroupItem value="userId" />
                          </FormControl>
                          <FormLabel>ID користувача</FormLabel>
                        </FormItem>

                        <FormItem className="flex items-center space-y-0 gap-x-2 gap-y-3">
                          <FormControl>
                            <RadioGroupItem value="edrpou" />
                          </FormControl>
                          <FormLabel>ЄДРПОУ компанії</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="id"
                render={({ field }) => (
                  <FormItem className="mb-8 w-full sm:max-w-[300px]">
                    <FormControl>
                      <Input
                        {...field}
                        // disabled={isPending}
                        placeholder="Введіть номер"
                        type="text"
                        inputMode="numeric"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex flex-col sm:flex-row gap-4 items-center">
                <Button type="submit" className="w-full sm:w-auto">
                  Передати
                </Button>
                <Info>
                  Для зміни власника номера (трансферу) на електронну адресу
                  поточного власника буде направлено листа з підтвердженням
                  передачі. Після підтвердження дії, послуга хостингу зі всіма
                  даними в ній з&#39;явиться у списку послуг в особистому
                  кабінеті нового власника.
                </Info>
              </div>
            </form>
          </Form>
        </div>
      </div>

      <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
        <ModalContent className="grid grid-cols-1 gap-6">
          <ModalHeader className="flex-shrink-0">
            <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
              Передати послугу хостингу
            </ModalTitle>
            <ModalInner className="flex flex-col justify-center w-full font-normal text-sm text-main-dark leading-main-lh space-y-4 flex-grow">
              <p className="pt-6">
                Передачу послуги (трансфер) буде завершено після підтвердження
                дії через електронну пошту.
              </p>
            </ModalInner>
            <ModalDescription className="hidden"></ModalDescription>
          </ModalHeader>
        </ModalContent>
      </Modal>
    </>
  );
};
