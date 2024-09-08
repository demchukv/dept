import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React from 'react';
import { Separator } from '@/components/ui/separator';

const stateList: stateType[] = [
  {
    id: 1,
    name: 'Обробляється',
  },
  {
    id: 2,
    name: 'Відправлено',
  },
  {
    id: 3,
    name: 'Очікує отримувача',
  },
  {
    id: 4,
    name: 'Виконано',
  },
];

type stateType = {
  id: number;
  name: string;
  date?: string | null;
};
interface TrackerProps {
  state: number;
  data: stateType[];
}
export const Tracker = ({ state, data }: TrackerProps) => {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full flex flex-col gap-4 border-none"
    >
      <AccordionItem value="tracker">
        <AccordionTrigger className="gap-3 items-start">
          <div className="flex flex-row gap-2 flex-grow items-center justify-start">
            <p className="font-normal text-sm text-gray-dark leading-main-lh">
              Статус:
            </p>
            <p
              className={cn(
                'font-semibold text-base leading-normal',
                state === 1 && 'text-attention',
                state === 2 && 'text-blue-additional-color',
                state === 3 && 'text-orange-additional-color',
                state === 4 && 'text-green-additional-color',
              )}
            >
              {stateList[state - 1].name}
            </p>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <Separator className="mb-4" />
          <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-[24px_auto_24px_auto_24px_auto_24px]">
            {data.map((item, ind) => (
              <React.Fragment key={item.id}>
                {ind > 0 && <TrackerLine state={state} id={item.id} />}
                <TrackerPoint
                  name={item.name}
                  state={state}
                  id={item.id}
                  date={item.date}
                />
              </React.Fragment>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

interface TrackerPointProps {
  name: string;
  state: number;
  id: number;
  date?: string | null;
}
const TrackerPoint = ({ name, state, id, date }: TrackerPointProps) => {
  return (
    <div className="grid grid-cols-[24px_auto] gap-1 sm:grid-cols-1 relative">
      <div
        className={cn(
          'w-6 h-6 rounded-full border grid place-items-center border-transparent',
          state === 1 && state === id && 'border-attention',
          state === 2 && state === id && 'border-blue-additional-color',
          state === 3 && state === id && 'border-orange-additional-color',
          state === 4 && state === id && 'border-green-additional-color',
        )}
      >
        <div
          className={cn(
            'w-3 h-3 rounded-full bg-gray-medium',
            state === 1 && state >= id && 'bg-attention',
            state === 2 && state >= id && 'bg-blue-additional-color',
            state === 3 && state >= id && 'bg-orange-additional-color',
            state === 4 && state >= id && 'bg-green-additional-color',
          )}
        ></div>
      </div>
      {state >= id && (
        <div
          className={cn(
            'flex gap-2 items-center ',
            id === 1 && 'sm:absolute sm:left-0 sm:top-7',
            id > 1 && id < 4 && 'sm:absolute sm:left-[-80%] sm:top-7',
            id === 4 && 'sm:absolute sm:right-0 sm:top-7',
          )}
        >
          {date && (
            <span className="text-sm font-normal text-main-dark leading-main-lh">
              {date}
            </span>
          )}
          <span
            className={cn(
              'sm:hidden text-sm font-medium text-gray-dark leading-main-lh',
              state === id && 'font-semibold',
            )}
          >
            {name}
          </span>
        </div>
      )}
    </div>
  );
};

interface TrackerLineProps {
  state: number;
  id: number;
}
const TrackerLine = ({ state, id }: TrackerLineProps) => {
  return (
    <div className="w-6 h-4 sm:w-full sm:h-6 grid place-items-center">
      <div
        className={cn(
          'w-0 h-4 sm:w-full sm:h-0 rounded-[1px] border-2 border-solid sm:border-dashed border-gray-medium',
          state === 1 && state >= id && 'border-attention',
          state === 2 && state >= id && 'border-blue-additional-color',
          state === 3 && state >= id && 'border-orange-additional-color',
          state === 4 && state >= id && 'border-green-additional-color',
        )}
      ></div>
    </div>
  );
};
