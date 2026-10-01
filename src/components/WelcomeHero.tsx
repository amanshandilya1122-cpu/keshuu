import React from 'react';
import { Heart, Sparkles, ChevronDown } from 'lucide-react';
import { GIRLFRIEND_NAME, NICKNAME, LOVE_MESSAGES } from '../config/anniversaryConfig';

interface WelcomeHeroProps {
  onScrollToNext: () => void;
}

export const WelcomeHero: React.FC<WelcomeHeroProps> = ({ onScrollToNext }) => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-4 pt-16 pb-8 select-none">
      {/* Decorative floral aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-rose-200/40 rounded-full blur-3xl pointer-events-none -z-10 animate-soft-pulse" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-100/60 rounded-full blur-2xl pointer-events-none -z-10" />

      {/* Cute animated blossom / heart halo badge */}
      <div className="relative mb-6">
        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-200 via-pink-100 to-rose-300 p-1 shadow-lg shadow-rose-300/40 flex items-center justify-center animate-gentle-float">
          <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative overflow-hidden">
            {/* Gentle spinning petals background */}
            <div className="absolute inset-0 flex items-center justify-center opacity-60">
              <span className="text-2xl animate-spin [animation-duration:14s]">🌸</span>
            </div>
            {/* Center glowing heart */}
            <Heart className="w-8 h-8 text-rose-500 fill-rose-500 relative z-10 animate-soft-pulse" />
          </div>
        </div>

        {/* Little floating sparkles */}
        <span className="absolute -top-1 -right-1 text-base animate-shimmer">✨</span>
        <span className="absolute -bottom-1 -left-1 text-xs">💖</span>
      </div>

      {/* Main Dedicated Heading */}
      <div className="space-y-3 max-w-md mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100/90 text-rose-700 text-xs font-semibold shadow-sm mb-1">
          <Sparkles className="w-3 h-3 text-rose-500" />
          <span>My Sweetest {NICKNAME}</span>
          <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
        </div>

        <h1 className="font-dancing text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-rose-900 drop-shadow-sm">
          For My {GIRLFRIEND_NAME} <span className="inline-block animate-soft-pulse">❤️</span>
        </h1>

        <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 font-semibold flex items-center justify-center gap-1.5 pt-1">
          <span>{LOVE_MESSAGES.welcomeSubtitle}</span>
          <span className="text-xl">🌸</span>
        </p>

        <p className="text-sm text-slate-600 max-w-xs mx-auto leading-relaxed pt-2">
          A little personal digital love gift made just for you, celebrating our very first 365 days of love, laughter, and forever.
        </p>
      </div>

      {/* Gentle cute floral separator */}
      <div className="flex items-center gap-3 my-8 opacity-75">
        <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-rose-300"></span>
        <span className="text-rose-400 text-xs flex items-center gap-1.5 font-medium">
          <span>🌸</span>
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>🌸</span>
        </span>
        <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-rose-300"></span>
      </div>

      {/* Smooth scroll prompt button */}
      <button
        onClick={onScrollToNext}
        className="group mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-white text-rose-700 text-xs font-semibold shadow-md shadow-rose-200/60 border border-rose-200 transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Sparkles className="w-3.5 h-3.5 text-rose-400 group-hover:rotate-12 transition-transform" />
        <span>Open Our Love Story</span>
        <ChevronDown className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
      </button>
    </section>
  );
};
