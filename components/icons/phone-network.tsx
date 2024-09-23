import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const PhoneNetwork = ({ width, height, className, style }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 17 17"
      fill="currentColor"
      width={width}
      height={height}
      className={cn('w-[17px] h-17px', className)}
      style={style}
    >
      <path
        d="M15.5827 1.41602L1.41602 15.5827H15.5827V1.41602Z"
        fill="#1D1B20"
      />
    </svg>
  );
};

export default PhoneNetwork;
