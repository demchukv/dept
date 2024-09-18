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
import { startTransition, useState } from 'react';
import { ServerType } from '@/types/server';
import { Button } from '@/components/ui/button';
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
import { Icon } from '@/components/utils/icon';

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
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string>('');
  const [open, setOpen] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  const startUpload = (file: File) => {
    console.log(file);
  };

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
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(true)}
            className="py-2.5 w-full sm:w-auto"
          >
            Завантажити файл
            <Icon iconName="Upload" width={20} height={20} className="ml-2" />
          </Button>
          <Button type="submit" className="py-2.5 w-full sm:w-auto">
            Підключити образ
          </Button>
        </form>
      </Form>

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
            maxSize={800 * 1024 * 1024}
            multiple={false}
            // accept={{ 'text/*': [] }}
            accept={{ 'application/x-iso9660-image': ['.iso'] }}
            onValueChange={(value) => {
              setFiles(value);
              startUpload(value[0]);
            }}
          />

          {fileError !== '' && <ErrorMessage>{fileError}</ErrorMessage>}
        </DialogContent>
      </Dialog>
    </>
  );
};
