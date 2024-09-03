import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const GooglePay = ({ width, height, className, style }: IconProps) => {
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
        d="M6.43242 14.5863L5.73625 17.1852L3.19176 17.239C2.43133 15.8286 2 14.2148 2 12.5C2 10.8418 2.40328 9.27801 3.11812 7.90109L5.38398 8.31641L6.37633 10.5681C6.16863 11.1736 6.05543 11.8236 6.05543 12.5C6.05551 13.2341 6.18848 13.9374 6.43242 14.5863Z"
        fill="#FBBB00"
      />
      <path
        d="M21.8253 10.6319C21.9401 11.2368 22 11.8615 22 12.5C22 13.2159 21.9247 13.9143 21.7813 14.5879C21.2945 16.8802 20.0225 18.8819 18.2605 20.2984L15.4066 20.1522L15.0028 17.6313C16.172 16.9456 17.0858 15.8725 17.5671 14.5879H12.2198V10.6319H21.8253Z"
        fill="#518EF8"
      />
      <path
        d="M18.2605 20.2984C16.5468 21.6758 14.3698 22.5 12 22.5C8.19176 22.5 4.88078 20.3714 3.19176 17.239L6.43242 14.5863C7.27691 16.8401 9.45109 18.4445 12 18.4445C13.0956 18.4445 14.1221 18.1484 15.0028 17.6313L18.2605 20.2984Z"
        fill="#28B446"
      />
      <path
        d="M18.383 4.80219L15.1434 7.45437C14.2319 6.88461 13.1544 6.55547 12 6.55547C9.39339 6.55547 7.17851 8.23348 6.37633 10.5681L3.11812 7.90109C4.78242 4.69231 8.13515 2.5 12 2.5C14.4264 2.5 16.6511 3.3643 18.383 4.80219Z"
        fill="#F14336"
      />
    </svg>
  );
};

export default GooglePay;