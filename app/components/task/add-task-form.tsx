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
import { startTransition, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';

import ReactQuill, { Quill } from 'react-quill-new';
// import dynamic from 'next/dynamic';
// import 'react-quill-new/dist/quill.snow.css';
import '@/public/styles/quill.css';

// const ReactQuill = dynamic(() => import('react-quill'), {
//   ssr: false
// });
// const ReactQuill = dynamic(import('react-quill'), {
//   ssr: false,
//   loading: () => <p>Loading editor...</p>,
// });

const addTaskSchema = z.object({
  title: z.string().min(1, 'Вкажіть назву завдання'),
  description: z.string().min(1, 'Вкажіть опис завдання'),
});
export const AddTaskForm = () => {
  const [isMounted, setIsMounted] = useState(false);
  const form = useForm<z.infer<typeof addTaskSchema>>({
    resolver: zodResolver(addTaskSchema),
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
    },
  });

  function onSubmit(data: z.infer<typeof addTaskSchema>) {
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

  const quillModules = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ font: [] }],
      // [{ header: [1, 2, 3, false] }],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ align: [] }],
      ['link'],
      // ['image'],
      // [{ color: [] }],
      ['code-block'],
      ['blockquote'],
      // ['clean'],
    ],
  };

  const quillFormats = [
    'bold',
    'italic',
    'underline',
    'strike',
    'font',
    'header',
    'blockquote',
    'list',
    'bullet',
    'link',
    'image',
    'align',
    'color',
    'code-block',
  ];

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                {isMounted ? (
                  <>
                    {/* <Toolbar /> */}
                    <ReactQuill
                      // modules={{ toolbar: '#toolbar' }}
                      modules={quillModules}
                      formats={quillFormats}
                      className="w-full h-[70%]"
                      {...field}
                    />
                  </>
                ) : (
                  <div>Editor loading...</div>
                )}
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row justify-between">
          <div>Options</div>
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
      </form>
    </Form>
  );
};

const Toolbar = () => {
  return (
    <div id="toolbar" className="border-0">
      <Button
        type="button"
        variant="default"
        className="ql-bold hover:text-main-color"
      >
        <Icon iconName="Academy" width={24} height={24} />
      </Button>
      <Button type="button" variant="ghost" className="ql-italic">
        I
      </Button>
      <Button type="button" variant="ghost" className="ql-underline">
        U
      </Button>
    </div>
  );
};
