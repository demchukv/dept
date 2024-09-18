import { ServerType } from '@/types/server';
import { VirtualDedicatedControl } from '@/app/components/products/server/virtual/virtual-dedicated-control';
import { KeyValText } from '@/app/components/common/key-val-text';
import { VirtualControlISO } from '@/app/components/products/server/virtual/virtual-control-iso';
import { VirtualDedicatedTransfer } from '@/app/components/products/server/virtual/virtual-dedicated-transfer';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';

const baseInfo = [
  'Система: Ubuntu 20.04',
  'CPU: 2x2.4 GHz',
  'RAM: 8 Gb',
  'SSD: 300 Gb',
];

interface VirtualControlProps {
  data: ServerType;
}
export const VirtualControl = ({ data }: VirtualControlProps) => {
  return (
    <>
      <ul className="hidden sm:flex gap-3 mb-8">
        {baseInfo.map((item, index) => (
          <li
            key={index}
            className="list-disc first:list-none pr-3 last:pr-0  text-gray-medium"
          >
            <span className="text-main-dark">{item}</span>
          </li>
        ))}
      </ul>
      <div className="sm:hidden mb-4 flex flex-col gap-2">
        <KeyValText
          k="Система:"
          val={baseInfo[0]}
          className="justify-between"
        />
        <KeyValText k="CPU:" val={baseInfo[1]} className="justify-between" />
        <KeyValText k="RAM:" val={baseInfo[2]} className="justify-between" />
        <KeyValText k="SSD:" val={baseInfo[3]} className="justify-between" />
      </div>
      <VirtualDedicatedControl data={data} />
      <VirtualControlISO data={data} />
      <Separator className="my-4 sm:hidden" />
      <VirtualDedicatedTransfer data={data} />
      <Separator className="my-4" />
      <div className="w-full flex justify-end">
        <Button type="button" className="py-2.5 w-full sm:w-auto">
          Запустити VNC консоль
        </Button>
      </div>
    </>
  );
};
