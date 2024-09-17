import { ServerType } from '@/types/server';
import { VirtualHeader } from '@/app/components/products/server/virtual/virtual-header';
import { DedicatedHeader } from '@/app/components/products/server/dedicated/dedicated-header';
import { HostingHeader } from '@/app/components/products/server/hosting/hosting-header';
import { VirtualTabs } from '@/app/components/products/server/virtual/virtual-tabs';
import { HostingTabs } from '@/app/components/products/server/hosting/hosting-tabs';
import { DedicatedTabs } from '@/app/components/products/server/dedicated/dedicated-tabs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion-server';
import { Card } from '@/app/components/card/card';

interface ServerInfoProps {
  data: ServerType;
}
export const ServerInfo = ({ data }: ServerInfoProps) => {
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
              {data.type === 'virtual' && <VirtualHeader data={data} />}
              {data.type === 'dedicated' && <DedicatedHeader data={data} />}
              {data.type === 'hosting' && <HostingHeader data={data} />}
            </AccordionTrigger>
            <AccordionContent className="border-t mt-8">
              {data.type === 'virtual' && <VirtualTabs data={data} />}
              {data.type === 'dedicated' && <DedicatedTabs data={data} />}
              {data.type === 'hosting' && <HostingTabs data={data} />}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};
