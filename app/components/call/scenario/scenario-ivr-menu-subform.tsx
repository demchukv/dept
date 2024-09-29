import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { Icon } from '@/components/utils/icon';
import React from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { ScenarioIvrMenuSubaudio } from './scenario-ivr-menu-subaudio';

const subOperationList = [
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
interface ScenarioIvrMenuSubformProps {
  form: any;
  fieldsIvrMenuItem: any;
  index: number;
}
export const ScenarioIvrMenuSubform = ({
  form,
  fieldsIvrMenuItem,
  index,
}: ScenarioIvrMenuSubformProps) => {
  const {
    fields: subFields,
    append: appendIvrMenuItem,
    remove: removeIvrMenuItem,
    move: moveIvrMenuItem,
  } = useFieldArray({
    control: form.control,
    name: `ivrMenuData.oneIvrItem.${index}.subMenu`,
    keyName: 'bKey',
  });

  return (
    <>
      {subFields.map((field: any, i: number) => (
        <React.Fragment key={i}>
          <div key={i} className="flex flex-col gap-3 mb-4">
            <Collapsible className="flex flex-col gap-3">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <FormField
                    control={form.control}
                    name={`ivrMenuData.oneIvrItem.${index}.subMenu.${i}.sortNumber`}
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
                            {Array.from({ length: 5 }, (_, si) => si + 1).map(
                              (si) => (
                                <SelectItem key={si} value={si.toString()}>
                                  {si}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`ivrMenuData.oneIvrItem.${index}.subMenu.${i}.operation`}
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
                            {subOperationList.map((operation) => (
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
                <div className="flex flex-shrink-0 gap-3 items-center justify-between">
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
                    name={`ivrMenuData.oneIvrItem.${index}.subMenu.${i}.id`}
                    render={({ field }) => (
                      <FormItem className="space-y-1">
                        <FormControl>
                          <Input type="hidden" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {form.getValues(
                    `ivrMenuData.oneIvrItem.${index}.subMenu.${i}.operation` ===
                      'audio',
                  ) && (
                    <CollapsibleTrigger>
                      <Icon width={24} height={24} iconName="ArrowDown" />
                    </CollapsibleTrigger>
                  )}
                </div>
              </div>
              <CollapsibleContent>
                {form.getValues(`ivrMenuData.oneIvrItem.${i}.operation`) ===
                  'audio' && (
                  <div className="border-l border-gray-light pl-3">
                    <ScenarioIvrMenuSubaudio
                      form={form}
                      fieldsIvrMenuItem={fieldsIvrMenuItem}
                    />
                  </div>
                )}
              </CollapsibleContent>
            </Collapsible>
          </div>
        </React.Fragment>
      ))}

      <div className="flex items-center justify-between">
        <Button
          type="button"
          variant="outline"
          className="border-transparent bg-transparent shadow-none hover:text-main-dark px-0 text-main-color gap-1"
          onClick={() =>
            appendIvrMenuItem(
              { sortNumber: '', operation: '', id: undefined },
              { shouldFocus: true },
            )
          }
        >
          Додати варіант
          <Icon iconName="Plus" width={20} height={20} className="w-5 h-5" />
        </Button>
        {/* <Button type="submit">Зберегти</Button> */}
      </div>
    </>
  );
};
