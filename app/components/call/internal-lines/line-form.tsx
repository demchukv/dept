'use client';
import React, { useState } from 'react';
import { Card } from '@/app/components/card/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { LineFormHeadNew } from '@/app/components/call/internal-lines/line-form-head-new';
import { LineFormHeadExists } from '@/app/components/call/internal-lines/line-form-head-exists';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { Checkbox } from '@/components/ui/checkbox';
import { KeyValText } from '../../common/key-val-text';
import copy from 'copy-to-clipboard';

interface LinesFormProps {
  formType: 'new' | 'edit';
  line?: any;
}
export const LineForm = ({ formType, line }: LinesFormProps) => {
  const [addLineForm, setAddLineForm] = useState(false);
  const [title, setTitle] = useState(line?.title || '');
  const [editTitle, setEditTitle] = useState(false);

  const onSubmit = () => {};

  return (
    <>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 border-none p-0"
          defaultValue={formType === 'new' ? 'new-line-item' : undefined}
        >
          <AccordionItem
            value={
              formType === 'new' ? 'new-line-item' : `line-item-${line.id}`
            }
            className="p-0"
          >
            <div className="w-full items-start flex flex-1 gap-2.5 justify-between">
              {formType === 'new' ? (
                <LineFormHeadNew
                  line={line}
                  title={title}
                  setTitle={setTitle}
                  editTitle={editTitle}
                />
              ) : (
                <LineFormHeadExists
                  line={line}
                  title={title}
                  editTitle={editTitle}
                  setEditTitle={setEditTitle}
                  setTitle={setTitle}
                />
              )}
              <AccordionTrigger
                className="p-0 gap-1 sm:gap-9"
                headClassName="w-auto"
              ></AccordionTrigger>
            </div>
            <AccordionContent className="border-t mt-4 pt-4">
              <div className="flex flex-col sm:flex-row sm:justify-between gap-4 sm:gap-8 sm:items-start">
                <div className="">
                  <KeyValText
                    k="Дата створення"
                    val={line.createdAt}
                    className="justify-between sm:hidden mb-4"
                  />
                  <p className="text-base font-semibold mb-4">
                    Дані для підключення
                  </p>
                  <KeyValText
                    k="server / host:"
                    val={
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">
                          {line.connectionData.host}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          className="hover:text-main-color"
                          onClick={() => copy(line.connectionData.host)}
                        >
                          <Icon iconName="Copy" width={24} height={24} />
                        </Button>
                      </div>
                    }
                    className="justify-between gap-6 mb-4"
                  />
                  <KeyValText
                    k="login:"
                    val={
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">
                          {line.connectionData.login}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          className="hover:text-main-color"
                          onClick={() => copy(line.connectionData.login)}
                        >
                          <Icon iconName="Copy" width={24} height={24} />
                        </Button>
                      </div>
                    }
                    className="justify-between gap-6 mb-4"
                  />
                  <KeyValText
                    k="password:"
                    val={
                      <div className="flex items-center justify-between gap-3">
                        <span className="font-medium">
                          {line.connectionData.password}
                        </span>
                        <Button
                          type="button"
                          variant="ghost"
                          className="hover:text-main-color"
                          onClick={() => copy(line.connectionData.password)}
                        >
                          <Icon iconName="Copy" width={24} height={24} />
                        </Button>
                      </div>
                    }
                    className="justify-between gap-6 mb-4"
                  />
                </div>
                <div className="">
                  <p className="text-base font-semibold mb-4">
                    Підключити до номера
                  </p>
                </div>
                <div className="flex flex-col gap-4 ">
                  <Button
                    type="button"
                    className="w-full sm:w-auto"
                    onClick={onSubmit}
                  >
                    Зберегти
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full sm:w-auto"
                  >
                    Скасувати
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
