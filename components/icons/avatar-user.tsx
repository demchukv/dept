import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const AvatarUser = ({ width, height, className, style }: IconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 40 40"
      fill="currentColor"
      width={width}
      height={height}
      className={cn('w-10 h-10', className)}
      style={style}
    >
      <path
        d="M20 0.000244141C8.96 0.000244141 0 8.96024 0 20.0002C0 31.0402 8.96 40.0002 20 40.0002C31.04 40.0002 40 31.0402 40 20.0002C40 8.96024 31.04 0.000244141 20 0.000244141ZM20 8.00024C23.86 8.00024 27 11.1402 27 15.0002C27 18.8602 23.86 22.0002 20 22.0002C16.14 22.0002 13 18.8602 13 15.0002C13 11.1402 16.14 8.00024 20 8.00024ZM20 36.0002C15.94 36.0002 11.14 34.3602 7.72 30.2402C11.1 27.6002 15.36 26.0002 20 26.0002C24.64 26.0002 28.9 27.6002 32.28 30.2402C28.86 34.3602 24.06 36.0002 20 36.0002Z"
        fill="#B8C2CD"
      />
    </svg>
  );
};

export default AvatarUser;
