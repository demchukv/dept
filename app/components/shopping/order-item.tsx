import { Tracker } from '@/app/components/shopping/tracker';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface OrderItemProps {
  order: any;
}
export const OrderItem = ({ order }: OrderItemProps) => {
  const accItemClass =
    'w-full bg-white rounded-[6px] p-4 md:pb-7 lg:py-8 lg:px-7';
  let currentStatus: any;
  for (const item of order.status) {
    if (item.date) {
      currentStatus = item;
    }
  }

  return (
    <AccordionItem value={`order-${order.id}`} className={accItemClass}>
      <AccordionTrigger className="gap-3 items-start">
        <div className="flex flex-col flex-grow items-start justify-start">
          <p>№ {order.number}</p>
          <p
            className={cn(
              'm-0 font-semibold text-sm leading-main-lh mb-2',
              currentStatus.id === 1 && 'text-attention',
              currentStatus.id === 2 && 'text-blue-additional-color',
              currentStatus.id === 3 && 'text-orange-additional-color',
              currentStatus.id === 4 && 'text-green-additional-color',
            )}
          >
            {currentStatus.name}
          </p>
          <div className="w-full text-left">
            {order.products.map((product: any) => (
              <div
                key={product.id}
                className="flex justify-between gap-3 text-main-dark font-normal text-sm leading-main-lh mb-2"
              >
                <div>{product.name}</div>
                <div>{currentStatus.name}</div>
              </div>
            ))}
          </div>
        </div>
      </AccordionTrigger>
      <AccordionContent>
        <Separator className="mb-4" />
        <Tracker state={currentStatus.id} data={order.status} />
      </AccordionContent>
    </AccordionItem>
  );
};
