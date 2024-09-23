import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { smsType } from '@/types/call';

interface SmsListRowProps {
  msg: smsType;
  index?: number;
}
export const SmsListRow = ({ msg }: SmsListRowProps) => {
  return (
    <>
      <div className="grid grid-cols-[auto_auto] border border-gray-light rounded-[6px] text-sm text-main-dark leading-main-lh overflow-hidden">
        <div className="bg-white px-2 py-2 border-b border-gray-light">
          Від кого/кому
        </div>
        <div className="bg-white pr-2 py-2 border-b border-gray-light flex items-center justify-between gap-2">
          <span className="font-medium whitespace-nowrap">
            від <span className="text-main-color">{msg.numberFrom}</span>
            <br />
            на {msg.numberTo}
          </span>
          <Button
            type="button"
            variant="ghost"
            className="text-warning hover:text-main-dark mr-2"
          >
            <Icon iconName="Trash" width={24} height={24} className="w-6 h-6" />
          </Button>
        </div>
        <div className="bg-bg-color px-2 py-2 border-b border-gray-light">
          Текст
        </div>
        <div className="bg-bg-color pr-2 py-2 border-b border-gray-light text-xs">
          {msg.text}
        </div>
        <div className="bg-white px-2 py-2">Дата</div>
        <div className="bg-white pr-2 py-2">{msg.date}</div>
      </div>
    </>
  );
};

export const SmsListRowBig = ({ msg, index }: SmsListRowProps) => {
  return (
    <>
      <div className="pl-8 pr-6 py-2 border-b border-gray-light flex items-center justify-between gap-2">
        <span className="font-medium text-sm leading-main-lh whitespace-nowrap place-content-center">
          від <span className="text-main-color">{msg.numberFrom}</span>
          <br />
          на {msg.numberTo}
        </span>
      </div>
      <div className="pr-6 py-2 border-b border-gray-light text-xs place-content-center">
        {msg.text}
      </div>
      <div className="pr-6 py-2 border-b border-gray-light text-sm leading-main-lh place-content-center">
        {msg.date}
      </div>
      <div className="pr-8 border-b border-gray-light place-content-center">
        <Button
          type="button"
          variant="ghost"
          className="text-warning hover:text-main-dark mr-2"
        >
          <Icon iconName="Trash" width={24} height={24} className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
};
