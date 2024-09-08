import { FilterForm } from '@/app/components/shopping/filter-form';
import { OrderList } from '@/app/components/shopping/order-list';

export const Shopping = () => {
  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        Покупки
      </h1>
      <FilterForm />
      <OrderList />
    </>
  );
};
