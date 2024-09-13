import { cn } from '@/lib/utils';

interface IconProps {
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
const Bolt = ({ width, height, className, style }: IconProps) => {
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
        d="M17.1064 8.64462C16.7975 8.10965 16.2314 7.93379 15.691 7.85823C15.1462 7.78206 14.4172 7.78208 13.5353 7.78211L13.4852 7.78211C12.9601 7.78211 12.6168 7.77693 12.3667 7.74216C12.1405 7.71071 12.0686 7.66416 12.0379 7.63701C12.0154 7.61359 11.9754 7.55882 11.9481 7.36134C11.9159 7.1285 11.9145 6.80921 11.9145 6.29749V5.98542C11.9145 4.66248 11.9146 3.6027 11.8127 2.84713C11.7172 2.13791 11.49 1.34137 10.7032 1.10025C9.93018 0.863362 9.28184 1.37132 8.77788 1.895C8.24102 2.45287 7.60328 3.31575 6.8048 4.39611L4.19064 7.93304C3.68203 8.62113 3.25804 9.19474 3.00541 9.66907C2.75217 10.1445 2.56787 10.7091 2.84877 11.2723L2.84975 11.2743L2.85271 11.2804L2.85607 11.287L2.85938 11.2934L2.86301 11.3002L2.86669 11.307L2.87018 11.3133L2.87387 11.3198L2.87725 11.3255L2.87849 11.3276C3.18474 11.858 3.74838 12.0437 4.29367 12.1269C4.85561 12.2127 5.60543 12.2182 6.5148 12.2182C7.0453 12.2182 7.38357 12.2194 7.632 12.2511C7.85146 12.279 7.9171 12.3222 7.94523 12.3471C7.97015 12.3731 8.01385 12.4339 8.04467 12.6385C8.07994 12.8727 8.08547 13.1969 8.08546 13.7028L8.08546 14.0148C8.08542 15.3377 8.08539 16.3975 8.18719 17.1531C8.28275 17.8624 8.50991 18.6589 9.29674 18.9C10.0697 19.1369 10.7181 18.629 11.2221 18.1053C11.7589 17.5474 12.3967 16.6845 13.1952 15.6041L15.778 12.1097C16.3036 11.3985 16.736 10.8043 16.9909 10.3098C17.2404 9.82585 17.4145 9.25803 17.1362 8.69998L17.1352 8.69797L17.1322 8.69191L17.1289 8.68522L17.1255 8.67881L17.1219 8.67197L17.1182 8.66516L17.1147 8.65886L17.111 8.65237L17.1076 8.64657L17.1064 8.64462ZM9.67856 2.76176C9.20526 3.25359 8.61546 4.04935 7.77901 5.18106L5.22722 8.6336C4.67915 9.37513 4.31245 9.87409 4.10869 10.2567C4.00951 10.4429 3.97228 10.5604 3.96168 10.6315C3.95513 10.6754 3.95912 10.6952 3.96436 10.7079C3.98451 10.7376 4.07203 10.8286 4.48233 10.8912C4.93058 10.9597 5.5751 10.9682 6.5148 10.9682L6.55311 10.9682C7.03405 10.9682 7.45311 10.9681 7.79009 11.0111C8.15107 11.0571 8.50965 11.1618 8.80654 11.441L8.8114 11.4456L8.81616 11.4503C9.10783 11.7366 9.22639 12.0915 9.28073 12.4524C9.33267 12.7973 9.33547 13.2215 9.33546 13.7029L9.33546 13.9608C9.33544 15.3499 9.33684 16.3245 9.426 16.9862C9.4704 17.3157 9.53012 17.509 9.5873 17.6169C9.63016 17.6978 9.65483 17.7031 9.66175 17.7046L9.663 17.7049L9.66426 17.7053C9.67298 17.7083 9.7037 17.7189 9.79843 17.6713C9.91677 17.6117 10.0858 17.4833 10.3214 17.2385C10.7947 16.7467 11.3845 15.9509 12.221 14.8192L14.7728 11.3667C15.3177 10.6294 15.6808 10.1232 15.8799 9.73701C16.0505 9.40607 16.0319 9.29399 16.0206 9.26423C16.0019 9.23689 15.9178 9.1521 15.5179 9.09619C15.0703 9.0336 14.4299 9.03211 13.4852 9.03211C12.9828 9.03211 12.5471 9.02927 12.1945 8.98025C11.8305 8.92964 11.4711 8.82007 11.1768 8.54326L11.1719 8.53869L11.1672 8.53402C10.8728 8.24511 10.7593 7.89057 10.7098 7.53235C10.6645 7.20374 10.6645 6.79681 10.6645 6.33778L10.6645 6.0394C10.6645 4.65033 10.6631 3.67578 10.5739 3.01406C10.5295 2.68456 10.4698 2.49129 10.4126 2.38336C10.3698 2.30247 10.3451 2.29717 10.3382 2.29569L10.3369 2.29539L10.3357 2.29497C10.3269 2.29196 10.2962 2.28135 10.2015 2.32902C10.0832 2.38857 9.91413 2.51697 9.67856 2.76176Z"
      />
    </svg>
  );
};

export default Bolt;