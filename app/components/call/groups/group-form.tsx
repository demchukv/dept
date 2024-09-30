'use client';
import React, { useState } from 'react';
import { Card } from '@/app/components/card/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { GroupFormHeadNew } from '@/app/components/call/groups/group-form-head-new';
import { GroupFormHeadExists } from '@/app/components/call/groups/group-form-head-exists';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { Info } from '@/app/components/common/info';
import Link from 'next/link';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Checkbox } from '@/components/ui/checkbox';

const enabledLines = [
  { id: 1, lineNumber: '301', lineUser: 'Сергій Сергійченко' },
  { id: 2, lineNumber: '101', lineUser: 'Остап Остапченко' },
  { id: 3, lineNumber: '305', lineUser: 'Петро Петренко' },
  { id: 4, lineNumber: '103', lineUser: 'Василіса Василівна' },
  { id: 5, lineNumber: '306', lineUser: 'Петро Петренко' },
  { id: 6, lineNumber: '102', lineUser: 'Остап Остапченко' },
];
interface GroupFormProps {
  group?: any;
  setGroups?: any;
  appendGroup: any;
  updateGroup?: any;
}
export const GroupForm = ({
  group,
  setGroups,
  appendGroup,
  updateGroup,
}: GroupFormProps) => {
  const [lines, setLines] = useState(group?.lines || []);
  const [checkedLines, setCheckedLines] = useState(group?.lines || []);
  const [title, setTitle] = useState(group?.title || '');
  const [editTitle, setEditTitle] = useState(false);
  const [addLineForm, setAddLineForm] = useState(false);

  const onSubmit = () => {
    const values = {
      id: group?.id || 0,
      name: title,
      lines,
      used: false,
      groupID: '30x',
    };
    const updValues = {
      lines,
    };
    if (group?.id) {
      updateGroup(updValues);
    } else {
      appendGroup(values);
      setTitle('');
      setCheckedLines([]);
      setLines([]);
      setAddLineForm(false);
    }
  };

  const removeLineFromGroup = (id: number) => {
    setLines(lines.filter((line: any) => line.id !== id));
    setCheckedLines(checkedLines.filter((line: any) => line.id !== id));
  };
  const changeCheckedLines = (chk: boolean, id: number) => {
    if (chk)
      setCheckedLines([
        ...checkedLines,
        enabledLines.find((line) => line.id === id),
      ]);
    else setCheckedLines(checkedLines.filter((line: any) => line.id !== id));
  };
  const handleCheckedLines = () => {
    setLines(checkedLines);
  };

  return (
    <>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 border-none p-0"
          defaultValue={!group ? 'new-group-item' : undefined}
        >
          <AccordionItem
            value={!group ? 'new-group-item' : `group-item-${group.id}`}
            className="p-0"
          >
            <div className="w-full items-start flex flex-1 gap-2.5 justify-between">
              {!group ? (
                <GroupFormHeadNew
                  title={title}
                  setTitle={setTitle}
                  editTitle={editTitle}
                  lines={lines}
                />
              ) : (
                <GroupFormHeadExists group={group} lines={lines} />
              )}
              <AccordionTrigger
                className="p-0 gap-1 sm:gap-9"
                headClassName="w-auto"
              ></AccordionTrigger>
            </div>
            <AccordionContent className="border-t mt-4 pt-4">
              <p className="text-base font-semibold mb-3">
                Лінії, що використовуються
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-start sm:items-start sm:mb-3">
                <div>
                  <div className="border border-gray-light rounded py-4 px-5">
                    {lines.length === 0 && (
                      <span className="text-gray-medium">
                        Не додано жодної лінії
                      </span>
                    )}
                    {Array.isArray(lines) && lines.length > 0 && (
                      <ul className="flex flex-col gap-2">
                        {lines.map((line) => (
                          <li
                            key={line.id}
                            className="flex gap-6 justify-between"
                          >
                            <span className="font-medium">
                              {line.lineNumber} - {line.lineUser}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={() => {
                                removeLineFromGroup(line.id);
                              }}
                              className="text-warning hover:text-main-dark"
                            >
                              <Icon
                                iconName="Trash"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                            </Button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
                <div className="flex justify-center">
                  {!addLineForm && (
                    <Button
                      type="button"
                      variant="outline"
                      className="border-transparent hover:shadow-none hover:text-main-dark"
                      onClick={() => setAddLineForm(true)}
                    >
                      Додати лінію{' '}
                      <Icon
                        iconName="Plus"
                        width={20}
                        height={20}
                        className="w-5 h-5"
                      />
                    </Button>
                  )}
                  {addLineForm && (
                    <div className="w-full border border-gray-light bg-bg-color p-5 rounded">
                      <p className="text-base font-medium mb-5">Додати лінію</p>
                      <ScrollArea className="w-full h-64 bg-white p-4 pr-5 border border-gray-light rounded">
                        <div className="flex flex-col gap-6">
                          {enabledLines.map((line) => (
                            <div
                              key={line.id}
                              className="text-base flex items-center gap-2"
                            >
                              <Checkbox
                                id={`line-${line.id}`}
                                name="lines"
                                value={line.id.toString()}
                                checked={checkedLines.some(
                                  (l: any) => l.id === line.id,
                                )}
                                onCheckedChange={(chk) => {
                                  changeCheckedLines(Boolean(chk), line.id);
                                }}
                              />
                              {line.lineNumber} - {line.lineUser}
                            </div>
                          ))}
                        </div>
                        <ScrollBar forceMount={true} />
                      </ScrollArea>
                      <div className="flex justify-end gap-4 mt-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full sm:w-auto"
                          onClick={() => setAddLineForm(false)}
                        >
                          Відмінити
                        </Button>
                        <Button
                          type="button"
                          className="w-full sm:w-auto"
                          onClick={handleCheckedLines}
                        >
                          Зберегти
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                <Info className="text-sm leading-[1.29] text-main-dark">
                  Зверніть увагу: якщо лінія, що додається вже використовується
                  - вона буде відкріплена від попередньої групи. Якщо потрібно
                  одну лінію закріпити за декількома групами - в{' '}
                  <Link
                    href="/internal-lines"
                    className="text-main-blue font-medium"
                  >
                    налаштуваннях лінії
                  </Link>{' '}
                  має бути активована дана опція.
                </Info>
                <div className="flex justify-center">
                  <Button
                    type="button"
                    className="w-full sm:w-auto"
                    onClick={onSubmit}
                  >
                    Застосовувати
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};
