import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const ClockReady = ({ width, height, className, style }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      width={width}
      height={height}
      className={cn('w-6 h-6', className)}
      style={style}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.63602 1.60248C8.85556 1.95373 8.74877 2.41645 8.39752 2.63598L4.3975 5.13598C4.04624 5.35551 3.58353 5.24873 3.364 4.89748C3.14447 4.54622 3.25125 4.08351 3.6025 3.86398L7.60253 1.36398C7.95378 1.14445 8.41649 1.25123 8.63602 1.60248ZM16.364 1.60248C16.5835 1.25123 17.0462 1.14445 17.3975 1.36398L21.3975 3.86398C21.7488 4.08351 21.8555 4.54623 21.636 4.89748C21.4165 5.24873 20.9538 5.35551 20.6025 5.13598L16.6025 2.63598C16.2512 2.41644 16.1445 1.95373 16.364 1.60248ZM12.5 4.74998C7.94365 4.74998 4.25 8.44363 4.25 13C4.25 17.5563 7.94365 21.25 12.5 21.25C17.0563 21.25 20.75 17.5563 20.75 13C20.75 8.44363 17.0563 4.74998 12.5 4.74998ZM2.75 13C2.75 7.6152 7.11522 3.24998 12.5 3.24998C17.8848 3.24998 22.25 7.6152 22.25 13C22.25 18.3848 17.8848 22.75 12.5 22.75C7.11522 22.75 2.75 18.3848 2.75 13Z"
      />
      <path d="M16.2038 10.2759C16.5855 10.6568 16.6002 11.2897 16.2367 11.6897L12.6003 15.6897C12.4202 15.8878 12.1703 16 11.9091 16C11.6479 16 11.398 15.8878 11.2179 15.6897L9.76332 14.0897C9.39975 13.6897 9.41449 13.0567 9.79624 12.6759C10.178 12.295 10.7822 12.3104 11.1458 12.7103L11.9091 13.55L14.8542 10.3103C15.2178 9.91042 15.822 9.89498 16.2038 10.2759Z" />
    </svg>
  );
};

export default ClockReady;