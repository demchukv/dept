import { UseFormReturn } from 'react-hook-form';
import { RefundFormSchema } from './refund-form';
import { z } from 'zod';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../common/modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { RadioGroup } from '@/components/ui/radio-group';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { CcInfo } from './cc-info';
import { Input } from '@/components/ui/input';
import { cc_format } from '@/lib/credit-card';
import { Info } from '../common/info';

const cards = [
  {
    id: 1,
    name: 'Шевченко Василь Петрович',
    valute: 'UAH',
    type: 'Visa',
    number: '5556 **** **** 4567',
    status: 'Основна',
  },
  {
    id: 2,
    name: 'Шевченко Василь Петрович',
    valute: 'UAH',
    type: 'MC',
    number: '4441 **** **** 0065',
    status: 'Резервна',
  },
];
const selectedCard = cards.find((card) => card.status === 'Основна');

interface RefundFormStepOneProps {
  addForm: UseFormReturn<z.infer<typeof RefundFormSchema>>;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
  setStep: (step: number) => void;
  onSubmit: (data: z.infer<typeof RefundFormSchema>) => void;
  setRefundPayTo: (pay: number) => void;
    refundPayTo: number;
}

export const RefundFormStepTwo = ({
  addForm,
  onClose,
  setStep,
  onSubmit,
    setRefundPayTo,
    refundPayTo
}: RefundFormStepOneProps) => {
  const [refundForm, setRefundForm] = React.useState(refundPayTo);
  return (
    <div
      className={cn('flex-grow flex flex-col justify-between', 'h-full mt-8')}
    >
      <ModalHeader className="mb-6">
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center flex gap-2 items-center justify-center">
          Повернення коштів
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <div className="flex-grow flex flex-col w-full">
        <div className="mb-4 font-semibold text-sm text-main-dark leading-main-lh">
          Реквізити на які буде повернення коштів
        </div>
        <div className="mb-4 flex gap-4 items-center justify-center">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setRefundForm(0);
              setRefundPayTo(0);
            }}
            className={cn(
              'font-semibold text-sm leading-main-lh',
              refundForm !== 0 ? 'text-gray-dark' : 'text-main-color',
            )}
          >
            Обрати картку
          </Button>
          <div className="border-r border-gray-light h-[40px] w-[1px]"></div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setRefundForm(1);
              setRefundPayTo(1);
            }}
            className={cn(
              'font-semibold text-sm leading-main-lh',
              refundForm !== 1 ? 'text-gray-dark' : 'text-main-color',
            )}
          >
            Ввести дані картки
          </Button>
          <div className="border-r border-gray-light h-[40px] w-[1px]"></div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setRefundForm(2);
              setRefundPayTo(2);
            }}
            className={cn(
              'font-semibold text-sm leading-main-lh',
              refundForm !== 2 ? 'text-gray-dark' : 'text-main-color',
            )}
          >
            IBAN
          </Button>
        </div>
        {refundForm == 0 && (
          <div className="mb-4">
            <FormField
              control={addForm.control}
              name="refundCard"
              render={({ field }) => (
                <FormItem className="flex flex-col space-x-0 space-y-0">
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={String(field.value)}
                      className="flex flex-col"
                    >
                      {cards.map((item) => (
                        <React.Fragment key={item.id}>
                          <FormItem className="flex items-center gap-x-2 gap-y-3">
                            <FormControl>
                              <RadioGroupItem value={String(item.id)} />
                            </FormControl>
                            <FormLabel className="w-full bg-white flex justify-between items-center border border-gray-light rounded p-3 shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)]">
                              <CcInfo item={item} />
                            </FormLabel>
                          </FormItem>
                        </React.Fragment>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        )}
        {refundForm == 1 && (
          <div className="mb-4">
            <FormField
              control={addForm.control}
              name="refundCardOwner"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    Ім’я власника латиницею:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder=""
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={addForm.control}
              name="refundCardNumber"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    Номер картки:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      id="refundCardNumber"
                      placeholder=""
                      type="tel"
                      inputMode="numeric"
                      pattern="[0-9\s]{13,19}"
                      autoComplete="cc-number"
                      maxLength={19}
                      onKeyUp={() =>
                        addForm.setValue(
                          'refundCardNumber',
                          cc_format(field.value),
                        )
                      }
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Info>
              Для зарахування повернення коштів власником карти має бути особа,
              документи якої зазначені на попередньому кроці.
            </Info>
          </div>
        )}
        {refundForm == 2 && (
          <div className="mb-4">
            <div className="flex flex-col md:flex-row gap-4">
              <FormField
                control={addForm.control}
                name="refundIBANOwner"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                      ПІБ отримувача:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        // disabled={isPending}
                        placeholder=""
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={addForm.control}
                name="refundIBANRNOKPP"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full md:w-[70%]">
                    <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                      РНОКПП:
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        // disabled={isPending}
                        placeholder=""
                        type="text"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={addForm.control}
              name="refundIBANNumber"
              render={({ field }) => (
                <FormItem className="mb-4 w-full">
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    Рахунок IBAN:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder=""
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Info>
              Для зарахування повернення коштів рахунок має бути відкритий на
              особу, документи якої зазначені на попередньому кроці
            </Info>
          </div>
        )}
      </div>
      <ModalFooter
        className={cn(
          'flex flex-col md:flex-row-reverse md:justify-start lg:justify-center gap-3 md:gap-4 py-4 shadow-[0_-6px_20px_0_rgba(89,125,137,0.08)]',
        )}
      >
        <Button
          type="button"
          size="md"
          onClick={addForm.handleSubmit(onSubmit)}
        >
          Згенерувати заяву на повернення
        </Button>
        <Button
          type="button"
          size="md"
          variant="outline"
          onClick={() => setStep(1)}
        >
          Попередній крок
        </Button>
        <Button
          className=""
          type="button"
          size="md"
          variant="outline"
          onClick={() => onClose(false, undefined)}
        >
          Скасувати
        </Button>
      </ModalFooter>
    </div>
  );
};
