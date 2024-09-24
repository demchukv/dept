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
      {/* <div className="loader"></div> */}
      <video autoPlay muted loop height={'100px'} width={'100px'}>
        <source src="/animation/preloader.mp4" type="video/mp4" />
      </video>
    </div>
  );
};
