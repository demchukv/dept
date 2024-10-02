import React from 'react';
import { Card, CardHeader } from '@/app/components/card/card';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Separator } from '@/components/ui/separator';
import {
  Form,
  FormControl,
  FormDescription,
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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface RoleSettingsProps {
  settingsData: any;
  roleSettingsSchema: any;
  accessList: any;
  accessListBoolean: boolean[];
}
export const RoleSettingsMobile = ({
  settingsData,
  roleSettingsSchema,
  accessList,
  accessListBoolean,
}: RoleSettingsProps) => {
  const form = useForm({
    defaultValues: settingsData,
  });
  console.log(settingsData);
  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          {settingsData.map((item: any, index: number) => (
            <Card
              key={index}
              className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8"
            >
              <p className="text-main-color font-semibold text-base">
                {item.name}
              </p>
              <Separator className="my-4" />
              {item.sub.length > 0 && (
                <>
                  {item.sub.map((subItem: any, i: number) => (
                    <React.Fragment key={i}>
                      {i > 0 && <Separator className="my-4" />}
                      <div className="flex flex-col gap-3">
                        <p className="font-semibold">{subItem?.name}</p>
                        <div className="flex gap-3 items-center justify-between">
                          <p className="text-gray-dark">Перегляд</p>
                          <div>
                            {subItem.type === 'select' && (
                              <FormField
                                control={form.control}
                                name={`${index}.sub.${i}.values.view` as const}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {accessList.map(
                                          (item: object, key: number) => (
                                            <SelectItem
                                              key={Object.keys(item)[0]}
                                              value={Object.keys(item)[0]}
                                            >
                                              {Object.values(item)[0]}
                                            </SelectItem>
                                          ),
                                        )}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                            {subItem.type === 'checkbox' && (
                              <FormField
                                control={form.control}
                                name={`${index}.sub.${i}.values.view` as const}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3 items-center justify-between">
                          <p className="text-gray-dark">Додавання</p>
                          <div>
                            {subItem.type === 'select' && (
                              <FormField
                                control={form.control}
                                name={
                                  `${index}.sub.${i}.values.create` as const
                                }
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {accessList.map(
                                          (item: object, key: number) => (
                                            <SelectItem
                                              key={Object.keys(item)[0]}
                                              value={Object.keys(item)[0]}
                                            >
                                              {Object.values(item)[0]}
                                            </SelectItem>
                                          ),
                                        )}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                            {subItem.type === 'checkbox' && (
                              <FormField
                                control={form.control}
                                name={
                                  `${index}.sub.${i}.values.create` as const
                                }
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3 items-center justify-between">
                          <p className="text-gray-dark">Редагування</p>
                          <div>
                            {subItem.type === 'select' && (
                              <FormField
                                control={form.control}
                                name={`${index}.sub.${i}.values.edit` as const}
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {accessList.map(
                                          (item: object, key: number) => (
                                            <SelectItem
                                              key={Object.keys(item)[0]}
                                              value={Object.keys(item)[0]}
                                            >
                                              {Object.values(item)[0]}
                                            </SelectItem>
                                          ),
                                        )}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                            {subItem.type === 'checkbox' && (
                              <FormField
                                control={form.control}
                                name={`${index}.sub.${i}.values.edit` as const}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        </div>
                        <div className="flex gap-3 items-center justify-between">
                          <p className="text-gray-dark">Видалення</p>
                          <div>
                            {subItem.type === 'select' && (
                              <FormField
                                control={form.control}
                                name={
                                  `${index}.sub.${i}.values.delete` as const
                                }
                                render={({ field }) => (
                                  <FormItem>
                                    <Select
                                      onValueChange={field.onChange}
                                      defaultValue={field.value}
                                    >
                                      <FormControl>
                                        <SelectTrigger>
                                          <SelectValue placeholder="" />
                                        </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                        {accessList.map(
                                          (item: object, key: number) => (
                                            <SelectItem
                                              key={Object.keys(item)[0]}
                                              value={Object.keys(item)[0]}
                                            >
                                              {Object.values(item)[0]}
                                            </SelectItem>
                                          ),
                                        )}
                                      </SelectContent>
                                    </Select>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                            )}
                            {subItem.type === 'checkbox' && (
                              <FormField
                                control={form.control}
                                name={
                                  `${index}.sub.${i}.values.delete` as const
                                }
                                render={({ field }) => (
                                  <FormItem>
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                  </FormItem>
                                )}
                              />
                            )}
                          </div>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </>
              )}
            </Card>
          ))}
        </div>
        <Button type="submit">Зберегти</Button>
      </form>
    </Form>
  );
};
