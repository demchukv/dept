import { Button } from '@/components/ui/button';
import Image from 'next/image';
interface OrderProductProps {
  product: any;
}
export const OrderProduct = ({ product }: OrderProductProps) => {
  const total = Number(product.price) * Number(product.quantity);
  return (
    <div className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] border border-gray-light rounded-[4px] bg-white p-3 mb-4">
      <div className="flex gap-2 items-center mb-1">
        <div className="flex-shrink-0">
          <Image
            src={product.photo}
            width={64}
            height={64}
            alt={product.name}
          />
        </div>
        <div className="flex-grow">{product.name}</div>
      </div>
      <div className="flex gap-2 items-center justify-between mb-3">
        <div className="text-sm text-main-dark font-normal leading-main-lh">
          {Number(product.price.toFixed(2))} грн x {product.quantity} од
        </div>
        <div className="text-base font-semibold text-main-dark leading-normal">
          {total.toFixed(2)} грн
        </div>
      </div>
      <Button
        type="button"
        variant="ghost"
        className="font-semibold text-sm leading-main-lh text-main-color"
      >
        Гарантійний талон
      </Button>
    </div>
  );
};
