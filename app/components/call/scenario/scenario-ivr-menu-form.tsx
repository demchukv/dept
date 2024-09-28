import { Card } from '@/app/components/card/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { startTransition } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { z } from 'zod';

const operationList = [
  {
    id: 'ivrmenu',
    name: 'IVR Меню',
  },
  {
    id: 'redirect',
    name: 'Переадресація',
  },
  {
    id: 'group',
    name: 'Виклик на групу',
  },
  {
    id: 'audio',
    name: 'Аудіофайл',
  },
];
const ivrMenuSchema = z.object({
  ivrMenuData: z.object({
    oneIvrItem: z
      .array(
        z.object({
          sortNumber: z.string().min(1, 'Вкажіть Номер'),
          operation: z.string().min(1, 'Вкажіть дію'),
          id: z.number().optional(),
        }),
      )
      .optional(),
  }),
});
interface ScenarioIvrMenuFormProps {
  ivrMenu: any;
  setIvrMenu: any;
}
export const ScenarioIvrMenuForm = ({
  ivrMenu,
  setIvrMenu,
}: ScenarioIvrMenuFormProps) => {
  const form = useForm<z.infer<typeof ivrMenuSchema>>({
    resolver: zodResolver(ivrMenuSchema),
    mode: 'onChange',
    defaultValues: {
      ivrMenuData: { oneIvrItem: ivrMenu },
    },
  });
  const {
    fields: fieldsIvrMenuItem,
    append: appendIvrMenuItem,
    remove: removeIvrMenuItem,
    move: moveIvrMenuItem,
  } = useFieldArray({
    control: form.control,
    name: 'ivrMenuData.oneIvrItem',
    keyName: 'bKey',
  });
  const deleteIvrMenu = () => {
    console.log('Видалити IVR Меню');
    setIvrMenu({});
  };

  function onSubmit(data: z.infer<typeof ivrMenuSchema>) {
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
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8 flex gap-4 items-center">
            <Accordion
              type="single"
              collapsible
              className="w-full flex flex-col gap-4 border-none p-0"
              defaultValue="ivrmenu"
            >
              <AccordionItem value="ivrmenu" className="p-0">
                <div className="w-full items-center flex gap-2.5 justify-stretch">
                  <Icon
                    iconName="DndIcon"
                    width={24}
                    height={24}
                    className="fill-main-dark flex-shrink-0 cursor-move"
                  />

                  <div className="w-full items-center flex flex-1 gap-2.5 justify-between">
                    <p className="text-base font-semibold leading-normal flex items-center justify-between whitespace-nowrap">
                      IVR Меню
                      <Button
                        type="button"
                        variant="ghost"
                        className="sm:hidden"
                        onClick={deleteIvrMenu}
                      >
                        <Icon
                          iconName="Trash"
                          width={24}
                          height={24}
                          className="fill-warning"
                        />
                      </Button>
                    </p>

                    <Button
                      type="button"
                      variant="ghost"
                      className="text-warning hidden sm:flex"
                      onClick={deleteIvrMenu}
                    >
                      Видалити
                    </Button>
                  </div>
                  <AccordionTrigger
                    className="p-0 ml-4 gap-1 sm:gap-9 flex-shrink-0 w-full"
                    headClassName="w-auto"
                  ></AccordionTrigger>
                </div>
                <AccordionContent className="border-t mt-8 pt-8">
                  {fieldsIvrMenuItem.map((field: any, i: number) => (
                    <React.Fragment key={i}>
                      <div
                        key={i}
                        className="flex items-center justify-between gap-3 bg-bg-color border border-gray-light rounded p-4 mb-4"
                      >
                        <div className="flex items-center gap-3">
                          <FormField
                            control={form.control}
                            name={`ivrMenuData.oneIvrItem.${i}.sortNumber`}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Sort" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {Array.from(
                                      { length: 5 },
                                      (_, si) => si + 1,
                                    ).map((si) => (
                                      <SelectItem
                                        key={si}
                                        value={si.toString()}
                                      >
                                        {si}
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
                            name={`ivrMenuData.oneIvrItem.${i}.operation`}
                            render={({ field }) => (
                              <FormItem>
                                <Select
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Оберіть дію" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    {operationList.map((operation) => (
                                      <SelectItem
                                        key={operation.id}
                                        value={operation.id}
                                      >
                                        {operation.name}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>

                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div>
                          <Button
                            type="button"
                            variant="ghost"
                            className="p-0 w-6 h-6 bg-transparent"
                            onClick={() => removeIvrMenuItem(i)}
                          >
                            <Icon
                              width={24}
                              height={24}
                              iconName="Trash"
                              className="fill-warning w-6 h-6 flex-shrink-0"
                            />
                          </Button>
                          <FormField
                            control={form.control}
                            name={`ivrMenuData.oneIvrItem.${i}.id`}
                            render={({ field }) => (
                              <FormItem className="space-y-1">
                                <FormControl>
                                  <Input type="hidden" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </React.Fragment>
                  ))}

                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="outline"
                      className="border-transparent text-main-color gap-1"
                      onClick={() =>
                        appendIvrMenuItem(
                          { sortNumber: '', operation: '', id: undefined },
                          { shouldFocus: true },
                        )
                      }
                    >
                      Додати варіант
                      <Icon
                        iconName="Plus"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </Button>
                    <Button type="submit">Зберегти</Button>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </form>
      </Form>
    </>
  );
};
