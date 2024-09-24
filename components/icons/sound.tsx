import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const Sound = ({ width, height, className, style }: IconProps) => {
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
        d="M12.1849 4.04166C11.4208 4.43111 10.4526 5.09883 9.0728 6.05337L8.83859 6.2154C8.82076 6.22773 8.80317 6.23991 8.78581 6.25192C8.37909 6.53342 8.0974 6.72838 7.78873 6.87131C7.48454 7.01217 7.16483 7.1128 6.83697 7.1709C6.50428 7.22984 6.16683 7.22977 5.67958 7.22967C5.65879 7.22966 5.63772 7.22966 5.61637 7.22966C4.07197 7.22966 3.55068 7.24793 3.10747 7.46308C2.67917 7.67099 2.22302 8.12132 1.99918 8.55721C1.76568 9.01193 1.72281 9.47796 1.64038 10.8969C1.61776 11.2864 1.60465 11.6597 1.60465 12C1.60465 12.3403 1.61776 12.7136 1.64038 13.1031C1.72281 14.522 1.76568 14.9881 1.99918 15.4428C2.22302 15.8787 2.67917 16.329 3.10747 16.5369C3.55068 16.7521 4.07197 16.7703 5.61637 16.7703C5.63772 16.7703 5.65879 16.7703 5.67958 16.7703C6.16682 16.7702 6.50428 16.7702 6.83697 16.8291C7.16483 16.8872 7.48454 16.9878 7.78873 17.1287C8.0974 17.2716 8.37909 17.4666 8.78581 17.7481C8.80317 17.7601 8.82076 17.7723 8.83859 17.7846L9.0728 17.9466C10.4526 18.9012 11.4208 19.5689 12.1849 19.9583C12.9469 20.3467 13.3279 20.3623 13.5944 20.2668C13.7414 20.2142 13.8852 20.1374 14.0123 20.0437C14.2441 19.8728 14.4554 19.5422 14.6039 18.6764C14.7532 17.8066 14.8081 16.6035 14.8842 14.8853C14.9399 13.6287 14.9767 12.5744 14.9767 12C14.9767 11.4256 14.9399 10.3713 14.8842 9.1147C14.8081 7.39654 14.7532 6.19335 14.6039 5.3236C14.4554 4.45779 14.2441 4.12716 14.0123 3.95627C13.8852 3.86257 13.7414 3.78578 13.5944 3.73315C13.3279 3.63771 12.9469 3.65328 12.1849 4.04166ZM11.4837 2.52724C12.3674 2.07685 13.2374 1.82634 14.1127 2.13973C14.4035 2.24387 14.6835 2.39336 14.935 2.57877C15.6903 3.13573 16.01 4.01573 16.1832 5.0253C16.3535 6.01793 16.4118 7.33336 16.4843 8.972L16.4872 9.03655C16.5426 10.288 16.5814 11.3804 16.5814 12C16.5814 12.6196 16.5426 13.712 16.4872 14.9634L16.4843 15.028C16.4118 16.6666 16.3535 17.9821 16.1832 18.9747C16.01 19.9843 15.6903 20.8643 14.935 21.4212C14.6835 21.6066 14.4035 21.7561 14.1127 21.8603C13.2374 22.1737 12.3674 21.9232 11.4837 21.4728C10.6134 21.0292 9.55744 20.2986 8.2407 19.3877L7.9553 19.1902C7.47613 18.8587 7.31131 18.7479 7.14083 18.669C6.95832 18.5845 6.7665 18.5241 6.56978 18.4893C6.38604 18.4567 6.19032 18.454 5.61637 18.454C5.55818 18.454 5.50077 18.454 5.44412 18.4541C4.1423 18.4548 3.23775 18.4553 2.43368 18.065C1.6904 17.7041 0.975001 16.9979 0.586534 16.2414C0.166523 15.4235 0.117239 14.5682 0.0471633 13.352C0.0443839 13.3037 0.0415718 13.2549 0.0387026 13.2055C0.0146911 12.7922 0 12.3834 0 12C0 11.6166 0.0146911 11.2078 0.0387026 10.7945C0.0415718 10.7451 0.0443839 10.6963 0.0471633 10.648C0.117239 9.43184 0.166523 8.5765 0.586534 7.7586C0.975001 7.00213 1.6904 6.29587 2.43368 5.93505C3.23775 5.54472 4.1423 5.54522 5.44411 5.54594C5.50077 5.54597 5.55818 5.54601 5.61637 5.54601C6.19032 5.54601 6.38604 5.5433 6.56978 5.51075C6.7665 5.47589 6.95832 5.41551 7.14083 5.331C7.31131 5.25206 7.47613 5.14127 7.9553 4.80978L8.24072 4.61233C9.55745 3.70138 10.6134 2.97084 11.4837 2.52724ZM20.0794 4.61893C20.4198 4.32129 20.9257 4.36954 21.2094 4.72671L20.593 5.26564C21.2094 4.72671 21.2094 4.72671 21.2094 4.72671L21.2106 4.72826L21.212 4.72999L21.2152 4.73404L21.2232 4.74445C21.2293 4.75241 21.2368 4.76244 21.2458 4.77455C21.2636 4.79877 21.2869 4.83131 21.3149 4.87235C21.3707 4.95445 21.4452 5.0705 21.5317 5.22186C21.7049 5.52471 21.9262 5.96826 22.1442 6.56291C22.5809 7.75422 23 9.54035 23 12.0002C23 14.4601 22.5809 16.2463 22.1442 17.4376C21.9262 18.0322 21.7049 18.4758 21.5317 18.7786C21.4452 18.93 21.3707 19.046 21.3149 19.1281C21.2869 19.1692 21.2636 19.2017 21.2458 19.2259C21.2404 19.2332 21.2356 19.2397 21.2312 19.2454C21.2283 19.2493 21.2256 19.2528 21.2232 19.256L21.2152 19.2664L21.212 19.2705L21.2106 19.2722C21.2106 19.2722 21.2094 19.2738 20.593 18.7348L21.2094 19.2738C20.9257 19.6309 20.4198 19.6792 20.0794 19.3815C19.7406 19.0853 19.6934 18.5582 19.9726 18.2011M19.9726 18.2011C19.9726 18.2011 19.9745 18.1985 19.9763 18.1961C19.982 18.1884 19.9932 18.1729 20.0091 18.1495C20.041 18.1027 20.0919 18.0241 20.1558 17.9124C20.2834 17.6891 20.4633 17.3329 20.6465 16.8332C21.0121 15.8357 21.3953 14.2546 21.3953 12.0002C21.3953 9.74591 21.0121 8.16473 20.6465 7.1673C20.4633 6.66757 20.2834 6.31138 20.1558 6.08809C20.0919 5.97638 20.041 5.89777 20.0091 5.85096C19.9932 5.82755 19.982 5.81208 19.9763 5.8044C19.9745 5.80192 19.9726 5.79939 19.9726 5.79939L19.9763 5.8044L19.9746 5.80202L19.9726 5.79939C19.6934 5.44229 19.7406 4.91513 20.0794 4.61893M18.0638 7.89705C18.4512 7.67126 18.9397 7.81769 19.1548 8.22411L18.483 8.61572C19.1549 8.22412 19.1548 8.22411 19.1548 8.22411L19.1556 8.22558L19.1564 8.22715L19.1582 8.23057L19.1623 8.23856L19.1727 8.25915C19.1804 8.27495 19.1899 8.29488 19.2009 8.31902C19.2228 8.36731 19.2505 8.43241 19.282 8.51496C19.345 8.68014 19.4226 8.91466 19.4981 9.22358C19.6492 9.84197 19.7907 10.7542 19.7907 12.0002C19.7907 13.2463 19.6492 14.1585 19.4981 14.7769C19.4226 15.0858 19.345 15.3203 19.282 15.4855C19.2505 15.5681 19.2228 15.6332 19.2009 15.6815C19.1899 15.7056 19.1804 15.7255 19.1727 15.7413L19.1623 15.7619L19.1582 15.7699L19.1564 15.7733L19.1556 15.7749C19.1556 15.7749 19.1549 15.7764 18.483 15.3848L19.1548 15.7764C18.9397 16.1828 18.4512 16.3292 18.0638 16.1034C17.6798 15.8796 17.5393 15.3738 17.7467 14.9691L17.7521 14.9576C17.7594 14.9414 17.7734 14.9092 17.7921 14.8602C17.8294 14.7623 17.8855 14.597 17.9437 14.3587C18.0601 13.8827 18.186 13.1113 18.186 12.0002C18.186 10.8892 18.0601 10.1177 17.9437 9.64176C17.8855 9.40349 17.8294 9.23814 17.7921 9.14025C17.7734 9.09127 17.7594 9.05903 17.7521 9.04288L17.7467 9.03138C17.5393 8.62666 17.6798 8.12092 18.0638 7.89705Z"
      />
    </svg>
  );
};

export default Sound;
