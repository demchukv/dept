import React from 'react';
import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from '../common/modal';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Info } from '../common/info';
import Link from 'next/link';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UseFormReturn } from 'react-hook-form';
import { Icon } from '@/components/utils/icon';
import { DatePicker } from '../common/date-picker';
import { RefundFormSchema } from '@/app/components/balance/refund-form';
import { z } from 'zod';

const refundReasonList = [
  { key: 1, val: 'Немає потреби використання коштів з балансу' },
  {
    key: 2,
    val: 'Завершення співпраці',
  },
  {
    key: 3,
    val: 'Інша причина',
  },
];

interface RefundFormStepOneProps {
  addForm: UseFormReturn<z.infer<typeof RefundFormSchema>>;
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
  setStep: (step: number) => void;
  onSubmit: (data: z.infer<typeof RefundFormSchema>) => void;
  setRefundDoc: (doc: number) => void;
  refundDoc: number;
}
export const RefundFormStepOne = ({
  addForm,
  onClose,
  setStep,
  onSubmit,
  setRefundDoc,
  refundDoc,
}: RefundFormStepOneProps) => {
  const [currentForm, setCurrentForm] = React.useState(refundDoc);

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
        <FormField
          control={addForm.control}
          name="refundAmount"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Сума повернення
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
          name="refundReason"
          render={({ field }) => (
            <FormItem className="space-y-4 mt-1 mb-4">
              <FormLabel>Причина повернення</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                >
                  {refundReasonList.map((item) => (
                    <React.Fragment key={item.key}>
                      <FormItem className="flex items-center gap-x-1 gap-y-2">
                        <FormControl>
                          <RadioGroupItem value={String(item.key)} />
                        </FormControl>
                        <FormLabel className="w-full bg-transparent flex justify-between items-center border-0">
                          <p className="font-normal text-sm leading-main-lh text-main-dark">
                            {item.val}
                          </p>
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

        <FormField
          control={addForm.control}
          name="refundAdditional"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Додаткова інформація
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
        <p className="font-semibold text-sm leading-main-lh text-main-dark mb-4">
          Документ особи для заяви на повернення
        </p>

        <div className="flex flex-col gap-2 lg:flex-row-reverse items-center">
          <Button
            type="button"
            variant="secondary"
            className="gap-2 w-full mb-2"
          >
            Авторизуватись через
            <Icon iconName="Diia" width={24} height={24} />
          </Button>
          <div className="w-full flex items-center justify-center gap-4">
            <Button
              type="button"
              variant="ghost"
              className={cn(
                'w-full font-semibold text-sm leading-main-lh text-main-dark',
                currentForm === 0 && 'text-main-color',
              )}
              onClick={() => {
                setCurrentForm(0);
                setRefundDoc(0);
              }}
            >
              ID картка
            </Button>
            <div className="border-r border-gray-light h-[40px] w-[1px]"></div>
            <Button
              type="button"
              variant="ghost"
              className={cn(
                'w-full font-semibold text-sm leading-main-lh text-main-dark',
                currentForm === 1 && 'text-main-color',
              )}
              onClick={() => {
                setCurrentForm(1);
                setRefundDoc(1);
              }}
            >
              Паспорт
            </Button>
          </div>
        </div>

        <FormField
          control={addForm.control}
          name="refundPIB"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                ПІБ:
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
          name="refundDB"
          render={({ field }) => (
            <FormItem className="flex flex-col mb-4">
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Дата народження:
              </FormLabel>
              <FormControl>
                <DatePicker
                  // captionLayout="dropdown-buttons"
                  // fromYear={1900}
                  // toYear={new Date().getFullYear()}
                  selected={field.value}
                  onSelect={(value: Date) => {
                    field.onChange(value);
                  }}
                  disabled={(date) => date > new Date()}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {currentForm === 0 && (
          <div className="w-full flex gap-4">
            <div className="w-full">
              <FormField
                control={addForm.control}
                name="refundIDNumber"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                      Номер документа:
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
            <div className="w-full">
              <FormField
                control={addForm.control}
                name="refundIDWho"
                render={({ field }) => (
                  <FormItem className="mb-4 w-full">
                    <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                      Орган, що видав:
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
          </div>
        )}
        {/* Refund Form, Step 1, Tab 2 */}
        {currentForm === 1 && (
          <>
            <div className="w-full flex gap-4">
              <div className="w-full">
                <FormField
                  control={addForm.control}
                  name="refundPassSerial"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                        Серія паспорта:
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
              <div className="w-full">
                <FormField
                  control={addForm.control}
                  name="refundPassDate"
                  render={({ field }) => (
                    <FormItem className="mb-4 w-full">
                      <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                        Номер паспорта:
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
            </div>
            <FormField
              control={addForm.control}
              name="refundPassWho"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    Ким виданий:
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
          </>
        )}

        <Info>
          {' '}
          Сформований документ необхідно роздрукувати, підписати та направити до{' '}
          <Link href="#" className="text-main-color font-semibold">
            Служби турботи про клієнтів
          </Link>{' '}
          разом із поверненим товаром.
        </Info>
      </div>

      <ModalFooter
        className={cn(
          'flex flex-col md:flex-row-reverse md:justify-start lg:justify-center gap-3 md:gap-4 py-4 shadow-[0_-6px_20px_0_rgba(89,125,137,0.08)]',
        )}
      >
        <Button type="button" onClick={() => setStep(2)}>
          Продовжити
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onClose(false, undefined)}
        >
          Скасувати
        </Button>
      </ModalFooter>
    </div>
  );
};
