import {
  ModalDescription,
  ModalFooter,
  ModalHeader,
  ModalInner,
  ModalTitle,
} from '@/app/components/common/modal-new';
import { Icon } from '@/components/utils/icon';

const optList = [
  { key: 1, state: 'enabled', value: 'Пароль на директорію' },
  { key: 2, state: 'enabled', value: 'Прискорення сайту' },
  { key: 3, state: 'enabled', value: 'Перенаправлення' },
  { key: 4, state: 'enabled', value: 'SSL-сертифікати' },
  { key: 5, state: 'disabled', value: 'HTTPS переадресація' },
  { key: 6, state: 'enabled', value: 'Змінення PHP директив' },
  {
    key: 7,
    state: 'disabled',
    value: 'Управління файлами в Файловому менеджері',
  },
  { key: 8, state: 'enabled', value: 'Статистика' },
  { key: 9, state: 'disabled', value: 'Налаштування віртуальних хостів' },
  { key: 10, state: 'disabled', value: 'Сторінки помилок' },
  { key: 11, state: 'disabled', value: 'Cloudfare захист' },
  {
    key: 12,
    state: 'disabled',
    value: 'Встановлення CMS за домопогою автовстановлення',
  },
];

interface HostingSitesOptionsProps {
  data: any;
}
export const HostingSitesOptions = ({ data }: HostingSitesOptionsProps) => {
  return (
    <>
      <ModalHeader className="flex-shrink-0 justify-start">
        <ModalTitle className="font-semibold text-base leading-normal text-main-dark text-center ">
          Параметри налаштування
        </ModalTitle>
        <ModalDescription className="hidden"></ModalDescription>
      </ModalHeader>
      <ModalInner className="flex flex-col justify-start w-full font-normal text-sm text-main-dark leading-main-lh flex-grow">
        <ul>
          {optList.map((item) => (
            <li key={item.key} className="flex items-center gap-1">
              <Icon
                iconName={item.state === 'enabled' ? 'CheckDouble' : 'Close'}
                width={24}
                height={24}
                className={item.state === 'enabled' ? 'fill-main-color' : ''}
              />
              <span>{item.value}</span>
            </li>
          ))}
        </ul>
      </ModalInner>

      {/* <ModalFooter className="flex-col sm:flex-row justify-center gap-4 py-4 flex-shrink-0 self-end w-full"></ModalFooter> */}
    </>
  );
};
