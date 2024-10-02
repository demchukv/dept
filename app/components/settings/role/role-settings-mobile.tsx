import React from 'react';
import { Card } from '@/app/components/card/card';
import { Separator } from '@/components/ui/separator';
import {
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
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface RoleSettingsProps {
  settingsData: any;
  accessList: any;
  form: any;
}
export const RoleSettingsMobile = ({
  settingsData,
  accessList,
  form,
}: RoleSettingsProps) => {
  //   const form = useForm({
  //     defaultValues: {
  //       settingsData: settingsData,
  //     },
  //   });

  //   const onSubmit = (data: any) => {
  //     console.log(data);
  //   };

  return (
    <>
      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}> */}
      <div className="flex flex-col gap-4">
        {settingsData.map((item: any, index: number) => (
          <Card
            key={index}
            className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8"
          >
            <div className="flex flex-col gap-2">
              <p className="text-main-color font-semibold text-base">
                {item.name}
              </p>
              {item.super && (
                <FormField
                  control={form.control}
                  name={`settingsData.${index}.super` as const}
                  render={({ field }) => (
                    <FormItem className="flex flex-row-reverse gap-2 items-center space-y-0 justify-end">
                      <FormLabel className="space-y-0">
                        Доступ суперадміністратора
                      </FormLabel>
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
                              name={
                                `settingsData.${index}.sub.${i}.values.view` as const
                              }
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl className="w-[110px]">
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
                                `settingsData.${index}.sub.${i}.values.view` as const
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
                        <p className="text-gray-dark">Додавання</p>
                        <div>
                          {subItem.type === 'select' && (
                            <FormField
                              control={form.control}
                              name={
                                `settingsData.${index}.sub.${i}.values.create` as const
                              }
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl className="w-[110px]">
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
                                `settingsData.${index}.sub.${i}.values.create` as const
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
                              name={
                                `settingsData.${index}.sub.${i}.values.edit` as const
                              }
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl className="w-[110px]">
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
                                `settingsData.${index}.sub.${i}.values.edit` as const
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
                        <p className="text-gray-dark">Видалення</p>
                        <div>
                          {subItem.type === 'select' && (
                            <FormField
                              control={form.control}
                              name={
                                `settingsData.${index}.sub.${i}.values.delete` as const
                              }
                              render={({ field }) => (
                                <FormItem>
                                  <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                  >
                                    <FormControl className="w-[110px]">
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
                                `settingsData.${index}.sub.${i}.values.delete` as const
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
      <div className="flex flex-col gap-3 mt-6">
        <Button type="submit" className="w-full">
          Застосувати зміни
        </Button>
        <Button
          type="button"
          variant="outline"
          className="border-0 hover:shadow-none w-full"
        >
          Скинути налаштування
        </Button>
      </div>
      {/* </form>
      </Form> */}
    </>
  );
};
