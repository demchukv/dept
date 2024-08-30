'use client'; // Error boundaries must be Client Components

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="w-screen h-screen grid place-items-center">
      <h2 className="text-xl text-main-dark">Something went wrong!</h2>
      <button
        className="text-main-color px-5 py-3 rounded-[4px] border border-main-color hover:bg-main-color hover:text-white transition-colors"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  );
}
