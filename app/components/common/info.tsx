import { Icon } from '@/components/utils/icon';

export const Info = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-start gap-2 font-normal text-xs text-gray-dark leading-[1.33] mt-3">
      <Icon
        iconName="Info"
        width={20}
        height={20}
        className="fill-gray-dark flex-shrink-0"
      />
      <p>{children}</p>
    </div>
  );
};
