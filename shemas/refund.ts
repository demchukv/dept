import { cc_validate } from '@/lib/credit-card';
import { z } from 'zod';

export const RefundFormSchema = z
  .object({
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
    refundIDNumber: z.string().optional(),
    refundIDWho: z.string().optional(),
    refundPassSerial: z.string().optional(),
    refundPassNo: z.string().optional(),
    refundPassWho: z.string().optional(),
    refundCard: z.string().optional(),
    refundCardOwner: z.string().optional(),
    refundCardNumber: z.string().optional(),
    refundIBANOwner: z.string().optional(),
    refundIBANRNOKPP: z.string().optional(),
    refundIBANNumber: z.string().optional(),
    refundStep: z.number().optional(),
    refundDoc: z.number().optional(),
    refundPayTo: z.number().optional(),
  })
  .refine(
    (data) => {
      if (
        data.refundDoc === 0 &&
        (data.refundIDNumber === undefined || data.refundIDNumber?.length < 13)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть коректний номер ID картки',
      path: ['refundIDNumber'],
    },
  )
  .refine(
    (data) => {
      if (
        data.refundDoc === 0 &&
        (data.refundIDWho === undefined || data.refundIDWho?.length < 5)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть орган, що видав документ',
      path: ['refundIDWho'],
    },
  )
  .refine(
    (data) => {
      if (
        data.refundDoc === 1 &&
        (data.refundPassSerial === undefined ||
          data.refundPassSerial?.length !== 2)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть серію паспорта, 2 символи',
      path: ['refundPassSerial'],
    },
  )
  .refine(
    (data) => {
      if (
        data.refundDoc === 1 &&
        (data.refundPassNo === undefined || data.refundPassNo?.length !== 6)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть коректний номер паспорта, 6 цифр',
      path: ['refundPassNo'],
    },
  )
  .refine(
    (data) => {
      if (
        data.refundDoc === 1 &&
        (data.refundPassWho === undefined || data.refundPassWho?.length < 10)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть орган, що видав документ',
      path: ['refundPassWho'],
    },
  )
  .refine(
    (data) => {
      if (
        data.refundPayTo === 0 &&
        data.refundStep === 2 &&
        (data.refundCard === undefined || data.refundCard === '')
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Виберіть зі списку карту для повернення коштів',
      path: ['refundCard'],
    },
  )
  .refine(
    (data) => {
      if (
        data.refundPayTo === 1 &&
        data.refundStep === 2 &&
        (data.refundCardOwner === undefined || data.refundCardOwner.length < 2)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть ім’я власника картки для повернення коштів',
      path: ['refundCardOwner'],
    },
  )
  .refine(
    (data) => {
      if (
        data.refundPayTo === 1 &&
        data.refundStep === 2 &&
        (data.refundCardNumber === undefined ||
          cc_validate(data.refundCardNumber) === false)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть номер картки для повернення коштів',
      path: ['refundCardNumber'],
    },
  )
  .refine(
    (data) => {
      if (
        data.refundPayTo === 2 &&
        data.refundStep === 2 &&
        (data.refundIBANOwner === undefined || data.refundIBANOwner.length < 2)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть ПІБ отримувача',
      path: ['refundIBANOwner'],
    },
  )
  .refine(
    (data) => {
      if (
        data.refundPayTo === 2 &&
        data.refundStep === 2 &&
        (data.refundIBANRNOKPP === undefined ||
          data.refundIBANRNOKPP.length < 2)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть РНОКПП',
      path: ['refundIBANRNOKPP'],
    },
  )
  .refine(
    (data) => {
      if (
        data.refundPayTo === 2 &&
        data.refundStep === 2 &&
        (data.refundIBANNumber === undefined ||
          data.refundIBANNumber.length < 10)
      ) {
        return false;
      }
      return true;
    },
    {
      message: 'Вкажіть рахунок IBAN',
      path: ['refundIBANNumber'],
    },
  );
