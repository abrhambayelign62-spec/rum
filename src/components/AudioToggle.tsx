import { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { soundManager } from '../utils/audioPlayer';

interface AudioToggleProps {
  onStateChange?: (playing: boolean) => void;
}

export default function AudioToggle({ onStateChange }: AudioToggleProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    setIsPlaying(soundManager.getPlayingState());
  }, []);

  const handleToggle = () => {
    const newState = soundManager.toggle();
    setIsPlaying(newState);
    if (onStateChange) {
      onStateChange(newState);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-50 flex items-center gap-2">
      <button
        id="btn-audio-toggle"
        onClick={handleToggle}
        aria-label={isPlaying ? 'Mute background wedding music' : 'Play background wedding music'}
        className="group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-neutral-900/90 hover:bg-neutral-800 text-[#C9A66B] border border-[#C9A66B]/40 shadow-xl backdrop-blur-md transition-all duration-300 active:scale-95"
      >
        {isPlaying ? (
          <>
            {/* Animated sound wave bars */}
            <div className="flex items-center gap-0.5 h-3.5 w-3.5">
              <span className="w-0.5 h-full bg-[#F4E3B2] rounded-full animate-bounce [animation-delay:-0.3s]" />
              <span className="w-0.5 h-full bg-[#C9A66B] rounded-full animate-bounce [animation-delay:-0.15s]" />
              <span className="w-0.5 h-full bg-[#B8874E] rounded-full animate-bounce" />
            </div>
            <Volume2 className="w-4 h-4 text-[#F4E3B2]" />
            <span className="text-[11px] font-medium tracking-wide text-neutral-200 hidden sm:inline">
              ሙዚቃ
            </span>
          </>
        ) : (
          <>
            <VolumeX className="w-4 h-4 text-neutral-400 group-hover:text-[#C9A66B] transition-colors" />
            <span className="text-[11px] font-medium tracking-wide text-neutral-400 group-hover:text-neutral-200 hidden sm:inline">
              ሙዚቃ አጫውት
            </span>
          </>
        )}
      </button>
    </div>
  );
}
