import { electronicType } from '@/types/electronic';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icon } from '@/components/utils/icon';
import { Progress } from '@/components/ui/progress';
import { useEffect, useState } from 'react';
import { ImageZoom } from '@/app/components/common/image-zoom';
import { KeyValText } from '@/app/components/common/key-val-text';
import { Separator } from '@/components/ui/separator';

interface ElectronicInfoPhotoProps {
  data: electronicType;
}
export const ElectronicInfoPhoto = ({ data }: ElectronicInfoPhotoProps) => {
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
      <div className="flex flex-col-reverse sm:flex-col">
        <div>
          <p className="font-semibold leading-main-lh mb-4">
            Реальні фото пристрою
          </p>
          {data?.photoList && Array.isArray(data.photoList) && (
            <ScrollArea className="min-w-full w-[200px] h-[94px] overflow-x-hidden pb-2 mb-8">
              <ul className="flex flex-row gap-4">
                {data.photoList?.map((item) => (
                  <li
                    key={item.id}
                    className="w-20 h-20 grid place-content-center"
                  >
                    <div className="w-14 h-14 object-contain">
                      {item.imgSrc && (
                        <ImageZoom
                          src={item.imgSrc}
                          alt={data.title}
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
        </div>
        <div className="flex flex-col sm:flex-col-reverse">
          <div>
            <KeyValText
              k="В користуванні:"
              val={`з ${data.fromDate}`}
              className="sm:hidden mb-3 text-sm justify-between"
            />
            <KeyValText
              k="Термін оренди:"
              val={`до ${data.toDate}`}
              className="sm:hidden mb-3 text-sm justify-between"
            />
            {data.serial && (
              <KeyValText
                k="Серійний номер:"
                val={data.serial}
                className="sm:hidden mb-3 text-sm justify-between sm:justify-start"
              />
            )}
          </div>
          <div className="flex flex-col-reverse sm:flex-col">
            <p className="mb-4">{data?.description}</p>
            <div>
              <p className="flex justify-between font-semibold mb-2 sm:mb-3 mt-2 sm:mt-0">
                Стан пристрою{' '}
                <span className="font-normal">{data?.progressTitle}</span>
              </p>
              {data.progress && (
                <Progress value={progress} className="w-full mb-2" />
              )}
            </div>
          </div>
        </div>
      </div>
      <Separator className="mt-4 sm:hidden" />
    </>
  );
};
