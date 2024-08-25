'use client';
import React, { useEffect, useState } from 'react';

export const Helper = () => {
  const [wsize, setWsize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWsize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  });
  return (
    <div className="w-full">
      <div className="w-full h-[4px] bg-yellow-500 xs:bg-orange-500 sm:bg-red-500 md:bg-blue-500 lg:bg-green-500 xl:bg-violet-500"></div>
      <div className="xs:hidden sm:hidden md:hidden lg:hidden xl:hidden">
        to xs:390
      </div>
      <div className="hidden xs:block sm:hidden md:hidden lg:hidden xl:hidden">
        from xs:390 to sm:834
      </div>
      <div className="hidden xs:hidden sm:block md:hidden lg:hidden xl:hidden">
        from sm:834 to md:1194
      </div>
      <div className="hidden xs:hidden sm:hidden md:block lg:hidden xl:hidden">
        from md:1194 to lg:1440
      </div>
      <div className="hidden xs:hidden sm:hidden md:hidden lg:block xl:hidden">
        from lg:1440 to xl:1920
      </div>
      <div className="hidden xs:hidden sm:hidden md:hidden lg:hidden xl:block">
        from xl:1920
      </div>
      <div>
        Current size: {wsize.width} x {wsize.height}
      </div>
    </div>
  );
};
