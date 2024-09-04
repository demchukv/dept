'use client';
import React, { startTransition } from 'react';
import { Form } from '@/components/ui/form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { formatISO } from 'date-fns';
import { cc_validate } from '@/lib/credit-card';
import { RefundFormStepOne } from './refund-form-step-one';
import { RefundFormStepTwo } from './refund-form-step-two';

interface EditCardFormProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

export const RefundFormSchema = z.object({
  refundAmount: z.coerce
    .number({
      invalid_type_error: 'Вкажіть коректну суму повернення',
    })
    .gte(10, { message: 'Вкажіть коректну суму повернення' }),
  refundAdditional: z.string().optional(),
  refundReason: z.string().min(1, 'Вкажіть причину повернення'),
  refundPIB: z.string().min(2, "Вкажіть ваше прізвище, ім'я, по-батькові"),
  refundDB: z.date({
    required_error: 'Вкажіть коректну дату народження',
  }),
  refundIDNumber: z.string({
    required_error: 'Вкажіть коректний номер паспорту',
  }),
  refundIDWho: z.string({
    required_error: 'Вкажіть орган, що видав документ',
  }),
  refundPassSerial: z.string().optional(),
  refundPassDate: z.string().optional(),
  refundPassWho: z.string().optional(),
  refundCard: z.string().optional(),
  refundCardOwner: z.string().optional(),
  refundCardNumber: z.string().refine(
    (value) => {
      return cc_validate(value);
    },
    {
      message: 'Введіть коректний номер карти',
    },
  ),
  refundIBANOwner: z.string().optional(),
  refundIBANRNOKPP: z.string().optional(),
  refundIBANNumber: z.string().optional(),
});
export const RefundForm = ({ onClose }: EditCardFormProps) => {
  const [step, setStep] = React.useState(1);
  const [refundDoc, setRefundDoc] = React.useState(0);
  const [refundPayTo, setRefundPayTo] = React.useState(0);

  const addForm = useForm<z.infer<typeof RefundFormSchema>>({
    mode: 'onChange',
    criteriaMode: 'all',
    resolver: zodResolver(RefundFormSchema),
    defaultValues: {
      refundAmount: 0,
      refundReason: '',
      refundAdditional: '',
      refundPIB: '',
      refundDB: new Date(),
      refundPassSerial: '',
      refundPassDate: '',
      refundPassWho: '',
      refundCard: '',
      refundCardOwner: '',
      refundCardNumber: '',
      refundIBANOwner: '',
      refundIBANRNOKPP: '',
      refundIBANNumber: '',
    },
  });
  function onSubmit(data: z.infer<typeof RefundFormSchema>) {
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      const values = {
        ...data,
        refundDB: formatISO(data.refundDB),
        refundDoc: refundDoc,
        refundPayTo: refundPayTo,
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
    <Form {...addForm}>
      <form
        onSubmit={addForm.handleSubmit(onSubmit)}
        className="flex-grow h-full"
      >
        {/* Refund Form - Step 1 */}
        {step == 1 && (
          <RefundFormStepOne
            addForm={addForm}
            onClose={onClose}
            setStep={setStep}
            onSubmit={onSubmit}
            setRefundDoc={setRefundDoc}
            refundDoc={refundDoc}
          />
        )}

        {/* Refund Form - Step 2 */}
        {step == 2 && (
          <RefundFormStepTwo
            addForm={addForm}
            onClose={onClose}
            setStep={setStep}
            onSubmit={onSubmit}
            setRefundPayTo={setRefundPayTo}
            refundPayTo={refundPayTo}
          />
        )}
      </form>
    </Form>
  );
};
