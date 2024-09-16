import { ServerType, VirtualType } from '@/types/server';

interface VirtualHeaderProps {
  data: ServerType;
}
export const VirtualHeader = ({ data }: VirtualHeaderProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
      {data?.virtual?.name && <div>{data.virtual.name}</div>}
      <div className="w-full sm:w-auto flex flex-end justify-between gap-6 font-normal">
        {data?.virtual?.ip && (
          <div className="hidden sm:block">IP-адреса: {data.virtual.ip}</div>
        )}
        {data?.virtual?.price && <div>{data.virtual.price} грн/міс</div>}
        {data?.virtual?.activeTo && <div>до {data.virtual.activeTo}</div>}
      </div>
    </div>
  );
};
