import Image from 'next/image';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { DetailedHTMLProps, ImgHTMLAttributes } from 'react';
import { DialogDescription } from '@radix-ui/react-dialog';

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
      <DialogTrigger asChild className="w-14 h-14 object-contain">
        <Image
          src={src}
          alt={alt || ''}
          sizes="100vw"
          className={className}
          style={{
            width: '100%',
            height: 'auto',
          }}
          width={56}
          height={56}
        />
      </DialogTrigger>
      <DialogContent className="w-full border-0 bg-transparent p-0 shadow-none">
        <DialogHeader className="hidden">
          <DialogTitle>{alt || ''}</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
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
