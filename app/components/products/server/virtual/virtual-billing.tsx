import { ServerType } from '@/types/server';
import { ServerPromotion } from '@/app/components/products/server/server-promotion';

interface VirtualBillingProps {
  data: ServerType;
}
export const VirtualBilling = ({ data }: VirtualBillingProps) => {
  return (
    <>
      <ServerPromotion />
    </>
  );
};
