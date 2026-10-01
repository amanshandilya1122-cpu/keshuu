import React from 'react';
import { Heart } from 'lucide-react';
import { LOVE_MESSAGES, GIRLFRIEND_NAME, NICKNAME } from '../config/anniversaryConfig';

export const LoveMessage: React.FC = () => {
  return (
    <section className="py-12 px-4 max-w-md sm:max-w-lg mx-auto relative select-none" id="love-message-section">
      {/* Floating Ambient Hearts around the section */}
      <div className="absolute -top-3 left-4 text-rose-300 text-lg animate-gentle-float pointer-events-none opacity-80">
        💕
      </div>
      <div className="absolute top-10 right-3 text-rose-400 text-xl animate-soft-pulse pointer-events-none opacity-70">
        💖
      </div>
      <div className="absolute bottom-6 left-2 text-rose-400 text-base animate-bounce pointer-events-none opacity-70">
        🌸
      </div>
      <div className="absolute -bottom-2 right-6 text-rose-300 text-lg animate-gentle-float pointer-events-none opacity-80">
        ✨
      </div>

      {/* Romantic Love Letter Parchment */}
      <div className="relative bg-gradient-to-b from-[#FFFDFD] via-[#FFF9FA] to-[#FFF1F4] border-2 border-rose-200/90 rounded-3xl p-7 sm:p-9 shadow-xl shadow-rose-200/50 text-center overflow-hidden">
        {/* Decorative corner ribbons */}
        <div className="absolute -top-10 -right-10 w-20 h-20 bg-rose-100 rounded-full blur-sm -z-0 opacity-60 pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-pink-100 rounded-full blur-sm -z-0 opacity-60 pointer-events-none" />

        {/* Mini Wax Seal / Heart Stamp */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-700 text-white shadow-md shadow-rose-500/30 mb-5 relative z-10 animate-soft-pulse">
          <Heart className="w-6 h-6 fill-white text-white" />
        </div>

        {/* Section title */}
        <div className="mb-4">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-rose-400">
            A Letter From My Heart
          </span>
          <h2 className="font-dancing text-2xl sm:text-3xl font-bold text-rose-900 mt-1">
            To My Dearest {GIRLFRIEND_NAME} ({NICKNAME}) ❤️
          </h2>
        </div>

        {/* The Exact Romantic Love Message */}
        <div className="space-y-4 my-6 px-2">
          <p className="font-handwriting text-2xl sm:text-3xl text-rose-900 font-semibold leading-relaxed">
            &ldquo;365 days, countless memories, so many smiles...
          </p>
          <p className="font-handwriting text-2xl sm:text-3xl text-rose-600 font-bold leading-relaxed">
            and you&apos;re still my favorite person. ❤️
          </p>
          <p className="font-handwriting text-xl sm:text-2xl text-slate-700 font-medium leading-relaxed pt-1">
            Thank you for making this first year so beautiful, {GIRLFRIEND_NAME}.&rdquo;
          </p>
        </div>

        {/* Romantic Bottom Flourish */}
        <div className="flex items-center justify-center gap-2 pt-2 text-rose-400">
          <span className="w-8 h-[1px] bg-rose-300" />
          <span className="text-xs">Forever & Always Your One & Only</span>
          <span className="w-8 h-[1px] bg-rose-300" />
        </div>
      </div>
    </section>
  );
};
