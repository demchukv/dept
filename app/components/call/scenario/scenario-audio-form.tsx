'use client';
import { Card } from '@/app/components/card/card';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/utils/icon';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select-form';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

import Player from '@/app/components/common/audio-editor/player-simple';
import FilePicker from '@/app/components/common/audio-editor/file';
import {
  isAudio,
  readBlobURL,
  download,
  rename,
} from '@/app/components/common/audio-editor/utils';
import {
  decodeAudioBuffer,
  sliceAudioBuffer,
} from '@/app/components/common/audio-editor/audio-helper';
import encode from '@/app/components/common/audio-editor/worker-client';
import { useClassicState } from '@/app/components/common/audio-editor/hooks';
import { SUpportedFormat } from '@/app/components/common/audio-editor/types';

// import { AudioEditor } from '@/app/components/common/audio-editor';

interface ScenarioAudioFormProps {
  //   groups: any;
  //   group: any;
  //   setGroup: any;
}
export const ScenarioAudioForm = (
  {
    //   groups,
    //   group,
    //   setGroup,
  }: ScenarioAudioFormProps,
) => {
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

  function formatDuration(durationSeconds: number) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.floor(durationSeconds % 60);
    const formattedSeconds = seconds.toString().padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
  }

  const displaySeconds = (seconds: number) => `${seconds.toFixed(2)}s`;

  const clearFileState = () => {
    setState({
      file: null,
      decoding: false,
      audioBuffer: null,
      paused: true,
      startTime: 0,
      endTime: Infinity,
      currentTime: 0,
      processing: false,
    });
  };

  return (
    <>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8 flex gap-4 items-center">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 border-none p-0"
          defaultValue="ivrmenu"
        >
          <AccordionItem value="ivrmenu" className="p-0 justify-between">
            <div className="w-full items-center flex flex-1 gap-2.5 justify-between">
              <Icon
                iconName="DndIcon"
                width={24}
                height={24}
                className="fill-main-dark flex-shrink-0 cursor-move"
              />
              <div className="flex-grow flex flex-col gap-4 sm:flex-row sm:justify-between">
                <p className="text-base font-semibold leading-normal flex gap-6 items-center justify-between whitespace-nowrap">
                  Аудіофайл
                  <span className="font-normal text-sm">
                    {/* {state.file ? state.file : 'No file'} */}
                  </span>
                  <Button
                    type="button"
                    variant="ghost"
                    className="sm:hidden"
                    onClick={clearFileState}
                  >
                    <Icon
                      iconName="Trash"
                      width={24}
                      height={24}
                      className="fill-warning"
                    />
                  </Button>
                </p>
                <div className="flex items-center gap-4">
                  <Button
                    type="button"
                    variant="ghost"
                    className="text-warning hidden sm:flex flex-shrink-0"
                    onClick={clearFileState}
                  >
                    Видалити
                  </Button>
                  {!state.file && (
                    <FilePicker onPick={handleFileChange}>
                      Додати аудіофайл
                    </FilePicker>
                  )}
                </div>
              </div>
              <AccordionTrigger
                className="p-0 ml-4 gap-1 sm:gap-9 flex-shrink-0 w-full"
                headClassName="w-auto"
              ></AccordionTrigger>
            </div>
            <AccordionContent className="border-t mt-8 pt-8">
              <div className="relative w-full p-10">
                {(state.audioBuffer || state.decoding) && (
                  <div>
                    {state.decoding ? (
                      <div className="relative text-xl flex items-center justify-center text-main-dark">
                        DECODING...
                      </div>
                    ) : (
                      <div className="relative">
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
                      </div>
                    )}

                    <div className="flex mt-2.5">
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
                              <button
                                type="button"
                                onClick={() => handleEncode('wav')}
                              >
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
                          Вибрано{' '}
                          <span className="seconds-range">
                            {displaySeconds(state.endTime - state.startTime)}
                          </span>{' '}
                          з{' '}
                          <span className="seconds-total">
                            {displaySeconds(state.audioBuffer?.duration ?? 0)}
                          </span>{' '}
                          (від{' '}
                          <span className="seconds-start">
                            {displaySeconds(state.startTime)}
                          </span>{' '}
                          до{' '}
                          <span className="seconds-end">
                            {displaySeconds(state.endTime)}
                          </span>
                          )
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </>
  );
};
