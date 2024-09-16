'use client';
import { Separator } from '@/components/ui/separator';
import { ServerType } from '@/types/server';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from '@/components/ui/carousel-tariff';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Icon } from '@/components/utils/icon';
import { VirtualSelectTariff } from '@/app/components/products/server/virtual/virtual-select-tariff';

// TODO: запит для отримання списку тарифів відповідно до типу сервера (хостингу)
const virtualTariffs = [
  {
    id: 1,
    icon: 'TariffOne',
    title: 'Підприємець',
    disk: '50 Gb',
    memory: '512 Mb',
    processor: '1 Intel XEON',
    additional: [
      'Безлімітний трафік',
      'Датацентр ODS',
      'Бекапи раз на тиждень',
    ],
    price: 300,
    promoPrice: 250,
    promoPriceForYear: 3000,
  },
  {
    id: 2,
    icon: 'TariffTwo',
    title: 'Компанія',
    disk: '100 Gb',
    memory: '4 096 Mb',
    processor: '2 Intel XEON',
    additional: ['Безлімітний трафік', 'Датацентр ODS', 'Бекапи кожного дня'],
    price: 700,
    promoPrice: 583,
    promoPriceForYear: 7000,
  },
  {
    id: 3,
    icon: 'TariffThree',
    title: 'Корпорація',
    disk: '150 Gb',
    memory: '8 192 Mb',
    processor: '4 Intel XEON',
    additional: [
      'Безлімітний трафік',
      'Датацентр ODS',
      'Бекапи кожні 4 години',
    ],
    price: 1600,
    promoPrice: 1333,
    promoPriceForYear: 16000,
  },
];
const dedicatedTariff = [
  {
    id: 1,
    title: 'Тариф від 2 місяців',
    price: 1000,
  },
];
const hostingTariff = [
  {
    id: 1,
    title: 'Тариф від 2 місяців',
    price: 1000,
  },
];

interface ServerChangeTariffProps {
  data: ServerType;
}
export const ServerChangeTariff = ({ data }: ServerChangeTariffProps) => {
  let tariffs;
  if (data.type === 'virtual') {
    tariffs = virtualTariffs;
  }
  if (data.type === 'dedicated') {
    tariffs = dedicatedTariff;
  }
  if (data.type === 'hosting') {
    tariffs = hostingTariff;
  }

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
          {tariffs?.map((item, index) => (
            <CarouselItem key={index} className={cn(`max-w-[304px] w-full`)}>
              <div
                className={cn(
                  'border border-main-color rounded-[6px]',
                  !inContainer && 'border-transparent',
                )}
              >
                <VirtualSelectTariff data={data} tariff={item} />
                {/* <div className="flex flex-col gap-4 items-center justify-center p-6">
                  <div className="text-4xl font-semibold">{item.id}</div>
                  <div className="text-2xl">{item.title}</div>
                  <div className="text-2xl">{item.price} грн</div>
                </div> */}
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
            {Array.from({ length: tariffs ? tariffs?.length : 0 }).map(
              (_, index) => (
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
              ),
            )}
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
