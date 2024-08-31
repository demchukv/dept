import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/app/components/card/card';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/components/utils/icon';

interface BillsListProps {
  className?: string;
}
export const BillsList = ({ className }: BillsListProps) => {
  return (
    <Card className={className}>
      <Accordion
        type="single"
        collapsible
        className="border-none"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="flex gap-2 font-semibold text-base leading-tight text-main-dark items-center">
              <Icon iconName="BillList" width={24} height={24} />
              <p>Рахунки</p>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Separator className="mt-4 mb-4 border-gray-light" />

            <div>Component for list operations</div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
