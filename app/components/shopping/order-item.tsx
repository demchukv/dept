import { Tracker } from '@/app/components/shopping/tracker';

export const OrderItem = () => {
  return (
    <div>
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
    </div>
  );
};
