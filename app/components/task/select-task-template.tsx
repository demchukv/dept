import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  ModalInner,
} from '@/app/components/common/modal-new';
import { Button } from '@/components/ui/button';
import { AutoComplete, Option } from '@/app/components/common/autocomplete';
import { useState } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';

const taskTemplateList = [
  { value: 'template1', label: 'Встановлення операційної системи' },
  { value: 'template2', label: 'Встановлення ПЗ' },
  { value: 'template3', label: 'Конфігурація заліза' },
  { value: 'template4', label: 'Налаштування техніки' },
];

interface SelectTaskTemplateProps {
  onClose: (state: boolean, e: React.MouseEvent | undefined) => void;
  form: any;
}
export const SelectTaskTemplate = ({
  onClose,
  form,
}: SelectTaskTemplateProps) => {
  const [isLoading, setLoading] = useState(false);
  const [isDisabled, setDisbled] = useState(false);
  const [valueAutoComplete, setValueAutoComplete] = useState<Option>();

  return (
    <div className="flex flex-col h-full">
      <ModalHeader className="hidden flex-shrink-0">
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
          Оберіть шаблон заявки
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>

      <ModalInner className="font-medium text-sm text-main-dark leading-[1.29] flex-grow flex flex-col items-center justify-center mt-8">
        <p className="font-semibold mb-3 text-base leading-normal">
          Оберіть шаблон заявки
        </p>
        <p className="mb-6">
          Якщо жоден із шаблонів Вам не підходить, Ви можете повернутись до
          опису заявки вручну
        </p>
        <FormField
          control={form.control}
          name="taskTemplate"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="hidden">Заявка на:</FormLabel>
              <FormControl>
                <AutoComplete
                  options={taskTemplateList as Option[]}
                  emptyMessage="Нічого не знайдено"
                  placeholder="Дані пошуку"
                  isLoading={isLoading}
                  onValueChange={(val) => field.onChange(val.value)}
                  value={valueAutoComplete}
                  disabled={isDisabled}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
      </ModalInner>

      <ModalFooter className="flex-col sm:flex-row-reverse justify-center gap-4 py-4 flex-shrink-0 self-end w-full">
        <Button
          type="submit"
          variant="default"
          onClick={() => onClose(false, undefined)}
        >
          Продовжити
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => onClose(false, undefined)}
        >
          Повернутись
        </Button>
      </ModalFooter>
    </div>
  );
};
