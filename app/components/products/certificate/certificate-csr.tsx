import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { Icon } from '@/components/utils/icon';
import { certificateType } from '@/types/certificate';
import copy from 'copy-to-clipboard';
import Link from 'next/link';

interface certificateCsrProps {
  data: certificateType;
}
export const CertificateCsr = ({ data }: certificateCsrProps) => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-14 mb-8">
        <div>
          <p className="flex items-center gap-3 mb-2">
            CSR запит
            <Button
              type="button"
              variant="ghost"
              className="hover:text-main-color"
              onClick={() => copy(data.csr)}
            >
              <Icon iconName="Copy" width={20} height={20} />
            </Button>
          </p>
          <ScrollArea className="resize-y h-20 border border-gray-light bg-bg-color rounded px-[18px] pr-[23px] py-2.5">
            {data.csr}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
        <div>
          <p className="flex items-center gap-3 mb-2">
            PRIVATE key{' '}
            <Button
              type="button"
              variant="ghost"
              className="hover:text-main-color"
              onClick={() => copy(data.privateKey)}
            >
              <Icon iconName="Copy" width={20} height={20} />
            </Button>
          </p>
          <ScrollArea className="resize-y h-20 border border-gray-light bg-bg-color rounded px-[18px] pr-[23px] py-2.5">
            {data.csr}
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </div>
      </div>
      <Link
        href="#"
        download
        className="flex items-center gap-2 text-main-color font-semibold hover:text-main-dark"
      >
        Завантажити архів з сертифікатом
        <Icon iconName="Download" width={20} height={20} />
      </Link>
    </>
  );
};
