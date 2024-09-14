import { repairType } from '@/types/repair';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Icon } from '@/components/utils/icon';

interface RepairInfoPartsProps {
  data: repairType;
}
export const RepairInfoParts = ({ data }: RepairInfoPartsProps) => {
  return (
    <>
      <p className="font-semibold mb-4">Запчастини</p>
      {data?.partsList && Array.isArray(data.partsList) && (
        <ScrollArea className="w-full h-[200px]">
          <ScrollBar orientation="vertical" />
          <ul className="w-full flex flex-col gap-3 pr-4">
            {data.partsList?.map((item) => (
              <li
                key={item.id}
                className="flex gap-2 items-center border border-gray-light rounded shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] bg-white p-3 "
              >
                <div className="w-16 h-16 object-contain">
                  {item.imgSrc && (
                    <Image
                      src={item.imgSrc}
                      alt="image"
                      width={64}
                      height={64}
                    />
                  )}
                  {!item.imgSrc && (
                    <Icon
                      iconName="ImageDefault"
                      width={56}
                      height={56}
                      className="fill-gray-medium"
                    />
                  )}
                </div>
                <div className="w-full flex flex-col gap-2">
                  <p className="text-left">{item.title}</p>
                  <p className="text-right">
                    {item.quantity} x {item.price} грн
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </>
  );
};
