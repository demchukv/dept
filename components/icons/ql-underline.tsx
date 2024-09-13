import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const QlUnderline = ({ width, height, className, style }: IconProps) => {
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
      <path d="M3.95837 2.50012C3.95837 2.15494 3.67855 1.87512 3.33337 1.87512C2.9882 1.87512 2.70837 2.15494 2.70837 2.50012V7.50012C2.70837 11.5272 5.97296 14.7918 10 14.7918C14.0271 14.7918 17.2917 11.5272 17.2917 7.50012V2.50012C17.2917 2.15494 17.0119 1.87512 16.6667 1.87512C16.3215 1.87512 16.0417 2.15494 16.0417 2.50012V7.50012C16.0417 10.8368 13.3368 13.5418 10 13.5418C6.66332 13.5418 3.95837 10.8368 3.95837 7.50012V2.50012Z" />
      <path d="M3.33337 16.8751C2.9882 16.8751 2.70837 17.1549 2.70837 17.5001C2.70837 17.8453 2.9882 18.1251 3.33337 18.1251H16.6667C17.0119 18.1251 17.2917 17.8453 17.2917 17.5001C17.2917 17.1549 17.0119 16.8751 16.6667 16.8751H3.33337Z" />
    </svg>
  );
};

export default QlUnderline;
