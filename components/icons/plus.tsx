import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const Plus = ({ width, height, className, style }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      width={width}
      height={height}
      className={cn('w-5 h-5', className)}
      style={style}
    >
      <path d="M10.6875 5.6C10.6875 4.99249 10.6075 4.5 10 4.5C9.39249 4.5 9.3125 4.99249 9.3125 5.6V9.3125H5.6C4.99249 9.3125 4.5 9.39252 4.5 10C4.5 10.6075 4.92374 10.6875 5.53125 10.6875H9.3125V14.4C9.3125 15.0075 9.39248 15.5 10 15.5C10.6075 15.5 10.6875 15.0075 10.6875 14.4V10.6875H14.4C15.0075 10.6875 15.5 10.6075 15.5 10C15.5 9.39252 15.0075 9.3125 14.4 9.3125H10.6875V5.6Z" />
    </svg>
  );
};

export default Plus;
