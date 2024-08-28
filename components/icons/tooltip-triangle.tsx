import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const TooltipTriangle = ({ width, height, className, style }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 16 6"
      fill="currentColor"
      width={width}
      height={height}
      className={cn('w-6 h-6', className)}
      style={style}
    >
      <path d="M8 6L12.951 1.14425C13.6988 0.410838 14.7044 5.5038e-07 15.7518 4.58812e-07L0.248201 1.81418e-06C1.29562 1.72261e-06 2.30125 0.410839 3.04904 1.14425L8 6Z" />
    </svg>
  );
};

export default TooltipTriangle;
