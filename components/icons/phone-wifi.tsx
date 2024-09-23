import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const PhoneWifi = ({ width, height, className, style }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
      fill="currentColor"
      width={width}
      height={height}
      className={cn('w-[17px] h-[17px]', className)}
      style={style}
    >
      <path
        opacity="0.1"
        d="M8.5 1.41602C5.1 1.41602 2.125 2.90352 0 5.24102L8.5 15.5827L17 5.24102C14.875 2.90352 11.9 1.41602 8.5 1.41602Z"
        fill="#1D1B20"
      />
    </svg>
  );
};

export default PhoneWifi;
