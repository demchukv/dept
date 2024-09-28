'use client';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Info } from '@/app/components/common/info';
import { Card } from '../../card/card';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { ScenarioRedirectForm } from '@/app/components/call/scenario/scenario-redirect-form';
import { ScenarioCallGroupForm } from '@/app/components/call/scenario/scenario-call-group-form';
import { ScenarioAudioForm } from '@/app/components/call/scenario/scenario-audio-form';
import { ScenarioIvrMenuForm } from '@/app/components/call/scenario/scenario-ivr-menu-form';

const phones = [
  { id: 1, phoneNumber: '38 098 765 43 21', numberType: 'sip' },
  { id: 2, phoneNumber: '38 093 321 78 45', numberType: 'sip' },
  { id: 3, phoneNumber: '38 067 527 56 10', numberType: 'sim' },
  { id: 4, phoneNumber: '38 067 527 56 11', numberType: 'sim' },
];
const groups = [
  { id: 1, name: 'Група 1' },
  { id: 2, name: 'Група 2' },
  { id: 3, name: 'Група 3' },
];

const contacts = [
  { id: 1, name: 'Остапченко Остап' },
  { id: 2, name: 'Сергієнко Сергій' },
  { id: 3, name: 'Контакт 3' },
  { id: 4, name: 'Контакт 4' },
];

//TODO: get data from API by ID from URL params
const scenarioData = {
  title: 'Технічна підтримка',
  phones: [1, 2],
  callGroup: '2',
  redirectContact: '1',
  audio: {
    file: 'https://audioplayer.madza.dev/Madza-Chords_of_Life.mp3',
    repeat: true,
    repeatCount: '3',
  },
  ivrMenu: 1, // ?
};
export const EditScenario = () => {
  const { id } = useParams();
  const [scenarioName, setScenarioName] = useState(scenarioData.title);
  const [scenarioNumbers, setScenarioNumbers] = useState<number[]>(
    scenarioData.phones,
  );
  const [activeButtons, setActiveButtons] = useState(false);
  const [activeForm, setActiveForm] = useState(0);
  const [group, setGroup] = useState(scenarioData.callGroup);
  const [contact, setContact] = useState(scenarioData.redirectContact);
  const [audio, setAudio] = useState<any>(scenarioData.audio);
  const [ivrMenu, setIvrMenu] = useState<any>({});

  const onChangeCheckedNumbers = (id: number) => {
    if (scenarioNumbers.includes(id)) {
      setScenarioNumbers(scenarioNumbers.filter((item) => item !== id));
    } else {
      setScenarioNumbers([...scenarioNumbers, id]);
    }
  };

  useEffect(() => {
    if (scenarioName.trim() === '' || scenarioNumbers.length === 0) {
      setActiveButtons(false);
      return;
    }
    setActiveButtons(true);
  }, [scenarioNumbers, scenarioName]);

  const deleteScenario = () => {
    console.log('Видалити сценарій');
  };
  const saveScenario = () => {
    const values = {
      title: scenarioName,
      phones: scenarioNumbers,
      callGroup: group,
      redirectContact: contact,
      audio: audio,
      ivrMenu: ivrMenu,
    };
    console.log('Зберегти дані: ', values);
  };

  return (
    <>
      <div className="flex gap-4 sm:gap-6 flex-col sm:flex-row">
        <div className="flex flex-col gap-4">
          <Input
            placeholder="Введіть назву сценарію"
            value={scenarioName}
            onChange={(e) => setScenarioName(e.target.value)}
          />
          <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8">
            <Accordion
              type="single"
              collapsible
              className="w-full flex flex-col gap-4 border-none p-0"
              defaultValue="phoneNumbers"
            >
              <AccordionItem value="phoneNumbers" className="p-0">
                <AccordionTrigger className="p-0 gap-1 sm:gap-9">
                  <p className="font-semibold text-base leading-normal whitespace-nowrap">
                    Застосувати до номерів
                  </p>
                </AccordionTrigger>
                <AccordionContent className="border-t mt-8 pt-8">
                  <ul className="flex flex-col gap-2">
                    {phones.map((item) => (
                      <li key={item.id} className="flex items-center gap-4">
                        <Checkbox
                          key={item.id}
                          id={item.id.toString()}
                          value={item.id.toString()}
                          checked={scenarioNumbers.includes(item.id)}
                          onCheckedChange={(value) =>
                            onChangeCheckedNumbers(item.id)
                          }
                        />
                        <span
                          className={cn(
                            'flex items-center justify-center w-14 h-5 rounded text-white text-xs font-semibold leading-[1.33]',
                            item.numberType === 'sip'
                              ? 'bg-orange-additional-color'
                              : 'bg-green-additional-color',
                          )}
                        >
                          {item.numberType.toUpperCase()}
                        </span>
                        <span className="text-base text-main-dark font-semibold leading-normal">
                          +{item.phoneNumber}
                        </span>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            <Link
              href="/my-numbers#ordernew"
              className="text-main-color font-semibold mt-1 text-sm flex items-center gap-1"
            >
              <Icon iconName="Plus" width={20} height={20} /> Замовити новий
              номер
            </Link>
          </Card>
        </div>
        <div className="flex flex-col gap-4 flex-grow">
          <Info>
            Зверніть увагу: всі налаштування на цій сторінці, будуть
            застосовуватись у відповідній послідовності під час вхідного дзвінка
            на обрані номери.{' '}
          </Info>
          {activeForm === 1 && (
            <ScenarioRedirectForm
              contacts={contacts}
              contact={contact}
              setContact={setContact}
            />
          )}
          {activeForm === 2 && (
            <ScenarioCallGroupForm
              groups={groups}
              group={group}
              setGroup={setGroup}
            />
          )}
          {activeForm === 3 && (
            <ScenarioAudioForm audio={audio} setAudio={setAudio} />
          )}
          {activeForm === 4 && (
            <ScenarioIvrMenuForm ivrMenu={ivrMenu} setIvrMenu={setIvrMenu} />
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 border border-dashed border-gray-light rounded-[6px]">
            <Button
              type="button"
              variant="ghost"
              disabled={!activeButtons}
              className="gap-1 text-main-color disabled:text-main-dark disabled:opacity-100"
              onClick={() => setActiveForm(1)}
            >
              Переадресація <Icon iconName="Plus" width={20} height={20} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={!activeButtons}
              className="gap-1 text-main-color disabled:text-main-dark disabled:opacity-100"
              onClick={() => setActiveForm(2)}
            >
              Виклик на групу <Icon iconName="Plus" width={20} height={20} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={!activeButtons}
              className="gap-1 text-main-color disabled:text-main-dark disabled:opacity-100"
              onClick={() => setActiveForm(3)}
            >
              Аудіофайл <Icon iconName="Plus" width={20} height={20} />
            </Button>
            <Button
              type="button"
              variant="ghost"
              disabled={!activeButtons}
              className="gap-1 text-main-color disabled:text-main-dark disabled:opacity-100"
              onClick={() => setActiveForm(4)}
            >
              IVR меню <Icon iconName="Plus" width={20} height={20} />
            </Button>
          </div>
          {activeForm > 0 && (
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 mt-6">
              <Button type="button" variant="outline" onClick={deleteScenario}>
                Видалити сценарій
              </Button>
              <Button type="button" onClick={saveScenario}>
                Зберегти сценарій
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
