import { ServerType, HostingType } from '@/types/server';

interface HostingHeaderProps {
  data: ServerType;
}
export const HostingHeader = ({ data }: HostingHeaderProps) => {
  return (
    <div className="w-full flex items-center justify-between">
      {data?.hosting?.name && <div>{data.hosting.name}</div>}
      <div className="flex flex-end gap-6 font-normal text-gray-medium">
        {data?.hosting?.sites && data?.hosting?.maxSites && (
          <div>
            Сайтів: {data.hosting.sites}/{data.hosting.maxSites}
          </div>
        )}
        {data?.hosting?.disk && data?.hosting?.maxDisk && (
          <div>
            Диск: {data.hosting.disk}/{data.hosting.maxDisk}
          </div>
        )}
        {data?.hosting?.databases && data?.hosting?.maxDatabases && (
          <div>
            БД: {data.hosting.databases}/{data.hosting.maxDatabases}
          </div>
        )}
      </div>
      <div className="flex flex-end gap-6 font-normal">
        {data?.hosting?.price && <div>{data.hosting.price} грн/міс</div>}
        {data?.hosting?.activeTo && <div>до {data.hosting.activeTo}</div>}
      </div>
    </div>
  );
};
