import { Tracker } from '@/app/components/shopping/tracker';

export const Shopping = () => {
  return (
    <>
      <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
        Покупки
      </h1>
      <Tracker
        state={3}
        data={[
          { id: 1, date: '10.03.2024', name: 'Обробляється' },
          {
            id: 2,
            date: '11.03.2024',
            name: 'Відправлено',
          },
          {
            id: 3,
            date: '14.03.2024',
            name: 'Очікує отримувача',
          },
          {
            id: 4,
            date: '20.03.2024',
            name: 'Виконано',
          },
        ]}
      />
    </>
  );
};
