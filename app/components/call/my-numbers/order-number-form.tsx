import z, { number } from 'zod';
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
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useTransition } from 'react';
import { toast } from '@/components/ui/use-toast';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardHeader } from '@/app/components/card/card';
import Image from 'next/image';
import { FlagType } from '@/types/call';
import { Separator } from '@/components/ui/separator';
import { Info } from '../../common/info';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { Loading } from '@/app/components/common/loading';

type phoneNumbersType = {
  id: number;
  name: string;
};
const callOperatorsForCountry = [
  { id: 0, name: 'Не має значення', codes: [] },
  { id: 1, name: 'Kyivstar', codes: ['96', '67'] },
  { id: 2, name: 'Vodafone', codes: ['95', '50'] },
  { id: 3, name: 'Lifecell', codes: ['73'] },
];

const foundedNumbers: phoneNumbersType[] = [
  { id: 1, name: '096 787 55 63' },
  { id: 2, name: '096 787 43 78' },
  { id: 3, name: '096 787 27 55' },
  { id: 4, name: '096 787 49 01' },
];

const orderNumberSchema = z.object({
  countryISO2: z.string().min(2, 'Вкажіть країну'),
  operator: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one item.',
  }),
  //   phoneNumber: z.string().min(10, 'Вкажіть номер телефону'),
  exclude: z.boolean().default(false).optional(),
  excludeNumbers: z.string().optional(),
  operatorCode: z.string().optional(),
  numberPartOne: z.string().optional(),
  numberPartTwo: z.string().optional(),
  numberPartThree: z.string().optional(),
  selectedNumbers: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: 'You have to select at least one item.',
    }),
});
interface OrderNumberFormProps {
  setOrderStep: ({ step, iso2 }: { step: number; iso2: string }) => void;
  orderStep: { step: number; iso2: string };
  flags: FlagType[];
}
export const OrderNumberForm = ({
  setOrderStep,
  orderStep,
  flags,
}: OrderNumberFormProps) => {
  const [isPending, startTransition] = useTransition();
  const [isSearchPending, startSearchTransition] = useTransition();
  const [operatorsCode, setOperatorsCode] = useState<string[]>([]);
  const [searchRes, setSearchRes] = useState<phoneNumbersType[]>([]);
  const form = useForm<z.infer<typeof orderNumberSchema>>({
    resolver: zodResolver(orderNumberSchema),
    mode: 'onChange',
    defaultValues: {
      countryISO2: orderStep.iso2,
      operator: [],
      //   phoneNumber: '',
      exclude: false,
      excludeNumbers: '',
      operatorCode: '',
      numberPartOne: 'XXX',
      numberPartTwo: 'XX',
      numberPartThree: 'XX',
      selectedNumbers: [],
    },
  });

  const currentFlag = flags.find((flag) => flag.iso2 === orderStep.iso2);

  const onSubmit = (data: z.infer<typeof orderNumberSchema>) => {
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
  };
  const searchNumbers = (data: z.infer<typeof orderNumberSchema>) => {
    startSearchTransition(() => {
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
      setSearchRes(foundedNumbers);
    });
  };
  const parseFormData = () => {
    const operators = form.getValues('operator');
    const newOperatorsCode: string[] = [];
    callOperatorsForCountry.forEach((item) => {
      if (operators.includes(item.id.toString()) || operators.includes('0')) {
        newOperatorsCode.push(...item.codes);
      }
    });
    setOperatorsCode(newOperatorsCode);
  };

  const clearSearchNumbers = () => {
    setSearchRes([]);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} onChange={parseFormData}>
          <p className="font-semibold text-base mb-4">Вибір номера</p>
          <div className="flex flex-col sm:flex-row sm:gap-4">
            <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8 sm:max-w[40%] sm:w-[40%]">
              <Accordion
                type="single"
                collapsible
                className="w-full flex flex-col gap-4 border-none p-0"
                defaultValue="operators"
              >
                <AccordionItem value="operators" className="p-0">
                  <AccordionTrigger className="p-0 gap-1 sm:gap-9 flex-grow w-full">
                    <div className="flex gap-2 items-center text-sm sm:text-base text-main-dark font-medium">
                      <div className="flex items-center justify-center w-6 h-6 text-center overflow-hidden rounded-full object-cover flex-shrink-0">
                        {currentFlag && (
                          <Image
                            src={currentFlag?.flag}
                            alt={currentFlag?.name}
                            width={24}
                            height={24}
                            style={{
                              objectFit: 'cover',
                              height: '24px',
                              width: 'auto',
                            }}
                          />
                        )}
                      </div>
                      <p className="text-base font-semibold">Оператор</p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="border-t mt-8 pt-8">
                    <FormField
                      control={form.control}
                      name="operator"
                      render={() => (
                        <FormItem>
                          {callOperatorsForCountry.map((item) => (
                            <FormField
                              key={item.id}
                              control={form.control}
                              name="operator"
                              render={({ field }) => {
                                return (
                                  <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(
                                          item.id.toString(),
                                        )}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([
                                                ...field.value,
                                                item.id.toString(),
                                              ])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) =>
                                                    value !==
                                                    item.id.toString(),
                                                ),
                                              );
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {item.name}
                                    </FormLabel>
                                  </FormItem>
                                );
                              }}
                            />
                          ))}
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </Card>

            <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8 flex-grow">
              <CardHeader>Пошук по масці</CardHeader>
              <Separator className="my-4" />
              <div className="flex items-center justify-between sm:justify-start gap-6">
                <div>
                  <FormField
                    control={form.control}
                    name="exclude"
                    render={({ field }) => {
                      return (
                        <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <FormLabel className="font-normal whitespace-nowrap">
                            Виключити цифри
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                </div>
                <div>
                  <FormField
                    control={form.control}
                    name="excludeNumbers"
                    render={({ field }) => (
                      <FormItem className=" w-20">
                        <FormControl>
                          <Input
                            placeholder="XXXX"
                            {...field}
                            inputMode="numeric"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
              <Info className="mb-4">
                Для звуження пошуку введіть в поле цифри, яких точно не має бути
                в номері телефону.
              </Info>
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <div className="flex items-center justify-start gap-1">
                  <div>
                    <FormField
                      control={form.control}
                      name="operatorCode"
                      render={({ field }) => (
                        <FormItem className="w-[90px]">
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="XXX" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {operatorsCode.map((item) => (
                                <SelectItem key={item} value={item}>
                                  {item}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>&mdash;</div>
                  <div>
                    <FormField
                      control={form.control}
                      name="numberPartOne"
                      render={({ field }) => (
                        <FormItem className="w-[70px]">
                          <FormControl>
                            <Input
                              placeholder="XXX"
                              {...field}
                              inputMode="numeric"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>&mdash;</div>
                  <div>
                    <FormField
                      control={form.control}
                      name="numberPartTwo"
                      render={({ field }) => (
                        <FormItem className="w-[56px]">
                          <FormControl>
                            <Input
                              placeholder="XX"
                              {...field}
                              inputMode="numeric"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div>&mdash;</div>
                  <div>
                    <FormField
                      control={form.control}
                      name="numberPartThree"
                      render={({ field }) => (
                        <FormItem className="w-[56px]">
                          <FormControl>
                            <Input
                              placeholder="XX"
                              {...field}
                              inputMode="numeric"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Info className="mb-4 sm:hidden">
                  Для пошуку бажаного номеру введіть, будь ласка, мінімум 3
                  відомих цифри. Невідомі цифри позначаються символом “Х”.
                </Info>
                <Button
                  type="button"
                  className="w-full sm:w-auto border-0"
                  onClick={() => searchNumbers(form.getValues())}
                >
                  Знайти
                </Button>
              </div>
              <Info className="mb-4 hidden sm:flex">
                Для пошуку бажаного номеру введіть, будь ласка, мінімум 3
                відомих цифри. Невідомі цифри позначаються символом “Х”.
              </Info>

              {isSearchPending && <Loading />}
              {searchRes && searchRes.length > 0 && (
                <div className="mt-6">
                  <p className="font-semibold text-base mb-4">
                    Результати пошуку
                  </p>
                  <Separator className="my-4" />
                  <FormField
                    control={form.control}
                    name="selectedNumbers"
                    render={() => (
                      <FormItem>
                        {searchRes.map((item) => (
                          <FormField
                            key={item.id}
                            control={form.control}
                            name="selectedNumbers"
                            render={({ field }) => {
                              return (
                                <FormItem className="flex flex-row items-center space-x-3 space-y-0">
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(
                                        item.id.toString(),
                                      )}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([
                                              ...field.value,
                                              item.id.toString(),
                                            ])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) =>
                                                  value !== item.id.toString(),
                                              ),
                                            );
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="font-normal">
                                    {item.name}
                                  </FormLabel>
                                </FormItem>
                              );
                            }}
                          />
                        ))}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Info className="mb-4">
                    Звертаємо увагу, що для замовлення номера у профілі
                    користувача/компанії мають бути зазначені та підтверджені
                    реальні та актуальні реєстраційні дані та/або авторизація
                    через Дія.
                  </Info>
                  <div className="w-full flex flex-col sm:flex-row-reverse sm:justify-start sm:gap-4">
                    <Button
                      type="submit"
                      className="w-full sm:w-auto mb-4 sm:mb-0"
                    >
                      Обрати
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() => clearSearchNumbers()}
                    >
                      Очистити пошук
                    </Button>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </form>
      </Form>
    </>
  );
};
