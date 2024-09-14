import { repairType } from '@/types/repair';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icon } from '@/components/utils/icon';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { ImageZoom } from '@/app/components/common/image-zoom';
import { KeyValText } from '@/app/components/common/key-val-text';
import { Separator } from '@/components/ui/separator';

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
      {data.serial && (
        <KeyValText
          k="Серійний номер:"
          val={data.serial}
          className="sm:hidden mb-3"
        />
      )}
      {data.device && (
        <KeyValText
          k="Пристрій:"
          val={data.device}
          className="sm:hidden mb-4"
        />
      )}

      <p className="font-semibold mb-4">Фотофіксація на момент отримання</p>
      {data?.photoList && Array.isArray(data.photoList) && (
        <ScrollArea className="min-w-full w-[200px] h-[94px] overflow-x-hidden pb-2 mb-1">
          <ul className="flex flex-row gap-4">
            {data.photoList?.map((item) => (
              <li key={item.id} className="w-20 h-20 grid place-content-center">
                <div className="w-14 h-14 object-contain">
                  {item.imgSrc && (
                    <ImageZoom
                      src={item.imgSrc}
                      alt={data.device}
                      className="w-14 h-14 cursor-pointer"
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
          <ScrollBar orientation="horizontal" forceMount={true} />
        </ScrollArea>
      )}
      <p className="flex justify-between font-semibold mb-2 sm:mb-4 mt-2 sm:mt-0">
        Стан пристрою{' '}
        <span className="sm:hidden font-normal">{data?.progressTitle}</span>
      </p>
      {data.progress && <Progress value={progress} className="w-full mb-2" />}
      {data.progressTitle && (
        <p className="hidden sm:block">{data.progressTitle}</p>
      )}
      {data.defect && <p className="sm:hidden">{data.defect}</p>}
      <Separator className="mt-4 sm:hidden" />
    </>
  );
};
