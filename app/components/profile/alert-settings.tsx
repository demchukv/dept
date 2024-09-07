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

      <div className="grid grid-cols-3 rounded-[6px] shadow-[0_4px_15px_0_rgba(0,0,0,0.05)] sm:grid-cols-5 mb-6 overflow-hidden">
        <div className="hidden sm:block px-4 py-4">Розділ</div>
        <div className="hidden sm:block px-4 py-4">Сповіщення</div>
        <div className="hidden sm:block px-4 py-4">Push</div>
        <div className="hidden sm:block px-4 py-4">Email</div>
        <div className="hidden sm:block px-4 py-4">Telegram</div>
        {alertsGroup.map((group: any, ind: number) => (
          <React.Fragment key={`gr-${ind}`}>
            <div className="col-span-3 sm:col-span-5 font-semibold text-base text-main-color leading-normal py-2 px-4 border-b border-gray-light">
              {group.head}
            </div>
            {data[group.key].map((item: any, i: number) => (
              <React.Fragment key={`r-${i}`}>
                <div className="hidden sm:block bg-white border-b border-gray-light px-4 pb-4"></div>
                <div className="col-span-3 sm:col-span-1 px-4 py-4 font-normal text-sm leading-main-lh text-main-dark bg-white sm:border-b sm:border-gray-light">
                  {item.name}
                </div>
                <div className="bg-white border-b border-gray-light px-4 pb-4 sm:pt-4 flex gap-2 items-center">
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
                <div className="bg-white border-b border-gray-light px-4 pb-4 sm:pt-4 flex gap-2 items-center">
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
                <div className="bg-white border-b border-gray-light px-4 pb-4 sm:pt-4 flex gap-2 items-center">
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
        <div className="col-span-3 sm:col-span-5 py-4 px-4 bg-white flex justify-center">
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

      {/* <Table className="rounded-[6xp] shadow-[0_4px_15px_0_rgba(0,0,0,0.05)] overflow-hidden border-grey-light bg-tra">
        <TableHeader>
          <TableRow className="border-grey-light">
            <TableHead className="bg-white border-grey-light pl-8 rounded-tl-[6px]">
              Розділ
            </TableHead>
            <TableHead className="bg-white border-grey-light">
              Сповіщення
            </TableHead>
            <TableHead className="bg-white border-grey-light">Push</TableHead>
            <TableHead className="bg-white border-grey-light">Email</TableHead>
            <TableHead className="bg-white border-grey-light rounded-tr-[6px]">
              Telegram
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alertsGroup.map((group: any, ind: number) => (
            <React.Fragment key={`gr-${ind}`}>
              <TableRow key={`hr-${ind}`} className="border-grey-light">
                <TableCell
                  className="font-semibold text-base text-main-color leading-normal py-3 px-8 border-grey-light"
                  colSpan={5}
                >
                  {group.head}
                </TableCell>
              </TableRow>
              {data[group.key].map((item: any, i: number) => (
                <TableRow key={`dr-${i}`} className="border-grey-light">
                  <TableCell className="bg-white border-grey-light text-main-dark font-normal text-sm leading-main-lh py-4"></TableCell>
                  <TableCell className="bg-white border-grey-light text-main-dark font-normal text-sm leading-main-lh py-4">
                    {item.name}
                  </TableCell>
                  <TableCell className="bg-white border-grey-light text-main-dark font-normal text-sm leading-main-lh py-4">
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
                        // saveData(item, group.key);
                      }}
                    />
                  </TableCell>
                  <TableCell className="bg-white border-grey-light text-main-dark font-normal text-sm leading-main-lh py-4">
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
                        // saveData(item, group.key);
                      }}
                    />
                  </TableCell>
                  <TableCell className="bg-white border-grey-light text-main-dark font-normal text-sm leading-main-lh py-4">
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
                        // saveData(item, group.key);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </React.Fragment>
          ))}
        </TableBody>
        <TableFooter className="border-b-0 rounded-bl-[6px] rounded-br-[6px] overflow-hidden">
          <TableRow>
            <TableCell
              colSpan={5}
              className="rounded-bl-[6px] rounded-br-[6px] bg-white border-b-0 text-right"
            >
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
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table> */}
    </div>
  );
};
