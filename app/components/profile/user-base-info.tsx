import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { KeyValText } from '@/app/components/common/key-val-text';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import { UploadAvatar } from '@/app/components/profile/upload-avatar';

export const UserBaseInfo = () => {
  const data = {
    id: 12345678,
    name: 'Шевченко Василь Петрович',
    email: 'mail_address@gmail.com',
    phone: '+38 (068) 765-43-21',
    avatar: 'avatar.png',
  };
  const dataKeyClass =
    'font-normal text-sm leading-main-lh text-gray-dark pr-2';
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
            <UploadAvatar sign="Додати фото профілю" />
            {/* <Button
              variant="ghost"
              className="p-0 justify-start font-medium text-sm leading-main-lh text-main-color"
            >
              Додати фото профілю
            </Button> */}
          </div>
        </div>
        <KeyValText className="mb-4" k="E-mail:" val={data.email} />
        <KeyValText className="mb-4" k="Телефон:" val={data.phone} />
        <KeyValText
          className="mb-8"
          k="ID користувача:"
          val={String(data.id)}
        />
      </div>
      <Button variant="secondary" className="mb-4">
        Підтвердити дані через
        <Icon width={28} height={28} iconName="Diia" className="w-7 h-7 ml-2" />
      </Button>
      <Button variant="outline" className="mb-4">
        Змінити пароль
      </Button>
      <Button variant="destructive" className="font-semibold">
        Видалити профіль
      </Button>
    </div>
  );
};
