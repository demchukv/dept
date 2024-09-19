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
import { startTransition } from 'react';
import { Button } from '@/components/ui/button';
import { ServerType } from '@/types/server';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';

const calcData = [
  {
    key: 1,
    server: 'AMD Ryzen',
    cpu: [
      {
        cpuId: 1,
        cpuName: '9 5900X 12C/24T 3.70GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 2,
        cpuName: '9 3900X 12C/24T 3.80GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 3,
        cpuName: '5 3600X 6C/12T 3.60GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
    ],
  },
  {
    key: 2,
    server: 'Intel Xeon E5',
    cpu: [
      {
        cpuId: 1,
        cpuName: '9 5900X 12C/24T 3.70GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 2,
        cpuName: '9 3900X 12C/24T 3.80GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 3,
        cpuName: '5 3600X 6C/12T 3.60GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
    ],
  },
  {
    key: 3,
    server: 'Intel Xeon E3',
    cpu: [
      {
        cpuId: 1,
        cpuName: '9 5900X 12C/24T 3.70GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 2,
        cpuName: '9 3900X 12C/24T 3.80GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 3,
        cpuName: '5 3600X 6C/12T 3.60GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
    ],
  },
  {
    key: 4,
    server: 'Intel Xeon',
    cpu: [
      {
        cpuId: 1,
        cpuName: '9 5900X 12C/24T 3.70GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 2,
        cpuName: '9 3900X 12C/24T 3.80GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 3,
        cpuName: '5 3600X 6C/12T 3.60GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
    ],
  },
  {
    key: 5,
    server: 'Intel Core',
    cpu: [
      {
        cpuId: 1,
        cpuName: '9 5900X 12C/24T 3.70GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 2,
        cpuName: '9 3900X 12C/24T 3.80GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 3,
        cpuName: '5 3600X 6C/12T 3.60GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
    ],
  },
  {
    key: 6,
    server: 'AMD Opteron',
    cpu: [
      {
        cpuId: 1,
        cpuName: '9 5900X 12C/24T 3.70GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 2,
        cpuName: '9 3900X 12C/24T 3.80GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 3,
        cpuName: '5 3600X 6C/12T 3.60GHz',
        memory: [
          { memoryId: 1, memoryName: '16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: '32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: '64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: '128 Gb DDR4 ECC' },
        ],
      },
    ],
  },
];

const diskData = [
  { dkey: 1, disk: '500 GB NVME' },
  { dkey: 2, disk: '950 GB NVME' },
  { dkey: 3, disk: '1920 GB NVME' },
  { dkey: 4, disk: '250 GB SSD' },
  { dkey: 5, disk: '500 GB SSD' },
  { dkey: 6, disk: '1000 GB SSD' },
  { dkey: 7, disk: '2000 GB SSD' },
  { dkey: 8, disk: '1000 GB HDD' },
  { dkey: 9, disk: '2000 GB HDD' },
  { dkey: 10, disk: '3000 GB HDD' },
  { dkey: 11, disk: '4000 GB HDD' },
];

const CalculatorSchema = z.object({
  serverId: z.number().min(1),
});
interface DedicatedCalculatorProps {
  data: ServerType;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}
export const DedicatedCalculator = ({
  data,
  onClose,
}: DedicatedCalculatorProps) => {
  const form = useForm<z.infer<typeof CalculatorSchema>>({
    resolver: zodResolver(CalculatorSchema),
    mode: 'onChange',
    defaultValues: {
      serverId: data.id,
    },
  });

  function onSubmit(data: z.infer<typeof CalculatorSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        action: 'calculator',
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

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col h-full"
        >
          <ModalHeader className="flex-shrink-0">
            <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
              Калькулятор індивідуальної конфігурації виділеного сервера
            </ModalTitle>
            <ModalDescription className="hidden"></ModalDescription>
          </ModalHeader>
          <ModalInner className="flex flex-col justify-center w-full font-normal text-sm text-main-dark leading-main-lh space-y-4 flex-grow">
            Calculate
          </ModalInner>

          <ModalFooter className="flex-col sm:flex-row justify-center gap-4 py-4 flex-shrink-0 self-end w-full">
            <Button type="submit" variant="default">
              Перенести
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onClose(false, undefined)}
            >
              Скасувати
            </Button>
          </ModalFooter>
        </form>
      </Form>
    </>
  );
};
