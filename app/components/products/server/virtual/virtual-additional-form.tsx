'use client';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { startTransition, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ServerType } from '@/types/server';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
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
} from '@/components/ui/select-tab';
import { Textarea } from '@/components/ui/textarea';
import { Info } from '@/app/components/common/info';

const addList = [
  { key: 1, val: 'Встановлення програмного забезпечення' },
  { key: 2, val: 'Налаштування' },
  { key: 3, val: 'Питання по системі' },
  { key: 4, val: 'Питання по додатковому функціоналу' },
];
const additionalOrderSchema = z.object({
  thema: z.string().min(1),
  comment: z.string().min(1),
});
interface VirtualAdditionalFormProps {
  data: ServerType;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}
export const VirtualAdditionalForm = ({
  data,
  onClose,
}: VirtualAdditionalFormProps) => {
  const form = useForm<z.infer<typeof additionalOrderSchema>>({
    resolver: zodResolver(additionalOrderSchema),
    mode: 'onChange',
    defaultValues: {
      thema: '',
      comment: '',
    },
  });

  function onSubmit(data: z.infer<typeof additionalOrderSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        action: 'orderAdditionalServices',
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
          <ModalHeader className="flex-shrink-0">
            <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
              Допомога спеціаліста
            </ModalTitle>
            <ModalDescription className="hidden"></ModalDescription>
          </ModalHeader>
          <ModalInner className="max-w-[380px] m-auto flex flex-col justify-center w-full font-normal text-sm text-main-dark leading-main-lh flex-grow">
            <FormField
              control={form.control}
              name="thema"
              render={({ field }) => (
                <FormItem className="w-full sm:w-auto">
                  <FormLabel className="text-xs text-gray-dark font-normal">
                    Тема запиту
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value.toString()}
                  >
                    <FormControl className="bg-transparent py-[9px]">
                      <SelectTrigger className="bg-bg-color">
                        <SelectValue placeholder="Виберіть тему" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {addList.map((item) => (
                        <SelectItem key={item.key} value={item.key.toString()}>
                          {item.val}
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
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-xs text-gray-dark font-normal">
                    Ваш коментар
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Опишіть детально задачу, яку потрібно зробити"
                      className="resize-y bg-bg-color min-h-32"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Info>
              Оформлена заявка буде зберігатись в розділі заявки/задачі, де
              можна буде її переглядати та відслідковувати її прогрес.
            </Info>
          </ModalInner>

          <ModalFooter className="flex-col sm:flex-row-reverse justify-center gap-4 py-4 flex-shrink-0 self-end w-full">
            <Button type="submit" variant="default">
              Оформити заявку
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose(false, undefined)}
            >
              Відмінити
            </Button>
          </ModalFooter>
        </form>
      </Form>
    </>
  );
};
