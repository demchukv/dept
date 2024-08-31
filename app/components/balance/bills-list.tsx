import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Card } from '@/app/components/card/card';
import { Separator } from '@/components/ui/separator';
import { Icon } from '@/components/utils/icon';
import { Loading } from '@/app/components/common/loading';
import { ErrorMessage } from '@/app/components/common/error-message';

import { columns } from '@/app/components/data-table/columns/columns-order-doc-list';
import { DataTableNoBorder } from '@/app/components/data-table/data-table-no-border';
import useSWR from 'swr';

interface BillsListProps {
  className?: string;
}

const fetcher = () =>
  fetch('/test-data/bag-doc.json').then((res) => res.json());

export const BillsList = ({ className }: BillsListProps) => {
  const { data, error } = useSWR('/test-data/bag-doc.json', fetcher);

  if (error) return <ErrorMessage>Failed to load</ErrorMessage>;
  if (!data) return <Loading className="min-h-60" />;

  const initPagination = {
    pageIndex: 0,
    pageSize: 5,
  };
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

            <DataTableNoBorder
              columns={columns}
              data={data}
              rowCount={data.length}
              pagination={initPagination}
              isPending={!data}
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
};
