'use client';
import { ScenarioAudioForm } from '@/app/components/call/scenario/scenario-audio-form';
import { useState } from 'react';

interface ScenarioIvrMenuSubaudioProps {
  form: any;
  fieldsIvrMenuItem: any;
  audio: any;
  setAudio: any;
}
export const ScenarioIvrMenuSubaudio = ({
  form,
  fieldsIvrMenuItem,
  audio,
  setAudio,
}: ScenarioIvrMenuSubaudioProps) => {
  console.log(audio);
  return (
    <ScenarioAudioForm audio={audio} setAudio={setAudio} viewHead={false} />
  );
};
