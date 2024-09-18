import { ServerType } from '@/types/server';
import { VirtualDedicatedControl } from '@/app/components/products/server/virtual/virtual-dedicated-control';
import { KeyValText } from '@/app/components/common/key-val-text';

const baseInfo = [
  'Система: Ubuntu 20.04',
  'CPU: 2x2.4 GHz',
  'RAM: 8 Gb',
  'SSD: 300 Gb',
];
const imagesList = [
  { key: 1, value: 'Власний ISO' },
  { key: 2, value: 'Debian 11' },
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
    </>
  );
};
