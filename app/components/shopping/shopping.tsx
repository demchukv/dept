import { Tracker } from '@/app/components/shopping/tracker';

export const Shopping = () => {
  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        Покупки
      </h1>
      <Tracker />
    </>
  );
};
