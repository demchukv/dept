'use client';
import { toast } from '@/components/ui/use-toast';
import { FormEvent, useRef } from 'react';

interface UploadAvatarProps {
  sign: string;
}
export const UploadAvatar = ({ sign = 'Upload a file' }: UploadAvatarProps) => {
  const fileInput = useRef<HTMLInputElement>(null);

  async function uploadFile(
    evt: FormEvent<HTMLFormElement> | FormEvent<HTMLInputElement>,
  ) {
    evt.preventDefault();

    const formData = new FormData();
    formData.append('file', fileInput?.current?.files?.[0]!);

    // const response = await fetch('/api/uploadImage', {
    //   method: 'POST',
    //   body: formData,
    // });
    // const result = await response.json();
    const sendData = formData.getAll('file');
    console.log(sendData);
    toast({
      title: 'Ви відправили наступні значення:',
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">
            {JSON.stringify(sendData, null, 2)}
          </code>
        </pre>
      ),
    });
  }

  return (
    <form onChange={(evt) => uploadFile(evt)}>
      <label className="cursor-pointer text-main-color text-sm font-medium leading-main-lh">
        {sign}
        <input type="file" name="file" ref={fileInput} className="sr-only" />
      </label>
      {/* <button type="submit" onClick={uploadFile}>
        Submit
      </button> */}
    </form>
  );
};
