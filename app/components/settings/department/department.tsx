import React from 'react';
import { Card } from '@/app/components/card/card';
import { cn } from '@/lib/utils';
import { DepartmentItem } from '@/app/components/settings/department/department-item';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Icon } from '@/components/utils/icon';

const departmentHead = {
  name: 'Шевченко Василь Петрович',
  title: 'Керівник',
  avatar: '',
  color: '#E83333',
};
const departmentsList = [
  {
    id: 1,
    color: '#1512AD',
    name: 'Відділ продажів',
    manager: {
      id: 1,
      name: 'Романюк Олеся Григорівна',
      avatar: '',
    },
    employees: [
      { id: 2, name: 'Коливан Данило Петрович', avatar: '' },
      { id: 3, name: 'Хміль Пилип Олегович', avatar: '' },
    ],
    sub: [
      {
        id: 2,
        name: 'Магазин',
        manager: {
          id: 4,
          name: 'Опанасенко Сергій Петрович',
          avatar: '',
        },
        employees: [],
      },
      {
        id: 3,
        name: 'Шоурум',
        manager: {
          id: 4,
          name: 'Золочів Леонід Іванович',
          avatar: '',
        },
        employees: [
          { id: 2, name: 'Коливан Данило Петрович', avatar: '' },
          { id: 3, name: 'Хміль Пилип Олегович', avatar: '' },
          { id: 5, name: 'Рясна Олена Сергіївна', avatar: '' },
          { id: 6, name: 'Звір Кирило Петрович', avatar: '' },
        ],
        sub: [
          {
            id: 11,
            name: 'Центр',
            manager: {
              id: 22,
              name: 'Золочів Леонід Іванович',
              avatar: '',
            },
            employees: [{ id: 6, name: 'Звір Кирило Петрович', avatar: '' }],
          },
          {
            id: 11,
            name: '7 кілометр',
            manager: {
              id: 23,
              name: 'Конан Леонід Іванович',
              avatar: '',
            },
            employees: [{ id: 6, name: 'Звір Кирило Петрович', avatar: '' }],
          },
        ],
      },
      {
        id: 31,
        name: 'Ринок Ромашка',
        manager: {
          id: 41,
          name: 'Орел Любов Степанівна',
          avatar: '',
        },
      },
    ],
  },
  {
    id: 51,
    color: '#F0AD4E',
    name: 'Відділ фінансів',
    manager: {
      id: 15,
      name: 'Пупкін Василь Іванович',
      avatar: '',
    },
    employees: [
      { id: 2, name: 'Коливан Данило Петрович', avatar: '' },
      { id: 3, name: 'Хміль Пилип Олегович', avatar: '' },
      { id: 5, name: 'Рясна Олена Сергіївна', avatar: '' },
      { id: 6, name: 'Звір Кирило Петрович', avatar: '' },
    ],
  },
  {
    id: 52,
    color: '#E312E7',
    name: 'Відділ збуту',
    manager: {
      id: 15,
      name: 'Коваленко Ібрагім Ібрагімович',
      avatar: '',
    },
    employees: [
      { id: 5, name: 'Рясна Олена Сергіївна', avatar: '' },
      { id: 6, name: 'Звір Кирило Петрович', avatar: '' },
    ],
    sub: [
      {
        id: 61,
        name: 'Епіцентр',
        manager: { id: 16, name: 'Лещинський Сергій Петрович', avatar: '' },
      },
      {
        id: 62,
        name: 'Будмакс',
        manager: { id: 17, name: 'Майборода Леонід Іванович', avatar: '' },
        sub: [
          {
            id: 62,
            name: 'Сонячний',
            manager: { id: 17, name: 'Звір Кирило Петрович', avatar: '' },
          },
          {
            id: 63,
            name: '7 кілометр',
            manager: { id: 17, name: 'Чабан Ірина Миколаївна', avatar: '' },
          },
        ],
      },
    ],
  },
  {
    id: 71,
    color: '#5CB85C',
    name: 'IT сектор',
    manager: {
      id: 711,
      name: 'Степаненко Сергій Сергійович',
      avatar: '',
    },
  },
];

export const Department = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-9">
        <h1 className="font-bold text-2xl leading-none text-main-dark mb-4 lg:mb-8">
          Налаштування. Відділи
        </h1>
      </div>

      <div>
        <div className="mb-4">
          <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] p-4 md:p-8 w-[280px] ">
            <div className="flex items-center justify-between mb-3">
              <div
                className={cn(
                  'font-semibold text-base leading-main-lh',
                  `text-warning`,
                )}
              >
                {departmentHead.title}
              </div>
              <div>Icons</div>
            </div>
            <div className="flex items-center gap-2">
              <Avatar className="bg-transparent">
                <AvatarImage
                  src={departmentHead.avatar}
                  alt={departmentHead.name}
                  className="w-8 h-8 bg-transparent"
                />
                <AvatarFallback>
                  <Icon
                    iconName="AvatarUser"
                    width={32}
                    height={32}
                    className="w-8 h-8 fill-gray-medium"
                  />
                </AvatarFallback>
              </Avatar>
              <div className="font-medium leading-main-lh">
                {departmentHead.name}
              </div>
            </div>
          </Card>
        </div>
        <div className="border-l-[2px] border-gray-medium pl-5 flex gap-4 items-start">
          {departmentsList.map((department) => (
            <DepartmentItem department={department} key={department.id} />
          ))}
        </div>
      </div>
    </>
  );
};
