import { cn } from '@/lib/utils';

interface LoadingProps {
  className?: string;
}

export const Loading = ({ className = '' }: LoadingProps) => {
  return (
    <div className={cn('w-full h-full grid place-items-center', className)}>
      <div className="loader"></div>
    </div>
  );
};
