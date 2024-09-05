'use client';
import React, { startTransition } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { formatISO } from 'date-fns';
import { RefundFormStepOne } from './refund-form-step-one';
import { RefundFormStepTwo } from './refund-form-step-two';
import { RefundFormSchema } from '@/shemas/refund';
import { Input } from '@/components/ui/input';

interface EditCardFormProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
}

export const RefundForm = ({ onClose }: EditCardFormProps) => {
  const [step, setStep] = React.useState(1);
  const [refundDoc, setRefundDoc] = React.useState(0);
  const [refundPayTo, setRefundPayTo] = React.useState(0);

  const addForm = useForm<z.infer<typeof RefundFormSchema>>({
    mode: 'onChange',
    resolver: zodResolver(RefundFormSchema),
    defaultValues: {
      refundAmount: 0,
      refundReason: '',
      refundAdditional: '',
      refundPIB: '',
      refundDB: new Date(),
      refundIDNumber: '',
      refundIDWho: '',
      refundPassSerial: '',
      refundPassNo: '',
      refundPassWho: '',
      refundCard: '',
      refundCardOwner: '',
      refundCardNumber: '',
      refundIBANOwner: '',
      refundIBANRNOKPP: '',
      refundIBANNumber: '',
      refundStep: step,
      refundDoc: refundDoc,
      refundPayTo: refundPayTo,
    },
  });

  function onSubmit(data: z.infer<typeof RefundFormSchema>) {
    if (step === 1) {
      setStep(2);
      addForm.setValue('refundStep', 2);
      return;
    }
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      let values = {
        refundAmount: data.refundAmount,
        refundReason: data.refundReason,
        refundAdditional: data.refundAdditional,
        refundPIB: data.refundPIB,
        refundDB: formatISO(data.refundDB),
      };
      if (refundDoc === 0) {
        const rf = {
          refundIDNumber: data.refundIDNumber,
          refundIDWho: data.refundIDWho,
        };
        values = { ...values, ...rf };
      }
      if (refundDoc === 1) {
        const rf = {
          refundPassSerial: data.refundPassSerial,
          refundPassNo: data.refundPassNo,
          refundPassWho: data.refundPassWho,
        };
        values = { ...values, ...rf };
      }
      if (refundPayTo === 0) {
        const rp = {
          refundCard: data.refundCard,
        };
        values = { ...values, ...rp };
      }
      if (refundPayTo === 1) {
        const rp = {
          refundCardOwner: data.refundCardOwner,
          refundCardNumber: data.refundCardNumber,
        };
        values = { ...values, ...rp };
      }
      if (refundPayTo === 2) {
        const rp = {
          refundIBANOwner: data.refundIBANOwner,
          refundIBANRNOKPP: data.refundIBANRNOKPP,
          refundIBANNumber: data.refundIBANNumber,
        };
        values = { ...values, ...rp };
      }
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
        <FormField
          control={addForm.control}
          name="refundStep"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input {...field} type="hidden" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
