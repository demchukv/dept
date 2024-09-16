import { ServerType, DedicatedType } from '@/types/server';

interface DedicatedHeaderProps {
  data: ServerType;
}
export const DedicatedHeader = ({ data }: DedicatedHeaderProps) => {
  return (
    <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between">
      {data?.dedicated?.name && <div>{data.dedicated.name}</div>}
      <div className="w-full sm:w-auto flex flex-end justify-between gap-6 font-normal">
        {data?.dedicated?.ip && (
          <div className="hidden sm:block">IP-адреса: {data.dedicated.ip}</div>
        )}
        {data?.price && <div>{data.price} грн/міс</div>}
        {data?.dedicated?.activeTo && <div>до {data.dedicated.activeTo}</div>}
      </div>
    </div>
  );
};
