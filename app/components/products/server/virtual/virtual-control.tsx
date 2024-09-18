import { ServerType } from '@/types/server';
import { VirtualDedicatedControl } from '@/app/components/products/server/virtual/virtual-dedicated-control';

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
      <ul className="flex gap-3 mb-8">
        {baseInfo.map((item, index) => (
          <li
            key={index}
            className="list-disc first:list-none pr-3 last:pr-0  text-gray-medium"
          >
            <span className="text-main-dark">{item}</span>
          </li>
        ))}
      </ul>
      <VirtualDedicatedControl data={data} />
    </>
  );
};
