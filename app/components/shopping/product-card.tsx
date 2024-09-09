import Image from 'next/image';

interface ProductCardProps {
  item: any;
}
export const ProductCard = ({ item }: ProductCardProps) => {
  const total = Number(item.price) * Number(item.quantity);
  return (
    <div className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] border border-gray-light rounded-[4px] bg-white p-3 mb-4">
      <div className="flex gap-2 items-center mb-1">
        <div className="flex-shrink-0">
          <Image src={item.photo} width={64} height={64} alt={item.name} />
        </div>
        <div className="flex-grow">{item.name}</div>
      </div>
      <div className="flex gap-2 items-center justify-between mb-3">
        <div className="text-sm text-main-dark font-normal leading-main-lh">
          Гарантійний термін:
        </div>
        <div className="text-sm font-semibold text-main-dark leading-normal">
          до 12.11.25
        </div>
      </div>
    </div>
  );
};
