import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const CheckIcon = ({ width, height, className, style }: IconProps) => {
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
      <path d="M13.3584 8.35893C13.6025 8.11486 13.6025 7.71913 13.3584 7.47505C13.1144 7.23097 12.7186 7.23097 12.4746 7.47505L8.74984 11.1998L7.52511 9.97505C7.28103 9.73097 6.88531 9.73097 6.64123 9.97505C6.39715 10.2191 6.39715 10.6149 6.64123 10.8589L8.3079 12.5256C8.55197 12.7697 8.9477 12.7697 9.19178 12.5256L13.3584 8.35893Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.4107 5.77919C15.6707 6.00619 15.6975 6.40102 15.4705 6.66104L8.92289 14.161C8.8042 14.297 8.63254 14.375 8.45206 14.375C8.27159 14.375 8.09993 14.297 7.98124 14.161L5.36219 11.161C5.13518 10.901 5.16195 10.5062 5.42198 10.2792C5.68201 10.0522 6.07683 10.0789 6.30384 10.339L8.45206 12.7997L14.5289 5.83897C14.7559 5.57894 15.1507 5.55218 15.4107 5.77919Z"
      />
    </svg>
  );
};

export default CheckIcon;
