'use client';
import { Button } from '@/components/ui/button';
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
import { Info } from '@/app/components/common/info';

const transSchema = z.object({
  idType: z.string().min(1, 'Виберіть ID користувача або ЄДРПОУ компаніїї'),
  id: z.string().min(1, 'Вкажіть номер ID користувача або ЄДРПОУ компаніїї'),
});
export const MyNumberTransfer = ({ item }: { item: PhoneNumbers }) => {
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
      const values = {
        ...vals,
        numberId: item.id,
        action: 'transferPhoneNumber',
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
      form.reset();
    });
  }
  return (
    <>
      <Button
        type="button"
        variant={item.inTransfer ? 'default' : 'outline'}
        className="w-full sm:w-auto"
        onClick={() => setOpen(true)}
      >
        {item.inTransfer ? 'В процесі трансферу' : 'Передати'}
      </Button>

      <Modal open={open} onOpenChange={() => setOpen(false)}>
        <ModalContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="h-full flex flex-col"
            >
              <ModalHeader className="mb-6 flex-shrink-0">
                <ModalTitle>Передати номер</ModalTitle>
                <ModalDescription className="hidden"></ModalDescription>
              </ModalHeader>
              <ModalInner className="h-full flex-grow">
                <p className="mb-5">
                  Для зміни власника номера (трансферу) введіть ID нового
                  власника або ЄДРПОУ компанії, до якої передається номер.
                </p>
                <FormField
                  control={form.control}
                  name="idType"
                  render={({ field }) => (
                    <FormItem className="flex flex-col space-x-0 space-y-0 mb-5">
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
                    <FormItem className="mb-4 w-full sm:max-w-[300px]">
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
                <Info className="mt-0">
                  Важливо! При передаванні номера іншому користувачу/компанії,
                  номер буде перереєстрований на нового користувача/компанію у
                  оператора звʼязку.
                </Info>
              </ModalInner>
              <ModalFooter className="w-full flex-shrink-0">
                <div className="w-full flex flex-col gap-4 sm:flex-row-reverse justify-center">
                  <Button type="submit" className="w-full sm:w-auto">
                    Передати
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                    onClick={() => onClose(false, undefined)}
                  >
                    Скасувати
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
