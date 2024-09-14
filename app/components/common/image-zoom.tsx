import Image from 'next/image';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';

export const ImageZoom = ({
  src,
  alt,
  className,
}: DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => {
  if (!src) return null;
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Image
          src={src}
          alt={alt || ''}
          sizes="100vw"
          className={className}
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={64}
          height={64}
        />
      </DialogTrigger>
      <DialogContent className="w-full h-fit border-0 bg-transparent p-0 shadow-none">
        <div className="relative h-[100vh] w-full overflow-clip rounded-md bg-transparent">
          <Image
            src={src}
            fill
            alt={alt || ''}
            className="h-full w-full object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
