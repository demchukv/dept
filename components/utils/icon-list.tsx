import { Icons } from '@/components/icons';
import { Icon } from '@/components/utils/icon';

export const IconList = () => {
  console.log(Icons);
  return (
    <div className="grid grid-cols-4 gap-4">
      {Object.keys(Icons).map((key) => (
        <div key={key} className="flex flex-col gap-1">
          <Icon
            key={key}
            iconName={key}
            width={48}
            height={48}
            className="fill-main-dark h-12 w-12"
          />
          <span className="text-xl text-gray-medium">{key}</span>
        </div>
      ))}
    </div>
  );
};
