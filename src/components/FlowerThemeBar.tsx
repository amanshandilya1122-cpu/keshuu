import React, { useState } from 'react';
import { RefreshCw, Sparkles } from 'lucide-react';
import { FlowerTheme, FLOWER_THEMES } from '../config/flowerThemes';

interface FlowerThemeBarProps {
  currentTheme: FlowerTheme;
  onRefreshTheme: () => void;
}

export const FlowerThemeBar: React.FC<FlowerThemeBarProps> = ({
  currentTheme,
  onRefreshTheme,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isRotating, setIsRotating] = useState(false);

  const handleClickRefresh = () => {
    setIsRotating(true);
    onRefreshTheme();

    // Find the next theme's toast message
    const currentIdx = FLOWER_THEMES.findIndex((t) => t.id === currentTheme.id);
    const nextTheme = FLOWER_THEMES[(currentIdx + 1) % FLOWER_THEMES.length];

    setToastMessage(nextTheme.toastMsg);
    setTimeout(() => {
      setIsRotating(false);
    }, 600);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  return (
    <>
      {/* Floating Refresh Flower Button */}
      <aside aria-label="Flower theme controls" className="fixed top-3 left-3 sm:top-4 sm:left-4 z-40 flex items-center gap-2">
        <button
          onClick={handleClickRefresh}
          className="group flex items-center gap-2 px-3 py-1.5 sm:px-3.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-md border border-rose-200/90 shadow-md shadow-rose-900/5 hover:bg-white hover:border-rose-300 hover:shadow-lg transition-all duration-300 active:scale-95 cursor-pointer text-left"
          title="Click to refresh flower colors anytime!"
          aria-label="Refresh flower colors"
        >
          {/* Flower Emoji with bounce */}
          <span className="text-base sm:text-lg transition-transform duration-300 group-hover:scale-125 select-none">
            {currentTheme.emoji}
          </span>

          <div className="flex flex-col">
            <span className="text-[11px] sm:text-xs font-bold text-slate-800 flex items-center gap-1 leading-tight">
              <span>{currentTheme.name}</span>
            </span>
            <span className="text-[9px] text-slate-400 font-medium hidden sm:inline leading-none">
              Refresh on reload • Tap to switch
            </span>
          </div>

          {/* Refresh Icon */}
          <span className="p-1 rounded-full bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white transition-colors ml-0.5">
            <RefreshCw
              className={`w-3 h-3 transition-transform duration-500 ${
                isRotating ? 'rotate-180' : 'group-hover:rotate-45'
              }`}
            />
          </span>
        </button>
      </aside>

      {/* Floating Toast notification on refresh */}
      {toastMessage && (
        <div className="fixed top-16 sm:top-20 left-1/2 -translate-x-1/2 z-50 animate-bounce duration-300">
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/95 backdrop-blur-md border-2 border-rose-300 shadow-xl shadow-rose-900/10 text-xs sm:text-sm font-bold text-rose-900">
            <Sparkles className="w-4 h-4 text-rose-500 animate-spin" />
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};
