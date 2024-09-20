'use client';
import { certificateType } from '@/types/certificate';
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

interface CertificateInfoProps {
  data: certificateType;
}
export const CertificateInfo = ({ data }: CertificateInfoProps) => {
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
                    {data.cert}
                  </div>
                </div>
                <div className="flex flex-row-reverse sm:flex-row justify-between sm:justify-end gap-5 items-center w-full sm:w-[50%]">
                  <div className="text-right font-normal text-sm sm:text-base text-main-dark leading-main-lh">
                    {data.domain}
                  </div>
                  <div className="text-right font-normal text-sm sm:text-base text-main-dark leading-main-lh">
                    {isNaN(Number(data.price))
                      ? data.price
                      : `${Number(data.price).toFixed(0)} грн/рік`}
                  </div>
                  <div className="font-normal text-sm sm:text-base text-main-dark leading-main-lh text-right">
                    до {format(data.activeTo, 'yyyy-MM-dd')}
                  </div>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t mt-8 pt-0">
              <Tabs defaultValue="biling" className="w-full">
                <TabsList>
                  <TabsTrigger value="biling">Білінг</TabsTrigger>
                  <TabsTrigger value="csr">Мої CSR</TabsTrigger>
                  <TabsTrigger value="control">Керування</TabsTrigger>
                </TabsList>
                <TabsContent value="biling">
                  {/* <DomainBilling data={data} /> */}
                </TabsContent>
                <TabsContent value="csr">
                  {/* <DomainDns data={data} /> */}
                </TabsContent>
                <TabsContent value="control">
                  {/* <DomainNs data={data} /> */}
                </TabsContent>
              </Tabs>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};
