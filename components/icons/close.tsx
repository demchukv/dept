import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const Close = ({ width, height, className, style }: IconProps) => {
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
      <path d="M16.388 8.7987C16.911 8.27484 17.2661 7.7812 16.7431 7.25734C16.2201 6.73348 15.7274 7.08918 15.2044 7.61304L12.0086 10.8143L8.81288 7.61304C8.28992 7.08918 7.7971 6.73351 7.27415 7.25737C6.75119 7.78123 7.04713 8.21556 7.57008 8.73942L10.825 12L7.62926 15.2013C7.10631 15.7251 6.75122 16.2188 7.27418 16.7426C7.79713 17.2665 8.28992 16.9108 8.81288 16.3869L12.0086 13.1857L15.2044 16.3869C15.7274 16.9108 16.2201 17.2665 16.7431 16.7427C17.266 16.2188 16.911 15.7251 16.388 15.2013L13.1923 12L16.388 8.7987Z" />
    </svg>
  );
};

export default Close;
