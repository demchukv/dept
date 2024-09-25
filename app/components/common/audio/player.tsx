import React, { useState, useRef, useEffect } from 'react';
import { Card } from '@/app/components/card/card';
import { Icon } from '@/components/utils/icon';
import { Button } from '@/components/ui/button';
import { Range, getTrackBackground } from 'react-range';

function AudioPlayer({ audioSrc }: { audioSrc: string }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(1);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handlePlay = () => {
    if (!audioRef.current) return;
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePause = () => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
    setDuration(audioRef.current.duration);
  };

  const handleSeek = (value: number[]) => {
    if (!audioRef.current?.currentTime || !value[0]) return;
    audioRef.current.currentTime = value[0];
    setCurrentTime(value[0]);
  };

  function formatDuration(durationSeconds: number) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
  }

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      if (!audioRef.current) return;
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, []);

  return (
    <Card>
      <div className="flex gap-4 items-center">
        <Button type="button" variant="ghost" onClick={handlePlayPause}>
          <Icon
            iconName={isPlaying ? 'DeleteCircle' : 'PlayCircle'}
            width={24}
            height={24}
            className="w-6 h-6"
          />
        </Button>
        <p className="w-14">{formatDuration(currentTime)}</p>
        <div className="w-full">
          <Range
            label="Виберіть точку програвання"
            step={0.1}
            min={0}
            max={duration}
            values={[currentTime]}
            onChange={(values) => handleSeek(values)}
            renderTrack={({ props, children }) => (
              <div
                onMouseDown={props.onMouseDown}
                onTouchStart={props.onTouchStart}
                className="w-full flex h-1 bg-main-color rounded"
              >
                <div
                  ref={props.ref}
                  style={{
                    height: '5px',
                    width: '100%',
                    borderRadius: '4px',
                    background: getTrackBackground({
                      values: [currentTime],
                      colors: ['var(--main-color)', 'var(--gray-light)'],
                      min: 0,
                      max: duration,
                    }),
                    alignSelf: 'center',
                  }}
                >
                  {children}
                </div>
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                key={props.key}
                className="w-2 h-5 bg-main-color rounded-[6px]"
              />
            )}
          />
        </div>
        <p className="w-14">{formatDuration(duration)}</p>
        <audio ref={audioRef} src={audioSrc} />
      </div>
    </Card>
  );
}

export default AudioPlayer;
