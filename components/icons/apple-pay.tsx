import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const ApplePay = ({ width, height, className, style }: IconProps) => {
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
      <path d="M16.125 1.5C14.972 1.567 13.6483 2.20934 12.8613 3.02734C12.1503 3.77134 11.5894 4.87631 11.8184 5.94531C13.0714 5.97831 14.329 5.31933 15.082 4.48633C15.785 3.70733 16.318 2.62 16.125 1.5ZM16.1934 5.94336C14.3844 5.94336 13.628 7.05469 12.375 7.05469C11.086 7.05469 9.90766 6.01367 8.34766 6.01367C6.22566 6.01467 3 7.98033 3 12.6113C3 16.8243 6.81766 21.5 8.97266 21.5C10.2817 21.513 10.599 20.677 12.375 20.668C14.153 20.655 14.5367 21.511 15.8477 21.5C17.3237 21.489 18.4764 19.867 19.3184 18.582C19.9224 17.662 20.1707 17.1923 20.6387 16.1523C17.1657 15.2723 16.4747 9.67167 20.6387 8.51367C19.8527 7.17267 17.5584 5.94336 16.1934 5.94336Z" />
    </svg>
  );
};

export default ApplePay;
