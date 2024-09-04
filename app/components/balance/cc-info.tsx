import { cn } from '@/lib/utils';
import Image from 'next/image';

interface CcInfoProps {
  item: {
    id: number;
    status: string;
    name: string;
    valute: string;
    number: string;
    type: string;
  };
  className?: string;
  onClick?: () => void;
}
export const CcInfo = ({ item, className = '', onClick }: CcInfoProps) => {
  return (
    <>
      <div
        className={cn('flex flex-col gap-1', className)}
        onClick={() => {
          onClick?.();
        }}
      >
        <p
          className={cn(
            'font-medium text-xs leading-[1.33]',
            item.status === 'Основна'
              ? 'text-green-additional-color'
              : 'text-blue-additional-color',
          )}
        >
          {item.status}
        </p>
        <p className="font-semibold text-base leading-normal text-main-dark">
          {item.name}
        </p>
        <p className="font-medium text-sm leading-[1.14] text-main-dark">
          {item.valute} {item.number}
        </p>
      </div>
      <div className="grid place-items-end">
        <div className="bg-bg-color rounded w-10 h-[26px] flex items-center">
          {item.type === 'Visa' && (
            <Image src="/img/visa.png" alt="Visa card" width={36} height={11} />
          )}
          {item.type === 'MC' && (
            <Image src="/img/mc.png" alt="MasterCard" width={32} height={20} />
          )}
        </div>
      </div>
    </>
  );
};
