// 'use client';
// import React from 'react';
// import Lottie from 'lottie-react';
// import preloader from '@/public/animation/preloader.json';

// export default function Loading() {
//   return (
//     <div className="w-screen h-screen grid place-items-center">
//       <div className="">
//         <Lottie
//           animationData={preloader}
//           loop={true}
//           style={{ width: 150, height: 150 }}
//         />
//       </div>
//     </div>
//   );
// }

export default function Loading() {
  return (
    <div className="w-screen h-screen grid place-items-center">
      {/* <div className="loader"></div> */}
      <video autoPlay muted loop>
        <source src="/animation/preloader.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
