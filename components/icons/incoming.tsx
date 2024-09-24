import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const Incoming = ({ width, height, className, style }: IconProps) => {
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
        d="M4.55806 4.55806C4.80214 4.31398 5.19786 4.31398 5.44194 4.55806L14.375 13.4911L14.375 7.5C14.375 7.15482 14.6548 6.875 15 6.875C15.3452 6.875 15.625 7.15482 15.625 7.5L15.625 15C15.625 15.3452 15.3452 15.625 15 15.625H7.5C7.15482 15.625 6.875 15.3452 6.875 15C6.875 14.6548 7.15482 14.375 7.5 14.375L13.4911 14.375L4.55806 5.44194C4.31398 5.19786 4.31398 4.80214 4.55806 4.55806Z"
      />
    </svg>
  );
};

export default Incoming;
