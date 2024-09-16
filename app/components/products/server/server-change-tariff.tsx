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

const CARD_WIDTH = 280;

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
        <CarouselContent>
          {tariffs.map((item, index) => (
            <CarouselItem
              key={index}
              className={cn(`max-w-[${CARD_WIDTH}px] w-full`)}
            >
              <div className="border border-main-color rounded-[6px]">
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
          >
            Prev
          </Button>
          <div className="flex gap-2 items-center justify-center">
            {Array.from({ length: tariffs.length }).map((_, index) => (
              <Button
                type="button"
                variant="ghost"
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  'w-3 h-3 rounded-full bg-main-color',
                  api?.selectedScrollSnap() === index && 'w-5 h-5',
                )}
              ></Button>
            ))}
          </div>
          <Button
            type="button"
            variant="ghost"
            onClick={() => api?.canScrollNext() && api?.scrollNext()}
            disabled={!api?.canScrollNext()}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};
