'use client';
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
import { ServerType } from '@/types/server';
import { startTransition } from 'react';
import { DatePicker } from '@/app/components/common/date-picker';
import { formatISO } from 'date-fns';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-tab';
import { Button } from '@/components/ui/button';
import { Info } from '@/app/components/common/info';

const orderKvmSchema = z.object({
  serverId: z.number().min(1),
  date: z.date().min(new Date()),
  startTime: z.string().min(1),
  endTime: z.string().min(1),
});
interface DedicatedOrderKvmFormProps {
  data: ServerType;
}
export const DedicatedOrderKvmForm = ({ data }: DedicatedOrderKvmFormProps) => {
  const form = useForm({
    resolver: zodResolver(orderKvmSchema),
    mode: 'onChange',
    defaultValues: {
      serverId: data.id,
      date: new Date(),
      startTime: '0',
      endTime: '0',
    },
  });

  function onSubmit(data: z.infer<typeof orderKvmSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        serverId: data.serverId,
        date: formatISO(data.date),
        action: 'orderKVMRequest',
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
          className="grid grid-cols-1 sm:grid-cols-2 sm:gap-3 md:grid-cols-4"
        >
          <div>
            <FormLabel
              htmlFor="date"
              className="font-normal text-[10px] text-gray-dark leading-none mb-2"
            >
              Дата підключення KVM:
            </FormLabel>

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col mb-4">
                  <FormControl>
                    <DatePicker
                      selected={field.value}
                      onSelect={(value: Date) => {
                        field.onChange(value);
                      }}
                      disabled={(date) => date < new Date()}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div>
            <FormLabel
              htmlFor="startTime"
              className="font-normal text-[10px] text-gray-dark leading-none mb-2"
            >
              Часовий інтервал коли надати KVM:
            </FormLabel>
            <div className="flex gap-2 justify-between items-center mb-4">
              <FormField
                control={form.control}
                name="startTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-3">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex-shrink-0 font-medium text-base text-gray-dark">
                &#8212;
              </div>
              <FormField
                control={form.control}
                name="endTime"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="py-3">
                          <SelectValue placeholder="" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Array.from({ length: 24 }).map((_, i) => (
                          <SelectItem key={i} value={i.toString()}>
                            {i}:00
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type="submit" className="md:self-center">
            Підключити KVM
          </Button>

          <Info>
            Після підключення KVM нашими спеціалістами ви отримаєте лист із
            адресою, логіном та паролем для підключення на свій email.
          </Info>
        </form>
      </Form>
    </>
  );
};
