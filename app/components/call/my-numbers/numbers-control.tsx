import { PhoneNumbers } from '@/types/call';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/app/components/card/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { format } from 'date-fns';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';

interface NumbersControlProps {
  data: PhoneNumbers[];
}
export const NumbersControl = ({ data }: NumbersControlProps) => {
  return (
    <>
      <div className="flex justify-between items-center gap-4 mb-5 sm:mb-9">
        <div className="hidden sm:flex">
          Сортування: за типом номера / за мобільним оператором / за країною
        </div>
        <div className="sm:hidden">
          <Button
            type="button"
            variant="ghost"
            className="text-main-color w-6 h-6"
          >
            <Icon iconName="FilterIcon" width={24} height={24} />
          </Button>
        </div>
        <div className="flex items-center gap-9">
          <Link
            href="#"
            download
            className="font-semibold text-sm text-main-color hover:text-main-dark leading-main-lh flex items-center gap-1.5"
          >
            Завантажити список в Excel
            <Icon
              iconName="Doc"
              width={16}
              height={16}
              className="w-4 h-4 flex-shrink-0"
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 items-center sm:justify-between border border-gray-light rounded p-4 sm:p-6 mb-4 sm:mb-8">
        <div className="flex items-center gap-4">
          <Checkbox id="allNumbers" />{' '}
          <label
            htmlFor="allNumbers"
            className="text-base font-semibold leading-normal"
          >
            Застосувати дію до всіх номерів
          </label>
        </div>
        <div className="w-full sm:w-auto flex flex-col sm:flex-row items-center gap-3 sm:gap-9">
          <Button type="button" className="w-full sm:w-auto">
            Подовжити
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="text-warning w-full sm:w-auto gap-2"
          >
            <Icon
              iconName="Trash"
              width={24}
              height={24}
              className="w-6 h-6 hidden sm:block"
            />
            <Icon
              iconName="DeleteCircle"
              width={24}
              height={24}
              className="w-6 h-6 sm:hidden"
            />
            <span className="sm:hidden">Видалити</span>
          </Button>
        </div>
      </div>

      {data.map((item: any) => (
        <Card
          key={item.id}
          className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8"
        >
          <Accordion
            type="single"
            collapsible
            className="w-full flex flex-col gap-4 border-none p-0"
            defaultValue={undefined}
          >
            <AccordionItem value={`item-${item.id}`} className="p-0">
              <AccordionTrigger className="p-0 gap-1 sm:gap-9">
                <div className="flex flex-col gap-2.5 sm:gap-0 sm:flex-row justify-between w-full items-start sm:items-center">
                  <div className="flex gap-4 items-center">
                    {/* <Checkbox id="phoneNumber" /> */}
                    <div
                      className={cn(
                        'flex justify-center items-center px-2.5 py-0.5 font-semibold text-xs text-white leading-[1.33] rounded',
                        item.numberType === 'sip' &&
                          'bg-orange-additional-color',
                        item.numberType === 'sim' &&
                          'bg-green-additional-color',
                      )}
                    >
                      {item.numberType.toUpperCase()}
                    </div>
                    <div className="flex justify-start gap-5 items-center w-full sm:w-[50%] flex-shrink-0">
                      <div className="text-left font-semibold text-sm sm:text-base text-main-dark leading-main-lh">
                        +{item.number}
                      </div>
                    </div>
                    <div className="hidden sm:block text-right font-normal text-sm sm:text-base text-main-dark leading-main-lh">
                      <Icon
                        iconName={`${item.operatorIcon}`}
                        width={57}
                        height={20}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row-reverse sm:flex-row justify-between sm:justify-end gap-5 items-center w-full sm:w-[50%]">
                    <div className="text-right font-normal text-sm sm:text-base text-main-dark leading-main-lh">
                      {isNaN(Number(item.priceForMonth))
                        ? item.priceForMonth
                        : `${Number(item.priceForMonth).toFixed(0)} грн/міс`}
                    </div>
                    <div className="text-right font-normal text-sm sm:text-base text-main-dark leading-main-lh">
                      {isNaN(Number(item.priceForMinute))
                        ? item.priceForMinute
                        : `${Number(item.priceForMinute).toFixed(2)} грн/хв`}
                    </div>
                    <div className="font-normal text-sm sm:text-base text-main-dark leading-main-lh text-right">
                      до {format(item.activeTo, 'yyyy-MM-dd')}
                    </div>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="border-t mt-8 pt-8">
                <p>{item.number}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      ))}
    </>
  );
};
