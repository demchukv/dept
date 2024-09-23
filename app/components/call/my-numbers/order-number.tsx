'use client';

import { getAllFlags } from '@/action/get-flags';
import { OrderNumberForm } from '@/app/components/call/my-numbers/order-number-form';
import { OrderNumberList } from '@/app/components/call/my-numbers/order-number-list';
import { FlagType } from '@/types/call';
import { useEffect, useState, useTransition } from 'react';
import { Loading } from '../../common/loading';

export const OrderNumber = () => {
  const [isPending, startTransition] = useTransition();
  const [flags, setFlags] = useState<FlagType[]>([]);

  const [orderStep, setOrderStep] = useState<{ step: number; iso2: string }>({
    step: 1,
    iso2: '',
  });
  const getFlags = async () => {
    startTransition(async () => {
      const data = await getAllFlags();
      setFlags(data);
    });
  };

  useEffect(() => {
    getFlags();
  }, []);

  return (
    <>
      {isPending && <Loading />}

      {flags && flags.length > 0 && (
        <>
          {orderStep.step === 1 && (
            <OrderNumberList setOrderStep={setOrderStep} flags={flags} />
          )}
          {orderStep.step === 2 && (
            <OrderNumberForm
              setOrderStep={setOrderStep}
              orderStep={orderStep}
              flags={flags}
            />
          )}
        </>
      )}
    </>
  );
};
