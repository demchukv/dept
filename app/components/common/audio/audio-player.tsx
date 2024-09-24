import React, { useState, useEffect, useRef } from 'react';
import { EventEmitter } from '@/app/components/common/audio/event-emitter';
import { pause, play, stop } from '@/app/components/common/audio/audio-events';
import { ProgressBar } from '@/app/components/common/audio/progress-bar';
import { AudioPlayerControls } from '@/app/components/common/audio/audio-player-control';

interface AudioPlayerProps {
  src: string;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const eventEmitter = new EventEmitter();
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isSeeking, setIsSeeking] = useState(false);

  const handleTimeUpdate = () => {
    if (!isSeeking) {
      setCurrentTime(audioRef?.current?.currentTime || 0);
    }
    setDuration(audioRef?.current?.duration || 0);
  };

  useEffect(() => {
    const audio = audioRef.current;

    eventEmitter.subscribe('play', () => play(audio as HTMLAudioElement));
    eventEmitter.subscribe('pause', () => pause(audio as HTMLAudioElement));
    eventEmitter.subscribe('stop', () => stop(audio as HTMLAudioElement));

    audio?.addEventListener('timeupdate', handleTimeUpdate);

    return () => {
      eventEmitter.unsubscribe('play', () => play(audio as HTMLAudioElement));
      eventEmitter.unsubscribe('pause', () => pause(audio as HTMLAudioElement));
      eventEmitter.unsubscribe('stop', () => stop(audio as HTMLAudioElement));
      audio?.removeEventListener('timeupdate', () => handleTimeUpdate);
    };
  }, [audioRef.current, isSeeking, duration, currentTime]);

  const onPlay = () => {
    eventEmitter.dispatch('play');
  };

  const onPause = () => {
    eventEmitter.dispatch('pause');
  };

  const onStop = () => {
    eventEmitter.dispatch('stop');
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current) {
      const bar = e.currentTarget;
      const clickPosition = e.clientX - bar.getBoundingClientRect().left;
      const percentage = clickPosition / bar.clientWidth;
      const seekTime = duration * percentage;

      setCurrentTime(seekTime);
      audioRef.current.currentTime = seekTime;
    }
  };

  return (
    <div className="w-full">
      <audio className="hidden" ref={audioRef} controls src={src} />
      <ProgressBar
        currentTime={currentTime}
        duration={duration}
        isSeeking={isSeeking}
        onSeek={handleSeek}
        setIsSeeking={setIsSeeking}
        onPlay={onPlay}
        onPause={onPause}
        onStop={onStop}
      />
      {/* <AudioPlayerControls onPlay={onPlay} onPause={onPause} onStop={onStop} /> */}
    </div>
  );
};
