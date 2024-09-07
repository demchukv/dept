import { Icon } from '@/components/utils/icon';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import React, { startTransition } from 'react';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { toast } from '@/components/ui/use-toast';
import Link from 'next/link';
import { Label } from '@/components/ui/label';

interface AlertSettingsProps {
  alertsData: any;
  alertsGroup: any;
}

export const AlertSettings = ({
  alertsData,
  alertsGroup,
}: AlertSettingsProps) => {
  const [data, setData] = React.useState<any>(alertsData);

  const saveData = (item: any) => {
    setData(item);
    startTransition(() => {
      //TODO: make API request and setData
      // const newData = getJson('/data/call-summary.json');
      toast({
        title: 'Ви відправили наступні значення:',
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4 h-[300px] overflow-scroll">
            <code className="text-white h-full overflow-scroll">
              {JSON.stringify(item, null, 2)}
            </code>
          </pre>
        ),
      });
    });
  };
  return (
    <div>
      <h2 className="flex gap-4 items-center font-semibold text-base leading-normal text-main-dark mb-6 mt-2">
        <Icon iconName="SettingAlert" width={24} height={24} />
        Налаштування сповіщень
      </h2>

      <div className="grid grid-cols-3 rounded-[6px] shadow-[0_4px_15px_0_rgba(0,0,0,0.05)] sm:grid-cols-[120px_auto_120px_120px_140px] mb-6 overflow-hidden">
        <div className="hidden sm:block px-8 py-3 bg-white border-b border-gray-light">
          Розділ
        </div>
        <div className="hidden sm:block px-8 py-3 bg-white border-b border-gray-light">
          Сповіщення
        </div>
        <div className="hidden sm:block px-8 py-3 bg-white border-b border-gray-light">
          Push
        </div>
        <div className="hidden sm:block px-8 py-3 bg-white border-b border-gray-light">
          Email
        </div>
        <div className="hidden sm:block px-8 py-3 bg-white border-b border-gray-light">
          Telegram
        </div>

        {alertsGroup.map((group: any, ind: number) => (
          <React.Fragment key={`gr-${ind}`}>
            <div className="col-span-3 sm:col-span-5 font-semibold text-base text-main-color leading-normal pt-4 pb-2 px-4 sm:px-8 border-b border-gray-light">
              {group.head}
            </div>
            {data[group.key].map((item: any, i: number) => (
              <React.Fragment key={`r-${i}`}>
                <div className="hidden sm:block bg-white border-b border-gray-light px-4 pb-4 sm:px-8"></div>
                <div className="col-span-3 sm:col-span-1 px-4 sm:px-8 py-4 font-normal text-sm leading-main-lh text-main-dark bg-white sm:border-b sm:border-gray-light flex items-center">
                  {item.name}
                </div>
                <div className="bg-white border-b border-gray-light px-4 sm:px-8 pb-4 sm:pt-4 flex gap-2 items-center">
                  <Checkbox
                    id={'push_' + item.id}
                    checked={item.push}
                    onCheckedChange={() => {
                      item.push = !item.push;
                      saveData({
                        ...data,
                        [group.key]: [
                          ...data[group.key].slice(0, i),
                          item,
                          ...data[group.key].slice(i + 1),
                        ],
                      });
                    }}
                  />
                  <Label
                    htmlFor={'push_' + item.id}
                    className="sm:hidden font-normal text-sm text-gray-dark leading-main-lh"
                  >
                    Push
                  </Label>
                </div>
                <div className="bg-white border-b border-gray-light px-4 sm:px-8 pb-4 sm:pt-4 flex gap-2 items-center">
                  <Checkbox
                    id={'email_' + item.id}
                    checked={item.email}
                    onCheckedChange={() => {
                      item.email = !item.email;
                      saveData({
                        ...data,
                        [group.key]: [
                          ...data[group.key].slice(0, i),
                          item,
                          ...data[group.key].slice(i + 1),
                        ],
                      });
                    }}
                  />
                  <Label
                    htmlFor={'email_' + item.id}
                    className="sm:hidden font-normal text-sm text-gray-dark leading-main-lh"
                  >
                    Email
                  </Label>
                </div>
                <div className="bg-white border-b border-gray-light px-4 sm:px-8 pb-4 sm:pt-4 flex gap-2 items-center">
                  <Checkbox
                    id={'telegram_' + item.id}
                    checked={item.telegram}
                    onCheckedChange={() => {
                      item.telegram = !item.telegram;
                      saveData({
                        ...data,
                        [group.key]: [
                          ...data[group.key].slice(0, i),
                          item,
                          ...data[group.key].slice(i + 1),
                        ],
                      });
                    }}
                  />
                  <Label
                    htmlFor={'telegram_' + item.id}
                    className="sm:hidden font-normal text-sm text-gray-dark leading-main-lh"
                  >
                    Telegram
                  </Label>
                </div>
              </React.Fragment>
            ))}
          </React.Fragment>
        ))}
        <div className="col-span-3 sm:col-span-5 py-4 px-4 sm:px-8 bg-white flex justify-center">
          <Button type="button" asChild>
            <Link
              href={
                process.env.NEXT_PUBLIC_TG_BOT
                  ? process.env.NEXT_PUBLIC_TG_BOT
                  : '#'
              }
              target="_blank"
            >
              Підключити Telegram
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
