import { subscriptionType } from '@/types/subscription';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/app/components/card/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { SubscriptionTvInfo } from '@/app/components/products/subscription/subscription-tv-info';
import { SubscriptionSoftInfo } from '@/app/components/products/subscription/subscription-soft-info';

interface SubscriptionInfoProps {
  data: subscriptionType;
}
export const SubscriptionInfo = ({ data }: SubscriptionInfoProps) => {
  return (
    <>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 border-none p-0"
          defaultValue={undefined}
        >
          <AccordionItem value={`item-${data.id}`} className="p-0">
            <AccordionTrigger className="p-0 gap-1 sm:gap-9">
              <div className="flex flex-col gap-2.5 sm:gap-0 sm:flex-row justify-between w-full items-start sm:items-center">
                <div className="flex justify-start gap-5 items-center w-full sm:w-[50%] flex-shrink-0">
                  <div
                    className={cn(
                      'flex justify-center items-center w-12 font-semibold text-xs text-white leading-[1.33] rounded',
                      data.type === 'tv' && 'bg-orange-additional-color',
                      data.type === 'soft' && 'bg-main-color',
                    )}
                  >
                    {data.type.toUpperCase()}
                  </div>
                  <div className="text-left font-semibold text-sm sm:text-base text-main-dark leading-main-lh">
                    {data.title}
                  </div>
                </div>
                <div className="flex flex-row-reverse sm:flex-row justify-between sm:justify-end gap-5 items-center w-full sm:w-[50%]">
                  <div className="text-right font-normal text-sm sm:text-base text-main-dark leading-main-lh">
                    {Number(data.price).toFixed(0)} грн/міс
                  </div>
                  <div className="font-normal text-sm sm:text-base text-main-dark leading-main-lh text-right">
                    {data.state === 'active' && (
                      <>
                        <span className="hidden sm:inline">
                          діє з {format(data.startFrom, 'yyyy-MM-dd')}
                        </span>{' '}
                        до {format(data.activeTo, 'yyyy-MM-dd')}
                      </>
                    )}
                    {data.state === 'inactive' && (
                      <>
                        <span className="hidden sm:inline">
                          завершено дію {format(data.activeTo, 'yyyy-MM-dd')}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t mt-8 pt-8">
              {data.type === 'tv' && <SubscriptionTvInfo data={data} />}
              {data.type === 'soft' && <SubscriptionSoftInfo data={data} />}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};
