import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const ArrowDown = ({ width, height, className, style }: IconProps) => {
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
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.30193 7.73282C4.50483 7.45327 4.86121 7.42089 5.09792 7.66051L9.99935 12.622L14.9008 7.66051C15.1375 7.42089 15.4939 7.45327 15.6968 7.73282C15.8997 8.01237 15.8723 8.43323 15.6355 8.67285L10.3667 14.0062C10.1553 14.2202 9.84337 14.2202 9.63197 14.0062L4.36316 8.67285C4.12644 8.43323 4.09903 8.01237 4.30193 7.73282Z"
      />
    </svg>
  );
};

export default ArrowDown;
