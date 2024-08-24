import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const Check = ({ width, height, className, style }: IconProps) => {
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
        d="M9.99984 1.04199C5.05229 1.04199 1.0415 5.05277 1.0415 10.0003C1.0415 14.9479 5.05229 18.9587 9.99984 18.9587C14.9474 18.9587 18.9582 14.9479 18.9582 10.0003C18.9582 5.05277 14.9474 1.04199 9.99984 1.04199ZM2.2915 10.0003C2.2915 5.74313 5.74264 2.29199 9.99984 2.29199C14.257 2.29199 17.7082 5.74313 17.7082 10.0003C17.7082 14.2575 14.257 17.7087 9.99984 17.7087C5.74264 17.7087 2.2915 14.2575 2.2915 10.0003Z"
      />
    </svg>
  );
};

export default Check;
