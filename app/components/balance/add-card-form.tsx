'use client';
import React from 'react';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

import { z } from 'zod';
import { toast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { cn } from '@/lib/utils';

interface AddCardFormProps {
  form: any;
}

export const AddCardForm = ({ form }: AddCardFormProps) => {
  return (
    <>
      <div className="min-h-full flex flex-col gap-3 w-full self-stretch">
        <FormField
          control={form.control}
          name="ownerName"
          render={({ field }) => (
            <FormItem>
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
          control={form.control}
          name="cardNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                Номер картки:
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  // disabled={isPending}
                  placeholder=""
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9\s]{13,19}"
                  autoComplete="cc-number"
                  maxLength={19}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-8">
          <div className="flex gap-1.5 w-50%">
            <FormField
              control={form.control}
              name="cardMonth"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    Термін дії:
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="_ _"
                      type="tel"
                      pattern="\d\d"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="self-end">/</div>
            <FormField
              control={form.control}
              name="cardYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                    &nbsp;
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      // disabled={isPending}
                      placeholder="_ _"
                      type="tel"
                      pattern="\d\d"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="cardCvv"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="font-normal text-xs text-gray-dark leading-none">
                  CVV код:
                </FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    // disabled={isPending}
                    placeholder="..."
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </>
  );
};
