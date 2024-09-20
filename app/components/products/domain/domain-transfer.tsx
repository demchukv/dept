import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { domainType } from '@/types/domain';
import { startTransition, useState } from 'react';
interface domainTransferProps {
  data: domainType;
}
export const DomainTransfer = ({ data }: domainTransferProps) => {
  const [transferCode, setTransferCode] = useState<string>('');
  const [transferStep, setTransferStep] = useState(
    data.transferRequested ? 1 : 0,
  );
  const sendRequestOnTransferCode = () => {
    startTransition(() => {
      //TODO: make API request and setData and reload data
      // const newData = getJson('/data/call-summary.json');
      const values = { domainId: data.id, action: 'orderTransferDomainCode' };
      toast({
        title: 'Ви відправили наступні значення:',
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        ),
      });
      setTransferStep(1);
      // form.reset();
    });
  };

  const unlockDomain = () => {
    if (transferCode.trim() === '') return;
    startTransition(() => {
      //TODO: make API request and setData and reload data
      // const newData = getJson('/data/call-summary.json');
      const values = {
        domainId: data.id,
        transferCode: transferCode,
        action: 'orderTransferDomainCode',
      };
      toast({
        title: 'Ви відправили наступні значення:',
        description: (
          <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
            <code className="text-white">
              {JSON.stringify(values, null, 2)}
            </code>
          </pre>
        ),
      });
    });
  };

  return (
    <>
      {transferStep === 0 && (
        <>
          <p className="mb-2">За замовчуванням трансфер домену заблокований.</p>
          <p className="mb-2">
            Перед ініціюванням передачі домену до іншого реєстратора ви маєте
            розблокувати домен для переносу.
          </p>
          <p className="mb-4">
            Для цього спочатку отримайте код на електронну пошту, натиснувши
            кнопку нижче.
          </p>
          <div className="flex flex-col sm:flex-row sm justify-end gap-4">
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={() => sendRequestOnTransferCode()}
            >
              Отримати код трансфера
            </Button>
            <Button type="button" className="w-full sm:w-auto" disabled>
              Розблокувати домен
            </Button>
          </div>
        </>
      )}

      {transferStep === 1 && (
        <>
          <p className="mb-2">За замовчуванням трансфер домену заблокований.</p>
          <p className="mb-2">
            Запит на отримання коду відправлено. Час очікування від 1 до 5 днів.
          </p>
          <p className="mb-4">
            Якщо код не надійде після завершення терміну очікування, Ви зможете
            відправити запит повторно.
          </p>
          <p className="mb-4">
            Код для трансфера буде відправлено на e-mail:{' '}
            <span className="font-medium text-main-color">
              test_mail@gmail.com
            </span>
          </p>
          <div className="flex flex-col sm:flex-row sm justify-end gap-4">
            <Input
              type="text"
              name="transferCode"
              placeholder="Введіть код"
              value={transferCode}
              onChange={(e) => setTransferCode(e.target.value)}
              className="w-full sm:w-auto"
            />
            <Button
              type="button"
              className="w-full sm:w-auto"
              onClick={() => unlockDomain()}
            >
              Розблокувати домен
            </Button>
          </div>
        </>
      )}
    </>
  );
};
