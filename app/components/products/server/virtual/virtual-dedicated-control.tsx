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
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { startTransition } from 'react';
import { Button } from '@/components/ui/button';
import { ServerType } from '@/types/server';

interface VirtualDedicatedControlProps {
  data: ServerType;
}
const rebootList = [
  { key: 1, value: 'Звичайний' },
  { key: 2, value: 'Не звичайний' },
];
const osList = [
  { key: 1, value: 'Ubuntu 20.04' },
  { key: 2, value: 'Debian 11' },
];
const restoreDateList = [
  { key: 1, value: '16.04.2024' },
  { key: 2, value: '26.04.2024' },
  { key: 3, value: '06.05.2024' },
  { key: 4, value: '16.05.2024' },
];
const serverAction = [
  { key: 1, value: 'Увімкнути' },
  { key: 2, value: 'Вимкнути' },
  { key: 3, value: 'Зупинити' },
];
const currentServerState = '1';

const rebootSchema = z.object({
  reboot: z.string().min(1),
});
const osSchema = z.object({
  os: z.string().min(1),
});
const restoreSchema = z.object({
  restoreDate: z.string().min(1),
});

export const VirtualDedicatedControl = ({
  data,
}: VirtualDedicatedControlProps) => {
  const rebootForm = useForm<z.infer<typeof rebootSchema>>({
    resolver: zodResolver(rebootSchema),
    mode: 'onChange',
    defaultValues: {
      reboot: '1',
    },
  });
  const osForm = useForm<z.infer<typeof osSchema>>({
    resolver: zodResolver(osSchema),
    mode: 'onChange',
    defaultValues: {
      os: '1',
    },
  });
  const restoreForm = useForm<z.infer<typeof restoreSchema>>({
    resolver: zodResolver(restoreSchema),
    mode: 'onChange',
    defaultValues: {
      restoreDate: '1',
    },
  });

  function onRebootSubmit(val: z.infer<typeof rebootSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...val,
        serverId: data.id,
        action: 'reboot',
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

  function onOsSubmit(val: z.infer<typeof osSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...val,
        serverId: data.id,
        action: 'selectOS',
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

  function onRestoreSubmit(val: z.infer<typeof restoreSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...val,
        serverId: data.id,
        action: 'restoreBackup',
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

  const switchServerState = (val: string) => {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        switch: val,
        serverId: data.id,
        action: 'switchServerState',
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
  };
  return (
    <>
      <div className="grid gap-x-14 gap-y-8 grid-cols-[auto_auto]">
        <div>
          <Form {...rebootForm}>
            <form
              onSubmit={rebootForm.handleSubmit(onRebootSubmit)}
              className="flex gap-3 items-end"
            >
              <FormField
                control={rebootForm.control}
                name="reboot"
                render={({ field }) => (
                  <FormItem className="max-w-[280px]">
                    <FormLabel className="text-[10px] text-gray-dark leading-none">
                      Спосіб перезавантаження:
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
                        {rebootList.map((item) => (
                          <SelectItem
                            key={item.key}
                            value={item.key.toString()}
                          >
                            {item.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="py-2.5">
                Перезавантажити
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <ToggleGroup
            type="single"
            variant="outline"
            className="gap-3 justify-start"
            defaultValue=""
            onValueChange={(value) => {
              if (value) switchServerState(value as string);
            }}
          >
            {serverAction.map((item: any) => (
              <ToggleGroupItem
                key={item.key}
                value={item.key}
                className="px-10 font-bold text-xs border-main-color text-white bg-main-color data-[state=on]:bg-white data-[state=on]:text-main-color"
                disabled={item.key.toString() === currentServerState}
              >
                {item.value}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
        <div>
          <Form {...restoreForm}>
            <form
              onSubmit={restoreForm.handleSubmit(onRestoreSubmit)}
              className="flex gap-3 items-end"
            >
              <FormField
                control={restoreForm.control}
                name="restoreDate"
                render={({ field }) => (
                  <FormItem className="max-w-[280px]">
                    <FormLabel className="text-[10px] text-gray-dark leading-none">
                      Дата відновлення:
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl className="bg-transparent py-[9px]">
                        <SelectTrigger>
                          <SelectValue placeholder="Виберіть дату відновлення" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {restoreDateList.map((item) => (
                          <SelectItem
                            key={item.key}
                            value={item.key.toString()}
                          >
                            {item.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="py-2.5">
                Відновити з бекапа
              </Button>
            </form>
          </Form>
        </div>
        <div>
          <Form {...osForm}>
            <form
              onSubmit={osForm.handleSubmit(onOsSubmit)}
              className="flex gap-3 items-end"
            >
              <FormField
                control={osForm.control}
                name="os"
                render={({ field }) => (
                  <FormItem className="max-w-[280px]">
                    <FormLabel className="text-[10px] text-gray-dark leading-none">
                      Бажана операційна система:
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value.toString()}
                    >
                      <FormControl className="bg-transparent py-[9px]">
                        <SelectTrigger>
                          <SelectValue placeholder="Виберіть ОС" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {osList.map((item) => (
                          <SelectItem
                            key={item.key}
                            value={item.key.toString()}
                          >
                            {item.value}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="py-2.5">
                Перевстановити ОС
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};
