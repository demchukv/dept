import { Icon } from '@/components/utils/icon';
import { subscriptionType } from '@/types/subscription';
import Link from 'next/link';
import { SubscriptionSoftContinue } from '@/app/components/products/subscription/subscription-soft-continue';

interface SubscriptionSoftInfoProps {
  data: subscriptionType;
}
export const SubscriptionSoftInfo = ({ data }: SubscriptionSoftInfoProps) => {
  console.log(data);
  return (
    <>
      <div className="flex items-center justify-between gap-2 mb-6">
        {data.softInfo?.fileSource && (
          <Link
            href={data.softInfo?.fileSource}
            className="flex gap-1 text-main-color hover:text-main-dark font-semibold"
          >
            Файл для встановлення
            <Icon iconName="Download" width={20} height={20} />
          </Link>
        )}
        {data.softInfo?.instruction && (
          <Link
            href={data.softInfo?.instruction}
            className="text-main-color hover:text-main-dark font-semibold"
          >
            Інструкція
          </Link>
        )}
      </div>
      <SubscriptionSoftContinue data={data} />
    </>
  );
};
