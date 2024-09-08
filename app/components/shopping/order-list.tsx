import { OrderItem } from '@/app/components/shopping/order-item';
import { Accordion } from '@/components/ui/accordion';

interface OrderListProps {
  orders: any;
}
export const OrderList = ({ orders }: OrderListProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-4 border-none"
    >
      {orders.map((order: any) => (
        <OrderItem key={order.id} order={order} />
      ))}
    </Accordion>
  );
};
