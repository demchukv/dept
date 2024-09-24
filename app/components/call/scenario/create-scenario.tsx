import Link from 'next/link';
import { Info } from '@/app/components/common/info';
import { Card } from '../../card/card';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const CreateScenario = () => {
  return (
    <div className="flex gap-4 sm:gap-6 flex-col sm:flex-row">
      <div className="flex flex-col gap-4">
        <Input placeholder="Введіть назву сценарію" />
        <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8">
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4 border-none p-0"
            defaultValue="phoneNumbers"
          >
            <AccordionItem value="phoneNumbers" className="p-0">
              <AccordionTrigger className="p-0 gap-1 sm:gap-9">
                <p className="font-semibold text-base leading-normal whitespace-nowrap">
                  Застосувати до номерів
                </p>
              </AccordionTrigger>
              <AccordionContent className="border-t mt-8 pt-8">
                <p>List phone numbers</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <Link href="/my-numbers" className="text-main-color">
            + Замовити новий номер
          </Link>
        </Card>
      </div>
      <div className="flex flex-col gap-4">
        <Info>
          Зверніть увагу: всі налаштування на цій сторінці, будуть
          застосовуватись у відповідній послідовності під час вхідного дзвінка
          на обрані номери.{' '}
        </Info>
        <div className="flex flex-col gap-4 sm:flex-row p-4 border border-dashed border-gray-light rounded-[6px]">
          <div>Переадресація +</div>
          <div>Виклик на групу +</div>
          <div>Аудіофайл +</div>
          <div>IVR меню +</div>
        </div>
      </div>
    </div>
  );
};
