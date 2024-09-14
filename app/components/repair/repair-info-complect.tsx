import { repairType } from '@/types/repair';

interface RepairInfoComplectProps {
  data: repairType;
}
export const RepairInfoComplect = ({ data }: RepairInfoComplectProps) => {
  return (
    <>
      <p className="font-semibold mb-4">Комплектність</p>
      {data?.complect && Array.isArray(data.complect) && (
        <ul className="flex flex-col gap-2 sm:mb-4">
          {data.complect.map((item, index) => (
            <li key={index} className="font-bold text-xs text-gray-dark">
              {item}
            </li>
          ))}
        </ul>
      )}
      {data?.defect && <p className="hidden sm:block">{data.defect}</p>}
    </>
  );
};
