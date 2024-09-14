import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const ImageDefault = ({ width, height, className, style }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 56 56"
      fill="currentColor"
      width={width}
      height={height}
      className={cn('w-14 h-14', className)}
      style={style}
    >
      <path d="M42.0001 18.6665C42.0001 21.2438 39.9107 23.3332 37.3334 23.3332C34.7561 23.3332 32.6667 21.2438 32.6667 18.6665C32.6667 16.0892 34.7561 13.9998 37.3334 13.9998C39.9107 13.9998 42.0001 16.0892 42.0001 18.6665Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M27.8662 2.9165H28.134C33.5202 2.91648 37.7413 2.91645 41.0348 3.35925C44.4058 3.81247 47.0659 4.75827 49.1538 6.84616C51.2417 8.93405 52.1875 11.5941 52.6407 14.9652C53.0835 18.2586 53.0835 22.4797 53.0834 27.866V28.072C53.0834 32.5258 53.0834 36.1718 52.8415 39.1404C52.5985 42.1237 52.1004 44.6165 50.9855 46.6869C50.4937 47.6001 49.8895 48.4178 49.1538 49.1535C47.0659 51.2414 44.4058 52.1872 41.0348 52.6404C37.7413 53.0832 33.5202 53.0832 28.134 53.0832H27.8662C22.48 53.0832 18.2589 53.0832 14.9654 52.6404C11.5943 52.1872 8.93429 51.2414 6.8464 49.1535C4.99542 47.3025 4.03955 44.9987 3.53123 42.1409C3.0319 39.3334 2.94055 35.8406 2.92158 31.5033C2.91675 30.4001 2.91675 29.2332 2.91675 28.0022V27.866C2.91672 22.4797 2.9167 18.2586 3.35949 14.9652C3.81272 11.5941 4.75851 8.93405 6.8464 6.84616C8.93429 4.75827 11.5943 3.81247 14.9654 3.35925C18.2589 2.91645 22.48 2.91648 27.8662 2.9165ZM15.4318 6.82804C12.4488 7.22908 10.6505 7.99183 9.32127 9.32103C7.99208 10.6502 7.22933 12.4486 6.82828 15.4315C6.42047 18.4648 6.41675 22.4506 6.41675 27.9998C6.41675 28.6777 6.41675 29.3333 6.41755 29.968L8.75353 27.924C10.8798 26.0635 14.0845 26.1702 16.0823 28.1681L26.0917 38.1774C27.6952 39.781 30.2194 39.9996 32.0748 38.6957L32.7706 38.2067C35.4405 36.3303 39.0527 36.5477 41.4783 38.7307L48.0826 44.6746C48.7474 43.2785 49.1422 41.4441 49.3531 38.8562C49.5821 36.0458 49.5834 32.5402 49.5834 27.9998C49.5834 22.4506 49.5797 18.4648 49.1719 15.4315C48.7708 12.4486 48.0081 10.6502 46.6789 9.32103C45.3497 7.99183 43.5513 7.22908 40.5684 6.82804C37.5351 6.42022 33.5493 6.41651 28.0001 6.41651C22.4509 6.41651 18.465 6.42022 15.4318 6.82804Z"
      />
    </svg>
  );
};

export default ImageDefault;
