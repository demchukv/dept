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
import { startTransition, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ServerType } from '@/types/server';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Separator } from '@/components/ui/separator';

const calcData = [
  {
    key: 1,
    server: 'AMD Ryzen',
    basePrice: 4800,
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
          { memoryId: 1, memoryName: 'x16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: 'x32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: 'x64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: 'x128 Gb DDR4 ECC' },
        ],
      },
      {
        cpuId: 3,
        cpuName: '5 3600X 6C/12T 3.60GHz',
        memory: [
          { memoryId: 1, memoryName: 'y16 Gb DDR4 ECC' },
          { memoryId: 2, memoryName: 'y32 Gb DDR4 ECC' },
          { memoryId: 3, memoryName: 'y64 Gb DDR4 ECC' },
          { memoryId: 4, memoryName: 'y128 Gb DDR4 ECC' },
        ],
      },
    ],
  },
  {
    key: 2,
    server: 'Intel Xeon E5',
    basePrice: 4900,
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
    basePrice: 4700,
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
    basePrice: 4600,
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
    basePrice: 4400,
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
    basePrice: 4500,
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
  const [serverId, setServerId] = useState<number>(0);
  const [cpuId, setCpuId] = useState<number>(0);
  const [memoryId, setMemoryId] = useState<number>(0);
  const [serverData, setServerData] = useState<any>({});
  const [cpuData, setCpuData] = useState<
    {
      cpuId: number;
      cpuName: string;
      memory: {
        memoryId: number;
        memoryName: string;
      }[];
    }[]
  >([]);
  const [memoryData, setMemoryData] = useState<
    { memoryId: number; memoryName: string }[]
  >([]);

  console.log('serverId', serverId, 'cpuId', cpuId, 'memoryId', memoryId);
  console.log('serverData: ', serverData);
  console.log('cpuData: ', cpuData);
  console.log('memoryData: ', memoryData);

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

  const changeSelectedServer = (value: string) => {
    const server = calcData.find((item) => item.key === Number(value));
    if (server) {
      setServerData(server);
      setCpuData(server.cpu);
    }
  };
  const changeSelectedCpu = (value: string) => {
    const cpu = cpuData.find((item) => item.cpuId === Number(value));
    if (cpu) {
      setMemoryData(cpu.memory);
    }
  };
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
          <ModalInner className="flex flex-col justify-start w-full font-normal text-sm text-main-dark leading-main-lh flex-grow">
            <p className="text-main-dark text-base font-medium mb-4">Сервер</p>
            <ToggleGroup
              type="single"
              variant="outline"
              className="flex-col sm:flex-row gap-3 justify-start w-full sm:w-auto mb-4"
              defaultValue="0"
              onValueChange={(value) => {
                if (value) {
                  setServerId(Number(value));
                  changeSelectedServer(value);
                  setCpuId(0);
                  setMemoryId(0);
                  setMemoryData([]);
                }
              }}
            >
              {calcData.map((item: any) => (
                <ToggleGroupItem
                  key={item.key}
                  value={item.key}
                  className="w-full sm:w-auto px-6 md:px-10 py-[11px] h-auto font-bold text-xs border-main-color text-main-color bg-white data-[state=on]:bg-main-color data-[state=on]:text-white disabled:bg-white disabled:text-gray-medium disabled:border-gray-medium"
                >
                  {item.key}-{item.server}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>

            <div className="flex justify-end mb-4">
              {serverData && (
                <span className="font-bold text-2xl leading-none">
                  {serverData.basePrice} грн
                </span>
              )}
            </div>

            <Separator className="mb-4" />

            <p className="text-main-dark text-base font-medium mb-4">
              Процесор
            </p>
            {cpuData && cpuData.length > 0 && (
              <ToggleGroup
                type="single"
                variant="outline"
                className="flex-col sm:flex-row gap-3 justify-start w-full sm:w-auto"
                defaultValue="0"
                onValueChange={(value) => {
                  if (value) {
                    setCpuId(Number(value));
                    changeSelectedCpu(value);
                    setMemoryId(0);
                  }
                }}
              >
                {cpuData.map((item: any) => (
                  <ToggleGroupItem
                    key={item.cpuId}
                    value={item.cpuId}
                    className="w-full sm:w-auto px-6 md:px-10 py-[11px] h-auto font-bold text-xs border-main-color text-main-color bg-white data-[state=on]:bg-main-color data-[state=on]:text-white disabled:bg-white disabled:text-gray-medium disabled:border-gray-medium"
                  >
                    {item.cpuId} - {item.cpuName}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}

            <Separator className="my-4" />

            <p className="text-main-dark text-base font-medium mb-4">
              Пам&#39;ять
            </p>
            {memoryData && memoryData.length > 0 && (
              <ToggleGroup
                type="single"
                variant="outline"
                className="flex-col sm:flex-row gap-3 justify-start w-full sm:w-auto"
                defaultValue="0"
                onValueChange={(value) => {
                  if (value) setMemoryId(Number(value));
                }}
              >
                {memoryData.map((item: any) => (
                  <ToggleGroupItem
                    key={item.memoryId}
                    value={item.memoryId}
                    className="w-full sm:w-auto px-6 md:px-10 py-[11px] h-auto font-bold text-xs border-main-color text-main-color bg-white data-[state=on]:bg-main-color data-[state=on]:text-white disabled:bg-white disabled:text-gray-medium disabled:border-gray-medium"
                  >
                    {item.memoryId} - {item.memoryName}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            )}
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
