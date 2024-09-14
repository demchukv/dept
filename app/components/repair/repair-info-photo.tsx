import { repairType } from '@/types/repair';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import Image from 'next/image';
import { Icon } from '@/components/utils/icon';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';

interface RepairInfoPhotoProps {
  data: repairType;
}
export const RepairInfoPhoto = ({ data }: RepairInfoPhotoProps) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const timer = setTimeout(
      () => setProgress(data.progress ? data.progress : 0),
      500,
    );
    return () => clearTimeout(timer);
  }, [data.progress]);
  return (
    <>
      <p className="font-semibold mb-4">Фотофіксація на момент отримання</p>
      {data?.partsList && Array.isArray(data.partsList) && (
        <ScrollArea className="max-w-full h-[80px] overflow-x-hidden mb-1">
          <ul className="w-full flex flex-row gap-4">
            {data.partsList?.map((item) => (
              <li key={item.id} className="grid place-content-center">
                <div className="w-20 h-20">
                  {item.imgSrc && (
                    <Image
                      src={item.imgSrc}
                      alt="image"
                      width={64}
                      height={64}
                    />
                  )}
                  {!item.imgSrc && (
                    <Icon
                      iconName="ImageDefault"
                      width={56}
                      height={56}
                      className="fill-gray-medium"
                    />
                  )}
                </div>
              </li>
            ))}
          </ul>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      )}
      <p className="font-semibold mb-4">Стан пристрою</p>
      {data.progress && (
        <Progress value={progress} className="w-full mb-2 bg-gray-light" />
      )}
      {data.progressTitle && <p>{data.progressTitle}</p>}
    </>
  );
};
