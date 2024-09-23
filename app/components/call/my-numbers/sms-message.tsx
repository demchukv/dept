import { Icon } from '@/components/utils/icon';

interface SmsMessageProps {
  children: React.ReactNode;
}
export const SmsMessage = ({ children }: SmsMessageProps) => {
  return (
    <div className="bg-gray-light rounded-[8px] p-4 relative overflow-visible mb-2">
      {children}
      <div className="absolute bottom-[-2px] left-[-6px]">
        <Icon
          iconName="MsgTriangle"
          width={14}
          height={11}
          className="fill-gray-light"
        />
      </div>
    </div>
  );
};
