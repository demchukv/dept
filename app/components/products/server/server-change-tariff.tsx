'use client';
import { Separator } from '@/components/ui/separator';
import { ServerType } from '@/types/server';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel-tariff';
import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/utils/icon';

// TODO: запит для отримання списку тарифів відповідно до типу сервера (хостингу)
const tariffs = [
  {
    id: 1,
    title: 'Тариф від 2 місяців',
    price: 1000,
  },
  {
    id: 2,
    title: 'Тариф від 3 місяців',
    price: 950,
  },
  {
    id: 3,
    title: 'Тариф від 6 місяців',
    price: 900,
  },
  {
    id: 4,
    title: 'Тариф від 8 місяців',
    price: 850,
  },
];

interface ServerChangeTariffProps {
  data: ServerType;
}
export const ServerChangeTariff = ({ data }: ServerChangeTariffProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [inContainer, setInContainer] = useState(false);

  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const handleResize = () => {
      setContainerWidth(api?.rootNode().clientWidth + 24 ?? 0);
      setContentWidth(api?.containerNode().scrollWidth - 1 ?? 0);
      setInContainer(containerWidth >= contentWidth ? false : true);

      api.reInit();
    };

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, [api, containerWidth, contentWidth]);

  return (
    <>
      <Separator className="my-4" />
      <p className="font-semibold text-base leading-normal mb-2">
        Зміна тарифу
      </p>
      <p className="mb-4">
        Ви можете розшири можливості поточного тарифу без припинення
        користування послугами та без необхідності перенесення даних на інший
        тариф.
      </p>

      <Carousel setApi={setApi} className="w-full">
        <CarouselContent className={cn(!inContainer && 'flex justify-between')}>
          {tariffs.map((item, index) => (
            <CarouselItem key={index} className={cn(`max-w-[304px] w-full`)}>
              <div
                className={cn(
                  'border border-main-color rounded-[6px]',
                  !inContainer && 'border-transparent',
                )}
              >
                <div className="flex flex-col gap-4 items-center justify-center p-6">
                  <div className="text-4xl font-semibold">{item.id}</div>
                  <div className="text-2xl">{item.title}</div>
                  <div className="text-2xl">{item.price} грн</div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {inContainer && (
        <div className="flex justify-between items-center gap-2 mt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => api?.canScrollPrev() && api?.scrollPrev()}
            disabled={!api?.canScrollPrev()}
            className="text-main-color"
          >
            <Icon
              iconName="ArrowPrev"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Button>
          <div className="flex gap-4 items-center justify-center">
            {Array.from({ length: tariffs.length }).map((_, index) => (
              <Button
                type="button"
                variant="ghost"
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'w-2 h-2 rounded-full bg-main-color',
                  api?.selectedScrollSnap() === index && 'w-4 h-4',
                )}
              ></Button>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => api?.canScrollNext() && api?.scrollNext()}
            disabled={!api?.canScrollNext()}
            className="text-main-color"
          >
            <Icon
              iconName="ArrowNext"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </Button>
        </div>
      )}
    </>
  );
};
