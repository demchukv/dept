import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { smsType } from '@/types/call';
import { cn } from '@/lib/utils';
import { SmsStatusLabel } from '@/app/components/call/my-numbers/sms-status-label';

interface SmsListRowProps {
  msg: smsType;
  index?: number;
  listType: 'incoming' | 'outgoing';
  onDeleteSms: (id: number) => void;
}
export const SmsListRow = ({
  msg,
  index = 0,
  listType,
  onDeleteSms,
}: SmsListRowProps) => {
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
            onClick={() => onDeleteSms(msg.id)}
          >
            <Icon iconName="Trash" width={24} height={24} className="w-6 h-6" />
          </Button>
        </div>
        <div className="bg-bg-color px-2 py-2 border-b border-gray-light">
          Текст
        </div>
        <div className="bg-bg-color pr-2 py-2 border-b border-gray-light text-xs">
          {msg.text}
          {listType === 'outgoing' && <SmsStatusLabel status={msg.status} />}
        </div>
        <div className="bg-white px-2 py-2">Дата</div>
        <div className="bg-white pr-2 py-2">{msg.date}</div>
      </div>
    </>
  );
};

export const SmsListRowBig = ({
  msg,
  index = 0,
  listType,
  onDeleteSms,
}: SmsListRowProps) => {
  return (
    <>
      <div
        className={cn(
          'pl-8 pr-6 py-[18px] flex items-center justify-between gap-2',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        <span className="font-medium text-sm leading-main-lh whitespace-nowrap place-content-center">
          від <span className="text-main-color">{msg.numberFrom}</span>
          <br />
          на {msg.numberTo}
        </span>
      </div>
      <div
        className={cn(
          'pr-6 py-[18px] text-xs place-content-center',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        {msg.text}
        {listType === 'outgoing' && <SmsStatusLabel status={msg.status} />}
      </div>
      <div
        className={cn(
          'pr-6 py-[18px] text-sm leading-main-lh place-content-center',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        {msg.date}
      </div>
      <div
        className={cn(
          'pr-8 py-[18px] place-content-center',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        <Button
          type="button"
          variant="ghost"
          className="text-warning hover:text-main-dark mr-2"
          onClick={() => onDeleteSms(msg.id)}
        >
          <Icon iconName="Trash" width={24} height={24} className="w-6 h-6" />
        </Button>
      </div>
    </>
  );
};
