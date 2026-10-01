import React, { useState, useEffect } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { ANNIVERSARY_DATE, GIRLFRIEND_NAME, NICKNAME } from '../config/anniversaryConfig';

export const AnniversaryCountdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isAnniversary: false,
  });

  // Preview toggle allows the boyfriend to test what Monal sees on 24 October!
  const [isPreviewCelebration, setIsPreviewCelebration] = useState(false);

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(ANNIVERSARY_DATE).getTime();
      const now = new Date().getTime();
      const difference = target - now;

      // Also check if current date is 24 October
      const nowDate = new Date();
      const isOctober24 = nowDate.getMonth() === 9 && nowDate.getDate() === 24;

      if (difference <= 0 || isOctober24) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isAnniversary: true,
        });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isAnniversary: false,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const showCelebration = timeLeft.isAnniversary || isPreviewCelebration;

  const padZero = (n: number) => n.toString().padStart(2, '0');

  return (
    <section className="py-10 px-4 max-w-md mx-auto text-center" id="countdown-section">
      <div className="bg-gradient-to-b from-white/90 to-rose-50/80 backdrop-blur-md border border-rose-200/80 rounded-3xl p-6 sm:p-7 shadow-lg shadow-rose-200/40 relative overflow-hidden">
        {/* Soft corner flower accents */}
        <div className="absolute top-2 left-3 text-sm opacity-50 select-none">🌸</div>
        <div className="absolute top-2 right-3 text-sm opacity-50 select-none">🌸</div>

        {showCelebration ? (
          /* Anniversary Arrived Celebratory Banner */
          <div className="py-4 space-y-4 animate-in zoom-in-95 fade-in duration-500">
            <div className="inline-flex items-center justify-center p-3 rounded-full bg-rose-100 text-rose-500 animate-bounce">
              <Heart className="w-8 h-8 fill-rose-500 text-rose-500" />
            </div>

            <div className="space-y-2">
              <h2 className="font-dancing text-3xl sm:text-4xl font-bold text-rose-700">
                Happy 1st Anniversary, {GIRLFRIEND_NAME}! ❤️
              </h2>
              <p className="font-handwriting text-xl text-rose-600 font-medium">
                Today is our special day! Forever celebrating my sweet {NICKNAME}. 🌸✨
              </p>
            </div>

            {/* Cute mini celebratory badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 text-white text-xs font-semibold shadow-md shadow-rose-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>24 October • Celebrating Us</span>
            </div>
          </div>
        ) : (
          /* Live Countdown to 24 October */
          <div className="space-y-5">
            <div className="space-y-1">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-rose-500">
                Counting down to 24 October
              </span>
              <h2 className="font-dancing text-2xl sm:text-3xl font-bold text-rose-900">
                Until Our 1st Anniversary 💕
              </h2>
            </div>

            {/* 4-Box Countdown Timer */}
            <div className="grid grid-cols-4 gap-2 sm:gap-3 max-w-xs mx-auto">
              {/* Days */}
              <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-rose-100 shadow-sm flex flex-col items-center">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-rose-700 tabular-nums">
                  {padZero(timeLeft.days)}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-rose-400 mt-0.5">
                  Days
                </span>
              </div>

              {/* Hours */}
              <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-rose-100 shadow-sm flex flex-col items-center">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-rose-700 tabular-nums">
                  {padZero(timeLeft.hours)}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-rose-400 mt-0.5">
                  Hours
                </span>
              </div>

              {/* Minutes */}
              <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-rose-100 shadow-sm flex flex-col items-center">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-rose-700 tabular-nums">
                  {padZero(timeLeft.minutes)}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-rose-400 mt-0.5">
                  Minutes
                </span>
              </div>

              {/* Seconds */}
              <div className="bg-white rounded-2xl p-2.5 sm:p-3 border border-rose-100 shadow-sm flex flex-col items-center">
                <span className="font-mono text-2xl sm:text-3xl font-bold text-rose-500 tabular-nums animate-pulse">
                  {padZero(timeLeft.seconds)}
                </span>
                <span className="text-[10px] font-medium uppercase tracking-wider text-rose-400 mt-0.5">
                  Seconds
                </span>
              </div>
            </div>

            <p className="text-xs text-rose-500/80 font-medium">
              Every second with you is a memory I treasure.
            </p>
          </div>
        )}

        {/* Discreet preview button for the boyfriend to preview the anniversary mode */}
        <div className="mt-4 pt-3 border-t border-rose-100/60 flex items-center justify-center">
          <button
            onClick={() => setIsPreviewCelebration(!isPreviewCelebration)}
            className="text-[11px] text-rose-400 hover:text-rose-600 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>{isPreviewCelebration ? '↺ Return to live countdown' : '✨ Preview 24 October greeting'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
