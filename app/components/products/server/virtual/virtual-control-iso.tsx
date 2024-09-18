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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { startTransition } from 'react';
import { ServerType } from '@/types/server';
import { Button } from '@/components/ui/button';
const imagesList = [
  { key: 1, value: 'Власний ISO' },
  { key: 2, value: 'Debian 11' },
];

const isoSchema = z.object({
  iso: z.string().min(1),
});

interface VirtualControlISOProps {
  data: ServerType;
}
export const VirtualControlISO = ({ data }: VirtualControlISOProps) => {
  const form = useForm<z.infer<typeof isoSchema>>({
    resolver: zodResolver(isoSchema),
    mode: 'onChange',
    defaultValues: {
      iso: '',
    },
  });

  function onSubmit(val: z.infer<typeof isoSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...val,
        serverId: data.id,
        action: 'installISO',
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
          className="flex flex-col sm:flex-row gap-3 items-center sm:items-end"
        >
          <FormField
            control={form.control}
            name="iso"
            render={({ field }) => (
              <FormItem className="w-full sm:max-w-[280px]">
                <FormLabel className="text-[10px] text-gray-dark leading-none">
                  Образ:
                </FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value.toString()}
                >
                  <FormControl className="bg-transparent py-[9px]">
                    <SelectTrigger>
                      <SelectValue placeholder="Спосіб перзавантаження" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {imagesList.map((item) => (
                      <SelectItem key={item.key} value={item.key.toString()}>
                        {item.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="py-2.5 w-full sm:w-auto">
            Підключити образ
          </Button>
        </form>
      </Form>
    </>
  );
};
