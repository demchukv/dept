import { repairType } from '@/types/repair';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

interface RepairInfoWorkProps {
  data: repairType;
}
export const RepairInfoWork = ({ data }: RepairInfoWorkProps) => {
  return (
    <>
      <p className="font-semibold mb-4">Роботи</p>
      {data?.workList && Array.isArray(data.workList) && (
        <ScrollArea className="w-full h-[200px]">
          <ScrollBar orientation="vertical" />
          <ul className="w-full flex flex-col gap-3 pr-4">
            {data.workList?.map((item) => (
              <li
                key={item.id}
                className="flex flex-col gap-2 border border-gray-light rounded shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] bg-white p-3 "
              >
                <p className="text-left">{item.title}</p>
                <p className="text-right">
                  {item.quantity} x {item.price} грн
                </p>
              </li>
            ))}
          </ul>
        </ScrollArea>
      )}
    </>
  );
};
