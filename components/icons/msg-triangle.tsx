import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const MsgTriangle = ({ width, height, className, style }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 14 11"
      fill="currentColor"
      width={width}
      height={height}
      className={cn('w-[14px] h-[11px]', className)}
      style={style}
    >
      <path d="M0.737236 10.7792L8.70312 0.0273438L13.9996 8.99988L0.737236 10.7792Z" />
    </svg>
  );
};

export default MsgTriangle;
