import { cn } from '@/lib/utils';

export const Tracker = () => {
  const stateList = [
    {
      id: 1,
      name: 'Обробляється',
      color: 'attention',
    },
    {
      id: 2,
      name: 'Відправлено',
      color: 'blue-additional-color',
    },
    {
      id: 3,
      name: 'Очікує отримувача',
      color: 'orange-additional-color',
    },
    {
      id: 4,
      name: 'Виконано',
      color: 'green-additional-color',
    },
  ];
  const defColor = 'gray-medium';
  return (
    <div>
      <div className="grid grid-cols-1 gap-0.5 sm:grid-cols-[24px_auto_24px_auto_24px_auto_24px]">
        <TrackerPoint color="attention" outer={false} />
        <TrackerLine color="attention" />
        <TrackerPoint color="blue-additional-color" outer={false} />
        <TrackerLine color="blue-additional-color" />
        <TrackerPoint color="orange-additional-color" outer={false} />
        <TrackerLine color="orange-additional-color" />
        <TrackerPoint color="green-additional-color" outer={true} />
      </div>
    </div>
  );
};

interface TrackerPointProps {
  color: string;
  outer: boolean;
}
const TrackerPoint = ({ color, outer }: TrackerPointProps) => {
  return (
    <div
      className={cn(
        'w-6 h-6 rounded-full border grid place-content-center',
        outer ? `border-${color}` : 'border-transparent',
      )}
    >
      <div className={cn('w-3 h-3 rounded-full', `bg-${color}`)}></div>
    </div>
  );
};

interface TrackerLineProps {
  color: string;
}
const TrackerLine = ({ color }: TrackerLineProps) => {
  return (
    <div className="w-6 h-4 sm:w-full sm:h-6 grid place-items-center">
      <div
        className={cn(
          'w-0 h-4 sm:w-full sm:h-0 rounded-[1px] border-2 border-dashed ',
          `border-${color}`,
        )}
      ></div>
    </div>
  );
};
