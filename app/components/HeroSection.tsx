'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import DonateButton from './DonateButton';

const HeroSection = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 768); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="relative w-full shadow-lg z-20"
      style={{ boxShadow: '0 6px 15px rgba(0,0,0,0.2)' }}
    >
      <div className="flex flex-col md:flex-row w-full md:min-h-[75vh]">
        <div
          className="flex-shrink-0 flex-grow-0 basis-full md:basis-[30%] bg-[#024da1] flex justify-center items-center py-10 md:py-0"
          style={isSmallScreen ? {} : { clipPath: 'circle(90.7% at 1% 27%)' }}
        >
          <Image
            src="/images/logo.jpg"
            alt="YEF Logo"
            width={300}
            height={300}
            className="max-w-full h-auto p-2.5 rounded-full"
          />
        </div>

        <div className="flex-grow flex-shrink basis-full md:basis-[70%] bg-white flex flex-col justify-center items-center px-6 md:px-12 py-12 md:py-0 text-center">
          <div className="mt-4 md:mt-5">
            <h1 className="font-bold text-[#024da1] mb-2 text-2xl sm:text-3xl md:text-[2.5rem]">
              YOUTH EVOLUTION FOUNDATION
            </h1>
            <h2 className="font-bold text-gray-800 mb-3 max-w-xl text-md sm:text-lg">
              YOUTH EMPOWERMENT, SUSTAINABILITY, EDUCATION, AND UNITY FOR GLOBAL CHANGE.
            </h2>
            {/* Replaced Button with DonateButton */}
            <DonateButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
