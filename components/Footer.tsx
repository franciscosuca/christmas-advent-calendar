import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-6 mt-auto text-center z-10 relative border-t border-gea-light/10 bg-gea-dark/50 backdrop-blur-sm">
      <p className="text-gea-silver/60 text-xs sm:text-sm">
        Created with <span className="text-gea-light">♥</span> by 👨🏽‍💻Francisco Susana & 🤖Gemini
      </p>
    </footer>
  );
};