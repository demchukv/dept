import { Icon } from '@/components/utils/icon';
import { callType } from '@/types/call';
import { cn } from '@/lib/utils';
import { CallStatusLabel } from '@/app/components/call/my-numbers/call-status-label';
import { CallPlayer } from '@/app/components/call/my-numbers/call-player';
import Link from 'next/link';

interface SmsListRowProps {
  msg: callType;
  index?: number;
}
export const HistoryRow = ({ msg, index = 0 }: SmsListRowProps) => {
  return (
    <>
      <div className="grid grid-cols-[auto_auto] border border-gray-light rounded-[6px] text-sm text-main-dark leading-main-lh overflow-hidden">
        <div className="bg-white px-2 py-2 border-b border-gray-light">
          Дата
        </div>
        <div className="bg-white pr-2 py-2 border-b border-gray-light flex items-center justify-between gap-2">
          {msg.date}
        </div>
        <div className="bg-bg-color px-2 py-2 border-b border-gray-light">
          Напрямок
        </div>
        <div className="bg-bg-color pr-2 py-2 border-b border-gray-light  text-sm text-gray-dark font-semibold flex items-center gap-1">
          {msg.direction === 'incoming' && (
            <Icon
              iconName="Incoming"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          )}
          {msg.direction === 'incoming' ? 'Вхідний' : 'Вихідний'}
          {msg.direction === 'outgoing' && (
            <Icon
              iconName="Outgoing"
              width={20}
              height={20}
              className="w-5 h-5"
            />
          )}
        </div>
        <div className="bg-white px-2 py-2 border-b border-gray-light">
          Номер
        </div>
        <div className="bg-white pr-2 py-2 border-b border-gray-light">
          {msg.number}
        </div>
        <div className="bg-bg-color px-2 py-2 border-b border-gray-light">
          Лінія
        </div>
        <div className="bg-bg-color pr-2 py-2 border-b border-gray-light flex items-center justify-between gap-2 text-main-color font-semibold">
          {msg.line}
        </div>
        <div className="bg-white px-2 py-2 border-b border-gray-light">
          Статус
        </div>
        <div className="bg-white pr-2 py-2 border-b border-gray-light">
          <CallStatusLabel status={msg.status} />
        </div>
        {msg.status === 'ok' && (
          <>
            <div className="bg-bg-color px-2 py-2 border-b border-gray-light">
              Запис
            </div>
            <div className="bg-bg-color pr-2 py-2 border-b border-gray-light flex items-center justify-start gap-4 text-main-color font-semibold">
              <CallPlayer msg={msg} />
              <Link
                href="#"
                download
                className="font-semibold text-sm text-main-color hover:text-main-dark leading-main-lh flex items-center gap-1.5"
              >
                <Icon
                  iconName="Doc"
                  width={24}
                  height={24}
                  className="w-6 h-6 flex-shrink-0"
                />
              </Link>
            </div>
            <div className="bg-white px-2 py-2 border-b border-gray-light">
              Тривалість
            </div>
            <div className="bg-white pr-2 py-2 border-b border-gray-light">
              {msg.duration}
            </div>
            <div className="bg-bg-color px-2 py-2 ">Вартість</div>
            <div className="bg-bg-color pr-2 py-2 ">{msg.price} грн</div>
          </>
        )}
      </div>
    </>
  );
};

export const HistoryRowBig = ({ msg, index = 0 }: SmsListRowProps) => {
  return (
    <>
      <div
        className={cn(
          'pl-7 pr-6 py-[18px] flex items-center justify-between gap-2 text-sm font-medium leading-main-lh',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        {msg.id}
      </div>
      <div
        className={cn(
          'pr-5 py-[18px] text-sm font-medium leading-main-lh place-content-center',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        {msg.date}
      </div>
      <div
        className={cn(
          'pr-5 py-[18px] text-sm font-medium leading-main-lh place-content-center flex items-center gap-1',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        {msg.direction === 'incoming' && (
          <Icon
            iconName="Incoming"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        )}
        {msg.direction === 'incoming' ? 'Вхідний' : 'Вихідний'}
        {msg.direction === 'outgoing' && (
          <Icon
            iconName="Outgoing"
            width={20}
            height={20}
            className="w-5 h-5"
          />
        )}
      </div>
      <div
        className={cn(
          'pr-5 py-[18px] text-sm font-medium leading-main-lh place-content-center',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        {msg.number}
      </div>
      <div
        className={cn(
          'pr-5 py-[18px] text-sm leading-main-lh place-content-center text-main-color font-semibold',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        {msg.line}
      </div>
      <div
        className={cn(
          'pr-5 py-[18px] text-sm font-medium leading-main-lh place-content-center',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        <CallStatusLabel status={msg.status} />
      </div>
      <div
        className={cn(
          'pr-5 py-[18px] text-sm font-medium leading-main-lh place-content-center flex items-center gap-4',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        {msg.status === 'ok' && (
          <>
            {' '}
            <CallPlayer msg={msg} />
            <Link
              href="#"
              download
              className="text-main-color hover:text-main-dark leading-main-lh flex items-center gap-1.5"
            >
              <Icon
                iconName="Doc"
                width={24}
                height={24}
                className="w-6 h-6 flex-shrink-0"
              />
            </Link>
          </>
        )}
      </div>
      <div
        className={cn(
          'pr-5 py-[18px] text-sm font-medium leading-main-lh place-content-center',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        {msg.duration}
      </div>
      <div
        className={cn(
          'pr-7 py-[18px] place-content-center text-sm font-medium leading-main-lh',
          index % 2 === 0 ? 'bg-white' : 'bg-bg-color',
        )}
      >
        {msg.price}
      </div>
    </>
  );
};
