import { ServerType, DedicatedType } from '@/types/server';

interface DedicatedHeaderProps {
  data: ServerType;
}
export const DedicatedHeader = ({ data }: DedicatedHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      {data?.dedicated?.name && <div>{data.dedicated.name}</div>}
      <div className="flex flex-end gap-6 font-normal">
        {data?.dedicated?.ip && <div>IP-адреса: {data.dedicated.ip}</div>}
        {data?.dedicated?.price && <div>{data.dedicated.price} грн/міс</div>}
        {data?.dedicated?.activeTo && <div>до {data.dedicated.activeTo}</div>}
      </div>
    </div>
  );
};
