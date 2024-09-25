'use client';
import { Card } from '@/app/components/card/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

interface ScenarioAudioFormProps {
  //   groups: any;
  //   group: any;
  //   setGroup: any;
}
export const ScenarioAudioForm = (
  {
    //   groups,
    //   group,
    //   setGroup,
  }: ScenarioAudioFormProps,
) => {
  const [audiofile, setAudiofile] = useState('');

  return (
    <>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8 flex gap-4 items-center">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 border-none p-0"
          defaultValue="ivrmenu"
        >
          <AccordionItem value="ivrmenu" className="p-0 justify-between">
            <div className="w-full items-center flex flex-1 gap-2.5 justify-between">
              <Icon
                iconName="DndIcon"
                width={24}
                height={24}
                className="fill-main-dark flex-shrink-0 cursor-move"
              />
              <div className="flex-grow flex flex-col gap-4 sm:flex-row sm:justify-between">
                <p className="text-base font-semibold leading-normal flex gap-6 items-center justify-between whitespace-nowrap">
                  Аудіофайл
                  <span className="font-normal text-sm">
                    {audiofile ? audiofile : 'No file'}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    className="sm:hidden"
                    onClick={() => setAudiofile('')}
                  >
                    <Icon
                      iconName="Trash"
                      width={24}
                      height={24}
                      className="fill-warning"
                    />
                  </Button>
                </p>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-warning hidden sm:flex flex-shrink-0"
                    onClick={() => setAudiofile('')}
                  >
                    Видалити
                  </Button>
                  {!audiofile && (
                    <label className="flex flex-shrink-0 w-full sm:w-auto px-3 py-2 text-white bg-main-color rounded text-xs font-semibold cursor-pointer">
                      Додати аудіофайл
                      <Input
                        type="file"
                        onChange={(e) => setAudiofile(e.target.value)}
                        className="hidden"
                      />
                    </label>
                  )}
                </div>
              </div>
              <AccordionTrigger
                className="p-0 ml-4 gap-1 sm:gap-9 flex-shrink-0 w-full"
                headClassName="w-auto"
              ></AccordionTrigger>
            </div>
            <AccordionContent className="border-t mt-8 pt-8">
              <p className="font-semibold text-base mb-4">
                Settings IVR menu
                {/* <Select value={group} onValueChange={setGroup}>
            <SelectTrigger>
              <SelectValue placeholder="Оберіть групу" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {groups.map((group: any) => (
                  <SelectItem key={group.id} value={group.id.toString()}>
                    {group.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
              </p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};
