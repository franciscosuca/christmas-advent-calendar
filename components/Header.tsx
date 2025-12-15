import React, { useState } from 'react';

export const Header: React.FC = () => {
  const [logoError, setLogoError] = useState(false);

  return (
    <header className="w-full pt-8 pb-4 flex flex-col items-center justify-center z-10 relative">
      <div className="px-8 py-4 rounded shadow-lg mb-6 transform hover:scale-105 transition-transform duration-300">
        {!logoError ? (
          <img 
            src="/assets/gea-logo.png" 
            alt="GEA Digital" 
            className="h-10 md:h-12 w-auto object-contain"
            onError={() => setLogoError(true)}
          />
        ) : (
          <span className="text-gea-primary font-bold text-xl tracking-wider">GEA DIGITAL</span>
        )}
      </div>
      
      <h1 className="text-4xl md:text-5xl font-christmas text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] text-center">
        Advent Calendar
      </h1>
      <p className="text-gea-silver mt-2 font-body text-base md:text-lg opacity-80 max-w-lg text-center leading-relaxed px-4">
        Engineering for a better world. Celebrating the season with 24 days of digital innovation.
      </p>
    </header>
  );
};