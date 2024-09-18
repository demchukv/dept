'use client';
import { ServerType, sshKeyType } from '@/types/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { TooltipShow } from '@/app/components/common/tooltip-show';
import { startTransition, useState } from 'react';
import { toast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FileUploader } from '@/app/components/common/file-uploader';
import { ErrorMessage } from '@/app/components/common/error-message';

const addKeyShema = z.object({
  serverId: z.number().min(1),
  serverType: z.string().min(1),
  sshAccess: z.boolean(),
  keyText: z.string().optional(),
});
interface VirtualAccessProps {
  data: ServerType;
}
export const VirtualAccess = ({ data }: VirtualAccessProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>('');
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof addKeyShema>>({
    resolver: zodResolver(addKeyShema),
    mode: 'onChange',
    defaultValues: {
      serverId: data.id,
      serverType: data.type,
      sshAccess: false,
      keyText: '',
    },
  });

  const deleteKey = (id: number) => {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        serverId: data.id,
        serverType: data.type,
        keyId: id,
        action: 'deleteKey',
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

  const refreshKey = (id: number) => {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        serverId: data.id,
        serverType: data.type,
        keyId: id,
        action: 'refreshKey',
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
  function onSubmit(data: z.infer<typeof addKeyShema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = { ...data, action: 'addNewSSHKey' };
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

  const resetRootPassword = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        serverId: data.id,
        serverType: data.type,
        action: 'resetRootPassword',
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
    <div className="max-w-full">
      <p className="font-semibold mb-4">Додані SSH ключі</p>
      <Table className="hidden sm:table max-w-full border border-bg-color rounded-[6px] mb-8">
        <TableHeader>
          <TableRow>
            <TableHead className=" font-normal text-sm leading-main-lh rounded-tl">
              Назва
            </TableHead>
            <TableHead className=" font-normal text-sm leading-main-lh">
              SSH ключ
            </TableHead>
            <TableHead className=" font-normal text-sm leading-main-lh">
              Використано
            </TableHead>
            <TableHead className=" font-normal text-sm leading-main-lh whitespace-nowrap">
              Термін дії
            </TableHead>
            <TableHead className=" font-normal text-sm leading-main-lhtext-right"></TableHead>
            <TableHead className=" font-normal text-sm leading-main-lhtext-right rounded-tr"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.virtual?.sshKey?.map((item: sshKeyType) => (
            <TableRow key={item.id}>
              <TableCell className="font-semibold text-sm text-main-color leading-none whitespace-nowrap">
                {item.name}
              </TableCell>
              <TableCell className="font-normal text-sm leading-none break-all ">
                <div className="max-h-11 overflow-hidden">{item.key}</div>
              </TableCell>
              <TableCell className="font-normal text-sm leading-none whitespace-nowrap">
                {item.used}
              </TableCell>
              <TableCell className="font-normal text-sm leading-none whitespace-nowrap">
                {item.expired}
              </TableCell>
              <TableCell>
                <TooltipShow
                  content={
                    <p className="text-xs leading-[1.33] max-w-48">
                      При оновленні терміну дії ключа його буде подовжено на 365
                      днів
                    </p>
                  }
                >
                  <Button
                    variant="ghost"
                    className="text-dark-color hover:text-main-color"
                    onClick={() => refreshKey(item.id)}
                  >
                    <Icon iconName="Refresh" width={24} height={24} />
                  </Button>
                </TooltipShow>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-warning hover:text-dark-color"
                  onClick={() => deleteKey(item.id)}
                >
                  <Icon iconName="Trash" width={24} height={24} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-4 mb-8  sm:hidden">
        {data.virtual?.sshKey?.map((item: sshKeyType) => (
          <div
            key={item.id}
            className="border border-gray-light rounded overflow-hidden"
          >
            <Table className="max-w-full text-sm border border-bg-color rounded-[6px]">
              <TableBody>
                <TableRow className="bg-bg-color even:bg-transparent">
                  <TableCell className="text-sm">Назва</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-semibold text-sm text-main-color">
                        {item.name}
                      </span>
                      <Button
                        variant="ghost"
                        className="text-warning hover:text-dark-color"
                        onClick={() => deleteKey(item.id)}
                      >
                        <Icon iconName="Trash" width={24} height={24} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-white even:bg-transparent">
                  <TableCell className="text-sm">SSH ключ</TableCell>
                  <TableCell className="break-all">
                    <div className="max-h-11 overflow-hidden">{item.key}</div>
                  </TableCell>
                </TableRow>
                <TableRow className="bg-bg-color even:bg-transparent">
                  <TableCell className="text-sm">Дата</TableCell>
                  <TableCell className="text-sm">{item.used}</TableCell>
                </TableRow>
                <TableRow className="bg-white even:bg-transparent">
                  <TableCell className="text-sm">Термін дії</TableCell>
                  <TableCell className="text-sm">
                    <div className="flex items-center justify-between gap-2">
                      <span>{item.expired}</span>
                      <Button
                        variant="ghost"
                        className="text-main-color hover:text-dark-color"
                        onClick={() => refreshKey(item.id)}
                      >
                        <Icon iconName="Refresh" width={24} height={24} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        ))}
      </div>

      {(!data.virtual?.sshKey || data.virtual?.sshKey?.length === 0) && (
        <p className="font-semibold text-center">
          У вас ще немає доданих SSH ключів
        </p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col w-full sm:w-[60%] lg:w-[50%]">
            <FormField
              control={form.control}
              name="sshAccess"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-normal text-sm text-main-dark">
                      Доступ по SSH
                    </FormLabel>
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keyText"
              render={({ field }) => (
                <FormItem className="mb-3">
                  <FormLabel className="font-semibold text-sm text-main-dark flex justify-between sm:justify-start">
                    Вставте ключ{' '}
                    <span className="hidden sm:inline px-2"> у поле нижче</span>{' '}
                    або &nbsp;
                    <Link
                      href="#"
                      onClick={() => setOpen(true)}
                      className="text-main-color flex items-center gap-1"
                    >
                      Завантажте файл
                      <Icon
                        iconName="Download"
                        width={20}
                        height={20}
                        className="sm:hidden"
                      />
                    </Link>
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Введіть кожен ключ з нового рядка"
                      className="resize-y bg-bg-color"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Залиште це поле пустим, якщо не плануєте використовувати
                    авторизацію з допомогою ключа
                  </FormDescription>

                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="button"
              variant="default"
              className="w-full sm:w-auto mb-7 self-end"
            >
              Додати ключ
            </Button>
          </div>

          <div className="flex flex-col gap-7 items-center sm:flex-row sm:justify-between">
            <Link
              href="#"
              className="text-main-color font-semibold"
              onClick={(e) => resetRootPassword(e)}
            >
              Скинути Root-пароль
            </Link>

            <Button
              type="submit"
              variant="default"
              className="w-full sm:w-auto"
            >
              Зберегти зміни
            </Button>
          </div>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="hidden"></DialogTrigger>
            <DialogContent className="sm:max-w-xl">
              <DialogHeader>
                <DialogTitle>Завантажити файл(и)</DialogTitle>
                <DialogDescription>
                  Перетягніть файли сюда або клацніть для вибору
                </DialogDescription>
              </DialogHeader>
              <FileUploader
                maxFileCount={1}
                maxSize={1 * 1024 * 1024}
                multiple={false}
                accept={{ 'text/*': [] }}
                onValueChange={(value) => {
                  try {
                    const fileReader = new FileReader();
                    fileReader.readAsText(value[0], 'UTF-8');
                    fileReader.onload = () => {
                      if (fileReader.result) {
                        form.setValue('keyText', fileReader.result.toString());
                      }
                      setOpen(false);
                    };
                    setFileError('');
                  } catch (e) {
                    console.log(e);
                    setFileError(
                      'Помилка завантаження файлу. Ви можете завантажити лише текстові файли.',
                    );
                  }
                }}
              />
              {fileError !== '' && <ErrorMessage>{fileError}</ErrorMessage>}
            </DialogContent>
          </Dialog>
        </form>
      </Form>
    </div>
  );
};
