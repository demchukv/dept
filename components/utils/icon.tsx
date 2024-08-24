import { Icons } from '@/components/icons';

interface IconProps {
  iconName: string;
  width: number;
  height: number;
  className?: string;
  style?: React.CSSProperties;
}
export const Icon = ({
  width,
  height,
  iconName,
  className,
  style,
}: IconProps) => {
  const Icon = Icons[iconName as keyof typeof Icons];

  return (
    <Icon width={width} height={height} className={className} style={style} />
  );
};
