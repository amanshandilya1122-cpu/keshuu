import React, { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';
import { AUDIO_CONFIG } from '../config/anniversaryConfig';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [usingFallbackSynth, setUsingFallbackSynth] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const synthCtxRef = useRef<AudioContext | null>(null);
  const synthIntervalRef = useRef<number | null>(null);

  // Soft romantic melody notes (Acoustic chime/music box chords inspired by romantic themes)
  const startRomanticSynth = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      synthCtxRef.current = ctx;

      // Romantic gentle notes in Hz (Pentatonic romantic peaceful scale)
      // D, F#, G, A, B, D5, C#5, A4
      const notes = [
        293.66, 369.99, 440.0, 587.33, 440.0, 369.99,
        329.63, 392.00, 493.88, 587.33, 493.88, 392.00,
        293.66, 369.99, 440.0, 554.37, 440.0, 369.99,
        246.94, 293.66, 369.99, 440.0, 369.99, 293.66,
      ];
      let noteIndex = 0;

      const playNextNote = () => {
        if (!ctx || ctx.state === 'closed') return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm sine wave with subtle harmonics
        osc.type = 'sine';
        osc.frequency.setValueAtTime(notes[noteIndex % notes.length], ctx.currentTime);

        // Envelope: soft bell/music box chime
        const now = ctx.currentTime;
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.exponentialRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.25);

        noteIndex++;
      };

      playNextNote();
      synthIntervalRef.current = window.setInterval(playNextNote, 600);
      setUsingFallbackSynth(true);
    } catch {
      // AudioContext unavailable or blocked
    }
  };

  const stopRomanticSynth = () => {
    if (synthIntervalRef.current) {
      clearInterval(synthIntervalRef.current);
      synthIntervalRef.current = null;
    }
    if (synthCtxRef.current) {
      synthCtxRef.current.close().catch(() => {});
      synthCtxRef.current = null;
    }
    setUsingFallbackSynth(false);
  };

  const togglePlay = async () => {
    if (isPlaying) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      stopRomanticSynth();
      setIsPlaying(false);
    } else {
      if (audioRef.current) {
        try {
          audioRef.current.currentTime = 0;
          await audioRef.current.play();
          setIsPlaying(true);
          setUsingFallbackSynth(false);
        } catch {
          // If the custom mp3 file is not found yet, use the soothing romantic acoustic music box synth!
          startRomanticSynth();
          setIsPlaying(true);
        }
      } else {
        startRomanticSynth();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
    if (synthCtxRef.current) {
      if (!isMuted) {
        synthCtxRef.current.suspend();
      } else {
        synthCtxRef.current.resume();
      }
    }
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    return () => {
      stopRomanticSynth();
    };
  }, []);

  return (
    <div className="fixed top-4 right-4 z-40 flex items-center gap-2">
      {/* Hidden audio element pointing to the local MP3 asset */}
      <audio
        ref={audioRef}
        src={AUDIO_CONFIG.filePath}
        loop
        preload="auto"
        onError={() => {
          // If audio file doesn't exist, we fallback seamlessly without crashing
        }}
      />

      {/* Music Bar / Floating Pill */}
      <div className="bg-white/90 backdrop-blur-md border border-rose-200 shadow-md shadow-rose-950/5 rounded-full px-3 py-1.5 flex items-center gap-2.5 transition-all">
        <button
          onClick={togglePlay}
          className="flex items-center gap-1.5 text-xs font-medium text-rose-700 hover:text-rose-900 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 rounded-full px-1"
          aria-label={isPlaying ? 'Pause song' : 'Play our song'}
        >
          <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-rose-100 text-rose-600">
            {isPlaying ? (
              <Pause className="w-3 h-3 fill-rose-600" />
            ) : (
              <Play className="w-3 h-3 fill-rose-600 ml-0.5" />
            )}
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
              </span>
            )}
          </span>
          <span className="font-sans text-xs font-semibold whitespace-nowrap">
            {isPlaying ? 'Playing our song' : 'Play our song 🎵'}
          </span>
        </button>

        {isPlaying && (
          <button
            onClick={toggleMute}
            className="text-rose-400 hover:text-rose-600 transition-colors p-1 rounded-full"
            aria-label={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
          </button>
        )}

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-rose-300 hover:text-rose-500 transition-colors"
          title="Track info"
          aria-label="View track details"
        >
          <Music className="w-3 h-3" />
        </button>
      </div>

      {/* Expanded Track Info Card */}
      {isExpanded && (
        <div className="absolute top-12 right-0 bg-white/95 backdrop-blur-md border border-rose-200 rounded-2xl p-3 shadow-xl w-60 text-left animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-rose-500 shrink-0" />
            <span className="text-xs font-semibold text-rose-800 truncate">
              {AUDIO_CONFIG.title}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            {AUDIO_CONFIG.artist} • Soft Instrumental
          </p>
          <div className="mt-2 pt-2 border-t border-rose-100 flex items-center justify-between text-[10px] text-rose-600">
            <span>{usingFallbackSynth ? 'Romantic Melody Mode' : 'Audio Asset Active'}</span>
            <span className="text-rose-400">❤️</span>
          </div>
        </div>
      )}
    </div>
  );
};
