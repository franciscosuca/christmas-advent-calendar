import React, { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  opacity: number;
  size: number;
}

export const Snowfall: React.FC = () => {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    // Generate static snowflakes on mount to avoid constant re-renders causing performance issues
    const flakes: Snowflake[] = Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      animationDuration: Math.random() * 3 + 2, // 2-5 seconds
      opacity: Math.random(),
      size: Math.random() * 5 + 2, // 2-7px
    }));
    setSnowflakes(flakes);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden" aria-hidden="true">
      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute top-[-10px] bg-white rounded-full animate-[fall_linear_infinite]"
          style={{
            left: `${flake.left}%`,
            width: `${flake.size}px`,
            height: `${flake.size}px`,
            opacity: flake.opacity,
            animationDuration: `${flake.animationDuration}s`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      <style>{`
        @keyframes fall {
          0% {
            transform: translateY(-10vh) translateX(-10px);
          }
          100% {
            transform: translateY(110vh) translateX(10px);
          }
        }
      `}</style>
    </div>
  );
};
