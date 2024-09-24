import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const Outgoing = ({ width, height, className, style }: IconProps) => {
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
        d="M3.5 1.625C3.15482 1.625 2.875 1.34518 2.875 1C2.875 0.654822 3.15482 0.375 3.5 0.375H11C11.3452 0.375 11.625 0.654822 11.625 1V8.5C11.625 8.84518 11.3452 9.125 11 9.125C10.6548 9.125 10.375 8.84518 10.375 8.5V2.50888L1.44194 11.4419C1.19786 11.686 0.802136 11.686 0.558058 11.4419C0.313981 11.1979 0.313981 10.8021 0.558058 10.5581L9.49112 1.625H3.5Z"
      />
    </svg>
  );
};

export default Outgoing;
