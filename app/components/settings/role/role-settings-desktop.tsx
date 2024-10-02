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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface RoleSettingsDesktopProps {
  settingsData: any;
  accessList: any;
  form: any;
}
export const RoleSettingsDesktop = ({
  settingsData,
  accessList,
  form,
}: RoleSettingsDesktopProps) => {
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
      <Table className="mb-6 shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)]">
        <TableHeader>
          <TableRow>
            <TableHead className="bg-white text-sm text-gray-dark pl-6 rounded-tl">
              Розділ
            </TableHead>
            <TableHead className="bg-white text-sm text-gray-dark">
              Перегляд
            </TableHead>
            <TableHead className="bg-white text-sm text-gray-dark">
              Додавання
            </TableHead>
            <TableHead className="bg-white text-sm text-gray-dark">
              Редагування
            </TableHead>
            <TableHead className="bg-white text-sm text-gray-dark pr-6 rounded-tr">
              Видалення
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {settingsData.map((invoice: any, index: number) => (
            <TableRow key={index} className="even:bg-white">
              <TableCell className="pl-6">first</TableCell>
              <TableCell>Second</TableCell>
              <TableCell>third</TableCell>
              <TableCell>Four</TableCell>
              <TableCell className="pr-6">Five</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell
              className="bg-white px-6 rounded-bl rounded-br"
              colSpan={5}
            >
              <div className="flex flex-row justify-end gap-3">
                <Button type="submit">Застосувати зміни</Button>
                <Button
                  type="button"
                  variant="outline"
                  className="border-0 hover:shadow-none"
                >
                  Скинути налаштування
                </Button>
              </div>
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
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

      {/* </form>
    </Form> */}
    </>
  );
};
