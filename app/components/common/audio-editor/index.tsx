'use client';
import React from 'react';
import Player from './player-simple';
import FilePicker from './file';
import { isAudio, readBlobURL, download, rename } from './utils';
import { decodeAudioBuffer, sliceAudioBuffer } from './audio-helper';
import encode from './worker-client';
import { useClassicState } from './hooks';
import { SUpportedFormat } from './types';

export const AudioEditor = () => {
  const [state, setState] = useClassicState<{
    file: File | null;
    decoding: boolean;
    audioBuffer: AudioBuffer | null;
    paused: boolean;
    startTime: number;
    endTime: number;
    currentTime: number;
    processing: boolean;
  }>({
    file: null,
    decoding: false,
    audioBuffer: null,
    paused: true,
    startTime: 0,
    endTime: Infinity,
    currentTime: 0,
    processing: false,
  });

  const handleFileChange = async (file: File) => {
    if (!isAudio(file)) {
      alert('Не вибрано файл для редагування');
      return;
    }

    setState({
      file,
      paused: true,
      decoding: true,
      audioBuffer: null,
    });

    const audioBuffer = await decodeAudioBuffer(file);

    setState({
      paused: false,
      decoding: false,
      audioBuffer,
      startTime: 0,
      currentTime: 0,
      endTime: audioBuffer.duration / 2,
    });
  };

  const handleStartTimeChange = (time: number) => {
    setState({
      startTime: time,
    });
  };

  const handleEndTimeChange = (time: number) => {
    setState({
      endTime: time,
    });
  };

  const handleCurrentTimeChange = (time: number) => {
    setState({
      currentTime: time,
    });
  };

  const handleEnd = () => {
    setState({
      currentTime: state.startTime,
      paused: false,
    });
  };

  const handlePlayPauseClick = () => {
    setState({
      paused: !state.paused,
    });
  };

  const handleReplayClick = () => {
    setState({
      currentTime: state.startTime,
      paused: false,
    });
  };

  const handleEncode = (type: SUpportedFormat) => {
    const { startTime, endTime, audioBuffer, file } = state;
    if (!audioBuffer || !file) return;

    const { length, duration } = audioBuffer;

    const audioSliced = sliceAudioBuffer(
      audioBuffer,
      Math.floor((length * startTime) / duration),
      Math.floor((length * endTime) / duration),
    );

    setState({
      processing: true,
    });

    encode(audioSliced, type)
      .then(readBlobURL)
      .then((url) => {
        download(url, rename(file.name, type));
      })
      .catch((e) => console.error(e))
      .then(() => {
        setState({
          processing: false,
        });
      });
  };

  const displaySeconds = (seconds: number) => `${seconds.toFixed(2)}s`;

  return (
    <div className="relative w-full p-10">
      {state.audioBuffer || state.decoding ? (
        <div>
          {state.decoding ? (
            <div className="relative h-5 text-xl flex items-center justify-center text-main-dark">
              DECODING...
            </div>
          ) : (
            <Player
              audioBuffer={state.audioBuffer!}
              blob={state.file!}
              paused={state.paused}
              startTime={state.startTime}
              endTime={state.endTime}
              currentTime={state.currentTime}
              onStartTimeChange={handleStartTimeChange}
              onEndTimeChange={handleEndTimeChange}
              onCurrentTimeChange={handleCurrentTimeChange}
              onEnd={handleEnd}
            />
          )}

          <div className="flex mt-2.5">
            <FilePicker
              className="bg-transparent border-0 outline-none inline-block text-base text-center text-[#999] p-2.5 m-2.5 cursor-pointer shadow-[0_0_15px_rgba(0,0,0,0.1)]"
              onPick={handleFileChange}
            >
              Завантажити файл
            </FilePicker>

            <button
              type="button"
              className="ctrl-item"
              title="Play/Pause"
              onClick={handlePlayPauseClick}
            >
              {state.paused ? 'Play' : 'Pause'}
            </button>

            <button
              type="button"
              className="ctrl-item"
              title="Replay"
              onClick={handleReplayClick}
            >
              Replay
            </button>

            <div className="dropdown list-wrap">
              <button type="button" className="ctrl-item">
                {state.processing ? 'Loading...' : 'Download'}
              </button>
              {!state.processing && (
                <ul className="list">
                  <li>
                    <button type="button" onClick={() => handleEncode('wav')}>
                      Wav
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => handleEncode('mp3')}
                      data-type="mp3"
                    >
                      MP3
                    </button>
                  </li>
                </ul>
              )}
            </div>

            {Number.isFinite(state.endTime) && (
              <span className="seconds">
                Select{' '}
                <span className="seconds-range">
                  {displaySeconds(state.endTime - state.startTime)}
                </span>{' '}
                of{' '}
                <span className="seconds-total">
                  {displaySeconds(state.audioBuffer?.duration ?? 0)}
                </span>{' '}
                (from{' '}
                <span className="seconds-start">
                  {displaySeconds(state.startTime)}
                </span>{' '}
                to{' '}
                <span className="seconds-end">
                  {displaySeconds(state.endTime)}
                </span>
                )
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="">
          <FilePicker onPick={handleFileChange}>
            <div className="file-main">Select music file</div>
          </FilePicker>
        </div>
      )}
    </div>
  );
};
