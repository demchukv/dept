import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const QlItalic = ({ width, height, className, style }: IconProps) => {
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
        d="M12.4855 1.04179H7.5C7.15482 1.04179 6.875 1.32161 6.875 1.66679C6.875 2.01197 7.15482 2.29179 7.5 2.29179H11.66L7.03498 17.7085H2.5C2.15482 17.7085 1.875 17.9883 1.875 18.3335C1.875 18.6786 2.15482 18.9585 2.5 18.9585H7.48595C7.4955 18.9587 7.50503 18.9587 7.51453 18.9585H12.5C12.8452 18.9585 13.125 18.6786 13.125 18.3335C13.125 17.9883 12.8452 17.7085 12.5 17.7085H8.34002L12.965 2.29179H17.5C17.8452 2.29179 18.125 2.01197 18.125 1.66679C18.125 1.32161 17.8452 1.04179 17.5 1.04179H12.514C12.5045 1.04157 12.495 1.04157 12.4855 1.04179Z"
      />
    </svg>
  );
};

export default QlItalic;
