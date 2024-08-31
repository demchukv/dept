import { cn } from '@/lib/utils';

interface LoadingProps {
  variant?: string;
  className?: string;
}

export const Loading = ({
  variant = 'default',
  className = '',
}: LoadingProps) => {
  return (
    <div className={cn('w-full h-full grid place-items-center', className)}>
      <div className="loader"></div>
    </div>
  );
};
