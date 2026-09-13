import { useState, useRef, type MouseEvent } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Heart, Sparkles } from 'lucide-react';
import { GALLERY_IMAGES } from '../data/weddingData';

export default function StorySection() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [activePhotoIdx, setActivePhotoIdx] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = (e: MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <section className="scroll-snap-section relative w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div className="z-20 pt-8 pb-3 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#C9A66B] uppercase font-semibold">
            Our Love Story
          </span>
          <h2 className="text-2xl sm:text-3xl font-ethiopic-serif font-bold text-white mt-0.5">
            የፍቅራችን ታሪክ
          </h2>
          <p className="text-xs font-ethiopic-sans text-[#F4E3B2]/80 mt-0.5 italic">
            ሁለት ልቦች በአንድ ፍቅር ሲጣመሩ...
          </p>
        </motion.div>
      </div>

      {/* Main Video & Visual Reel Container */}
      <div className="relative flex-1 w-full max-w-md mx-auto my-2 rounded-2xl overflow-hidden border border-[#C9A66B]/30 shadow-2xl bg-neutral-950 flex flex-col justify-between">
        {/* Video Player */}
        <div 
          onClick={togglePlay}
          className="relative w-full h-full min-h-[360px] flex items-center justify-center cursor-pointer group"
        >
          {/* Sample romantic clean cinematic wedding background video or loop */}
          <video
            ref={videoRef}
            src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
            poster={GALLERY_IMAGES[activePhotoIdx].url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          />

          {/* Top & Bottom Vignette Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none" />

          {/* Central Play/Pause Watermark Icon on Hover/Touch */}
          {!isPlaying && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute z-30 w-14 h-14 rounded-full bg-black/60 border border-[#C9A66B] flex items-center justify-center text-[#F4E3B2] shadow-xl backdrop-blur-sm"
            >
              <Play className="w-6 h-6 fill-[#F4E3B2] ml-1" />
            </motion.div>
          )}

          {/* Bottom Video Controls Overlay */}
          <div className="absolute bottom-3 inset-x-3 z-30 flex items-center justify-between px-3 py-2 rounded-xl bg-black/65 backdrop-blur-md border border-white/10 text-xs">
            <div className="flex items-center gap-2">
              <button
                id="btn-story-play-pause"
                onClick={(e) => {
                  e.stopPropagation();
                  togglePlay();
                }}
                className="text-[#F4E3B2] hover:text-white"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
              >
                {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
              </button>
              <span className="text-[11px] font-ethiopic-sans text-neutral-300">
                የቪዲዮ መታሰቢያ
              </span>
            </div>

            <button
              id="btn-story-mute-unmute"
              onClick={toggleMute}
              className="flex items-center gap-1.5 text-neutral-300 hover:text-white"
              aria-label={isMuted ? 'Unmute video' : 'Mute video'}
            >
              {isMuted ? (
                <>
                  <VolumeX className="w-4 h-4 text-neutral-400" />
                  <span className="text-[10px] text-neutral-400">ድምጽ ክፈት</span>
                </>
              ) : (
                <>
                  <Volume2 className="w-4 h-4 text-[#F4E3B2]" />
                  <span className="text-[10px] text-[#F4E3B2]">ድምጽ ክፍት</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Story Photo Reel Mini Tabs below video */}
        <div className="p-3 bg-neutral-900 border-t border-[#C9A66B]/20">
          <div className="flex items-center justify-between gap-2">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={i}
                onClick={() => setActivePhotoIdx(i)}
                className={`relative flex-1 rounded-lg overflow-hidden h-14 border transition-all ${
                  activePhotoIdx === i
                    ? 'border-[#C9A66B] ring-2 ring-[#C9A66B]/50'
                    : 'border-neutral-800 opacity-60 hover:opacity-100'
                }`}
              >
                <img src={img.url} alt={img.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="text-[9px] font-ethiopic-sans text-white font-medium drop-shadow px-1 text-center truncate">
                    {img.title}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="pb-4" />
    </section>
  );
}
