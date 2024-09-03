import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const ActionMenu = ({ width, height, className, style }: IconProps) => {
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
        d="M12 21.75C10.4812 21.75 9.25 20.5188 9.25 19C9.25 17.4812 10.4812 16.25 12 16.25C13.5188 16.25 14.75 17.4812 14.75 19C14.75 20.5188 13.5188 21.75 12 21.75ZM10.75 19C10.75 19.6904 11.3096 20.25 12 20.25C12.6904 20.25 13.25 19.6904 13.25 19C13.25 18.3096 12.6904 17.75 12 17.75C11.3096 17.75 10.75 18.3096 10.75 19Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 14.75C10.4812 14.75 9.25 13.5188 9.25 12C9.25 10.4812 10.4812 9.25 12 9.25C13.5188 9.25 14.75 10.4812 14.75 12C14.75 13.5188 13.5188 14.75 12 14.75ZM10.75 12C10.75 12.6904 11.3096 13.25 12 13.25C12.6904 13.25 13.25 12.6904 13.25 12C13.25 11.3096 12.6904 10.75 12 10.75C11.3096 10.75 10.75 11.3096 10.75 12Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9.25 5C9.25 6.51878 10.4812 7.75 12 7.75C13.5188 7.75 14.75 6.51878 14.75 5C14.75 3.48122 13.5188 2.25 12 2.25C10.4812 2.25 9.25 3.48122 9.25 5ZM12 6.25C11.3096 6.25 10.75 5.69036 10.75 5C10.75 4.30964 11.3096 3.75 12 3.75C12.6904 3.75 13.25 4.30964 13.25 5C13.25 5.69036 12.6904 6.25 12 6.25Z"
      />
    </svg>
  );
};

export default ActionMenu;