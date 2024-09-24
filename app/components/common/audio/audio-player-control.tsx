import React from 'react';

interface AudioPlayerControlsProps {
  onPlay: () => void;
  onPause: () => void;
  onStop: () => void;
}

export const AudioPlayerControls: React.FC<AudioPlayerControlsProps> = ({
  onPlay,
  onPause,
  onStop,
}) => {
  return (
    <div className="bg-slate-600 text-slate-200 rounded-b-xl flex items-center">
      <div className="flex-auto flex items-center justify-evenly p-2">
        <button
          onClick={onPlay}
          type="button"
          className="hidden sm:block lg:hidden xl:block"
        >
          <img src="/play.svg" alt="play" width={48} />
        </button>
      </div>
      <button
        type="button"
        onClick={onPause}
        className="flex-auto flex items-center justify-evenly"
      >
        <img src="/pause.svg" alt="pause" width={48} />
      </button>
      <div className="flex-auto flex items-center justify-evenly">
        <button type="button" onClick={onStop}>
          <img src="/stop.svg" alt="stop" width={48} />
        </button>
      </div>
    </div>
  );
};
