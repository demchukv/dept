import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '@/app/components/common/modal';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Info } from '@/app/components/common/info';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { startTransition } from 'react';
import { Checkbox } from '@/components/ui/checkbox';

const orderSettingShema = z.object({
  text: z.string().min(1, 'Вкажіть текст повідослення'),
  products: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'Виберіть хоча би один товар, що потрребує налаштування',
  }),
});
interface OrderSettingsProps {
  order: any;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}
export const OrderSettings = ({ order, onClose }: OrderSettingsProps) => {
  const form = useForm<z.infer<typeof orderSettingShema>>({
    resolver: zodResolver(orderSettingShema),
    mode: 'onChange',
    defaultValues: {
      text: '',
      products: [],
    },
  });

  function onSubmit(data: z.infer<typeof orderSettingShema>) {
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
        className="flex flex-col h-full"
      >
        <ModalHeader className="mt-6 flex-shrink-0 self-start mb-6">
          <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
            Налаштування до товарів із замовлення{' '}
            <span className="text-main-color">№{order.number}</span>
          </ModalTitle>
          <ModalDescription className="hidden"></ModalDescription>
        </ModalHeader>
        <div className="font-normal text-sm text-main-dark leading-main-lh space-y-4 self-start flex-grow">
          <p className="font-semibold">
            Товари, до яких надаються послуги з налаштування
          </p>

          {order.products.map((item: any) => (
            <FormField
              key={item.id}
              control={form.control}
              name="products"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value) => value !== item.id,
                                ),
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {item.name}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}

          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ваш коментар</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Опишіть детально задачу, яку потрібно зробити"
                    className="resize-y"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Info>
            Оформлена заявка буде зберігатись в розділі{' '}
            <Link href="task" className="text-main-color font-semibold">
              заявки/задачі
            </Link>
            , де можна буде її переглядати та відслідковувати її прогрес.
          </Info>
        </div>
        <ModalFooter className="flex-col sm:flex-row justify-center gap-4 py-4 flex-shrink-0 self-end w-full">
          <Button type="submit" variant="default">
            Оформити заявку
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
