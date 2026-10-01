import React, { useState } from 'react';
import { Sparkles, Heart, Gift } from 'lucide-react';
import { GIRLFRIEND_NAME, NICKNAME, LOVE_MESSAGES } from '../config/anniversaryConfig';
import teddyPenguinArt from '../assets/images/teddy_and_penguin_1790859912426.jpg';

export const SurpriseGiftSection: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [burstKey, setBurstKey] = useState(0);
  const [teddyCheer, setTeddyCheer] = useState(false);

  const handleOpenGift = () => {
    setIsOpen(true);
    setBurstKey((prev) => prev + 1);

    // Optional subtle celebratory chime via Web Audio
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.001, ctx.currentTime + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.06, ctx.currentTime + i * 0.1 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + i * 0.1 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime + i * 0.1);
        osc.stop(ctx.currentTime + i * 0.1 + 0.65);
      });
    } catch {
      // AudioContext not allowed or not supported
    }
  };

  const triggerTeddyCheer = () => {
    setTeddyCheer(true);
    setTimeout(() => setTeddyCheer(false), 1400);
  };

  return (
    <section className="py-14 px-4 max-w-md sm:max-w-lg mx-auto text-center" id="surprise-section">
      {/* Prompt Above Box */}
      <div className="space-y-2 mb-8">
        <span className="text-xs uppercase tracking-widest font-semibold text-rose-500">
          A Special Surprise
        </span>
        <h2 className="font-dancing text-3xl sm:text-4xl font-bold text-rose-900 leading-tight">
          {LOVE_MESSAGES.surprisePrompt}
        </h2>
        <p className="text-xs text-slate-500">
          {isOpen ? 'You unlocked the gift! 💖' : 'Tap the gift box to open your surprise ✨'}
        </p>
      </div>

      {/* Interactive Gift Box Container */}
      <div className="relative flex flex-col items-center justify-center my-4">
        {!isOpen ? (
          /* Closed Interactive Gift Box */
          <button
            onClick={handleOpenGift}
            className="group relative cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-rose-300 rounded-3xl p-4 transition-transform active:scale-95"
            aria-label="Open surprise gift box"
          >
            {/* Soft pulsing aura */}
            <div className="absolute inset-0 bg-rose-300/40 rounded-full blur-2xl group-hover:scale-110 transition-transform -z-10" />

            {/* Gift Box Graphic */}
            <div className="relative w-44 h-44 sm:w-48 sm:h-48 animate-wiggle-gift flex flex-col items-center justify-center">
              {/* Ribbon Bow on top */}
              <div className="relative z-20 -mb-3 flex items-center justify-center">
                <div className="w-10 h-8 rounded-full border-4 border-amber-300 bg-amber-400 shadow-md rotate-[-25deg] -mr-2" />
                <div className="w-5 h-5 rounded-full bg-amber-500 border-2 border-amber-300 shadow-md z-30" />
                <div className="w-10 h-8 rounded-full border-4 border-amber-300 bg-amber-400 shadow-md rotate-[25deg] -ml-2" />
              </div>

              {/* Lid */}
              <div className="w-40 sm:w-44 h-12 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-2xl shadow-lg border-b-4 border-rose-600/40 relative z-10 flex items-center justify-center">
                <div className="w-6 h-full bg-amber-300/90 shadow-inner" />
              </div>

              {/* Box Body */}
              <div className="w-36 sm:w-40 h-28 bg-gradient-to-br from-rose-500 via-pink-500 to-rose-600 rounded-b-3xl shadow-xl shadow-rose-900/20 relative overflow-hidden flex items-center justify-center -mt-1">
                {/* Vertical Ribbon */}
                <div className="w-6 h-full bg-amber-300/90 shadow-inner" />
                {/* Horizontal Ribbon */}
                <div className="absolute inset-x-0 h-6 bg-amber-300/90 shadow-inner" />
                {/* Little heart emblem */}
                <Heart className="absolute w-8 h-8 fill-white/80 text-white z-10 animate-soft-pulse" />
              </div>
            </div>

            {/* Instruction Tag */}
            <div className="mt-4 inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold shadow-sm group-hover:bg-rose-200 transition-colors">
              <Gift className="w-3.5 h-3.5" />
              <span>Tap to unwrap 🎀</span>
            </div>
          </button>
        ) : (
          /* Opened Gift Box with Particle Bursts & Revealed Messages */
          <div className="w-full space-y-8 animate-in zoom-in-95 fade-in duration-700">
            {/* Floating Burst particles */}
            <div key={burstKey} className="relative h-20 w-full flex items-center justify-center pointer-events-none">
              <span className="absolute text-2xl -top-6 -left-6 animate-bounce">💖</span>
              <span className="absolute text-2xl -top-10 left-10 animate-pulse">🌸</span>
              <span className="absolute text-3xl -top-8 right-6 animate-bounce">✨</span>
              <span className="absolute text-2xl -top-4 right-16 animate-pulse">🌹</span>
              <span className="absolute text-xl -top-12 left-2 animate-shimmer">⭐</span>

              {/* Opened Box Graphic */}
              <div className="relative">
                {/* Lifted Lid tilted off to the side */}
                <div className="absolute -top-12 -left-12 w-28 h-8 bg-gradient-to-r from-rose-400 to-pink-400 rounded-xl shadow-md rotate-[-22deg] flex items-center justify-center">
                  <div className="w-4 h-full bg-amber-300" />
                  <span className="text-xs ml-1">🎀</span>
                </div>
                {/* Opened Base with glowing aura */}
                <div className="w-28 h-16 bg-gradient-to-b from-pink-400 to-rose-500 rounded-b-2xl shadow-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-yellow-200/40 animate-pulse" />
                  <Heart className="w-8 h-8 fill-white text-white animate-soft-pulse relative z-10" />
                </div>
              </div>
            </div>

            {/* Hidden Love Message Revealed */}
            <div className="relative bg-gradient-to-b from-white via-rose-50/90 to-pink-50 border-2 border-rose-300 rounded-3xl p-6 sm:p-8 shadow-xl shadow-rose-300/40 text-center animate-in slide-in-from-bottom-6 duration-700">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500 text-white text-xs font-semibold shadow-md mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Your Anniversary Surprise</span>
              </div>

              <div className="space-y-4">
                <h3 className="font-dancing text-3xl sm:text-4xl font-bold text-rose-800">
                  Surprise, my love! ❤️
                </h3>

                <p className="font-handwriting text-2xl sm:text-3xl text-rose-950 font-semibold leading-relaxed">
                  One year with you has been one of the sweetest chapters of my life.
                </p>

                <p className="font-dancing text-2xl sm:text-3xl text-rose-600 font-bold">
                  Happy 1st Anniversary, {GIRLFRIEND_NAME}. 🌸
                </p>
              </div>

              {/* Decorative mini flowers */}
              <div className="mt-5 flex items-center justify-center gap-2 text-rose-400 text-xs">
                <span>🌸</span>
                <span>💕</span>
                <span>🌸</span>
                <span>💕</span>
                <span>🌸</span>
              </div>
            </div>

            {/* Section 6: Teddy + Penguin 🧸🐧 Section */}
            <div className="relative bg-white/95 border border-rose-200 rounded-3xl p-6 sm:p-8 shadow-lg shadow-rose-200/50 space-y-5 animate-in slide-in-from-bottom-8 duration-1000">
              {/* Titles */}
              <div className="space-y-1">
                <h3 className="font-dancing text-3xl sm:text-4xl font-bold text-rose-900 flex items-center justify-center gap-2">
                  <span>{LOVE_MESSAGES.teddyPenguinTitle}</span>
                </h3>
                <p className="font-handwriting text-xl text-rose-600 font-semibold">
                  {LOVE_MESSAGES.teddyPenguinSubtitle}
                </p>
              </div>

              {/* Cute Interactive Teddy & Penguin Display */}
              <div
                onClick={triggerTeddyCheer}
                className="relative cursor-pointer group max-w-xs mx-auto overflow-hidden rounded-2xl border-2 border-rose-200/90 shadow-md bg-rose-50/50 p-2 transition-transform hover:scale-[1.02]"
                title="Tap us for a hug! 🤗"
              >
                {/* Floating Heart Emojis over their heads */}
                <div className="absolute top-4 left-6 text-xl animate-gentle-float">🌸</div>
                <div className="absolute top-3 right-6 text-xl animate-soft-pulse">💕</div>

                {teddyCheer && (
                  <div className="absolute inset-0 z-30 flex items-center justify-center bg-rose-950/20 backdrop-blur-[1px] rounded-2xl animate-in zoom-in-75 duration-200">
                    <span className="text-4xl animate-bounce">🧸❤️🐧</span>
                  </div>
                )}

                {/* Teddy and Penguin Art */}
                <img
                  src={teddyPenguinArt}
                  alt="Cute Teddy Bear and Penguin Celebrating Us"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto rounded-xl object-cover animate-gentle-float"
                />

                {/* Cute caption underneath */}
                <div className="pt-2 pb-1 text-center">
                  <span className="text-[11px] font-medium text-rose-600 bg-rose-100/80 px-3 py-1 rounded-full inline-flex items-center gap-1">
                    <span>🤗 Tap us to hug!</span>
                  </span>
                </div>
              </div>

              {/* Sweet message description */}
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                Just like this little teddy and penguin, we belong together in our own cozy universe.
                Thank you for being my sweetest home, {GIRLFRIEND_NAME} (my {NICKNAME}).
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
