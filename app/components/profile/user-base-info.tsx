import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';

export const UserBaseInfo = () => {
  const data = {
    id: 12345678,
    name: 'Шевченко Василь Петрович',
    email: 'mail_address@gmail.com',
    phone: '+38 (068) 765-43-21',
    avatar: 'avatar.png',
  };
  const dataKeyClass = 'font-normal text-sm leading-main-lh text-gray-dark';
  const dataValClass = 'font-medium text-sm leading-main-lh text-main-dark';
  return (
    <div className="flex flex-col">
      <div>
        <div className="flex gap-3 items-center mb-7">
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage
                src="{data.avatar}"
                alt="{data.name}"
                width={40}
                height={40}
              />
              <AvatarFallback className="bg-transparent">
                <Icon width={40} height={40} iconName="AvatarUser" />
              </AvatarFallback>
            </Avatar>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold text-base leading-normal text-main-dark">
              {data.name}
            </span>
            <Button
              variant="ghost"
              className="p-0 justify-start font-medium text-sm leading-main-lh text-main-color"
            >
              Додати фото профілю
            </Button>
          </div>
        </div>
        <div className="mb-4">
          <span className={dataKeyClass}>E-mail:</span>
          <span className={dataValClass}>{data.email}</span>
        </div>
        <div className="mb-4">
          <span className={dataKeyClass}>Телефон:</span>
          <span className={dataValClass}>{data.phone}</span>
        </div>
        <div className="mb-8">
          <span className={dataKeyClass}>ID користувача:</span>
          <span className={dataValClass}>{data.id}</span>
        </div>
      </div>
      <Button variant="secondary" className="mb-4">
        Змінити дані
      </Button>
      <Button variant="outline" className="mb-4">
        Змінити пароль
      </Button>
      <Button variant="destructive">Видалити профіль</Button>
    </div>
  );
};
