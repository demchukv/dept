'use client';
import { domainType } from '@/types/domain';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card, CardTopAlert } from '@/app/components/card/card';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { useAppSelector } from '@/store/hooks';
import { selectBalance } from '@/store/account/accountSlice';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs-server';
import { DomainBilling } from '@/app/components/products/domain/domain-billing';

interface DomainInfoProps {
  data: domainType;
}
export const DomainInfo = ({ data }: DomainInfoProps) => {
  const balance = useAppSelector(selectBalance);

  return (
    <>
      {balance < data.price && (
        <CardTopAlert variant="attention">
          Увага! Не достатньо коштів на балансі
        </CardTopAlert>
      )}
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
                  <div className="text-left font-semibold text-sm sm:text-base text-main-dark leading-main-lh">
                    {data.domain}
                  </div>
                </div>
                <div className="flex flex-row-reverse sm:flex-row justify-between sm:justify-end gap-5 items-center w-full sm:w-[50%]">
                  <div className="text-right font-normal text-sm sm:text-base text-main-dark leading-main-lh">
                    {Number(data.price).toFixed(0)} грн/рік
                  </div>
                  <div className="font-normal text-sm sm:text-base text-main-dark leading-main-lh text-right">
                    <>
                      <span className="hidden sm:inline">
                        діє з {format(data.activated, 'yyyy-MM-dd')}
                      </span>{' '}
                      до {format(data.activeTo, 'yyyy-MM-dd')}
                    </>
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t mt-8 pt-0">
              <Tabs defaultValue="biling" className="w-full">
                <TabsList>
                  <TabsTrigger value="biling">Білінг</TabsTrigger>
                  <TabsTrigger value="dns">Керування DNS</TabsTrigger>
                  <TabsTrigger value="ns">Керування NS</TabsTrigger>
                  <TabsTrigger value="transfer">Передати</TabsTrigger>
                </TabsList>
                <TabsContent value="biling">
                  <DomainBilling data={data} />
                </TabsContent>
                <TabsContent value="dns">
                  {/* <HostingSites data={data} /> */}
                </TabsContent>
                <TabsContent value="ns">
                  {/* <HostingFtp data={data} /> */}
                </TabsContent>
                <TabsContent value="transfer">
                  {/* <HostingTransfer data={data} /> */}
                </TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};
