import { ServerType } from '@/types/server';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/app/components/card/card';
import { cn } from '@/lib/utils';

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
              {data.title}
            </AccordionTrigger>
            <AccordionContent className="border-t mt-8 pt-8">
              Content tabs
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};
