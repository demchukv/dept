import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const ArrowBack = ({ width, height, className, style }: IconProps) => {
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
        d="M12 2.75012C6.89137 2.75012 2.75 6.89149 2.75 12.0001C2.75 17.1088 6.89137 21.2501 12 21.2501C17.1086 21.2501 21.25 17.1088 21.25 12.0001C21.25 6.89149 17.1086 2.75012 12 2.75012ZM1.25 12.0001C1.25 6.06306 6.06294 1.25012 12 1.25012C17.9371 1.25012 22.75 6.06306 22.75 12.0001C22.75 17.9372 17.9371 22.7501 12 22.7501C6.06294 22.7501 1.25 17.9372 1.25 12.0001ZM11.5303 8.46979C11.8232 8.76269 11.8232 9.23756 11.5303 9.53045L9.81066 11.2501H16C16.4142 11.2501 16.75 11.5859 16.75 12.0001C16.75 12.4143 16.4142 12.7501 16 12.7501H9.81066L11.5303 14.4698C11.8232 14.7627 11.8232 15.2376 11.5303 15.5305C11.2374 15.8233 10.7626 15.8233 10.4697 15.5305L7.46967 12.5305C7.17678 12.2376 7.17678 11.7627 7.46967 11.4698L10.4697 8.46979C10.7626 8.1769 11.2374 8.1769 11.5303 8.46979Z"
      />
    </svg>
  );
};

export default ArrowBack;
