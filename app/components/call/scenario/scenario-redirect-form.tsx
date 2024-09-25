import { Card } from '@/app/components/card/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';

export const ScenarioRedirectForm = () => {
  return (
    <>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8 flex gap-4 items-center">
        <Icon
          iconName="DndIcon"
          width={24}
          height={24}
          className="fill-main-dark flex-shrink-0"
        />
        <div className="flex-grow flex flex-col gap-4 sm:flex-row sm:justify-between">
          <p className="text-base font-semibold leading-normal flex items-center justify-between">
            Виклик на групу
            <Button type="button" variant="ghost" className="sm:hidden">
              <Icon
                iconName="Trash"
                width={24}
                height={24}
                className="fill-warning"
              />
            </Button>
          </p>
          <Select>
            <SelectTrigger className="w-auto">
              <SelectValue placeholder="Select a fruit" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Fruits</SelectLabel>
                <SelectItem value="apple">Apple</SelectItem>
                <SelectItem value="banana">Banana</SelectItem>
                <SelectItem value="blueberry">Blueberry</SelectItem>
                <SelectItem value="grapes">Grapes</SelectItem>
                <SelectItem value="pineapple">Pineapple</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            type="button"
            variant="ghost"
            className="text-warning hidden sm:flex"
          >
            Видалити
          </Button>
        </div>
      </Card>
    </>
  );
};
