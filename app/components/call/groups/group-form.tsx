import React from 'react';
import { Card } from '@/app/components/card/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form } from '@/components/ui/form';
import { GroupFormHeadNew } from '@/app/components/call/groups/group-form-head-new';
import { GroupFormHeadExists } from '@/app/components/call/groups/group-form-head-exists';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { Info } from '@/app/components/common/info';
import Link from 'next/link';

const groupSchema = z.object({
  id: z.number(),
  name: z.string().min(1, 'Вкажіть назву групи'),
  lines: z.number().min(1, 'Вкажіть кількість ліній'),
  groupID: z.string().min(1, 'Вкажіть ID групи'),
});
interface GroupFormProps {
  group?: any;
}
export const GroupForm = ({ group }: GroupFormProps) => {
  const form = useForm<z.infer<typeof groupSchema>>({
    resolver: zodResolver(groupSchema),
    mode: 'all',
    defaultValues: {
      id: group?.id || '',
      name: group?.name || '',
      lines: group?.lines || 0,
      groupID: group?.groupID || '',
    },
  });

  const onSubmit = (data: z.infer<typeof groupSchema>) => {
    console.log(data);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
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
                    <GroupFormHeadNew form={form} />
                  ) : (
                    <GroupFormHeadExists group={group} form={form} />
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
                        <span className="text-gray-medium">
                          Не додано жодної лінії
                        </span>
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="button"
                        variant="outline"
                        className="border-transparent hover:shadow-none hover:text-main-dark"
                      >
                        Додати лінію{' '}
                        <Icon
                          iconName="Plus"
                          width={20}
                          height={20}
                          className="w-5 h-5"
                        />
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
                    <Info className="text-sm leading-[1.29] text-main-dark">
                      Зверніть увагу: якщо лінія, що додається вже
                      використовується - вона буде відкріплена від попередньої
                      групи. Якщо потрібно одну лінію закріпити за декількома
                      групами - в{' '}
                      <Link
                        href="/internal-lines"
                        className="text-main-blue font-medium"
                      >
                        налаштуваннях лінії
                      </Link>{' '}
                      має бути активована дана опція.
                    </Info>
                    <div className="flex justify-center">
                      <Button type="button" className="w-full sm:w-auto">
                        Застосовувати
                      </Button>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </form>
      </Form>
    </>
  );
};
