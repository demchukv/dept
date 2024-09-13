'use client';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { startTransition, useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { DatePicker } from '@/app/components/common/date-picker';
import { formatISO } from 'date-fns';
import { Modal, ModalContent } from '@/app/components/common/modal-new';
import Image from 'next/image';

import { Editor } from '@/components/editor';
import { Separator } from '@/components/ui/separator';
import { SelectTaskTemplate } from '@/app/components/task/select-task-template';
import React from 'react';

export const addTaskSchema = z.object({
  title: z.string().min(1, 'Вкажіть назву завдання'),
  description: z.string().min(1, 'Вкажіть опис завдання'),
  deadline: z.date(),
  file: z.instanceof(FileList).optional(),
  taskTemplate: z.string().optional(),
});

export const AddTaskForm = () => {
  const [multipleFiles, setMultipleFiles] = useState<string[]>([]);
  const [files, setFiles] = useState<Record<string, File>>();
  const [open, setOpen] = useState(false);
  const onClose = (state: boolean, e: React.MouseEvent | undefined) => {
    if (e) e.preventDefault();
    setOpen(state);
  };

  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      deadline: new Date(),
      taskTemplate: '',
    },
  });
  const fileRef = form.register('file', { required: false });

  const deleteFile = (name: string) => {
    setFiles((prev) => {
      const newFiles = { ...prev };
      delete newFiles[name];
      return newFiles;
    });
    setMultipleFiles((prev) => {
      const newFiles = [...prev];
      newFiles.splice(prev.indexOf(name), 1);
      return newFiles;
    });
  };
  const changeMultipleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files);
    if (
      e.target.files !== null &&
      e.target instanceof HTMLInputElement &&
      e.target.files?.length > 0
    ) {
      const currentFile = e.target.files[0];
      setFiles((prev) => ({
        ...prev,
        [currentFile.name]: currentFile,
      }));
      const fileArray = Array.from(e.target.files).map((file) =>
        URL.createObjectURL(file),
      );
      setMultipleFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };
  // console.log(files);
  function onSubmit(data: z.infer<typeof addTaskSchema>) {
    startTransition(() => {
      //TODO: make API request and setData

      const values = {
        ...data,
        deadline: formatISO(data.deadline),
        blob: multipleFiles,
        file: files ? Object.values(files) : [],
      };

      console.log(values);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex justify-between items-center">
                  Введіть назву заявки
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-main-color gap-0.5"
                    onClick={() => setOpen(true)}
                  >
                    <Icon iconName="Bolt" width={20} height={20} />
                    Створити за шаблоном
                  </Button>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Введіть назву заявки/задачі"
                    {...field}
                    type="text"
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="hidden">Введіть опис заявки</FormLabel>
                <FormControl>
                  <Editor field={field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col sm:flex-row justify-between">
            <div className="flex flex-col gap-8">
              <div className="flex flex-col gap-6">
                <>
                  {files && Object.keys(files).length > 0 && (
                    <div className="grid grid-cols-[42px_auto_20px] gap-2 font-semibold text-sm leading-main-lh">
                      {Object.keys(files).map((file) => (
                        <React.Fragment key={file}>
                          <div className="w-[42px] h-[42px] overflow-hidden rounded border border-main-color">
                            {files[file].type.includes('image') && (
                              <Image
                                src={URL.createObjectURL(files[file])}
                                alt={file}
                                width={42}
                                height={42}
                                className="object-contain aspect-auto"
                              />
                            )}
                          </div>
                          <span className="self-center">{file}</span>
                          <Button
                            variant="ghost"
                            type="button"
                            onClick={() => {
                              deleteFile(file);
                            }}
                            className="text-warning w-5 h-5 self-center"
                          >
                            <Icon iconName="Trash" width={20} height={20} />
                          </Button>
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </>
                <div className="flex gap-6 sm:gap-8 justify-between sm:justify-start items-center">
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel className="flex justify-start gap-1 font-semibold text-sm text-main-dark hover:text-main-color px-0 py-0 cursor-pointer">
                            <Icon
                              iconName="Attachment"
                              width={20}
                              height={20}
                            />{' '}
                            Додати
                            <span className="hidden sm:inline"> файл</span>
                            <FormControl className="sr-only">
                              <Input
                                type="file"
                                {...fileRef}
                                multiple
                                onChange={changeMultipleFiles}
                              />
                            </FormControl>
                          </FormLabel>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <Button
                    type="button"
                    variant="ghost"
                    className="flex justify-start gap-1 font-semibold text-sm text-main-dark hover:text-main-color px-0 py-0"
                  >
                    <Icon iconName="Mention" width={20} height={20} /> Відмітити
                    <span className="hidden sm:inline"> колегу</span>
                  </Button>
                  <Button
                    type="button"
                    variant="ghost"
                    className="flex justify-start gap-1 font-semibold text-sm text-main-dark hover:text-main-color px-0 py-0"
                  >
                    <Icon iconName="CheckList" width={20} height={20} />{' '}
                    <span className="hidden sm:inline">Додати чек лист</span>
                    <span className="inline sm:hidden">Чек лист</span>
                  </Button>
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem className="flex flex-col sm:flex-row sm:gap-8 sm:items-center">
                        <FormLabel className="font-normal sm:font-semibold text-xs sm:text-base text-gray-dark sm:text-main-dark leading-none sm:leading-normal whitespace-nowrap text-left">
                          Крайній термін:
                        </FormLabel>
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
              </div>
              <div className="flex flex-col gap-2 sm:gap-6">
                <p className="font-semibold text-base text-main-dark leading-normal whitespace-nowrap">
                  Пов&#39;язані товари
                </p>
                <div>В заявці ще не має пов&#39;язаних товарів</div>
                <Button
                  variant="ghost"
                  type="button"
                  className="flex-row-reverse sm:flex-row items-center text-main-color justify-end sm:justify-start"
                >
                  <Icon iconName="Plus" width={20} height={20} />
                  додати пов&#39;язаний товар
                </Button>
              </div>
            </div>
            <Separator className="my-4 sm:hidden" />
            <div className="flex flex-col">
              <Button variant="default" type="submit">
                Зберегти
              </Button>
              <Button
                variant="destructive"
                type="button"
                asChild
                className="border-0 text-warning bg-white"
              >
                <Link href="/task">
                  <Icon iconName="DeleteCircle" width={20} height={20} />
                  скасувати заявку
                </Link>
              </Button>
            </div>
          </div>
          <Modal open={open} onOpenChange={() => onClose(false, undefined)}>
            <ModalContent className="grid grid-cols-1 gap-6">
              <SelectTaskTemplate
                onClose={() => onClose(false, undefined)}
                form={form}
              />
            </ModalContent>
          </Modal>
        </form>
      </Form>
    </>
  );
};
