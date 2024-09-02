import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const RadioChecked = ({ width, height, className, style }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      stroke="currentColor"
      width={width}
      height={height}
      className={cn('w-5 h-5', className)}
      style={style}
    >
      <circle cx="10" cy="10" r="7.5" stroke="" />
      <circle cx="10" cy="10" r="5" fill="" />
    </svg>
  );
};

export default RadioChecked;
