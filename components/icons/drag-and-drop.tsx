import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const DragAndDrop = ({ width, height, className, style }: IconProps) => {
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
      <circle cx="9" cy="4.50024" r="1.5" />
      <circle cx="15" cy="4.50024" r="1.5" />
      <circle cx="9" cy="12.0002" r="1.5" />
      <circle cx="15" cy="12.0002" r="1.5" />
      <circle cx="9" cy="19.5002" r="1.5" />
      <circle cx="15" cy="19.5002" r="1.5" />
    </svg>
  );
};

export default DragAndDrop;
