import React from 'react';
import { formatTime } from '@/lib/utils';
import { Icon } from '@/components/utils/icon';
import Link from 'next/link';
import { set } from 'date-fns';

interface ProgressBarProps {
  currentTime: number;
  duration: number;
  isSeeking: boolean;
  onSeek: (e: React.MouseEvent<HTMLDivElement>) => void;
  setIsSeeking: (isSeeking: boolean) => void;
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentTime,
  duration,
  isSeeking,
  onSeek,
  setIsSeeking,
  onPlay,
  onPause,
  onStop,
}) => {
  const [isPlaying, setIsPlaying] = React.useState(false);
  const progressBarWidth = (currentTime / duration) * 100;
  const cursorPosition = Math.round((currentTime / duration) * 100);

  const changePlayState = (action: string) => {
    setIsPlaying(action === 'play');
    if (action === 'play') {
      onPlay();
    } else {
      onPause();
    }
  };
  return (
    <div className="flex items-center justify-between">
      <Link
        href="#"
        download
        className="sm:hidden text-main-color hover:text-main-dark leading-main-lh items-center gap-1.5"
      >
        <Icon
          iconName="Doc"
          width={24}
          height={24}
          className="w-6 h-6 flex-shrink-0"
        />
      </Link>
      <div className="flex-shrink-0  flex items-center justify-evenly p-2">
        {isPlaying ? (
          <button
            onClick={() => changePlayState('pause')}
            type="button"
            className="text-main-color"
          >
            <Icon
              iconName="DeleteCircle"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        ) : (
          <button
            onClick={() => changePlayState('play')}
            type="button"
            className="text-main-color"
          >
            <Icon
              iconName="PlayCircle"
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </button>
        )}
      </div>
      <div className="text-main-dark font-medium leading-main-lh flex-shrink-0 w-[46px]">
        {formatTime(currentTime)}
      </div>
      <div
        className="flex-grow w-[165px] sm:w-[235px] p-4"
        onClick={onSeek}
        onMouseMove={(e) => isSeeking && onSeek(e)}
        onMouseDown={() => setIsSeeking(true)}
        onMouseUp={() => setIsSeeking(false)}
        onMouseLeave={() => setIsSeeking(false)}
      >
        <div className="space-y-2">
          <div className="relative">
            <div className="bg-gray-medium rounded-full overflow-hidden">
              <div
                className="bg-main-color h-1"
                style={{ width: `${progressBarWidth}%` }}
                role="progressbar"
                aria-label="music progress"
                aria-valuenow={progressBarWidth}
                aria-valuemin={0}
                aria-valuemax={duration}
              />
            </div>
            <div
              className="absolute top-1/2 w-2 h-5 -mt-2.5 -ml-2 bg-main-color rounded-[6px]"
              style={{ left: `${cursorPosition}%` }}
            ></div>
          </div>
        </div>
      </div>
      <div className="text-main-dark font-medium leading-main-lh flex-shrink-0 w-[46px]">
        {formatTime(duration)}
      </div>
      <Link
        href="#"
        download
        className="hidden sm:flex text-main-color hover:text-main-dark leading-main-lh items-center gap-1.5 ml-2"
      >
        <Icon
          iconName="Doc"
          width={24}
          height={24}
          className="w-6 h-6 flex-shrink-0"
        />
      </Link>
    </div>
  );
};
