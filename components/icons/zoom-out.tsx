import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const ZoomIn = ({ width, height, className, style }: IconProps) => {
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
        d="M10.5 1.91797C5.66751 1.91797 1.75 5.83548 1.75 10.668C1.75 15.5005 5.66751 19.418 10.5 19.418C15.3325 19.418 19.25 15.5005 19.25 10.668C19.25 5.83548 15.3325 1.91797 10.5 1.91797ZM0.25 10.668C0.25 5.00705 4.83908 0.417969 10.5 0.417969C16.1609 0.417969 20.75 5.00705 20.75 10.668C20.75 13.2285 19.8111 15.5697 18.2589 17.3662L21.5303 20.6376C21.8232 20.9305 21.8232 21.4054 21.5303 21.6983C21.2374 21.9912 20.7626 21.9912 20.4697 21.6983L17.1982 18.4268C15.4017 19.9791 13.0605 20.918 10.5 20.918C4.83908 20.918 0.25 16.3289 0.25 10.668ZM7.25 10.668C7.25 10.2538 7.58579 9.91797 8 9.91797H13C13.4142 9.91797 13.75 10.2538 13.75 10.668C13.75 11.0822 13.4142 11.418 13 11.418H8C7.58579 11.418 7.25 11.0822 7.25 10.668Z"
      />
    </svg>
  );
};

export default ZoomIn;
