import React, { useState } from 'react';
import { Crown, ShieldAlert, RotateCcw, Heart, Flame, Sparkles } from 'lucide-react';
import { LOVE_MESSAGES, GIRLFRIEND_NAME, NICKNAME } from '../config/anniversaryConfig';

export const MaalkinSection: React.FC = () => {
  const [isBlockedState, setIsBlockedState] = useState(false);
  const [blockCount, setBlockCount] = useState(1);
  const [apologyAccepted, setApologyAccepted] = useState(false);

  const handleToggleBlock = (blocked: boolean) => {
    setIsBlockedState(blocked);
    if (blocked) {
      setBlockCount((prev) => prev + 1);
      setApologyAccepted(false);
    }
  };

  const handleBegApology = () => {
    setApologyAccepted(true);
    setIsBlockedState(false);
  };

  return (
    <section className="py-12 px-4 max-w-md sm:max-w-lg mx-auto text-center relative select-none" id="maalkin-section">
      {/* Decorative Golden & Pink Glow */}
      <div className="absolute -inset-1 bg-gradient-to-r from-amber-200 via-rose-200 to-pink-300 rounded-[2rem] blur-xl opacity-60 pointer-events-none" />

      {/* Main Royal Card */}
      <div className="relative bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F9] to-[#FFF1F4] border-2 border-rose-300/80 rounded-3xl p-6 sm:p-8 shadow-xl shadow-rose-900/10 overflow-hidden">
        {/* Floating Crown / Regal Emblem */}
        <div className="relative inline-flex items-center justify-center mb-3">
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-300 via-rose-300 to-pink-400 p-1 shadow-lg shadow-amber-400/30 flex items-center justify-center animate-gentle-float">
            <div className="w-full h-full rounded-full bg-white flex items-center justify-center relative">
              <Crown className="w-8 h-8 text-amber-500 fill-amber-400" />
            </div>
          </div>
          <span className="absolute -top-1 -right-2 text-lg animate-shimmer">✨</span>
          <span className="absolute -bottom-1 -left-2 text-sm">👑</span>
        </div>

        {/* Section Header */}
        <div className="space-y-1 mb-6">
          <span className="text-[11px] font-bold uppercase tracking-widest text-rose-500 bg-rose-100/80 px-3 py-1 rounded-full inline-block">
            {LOVE_MESSAGES.maalkinSection.badge}
          </span>
          <h2 className="font-dancing text-3xl sm:text-4xl font-extrabold text-rose-950 pt-1">
            {LOVE_MESSAGES.maalkinSection.title}
          </h2>
          <p className="font-handwriting text-xl sm:text-2xl text-amber-700 font-bold">
            {LOVE_MESSAGES.maalkinSection.achievement}
          </p>
          <p className="text-xs text-slate-500">
            Dedicated to {GIRLFRIEND_NAME} (aka {NICKNAME}), the undisputed ruler of my life!
          </p>
        </div>

        {/* Playful Interactive BLOCK & UNBLOCK Simulator */}
        <div className="bg-white/90 border border-rose-200 rounded-2xl p-4 sm:p-5 shadow-sm mb-6 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-rose-100">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              <span className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                Live Status Simulator
              </span>
            </div>
            <span className="text-[11px] font-mono font-semibold text-rose-500">
              Round #{blockCount}
            </span>
          </div>

          {/* Interactive State Display */}
          <div className="py-4 text-center">
            {isBlockedState ? (
              <div className="space-y-2 animate-in zoom-in-95 duration-200">
                <div className="inline-flex p-3 rounded-full bg-rose-100 text-rose-600 animate-bounce">
                  <span className="text-3xl">🚫😭</span>
                </div>
                <h4 className="font-dancing text-2xl font-bold text-rose-700">
                  OH NO! You Are Currently BLOCKED!
                </h4>
                <p className="text-xs text-rose-600 font-medium max-w-xs mx-auto">
                  &ldquo;Maalkin ne gusse me block maar diya! Ab WhatsApp, Insta sab sunsan ho gaya... meri kya galti thi maalkin? 🥺💔&rdquo;
                </p>
                <div className="pt-2">
                  <button
                    onClick={handleBegApology}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-md active:scale-95 transition-all cursor-pointer"
                  >
                    <span>Maaf kardo na please Maalkin 🥺🙏</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 animate-in zoom-in-95 duration-200">
                <div className="inline-flex p-3 rounded-full bg-emerald-100 text-emerald-600 animate-pulse">
                  <span className="text-3xl">🔄🥰</span>
                </div>
                <h4 className="font-dancing text-2xl font-bold text-emerald-700">
                  HURRAY! Currently UNBLOCKED!
                </h4>
                <p className="text-xs text-slate-600 max-w-xs mx-auto">
                  {apologyAccepted
                    ? '“Maalkin ne maaf kar diya! Jaan me jaan aa gayi! Love you Puchiiii! ❤️”'
                    : '“Safe zone for now! Shanti ka mahaul hai... jab tak agla gussa nahi aata! 😂”'}
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons to test Block / Unblock */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-rose-100">
            <button
              onClick={() => handleToggleBlock(true)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                isBlockedState
                  ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-300'
                  : 'bg-rose-50 hover:bg-rose-100 text-rose-700'
              }`}
            >
              <span>🚫 BLOCK Kardo</span>
            </button>
            <button
              onClick={() => handleToggleBlock(false)}
              className={`py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                !isBlockedState
                  ? 'bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-300'
                  : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-700'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>UNBLOCK Kardo ❤️</span>
            </button>
          </div>
        </div>

        {/* The Exact User Requested Dialogue Card */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white rounded-2xl p-5 shadow-lg shadow-rose-900/15 mb-6 text-center space-y-2 relative overflow-hidden">
          <div className="absolute -top-4 -right-4 text-white/10 text-6xl select-none font-serif">
            ❤️
          </div>
          
          <div className="inline-flex items-center gap-1 text-[11px] font-semibold text-rose-100 uppercase tracking-widest bg-white/20 px-2.5 py-0.5 rounded-full">
            <Flame className="w-3 h-3 text-amber-300" />
            <span>Special Request to Maalkin</span>
          </div>

          <h3 className="font-handwriting text-2xl sm:text-3xl font-bold leading-relaxed text-white drop-shadow-sm pt-1">
            &ldquo;{LOVE_MESSAGES.maalkinSection.gussaQuote}&rdquo;
          </h3>

          <p className="text-xs text-rose-100 leading-relaxed font-sans max-w-xs mx-auto">
            {LOVE_MESSAGES.maalkinSection.gussaSubtext}
          </p>
        </div>

        {/* Mature & Heartfelt Love Reflection Card */}
        <div className="bg-white/95 border border-rose-200/90 rounded-2xl p-5 sm:p-6 text-left shadow-sm space-y-3 relative overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-rose-100 text-rose-600">
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
            </span>
            <h4 className="font-dancing text-xl sm:text-2xl font-bold text-rose-900">
              {LOVE_MESSAGES.maalkinSection.matureTitle}
            </h4>
          </div>

          <div className="space-y-3 text-slate-700 text-xs sm:text-sm leading-relaxed font-sans pt-1">
            <p className="italic text-rose-950 font-medium">
              &ldquo;Jokes apart, relationship me gussa bhi wahi hota hai jahan sabse zyada haq, apna-pan aur bepanah pyaar hota hai.&rdquo;
            </p>
            <p>
              Pichle ek saal ne mujhe sikhaya hai ki saccha rishta sirf asaan dino me nahi, balki un lamhon me banta hai jab hum ek-doosre ke gusse ke peeche ki fikr ko samajhte hain aur bina kisi shart ke sath rehna choose karte hain.
            </p>
            <p className="text-rose-900 font-medium">
              Thank you for being my anchor, my peace, and my sweetest reality. I respect you, I cherish your presence, and I promise to stand beside you with all my maturity, patience, and love, {GIRLFRIEND_NAME}.
            </p>
          </div>

          <div className="pt-3 border-t border-rose-100 flex items-center justify-between text-[11px] text-rose-500 font-medium">
            <span>Growing together, through every emotion</span>
            <span className="flex items-center gap-1 text-rose-400">
              <span>Forever &amp; Always</span>
              <Sparkles className="w-3 h-3 text-rose-400" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
