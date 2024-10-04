import React from 'react';
import { IntegrationItem } from '@/app/components/settings/integration/integration-item';

interface IntegrateListkProps {
  data: any;
}
export const IntegrateList = ({ data }: IntegrateListkProps) => {
  return (
    <div className="flex flex-wrap gap-9">
      {data.map((item: any) => (
        <IntegrationItem key={item.id} item={item} />
      ))}
    </div>
  );
};
