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

const groupSchema = z.object({
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
                    <GroupFormHeadNew />
                  ) : (
                    <GroupFormHeadExists group={group} form={form} />
                  )}
                  <AccordionTrigger
                    className="p-0 gap-1 sm:gap-9"
                    headClassName="w-auto"
                  ></AccordionTrigger>
                </div>
                <AccordionContent className="border-t mt-4 pt-4">
                  <p>Some fields or text</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </Card>
        </form>
      </Form>
    </>
  );
};
