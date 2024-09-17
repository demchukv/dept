import { ServerType, sshKeyType } from '@/types/server';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { TooltipShow } from '@/app/components/common/tooltip-show';

interface VirtualAccessProps {
  data: ServerType;
}
export const VirtualAccess = ({ data }: VirtualAccessProps) => {
  return (
    <div className="max-w-full">
      <p className="font-semibold">Додані SSH ключі</p>
      <Table className="max-w-full border border-bg-color rounded-[6px]">
        <TableHeader>
          <TableRow>
            <TableHead className=" font-normal text-sm leading-main-lh rounded-tl">
              Назва
            </TableHead>
            <TableHead className=" font-normal text-sm leading-main-lh">
              SSH ключ
            </TableHead>
            <TableHead className=" font-normal text-sm leading-main-lh">
              Використано
            </TableHead>
            <TableHead className=" font-normal text-sm leading-main-lh">
              Термін дії
            </TableHead>
            <TableHead className=" font-normal text-sm leading-main-lhtext-right"></TableHead>
            <TableHead className=" font-normal text-sm leading-main-lhtext-right rounded-tr"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.virtual?.sshKey?.map((item: sshKeyType) => (
            <TableRow key={item.id}>
              <TableCell className="font-semibold text-sm text-main-color leading-none whitespace-nowrap">
                {item.name}
              </TableCell>
              <TableCell className="font-normal text-sm leading-none break-all max-h-8 overflow-hidden">
                {item.key}
              </TableCell>
              <TableCell className="font-normal text-sm leading-none whitespace-nowrap">
                {item.used}
              </TableCell>
              <TableCell className="font-normal text-sm leading-none whitespace-nowrap">
                {item.expired}
              </TableCell>
              <TableCell>
                <TooltipShow
                  content={
                    <p className="text-xs leading-[1.33] max-w-48">
                      При оновленні терміну дії ключа його буде подовжено на 365
                      днів
                    </p>
                  }
                >
                  <Button
                    variant="ghost"
                    className="text-dark-color hover:text-main-color"
                  >
                    <Icon iconName="Refresh" width={24} height={24} />
                  </Button>
                </TooltipShow>
              </TableCell>
              <TableCell>
                <Button
                  variant="ghost"
                  className="text-warning hover:text-dark-color"
                >
                  <Icon iconName="Trash" width={24} height={24} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
