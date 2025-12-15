
import React, { useState, useEffect } from 'react';
import { Gift, Lock } from 'lucide-react';
import { Snowfall } from './components/Snowfall';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DayModal } from './components/DayModal';
import { calendarContent } from './services/contentData';
import { DayContent } from './types';
import { USE_SIMULATED_DATE, MONTH_DECEMBER, SIMULATED_DATE } from './constants';

const App: React.FC = () => {
  const [openDay, setOpenDay] = useState<DayContent | null>(null);
  const [shakeDayId, setShakeDayId] = useState<number | null>(null);

  // Helper to get the "current" date based on config
  const getToday = () => {
    return USE_SIMULATED_DATE ? new Date(SIMULATED_DATE) : new Date();
  };

  const isDayUnlockable = (day: number) => {
    const today = getToday();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    // Logic:
    // 1. If it's NOT December:
    //    - If it's earlier in the year (Jan-Nov of 2024), everything is LOCKED.
    //    - If it's a future year (Jan 2025+), everything is UNLOCKED.
    if (currentMonth !== MONTH_DECEMBER) {
       // Assuming the calendar is for the current year. 
       // If today is Jan 2025, everything from Dec 2024 should be open.
       if (currentYear > new Date().getFullYear()) return true; 
       // If it is Nov 2024, everything is locked.
       return false;
    }

    // 2. If it IS December, unlock days up to today.
    return day <= currentDay;
  };

  // Initialize Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      try {
        const hash = window.location.hash;
        const match = hash.match(/#\/day\/(\d+)/);
        
        if (match && match[1]) {
          const dayNum = parseInt(match[1], 10);
          const content = calendarContent.find(c => c.day === dayNum);
          
          if (content) {
            // Verify if allowed to open
            if (isDayUnlockable(dayNum)) {
              setOpenDay(content);
            } else {
              // Day is locked, clear the hash safely
              window.location.hash = ''; 
              setOpenDay(null);
            }
          }
        } else {
          setOpenDay(null);
        }
      } catch (e) {
        console.error("Navigation error:", e);
      }
    };

    // Run once on mount
    handleHashChange();

    // Listen for changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDayClick = (day: number) => {
    const content = calendarContent.find(c => c.day === day);
    if (!content) return;

    if (isDayUnlockable(day)) {
      // Safe navigation
      window.location.hash = `/day/${day}`;
    } else {
      setShakeDayId(day);
      setTimeout(() => setShakeDayId(null), 500);
      
      const today = getToday();
      const monthName = today.toLocaleString('default', { month: 'long' });
      
      // Different alert depending on if it's strictly a future date in Dec or completely wrong month
      if (today.getMonth() === MONTH_DECEMBER) {
         alert(`Please wait until December ${day} to open this surprise! Today is ${monthName} ${today.getDate()}.`);
      } else {
         alert(`It's not time yet! The Advent Calendar starts in December. Today is ${monthName} ${today.getDate()}.`);
      }
    }
  };

  const closeModal = () => {
    setOpenDay(null);
    try {
      // Clear hash safely without using history API
      window.location.hash = '';
    } catch (e) {
      console.error("Error clearing hash", e);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center relative overflow-hidden bg-gradient-to-b from-gea-dark to-[#051120]">
      <Snowfall />

      {/* Corporate/Abstract Background Accents */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-gea-primary/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-gea-light/10 rounded-full blur-[80px] pointer-events-none" />

      <Header />

      <main className="w-full max-w-5xl px-4 z-10 mb-8 flex-grow flex items-center justify-center">
        {/* Compact Grid: 4 cols on mobile, 6 on tablet, 8 on desktop */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 w-full">
          {calendarContent.map((item) => {
            const isUnlocked = isDayUnlockable(item.day);
            const isShaking = shakeDayId === item.day;

            return (
              <button
                key={item.day}
                onClick={() => handleDayClick(item.day)}
                className={`
                  relative aspect-square rounded-lg shadow-lg transition-all duration-300 transform
                  group flex flex-col items-center justify-center overflow-hidden border
                  ${isUnlocked 
                    ? 'bg-gradient-to-br from-white to-gea-silver border-white/50 text-gea-primary hover:scale-105 hover:shadow-gea-light/50 cursor-pointer' 
                    : 'bg-gea-primary/40 border-gea-light/20 backdrop-blur-sm text-gea-light/50 cursor-not-allowed'
                  }
                  ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}
                `}
              >
                {/* Day Number */}
                <span className={`
                  font-body font-bold text-xl sm:text-2xl md:text-3xl
                  ${isUnlocked ? 'text-gea-primary' : 'text-white/30'}
                `}>
                  {item.day}
                </span>

                {/* Icons / Decor */}
                <div className="mt-1">
                  {isUnlocked ? (
                    <Gift size={18} className="text-gea-light group-hover:text-gea-primary transition-colors" />
                  ) : (
                    <Lock size={14} className="opacity-50" />
                  )}
                </div>

                {/* "Snow" topper for boxes */}
                <div className="absolute top-0 left-0 w-full h-1 bg-white/80 opacity-60"></div>
              </button>
            );
          })}
        </div>
      </main>

      <Footer />

      <DayModal 
        isOpen={!!openDay}
        content={openDay || calendarContent[0]} 
        onClose={closeModal}
      />

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default App;
