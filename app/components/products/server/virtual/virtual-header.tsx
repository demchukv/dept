import { ServerType, VirtualType } from '@/types/server';

interface VirtualHeaderProps {
  data: ServerType;
}
export const VirtualHeader = ({ data }: VirtualHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      {data?.virtual?.name && <div>{data.virtual.name}</div>}
      <div className="flex flex-end gap-6 font-normal">
        {data?.virtual?.ip && <div>IP-адреса: {data.virtual.ip}</div>}
        {data?.virtual?.price && <div>{data.virtual.price} грн/міс</div>}
        {data?.virtual?.activeTo && <div>до {data.virtual.activeTo}</div>}
      </div>
    </div>
  );
};
