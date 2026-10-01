import React, { useRef } from 'react';
import { FallingPetals } from './components/FallingPetals';
import { MusicPlayer } from './components/MusicPlayer';
import { WelcomeHero } from './components/WelcomeHero';
import { AnniversaryCountdown } from './components/AnniversaryCountdown';
import { LoveMessage } from './components/LoveMessage';
import { SurpriseGiftSection } from './components/SurpriseGiftSection';
import { MaalkinSection } from './components/MaalkinSection';
import { FinalMessage } from './components/FinalMessage';

export default function App() {
  const countdownRef = useRef<HTMLDivElement | null>(null);

  const handleScrollToContent = () => {
    if (countdownRef.current) {
      countdownRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F7] via-[#FFF9FA] to-[#FFF0F3] text-slate-800 relative selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden font-sans">
      {/* Background Falling Petals & Floating Sparkles */}
      <FallingPetals />

      {/* Discreet Music Player (Top Right Floating) */}
      <MusicPlayer />

      {/* Main Container - Mobile-first and centered with elegant presence */}
      <main className="relative z-20 max-w-2xl mx-auto px-4 sm:px-6">
        {/* 1. Welcome Screen */}
        <WelcomeHero onScrollToNext={handleScrollToContent} />

        {/* 2. Anniversary Countdown */}
        <div ref={countdownRef}>
          <AnniversaryCountdown />
        </div>

        {/* 3. Love Message */}
        <LoveMessage />

        {/* 4. Surprise Gift 🎁 + Teddy & Penguin 🧸🐧 */}
        <SurpriseGiftSection />

        {/* 5. Special Department: My Maalkinnn & Master of BLOCK/UNBLOCK 👑 */}
        <MaalkinSection />

        {/* 6. Final Message */}
        <FinalMessage />
      </main>
    </div>
  );
}
