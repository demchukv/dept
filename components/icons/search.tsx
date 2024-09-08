import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const Search = ({ width, height, className, style }: IconProps) => {
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
        d="M9.58333 2.29175C5.55626 2.29175 2.29167 5.55634 2.29167 9.58342C2.29167 13.6105 5.55626 16.8751 9.58333 16.8751C13.6104 16.8751 16.875 13.6105 16.875 9.58342C16.875 5.55634 13.6104 2.29175 9.58333 2.29175ZM1.04167 9.58342C1.04167 4.86598 4.8659 1.04175 9.58333 1.04175C14.3008 1.04175 18.125 4.86598 18.125 9.58342C18.125 11.7172 17.3426 13.6682 16.0491 15.1653L18.7753 17.8915C19.0194 18.1356 19.0194 18.5313 18.7753 18.7754C18.5312 19.0194 18.1355 19.0194 17.8914 18.7754L15.1652 16.0491C13.6681 17.3427 11.7171 18.1251 9.58333 18.1251C4.8659 18.1251 1.04167 14.3008 1.04167 9.58342Z"
      />
    </svg>
  );
};

export default Search;
