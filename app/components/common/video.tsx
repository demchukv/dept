import React from 'react';
import { cn } from '@/lib/utils';

interface videoInterface {
  src: string;
  className?: string;
}
export const Video = ({ src, className }: videoInterface) => {
  return (
    <iframe
      src={src}
      frameBorder="0"
      allowFullScreen
      className={cn('w-full aspect-video self-stretch md:min-h-96', className)}
      aria-hidden="true"
    />
  );
};
