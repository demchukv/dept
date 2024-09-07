import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const SettingAlert = ({ width, height, className, style }: IconProps) => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.25 10.0002C5.25 8.48146 6.48122 7.25024 8 7.25024C9.51878 7.25024 10.75 8.48146 10.75 10.0002C10.75 11.519 9.51878 12.7502 8 12.7502C6.48122 12.7502 5.25 11.519 5.25 10.0002ZM8 8.75024C7.30964 8.75024 6.75 9.30989 6.75 10.0002C6.75 10.6906 7.30964 11.2502 8 11.2502C8.69036 11.2502 9.25 10.6906 9.25 10.0002C9.25 9.30989 8.69036 8.75024 8 8.75024Z"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16 16.7502C14.4812 16.7502 13.25 15.519 13.25 14.0002C13.25 12.4815 14.4812 11.2502 16 11.2502C17.5188 11.2502 18.75 12.4815 18.75 14.0002C18.75 15.519 17.5188 16.7502 16 16.7502ZM14.75 14.0002C14.75 14.6906 15.3096 15.2502 16 15.2502C16.6904 15.2502 17.25 14.6906 17.25 14.0002C17.25 13.3099 16.6904 12.7502 16 12.7502C15.3096 12.7502 14.75 13.3099 14.75 14.0002Z"
      />
      <path d="M8 13.2502C8.41421 13.2502 8.75 13.586 8.75 14.0002V19.0002C8.75 19.4145 8.41421 19.7502 8 19.7502C7.58579 19.7502 7.25 19.4145 7.25 19.0002V14.0002C7.25 13.586 7.58579 13.2502 8 13.2502Z" />
      <path d="M16.75 10.0002C16.75 10.4145 16.4142 10.7502 16 10.7502C15.5858 10.7502 15.25 10.4145 15.25 10.0002V5.00024C15.25 4.58603 15.5858 4.25024 16 4.25024C16.4142 4.25024 16.75 4.58603 16.75 5.00024V10.0002Z" />
      <path d="M8 4.25024C8.41421 4.25024 8.75 4.58603 8.75 5.00024V6.00024C8.75 6.41446 8.41421 6.75024 8 6.75024C7.58579 6.75024 7.25 6.41446 7.25 6.00024V5.00024C7.25 4.58603 7.58579 4.25024 8 4.25024Z" />
      <path d="M16.75 19.0002C16.75 19.4145 16.4142 19.7502 16 19.7502C15.5858 19.7502 15.25 19.4145 15.25 19.0002V18.0002C15.25 17.586 15.5858 17.2502 16 17.2502C16.4142 17.2502 16.75 17.586 16.75 18.0002V19.0002Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.9426 1.25024H12.0574C14.3658 1.25023 16.1748 1.25022 17.5863 1.43999C19.031 1.63423 20.1711 2.03957 21.0659 2.93438C21.9607 3.82919 22.366 4.96921 22.5603 6.41395C22.75 7.82544 22.75 9.63448 22.75 11.9429V12.0576C22.75 14.366 22.75 16.1751 22.5603 17.5865C22.366 19.0313 21.9607 20.1713 21.0659 21.0661C20.1711 21.9609 19.031 22.3663 17.5863 22.5605C16.1748 22.7503 14.3658 22.7503 12.0574 22.7502H11.9426C9.63423 22.7503 7.82519 22.7503 6.41371 22.5605C4.96897 22.3663 3.82895 21.9609 2.93414 21.0661C2.03933 20.1713 1.63399 19.0313 1.43975 17.5865C1.24998 16.1751 1.24999 14.366 1.25 12.0576V11.9429C1.24999 9.63447 1.24998 7.82544 1.43975 6.41395C1.63399 4.96921 2.03933 3.82919 2.93414 2.93438C3.82895 2.03957 4.96897 1.63423 6.41371 1.43999C7.82519 1.25022 9.63423 1.25023 11.9426 1.25024ZM6.61358 2.92661C5.33517 3.09849 4.56445 3.42538 3.9948 3.99504C3.42514 4.5647 3.09825 5.33542 2.92637 6.61382C2.75159 7.9138 2.75 9.62202 2.75 12.0002C2.75 14.3785 2.75159 16.0867 2.92637 17.3867C3.09825 18.6651 3.42514 19.4358 3.9948 20.0054C4.56445 20.5751 5.33517 20.902 6.61358 21.0739C7.91356 21.2487 9.62178 21.2502 12 21.2502C14.3782 21.2502 16.0864 21.2487 17.3864 21.0739C18.6648 20.902 19.4355 20.5751 20.0052 20.0054C20.5749 19.4358 20.9018 18.6651 21.0736 17.3867C21.2484 16.0867 21.25 14.3785 21.25 12.0002C21.25 9.62202 21.2484 7.9138 21.0736 6.61382C20.9018 5.33542 20.5749 4.5647 20.0052 3.99504C19.4355 3.42538 18.6648 3.09849 17.3864 2.92661C16.0864 2.75184 14.3782 2.75024 12 2.75024C9.62178 2.75024 7.91356 2.75184 6.61358 2.92661Z"
      />
    </svg>
  );
};

export default SettingAlert;