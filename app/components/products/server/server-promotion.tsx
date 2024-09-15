import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';

export const ServerPromotion = () => {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-2">
        <Icon
          iconName="DangerTriangle"
          width={20}
          height={20}
          className="fill-attention flex-shrink-0 w-5 h-5"
        />
        <p className="text-xs leading-[1.33]">
          Компанія dept надає на 10% більше кожного ресурсу від ваших поточних
          потужностей у провайдера Hetzner. Пропонуємо вам на 10% дешевшу
          вартість, з фіксацією її протягом одного року.
        </p>
      </div>
      <Button type="button" variant="outline">
        Перенести до dept
      </Button>
    </div>
  );
};
