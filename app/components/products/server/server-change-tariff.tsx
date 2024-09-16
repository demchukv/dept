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
import { useEffect, useState } from 'react';

interface ServerChangeTariffProps {
  data: ServerType;
}
export const ServerChangeTariff = ({ data }: ServerChangeTariffProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

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

      <div className="mx-auto max-w-xs">
        <Carousel setApi={setApi} className="w-full max-w-xs">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <div>
                  <div className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Slide {current} of {count}
        </div>
      </div>
    </>
  );
};
