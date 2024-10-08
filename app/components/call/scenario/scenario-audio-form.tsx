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

import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

import Player from '@/app/components/common/audio-editor/player-simple';
import FilePicker from '@/app/components/common/audio-editor/file';
import {
  isAudio,
  readBlobURL,
  rename,
  url2blob,
} from '@/app/components/common/audio-editor/utils';
import {
  decodeAudioBuffer,
  sliceAudioBuffer,
} from '@/app/components/common/audio-editor/audio-helper';
import encode from '@/app/components/common/audio-editor/worker-client';
import { useClassicState } from '@/app/components/common/audio-editor/hooks';
import { SUpportedFormat } from '@/app/components/common/audio-editor/types';
import { Checkbox } from '@/components/ui/checkbox';

interface ScenarioAudioFormProps {
  audio: any;
  setAudio: any;
  viewHead?: boolean;
}
export const ScenarioAudioForm = ({
  audio,
  setAudio,
  viewHead = true,
}: ScenarioAudioFormProps) => {
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
  const [repeat, setRepeat] = useState(false);
  const [repeatCount, setRepeatCount] = useState('');

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
      endTime: audioBuffer.duration, // /2
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
        setAudio({
          ...audio,
          file: {
            url,
            name: rename(file.name, type),
          },
        });
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

  const handleCutAudio = async () => {
    const { startTime, endTime, audioBuffer, file } = state;
    if (!audioBuffer || !file) return;
    setState({
      processing: true,
    });
    const { length, duration } = audioBuffer;

    const audioSliced = sliceAudioBuffer(
      audioBuffer,
      Math.floor((length * startTime) / duration),
      Math.floor((length * endTime) / duration),
    );
    encode(audioSliced, 'mp3')
      .then((url) => {
        const newFile = new File([url], 'sliced.mp3', {
          type: 'audio/mp3',
          lastModified: Date.now(),
        });

        setState({
          ...state,
          file: newFile,
          audioBuffer: audioSliced,
          startTime: 0,
          currentTime: 0,
          endTime: audioSliced.duration,
        });
      })
      .catch((e) => console.error(e))
      .then(() => {
        setState({
          processing: false,
        });
      });
  };
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

  const handleSaveAudioData = () => {
    setAudio({
      ...audio,
      file: state.file,
      repeat: repeat,
      repeatCount: repeatCount,
    });
  };

  useEffect(() => {
    if (audio?.file) {
      url2blob(audio.file).then((blob) => {
        if (blob) {
          const file = new File([blob], 'audio.mp3', { type: 'audio/mp3' });
          handleFileChange(file);
        }
      });
    }
  }, []);

  return (
    <>
      <Card className="shadow-[6px_6px_40px_0_rgba(89,125,137,0.1)] mb-4 p-4 md:p-8 flex gap-4 items-center">
        <Accordion
          type="single"
          collapsible
          className="w-full flex flex-col gap-4 border-none p-0"
          defaultValue="addaudio"
        >
          <AccordionItem value="addaudio" className="p-0 justify-between">
            <div className="w-full items-center flex flex-1 gap-2.5 justify-between">
              <Icon
                iconName="DndIcon"
                width={24}
                height={24}
                className="fill-main-dark flex-shrink-0 cursor-move"
              />
              <div className="flex-grow flex flex-col gap-4 sm:flex-row sm:justify-between">
                <div className="text-base font-semibold leading-normal flex gap-6 items-center justify-between whitespace-nowrap">
                  Аудіофайл
                  <div className="max-w-full font-normal text-sm truncate overflow-hidden">
                    {state.file ? state.file?.name : 'No file'}
                  </div>
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
                </div>
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
                    <FilePicker
                      onPick={handleFileChange}
                      className="text-xs text-white"
                    >
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
              <div className="relative w-full">
                {(state.audioBuffer || state.decoding) && (
                  <div>
                    {state.decoding ? (
                      <div className="relative text-base font-semibold flex items-center justify-center text-main-dark">
                        Декодування...
                      </div>
                    ) : (
                      <>
                        <div className="mb-6 font-medium flex items-center justify-between">
                          <div>
                            <span className="font-semibold">
                              Редагування аудіофайлу
                            </span>{' '}
                            {state.file?.name}
                          </div>
                          <div>
                            <FilePicker
                              onPick={handleFileChange}
                              className="text-main-color bg-white  text-sm px-6"
                            >
                              Замінити
                            </FilePicker>
                          </div>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <div className="flex items-center justify-start gap-4">
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={handlePlayPauseClick}
                              className="text-main-color"
                            >
                              <Icon
                                iconName={
                                  state.paused ? 'PlayCircle' : 'DeleteCircle'
                                }
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              onClick={handleReplayClick}
                              className="text-main-color"
                            >
                              <Icon
                                iconName="Refresh"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                            </Button>
                            <p className="font-mono">
                              {formatDuration(state.currentTime)}
                            </p>
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
                            <p className="font-mono">
                              {formatDuration(state.audioBuffer?.duration ?? 0)}
                            </p>
                          </div>
                          <Button
                            type="button"
                            variant="outline"
                            onClick={handleCutAudio}
                            className="text-main-color border-transparent"
                          >
                            {state.processing ? 'Кодування...' : 'Обрізати'}
                          </Button>
                        </div>
                      </>
                    )}

                    <div className="flex gap-2 items-center justify-between mt-5">
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          id="repeat"
                          checked={repeat}
                          onCheckedChange={(chk) => setRepeat(Boolean(chk))}
                        />
                        Повторювати аудіофайл
                        <Input
                          type="text"
                          name="repeatCount"
                          inputMode="numeric"
                          className="w-14"
                          value={repeatCount}
                          onChange={(e) => setRepeatCount(e.target.value)}
                          disabled={!repeat}
                        />
                        разів
                      </div>
                      <div>
                        <Button type="button" onClick={handleSaveAudioData}>
                          {state.processing ? 'Кодування...' : 'Зберегти'}
                        </Button>
                      </div>
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
