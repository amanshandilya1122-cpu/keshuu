import React, { useState, useRef, useEffect } from 'react';
import { Heart, Sparkles, Play, Pause } from 'lucide-react';
import { LOVE_MESSAGES, GIRLFRIEND_NAME, NICKNAME } from '../config/anniversaryConfig';
import { HUMAN_KISS_AUDIO_BASE64 } from '../config/kissAudioData';

interface KissParticle {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

export const FinalMessage: React.FC = () => {
  const [loveCount, setLoveCount] = useState(365);
  const [clicked, setClicked] = useState(false);
  const [isPlayingKiss, setIsPlayingKiss] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentKiss, setCurrentKiss] = useState(1);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [kissParticles, setKissParticles] = useState<KissParticle[]>([]);

  const kissAudioRef = useRef<HTMLAudioElement | null>(null);
  const progressTimerRef = useRef<number | null>(null);

  const spawnKissParticles = (count = 7) => {
    const emojis = ['💋', '💖', '🌸', '✨', '😘', '💕', '🥰'];
    const newParticles: KissParticle[] = [];
    for (let i = 0; i < count; i++) {
      newParticles.push({
        id: Date.now() + Math.random() * 1000,
        x: Math.random() * 80 + 10,
        y: Math.random() * 45 + 15,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      });
    }
    setKissParticles((prev) => [...prev.slice(-15), ...newParticles]);
    setTimeout(() => {
      setKissParticles((prev) => prev.slice(newParticles.length));
    }, 2000);
  };

  const handlePlayKissVoiceNote = async () => {
    if (isPlayingKiss) {
      if (kissAudioRef.current && !kissAudioRef.current.paused) {
        kissAudioRef.current.pause();
      }
      setIsPlayingKiss(false);
      setProgress(0);
      setCurrentKiss(1);
      setCurrentTimeSec(0);
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
      return;
    }

    setIsPlayingKiss(true);
    setProgress(0);
    setCurrentKiss(1);
    setCurrentTimeSec(0);
    spawnKissParticles(8);

    if (kissAudioRef.current) {
      try {
        kissAudioRef.current.currentTime = 0;
        await kissAudioRef.current.play();
      } catch (err) {
        console.warn('Audio play error:', err);
      }
    }

    const totalDuration = 7.8; // 7.8 seconds for 11 kisses
    const intervalTime = 80;
    let elapsed = 0;

    progressTimerRef.current = window.setInterval(() => {
      elapsed += intervalTime / 1000;
      setCurrentTimeSec(Math.min(totalDuration, elapsed));

      // Calculate which of the 11 kisses is currently playing (approx every 0.7s)
      const kissNum = Math.min(11, Math.max(1, Math.floor(elapsed / 0.7) + 1));
      setCurrentKiss((prev) => {
        if (prev !== kissNum) {
          spawnKissParticles(3);
        }
        return kissNum;
      });

      const currentProgress = (elapsed / totalDuration) * 100;
      setProgress(Math.min(100, currentProgress));

      if (elapsed >= totalDuration) {
        if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        setIsPlayingKiss(false);
        setProgress(0);
        setCurrentKiss(11);
        setCurrentTimeSec(0);
      }
    }, intervalTime);
  };

  const sendMoreLove = () => {
    setLoveCount((prev) => prev + 1);
    setClicked(true);
    setTimeout(() => setClicked(false), 300);
  };

  useEffect(() => {
    return () => {
      if (progressTimerRef.current) clearInterval(progressTimerRef.current);
    };
  }, []);

  return (
    <footer className="pt-6 pb-20 px-4 max-w-md sm:max-w-lg mx-auto text-center relative select-none">
      {/* 11 Real Human Kisses Audio Track */}
      <audio
        ref={kissAudioRef}
        src={HUMAN_KISS_AUDIO_BASE64}
        preload="auto"
        onEnded={() => {
          setIsPlayingKiss(false);
          setProgress(0);
          setCurrentKiss(1);
          setCurrentTimeSec(0);
          if (progressTimerRef.current) clearInterval(progressTimerRef.current);
        }}
        onError={() => {
          setIsPlayingKiss(false);
        }}
      />

      {/* Floating Burst Kiss Particles */}
      {kissParticles.map((p) => (
        <span
          key={p.id}
          className="fixed text-3xl pointer-events-none z-50 animate-bounce duration-1000 transition-all"
          style={{
            left: `${p.x}vw`,
            bottom: `${p.y + 10}vh`,
            opacity: 0.95,
          }}
        >
          {p.emoji}
        </span>
      ))}

      {/* Decorative divider */}
      <div className="flex items-center justify-center gap-3 mb-8 opacity-60">
        <span className="h-[1px] w-16 bg-gradient-to-r from-transparent to-rose-300" />
        <span className="text-rose-400 text-sm">🌸 🐧 💋 🌸</span>
        <span className="h-[1px] w-16 bg-gradient-to-l from-transparent to-rose-300" />
      </div>

      {/* "puchuuu for my puchiii" - 11 Kisses Special Card 💋 */}
      <div className="bg-gradient-to-r from-white via-rose-50 to-pink-50 border-2 border-rose-300/90 rounded-3xl p-5 sm:p-6 shadow-xl shadow-rose-900/10 mb-8 relative overflow-hidden text-left">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-full bg-rose-500 text-white shadow-sm text-sm">
              💋
            </span>
            <div>
              <h4 className="font-dancing text-2xl sm:text-3xl font-extrabold text-rose-900 tracking-wide">
                puchuuu for my puchiii 💋
              </h4>
              <p className="text-xs text-rose-600 font-medium">
                11 sweet kisses for my {NICKNAME} ({GIRLFRIEND_NAME}) ❤️
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-xs font-mono font-bold text-rose-600 bg-rose-100/90 px-2 py-0.5 rounded-full">
              {isPlayingKiss ? `0:0${Math.floor(currentTimeSec)} / 0:08` : '11 Kisses 💋'}
            </span>
          </div>
        </div>

        {/* WhatsApp-Style Voice Note Player Bar */}
        <div className="bg-white rounded-2xl p-3 border border-rose-200 shadow-sm flex items-center gap-3">
          {/* Play/Pause Button */}
          <button
            onClick={handlePlayKissVoiceNote}
            className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 active:scale-95 text-white flex items-center justify-center shadow-md shadow-rose-400/40 transition-all shrink-0 cursor-pointer"
            aria-label={isPlayingKiss ? 'Pause kisses' : 'Play 11 kisses'}
          >
            {isPlayingKiss ? (
              <Pause className="w-5 h-5 fill-white" />
            ) : (
              <Play className="w-5 h-5 fill-white ml-0.5" />
            )}
          </button>

          {/* Soundwave Visualizer Bars with 11 Pulse Points */}
          <div className="flex-1 flex items-center gap-1 h-8 px-1">
            {[35, 75, 55, 95, 65, 100, 75, 90, 50, 95, 70, 85, 55, 80, 45].map((h, i) => {
              const active = (i / 15) * 100 <= progress;
              return (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-150 ${
                    active ? 'bg-rose-600' : 'bg-rose-200'
                  } ${isPlayingKiss ? 'animate-pulse' : ''}`}
                  style={{
                    height: isPlayingKiss ? `${Math.max(25, (h * (0.6 + Math.random() * 0.6)))}%` : `${h * 0.7}%`,
                  }}
                />
              );
            })}
          </div>

          {/* Kiss Counter Tag */}
          <div className="text-center px-1">
            <span className="text-xl sm:text-2xl animate-soft-pulse select-none block">
              💋
            </span>
            <span className="text-[10px] font-bold text-rose-500 font-mono">
              {isPlayingKiss ? `${currentKiss}/11` : '11x'}
            </span>
          </div>
        </div>

        {/* Live caption showing current kiss */}
        <div className="mt-2.5 flex items-center justify-between text-xs text-rose-700 font-medium">
          <span>
            {isPlayingKiss
              ? `Kiss #${currentKiss} of 11 for my Puchiii... Mwahhh! 💋`
              : 'Tap play to receive all 11 sweet kisses! 🎧💋'}
          </span>
          <span className="text-rose-500 font-bold">
            {isPlayingKiss ? '😘💕' : '❤️'}
          </span>
        </div>
      </div>

      {/* Prominent Love Declaration: "Loveeee uhhhhhh sooo much always" */}
      <div className="my-6 space-y-2">
        <h2 className="font-dancing text-3xl sm:text-4xl md:text-5xl font-extrabold text-rose-600 drop-shadow-sm leading-tight animate-soft-pulse">
          {LOVE_MESSAGES.loveUhSoMuch}
        </h2>
        <p className="font-handwriting text-xl sm:text-2xl text-rose-800 font-semibold">
          You will always be my happiest place, {GIRLFRIEND_NAME}.
        </p>
      </div>

      {/* Main Closing Section */}
      <div className="space-y-4 pt-2">
        <h3 className="font-dancing text-2xl sm:text-3xl font-bold text-rose-950 leading-snug">
          {LOVE_MESSAGES.finalHeading}
        </h3>

        <p className="font-handwriting text-xl sm:text-2xl text-rose-700 font-semibold">
          {LOVE_MESSAGES.finalSubheading}
        </p>

        {/* Interactive "Send A Heart" Button */}
        <div className="pt-3">
          <button
            onClick={sendMoreLove}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500 hover:bg-rose-600 text-white text-xs font-semibold shadow-lg shadow-rose-500/25 transition-all cursor-pointer ${
              clicked ? 'scale-110' : 'hover:scale-105 active:scale-95'
            }`}
          >
            <Heart className="w-4 h-4 fill-white" />
            <span>Tap to send love ({loveCount} days)</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Subtle footer note */}
        <p className="text-[11px] text-rose-400 pt-6">
          Forever & Always • 24 October • Monal & Puchiiii ❤️
        </p>
      </div>
    </footer>
  );
};
