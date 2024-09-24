import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const PhoneBattery = ({ width, height, className, style }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 8 15"
      fill="currentColor"
      width={width}
      height={height}
      className={cn('w-[8px] h-[15px]', className)}
      style={style}
    >
      <path
        opacity="0.3"
        d="M5.5 0H2.5V1.5H1C0.447715 1.5 0 2.00368 0 2.625V13.875C0 14.4963 0.447715 15 1 15H7C7.55228 15 8 14.4963 8 13.875V2.625C8 2.00368 7.55228 1.5 7 1.5H5.5V0Z"
        fill="#1D1B20"
      />
      <path
        d="M6.17902e-06 8C-1.48833e-06 8.58333 1.46004e-07 13.3667 1.46004e-07 13.95C1.46004e-07 14.5299 0.447715 15 1 15H7C7.55228 15 8 14.5299 8 13.95C8 13.3667 8 8.58333 8 8H6.17902e-06Z"
        fill="#1D1B20"
      />
    </svg>
  );
};

export default PhoneBattery;