import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const QlBold = ({ width, height, className, style }: IconProps) => {
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
        d="M6.34054 1.04181C4.79474 1.04181 3.54163 2.29493 3.54163 3.84072V16.6178C3.54163 17.9105 4.58959 18.9585 5.88231 18.9585H11.6666C14.313 18.9585 16.4583 16.8132 16.4583 14.1668C16.4583 11.9854 15.0007 10.1445 13.0063 9.56493C14.0951 8.68657 14.7916 7.34136 14.7916 5.83348C14.7916 3.18711 12.6463 1.04181 9.99996 1.04181H6.34054ZM9.99996 9.37514C11.956 9.37514 13.5416 7.78948 13.5416 5.83348C13.5416 3.87747 11.956 2.29181 9.99996 2.29181H6.34054C5.4851 2.29181 4.79163 2.98528 4.79163 3.84072V9.37514H9.99996ZM4.79163 10.6251V16.6178C4.79163 17.2202 5.27994 17.7085 5.88231 17.7085H11.6666C13.6226 17.7085 15.2083 16.1228 15.2083 14.1668C15.2083 12.2108 13.6226 10.6251 11.6666 10.6251H4.79163Z"
      />
    </svg>
  );
};

export default QlBold;
