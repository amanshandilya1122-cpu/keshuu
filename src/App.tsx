import React, { useRef, useState } from 'react';
import { FallingPetals } from './components/FallingPetals';
import { MusicPlayer } from './components/MusicPlayer';
import { WelcomeHero } from './components/WelcomeHero';
import { AnniversaryCountdown } from './components/AnniversaryCountdown';
import { LoveMessage } from './components/LoveMessage';
import { SurpriseGiftSection } from './components/SurpriseGiftSection';
import { MaalkinSection } from './components/MaalkinSection';
import { FinalMessage } from './components/FinalMessage';
import { FlowerThemeBar } from './components/FlowerThemeBar';
import { getNextRefreshFlowerTheme, FLOWER_THEMES, FlowerTheme } from './config/flowerThemes';

export default function App() {
  const countdownRef = useRef<HTMLDivElement | null>(null);

  // Automatically rotates flower theme on every refresh!
  const [currentTheme, setCurrentTheme] = useState<FlowerTheme>(() => {
    return getNextRefreshFlowerTheme().theme;
  });

  const handleCycleTheme = () => {
    setCurrentTheme((prev) => {
      const idx = FLOWER_THEMES.findIndex((t) => t.id === prev.id);
      const nextIdx = (idx + 1) % FLOWER_THEMES.length;
      try {
        localStorage.setItem('anniversary_flower_theme_idx', nextIdx.toString());
      } catch {
        // Ignore storage errors
      }
      return FLOWER_THEMES[nextIdx];
    });
  };

  const handleScrollToContent = () => {
    if (countdownRef.current) {
      countdownRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen bg-gradient-to-b ${currentTheme.bgGradient} text-slate-800 relative selection:bg-rose-200 selection:text-rose-900 overflow-x-hidden font-sans transition-colors duration-700`}
    >
      {/* Background Falling Petals & Floating Sparkles with dynamic flower theme */}
      <FallingPetals flowerTheme={currentTheme} />

      {/* Floating Flower Theme Refresh Controller (Top Left) */}
      <FlowerThemeBar currentTheme={currentTheme} onRefreshTheme={handleCycleTheme} />

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
