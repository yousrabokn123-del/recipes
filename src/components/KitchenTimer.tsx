import React, { useState, useEffect, useRef } from 'react';
import { Timer, Play, Pause, RotateCcw, Volume2, X } from 'lucide-react';

interface KitchenTimerProps {
  initialMinutes?: number;
  label?: string;
  onClose?: () => void;
}

export const KitchenTimer: React.FC<KitchenTimerProps> = ({
  initialMinutes = 15,
  label = 'Kitchen Timer',
  onClose,
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [customMins, setCustomMins] = useState(initialMinutes);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      playChime();
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft]);

  const playChime = () => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      audioContextRef.current = ctx;

      const playTone = (freq: number, delay: number, duration: number) => {
        setTimeout(() => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);
          gain.gain.setValueAtTime(0.3, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + duration);
        }, delay);
      };

      // Gentle cheerful 3-note kitchen chime
      playTone(523.25, 0, 0.4);    // C5
      playTone(659.25, 300, 0.4);  // E5
      playTone(783.99, 600, 0.8);  // G5
    } catch (e) {
      console.log('Audio chime error:', e);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setSecondsLeft(customMins * 60);
  };

  const handleSetPreset = (mins: number) => {
    setCustomMins(mins);
    setSecondsLeft(mins * 60);
    setIsRunning(false);
  };

  return (
    <div className="bg-amber-50/90 border-2 border-amber-300/80 rounded-2xl p-4 shadow-md max-w-sm w-full no-print">
      <div className="flex items-center justify-between pb-2 border-b border-amber-200">
        <div className="flex items-center space-x-2 text-amber-900 font-bold">
          <Timer className="w-5 h-5 text-amber-700" />
          <span className="text-base">{label}</span>
        </div>
        {onClose && (
          <button
            onClick={onClose}
            className="text-amber-800 hover:text-amber-950 p-1 rounded-full hover:bg-amber-200/50"
            aria-label="Close timer"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="my-4 text-center">
        <div className={`text-4xl font-mono font-bold tracking-wider ${secondsLeft === 0 ? 'text-red-600 animate-pulse' : 'text-stone-900'}`}>
          {formatTime(secondsLeft)}
        </div>
        {secondsLeft === 0 && (
          <p className="text-red-600 font-semibold text-sm mt-1 animate-bounce">
            Ding! Timer complete!
          </p>
        )}
      </div>

      {/* Preset Buttons for Quick Kitchen Tasks */}
      <div className="flex justify-center gap-1.5 mb-4">
        {[5, 10, 15, 30, 45, 60].map(mins => (
          <button
            key={mins}
            onClick={() => handleSetPreset(mins)}
            className={`px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors ${
              customMins === mins
                ? 'bg-amber-700 text-white border-amber-700'
                : 'bg-white text-stone-700 border-amber-300 hover:bg-amber-100'
            }`}
          >
            {mins}m
          </button>
        ))}
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setIsRunning(!isRunning)}
          className={`flex items-center space-x-1.5 px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm transition-all ${
            isRunning
              ? 'bg-amber-600 hover:bg-amber-700 text-white'
              : 'bg-green-700 hover:bg-green-800 text-white'
          }`}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Start</span>
            </>
          )}
        </button>

        <button
          onClick={handleReset}
          className="flex items-center space-x-1 px-4 py-2.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-700 font-semibold rounded-xl text-sm transition-all"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Reset</span>
        </button>

        <button
          onClick={playChime}
          title="Test chime sound"
          className="p-2.5 bg-white border border-stone-300 hover:bg-stone-100 text-stone-600 rounded-xl text-sm transition-all"
        >
          <Volume2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
