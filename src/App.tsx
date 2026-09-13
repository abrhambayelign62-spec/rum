import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Sparkles, ArrowLeft, Volume2, Music } from 'lucide-react';
import { WEDDING_DATA } from './data/weddingData';
import CoverScreen from './components/CoverScreen';
import HeroSection from './components/HeroSection';
import MapSection from './components/MapSection';
import CalendarSection from './components/CalendarSection';
import TimelineSection from './components/TimelineSection';
import StorySection from './components/StorySection';
import CountdownSection from './components/CountdownSection';
import PassCardSection from './components/PassCardSection';
import PhotoShareSection from './components/PhotoShareSection';
import RsvpSection from './components/RsvpSection';
import AudioToggle from './components/AudioToggle';
import { soundManager } from './utils/audioPlayer';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    // Ensure the invitation opens directly at the top (front hero page)
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    // Automatically start soft ambient romantic sound on user interaction
    soundManager.play();
  };

  const handleReturnToCover = () => {
    setIsOpen(false);
    soundManager.pause();
  };

  const handleNavigateToMap = () => {
    const mapEl = document.getElementById('venue-map-section');
    if (mapEl) {
      mapEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen w-full bg-[#050505] text-white flex justify-center items-center overflow-x-hidden selection:bg-[#C9A66B] selection:text-black">
      {/* Desktop Ambient Glow & Atmospheric Background */}
      <div 
        className="fixed inset-0 pointer-events-none opacity-20 hidden md:block"
        style={{
          background: `
            radial-gradient(ellipse 60% 50% at 20% 30%, rgba(201, 166, 107, 0.15) 0%, transparent 70%),
            radial-gradient(ellipse 60% 50% at 80% 70%, rgba(201, 166, 107, 0.12) 0%, transparent 70%),
            #050505
          `
        }}
      />

      {/* Centered Mobile-First Device Wrapper (9:16 vertical ratio max-w-md, with desktop border & glow) */}
      <main className="relative w-full max-w-[440px] min-h-screen bg-[#0A0A0A] md:shadow-[0_0_60px_rgba(0,0,0,0.95)] md:border-x md:border-[#C9A66B]/20 flex flex-col">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="cover"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98, filter: 'blur(2px)' }}
              transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
              className="w-full h-full min-h-screen"
            >
              <CoverScreen
                wedding={WEDDING_DATA}
                onOpen={handleOpenInvitation}
              />
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full"
            >
              {/* Top Floating Mini Bar: Return to Cover / Quick Navigation */}
              <div className="sticky top-0 z-40 w-full backdrop-blur-md bg-black/75 border-b border-[#C9A66B]/25 px-4 py-2 flex items-center justify-between">
                <button
                  id="btn-back-to-cover"
                  onClick={handleReturnToCover}
                  className="flex items-center gap-1.5 text-xs text-[#F4E3B2] hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#C9A66B]" />
                  <span className="font-ethiopic-sans">የሽፋን ገጽ</span>
                </button>

                <div className="flex items-center gap-1">
                  <span className="font-cinzel text-xs text-[#C9A66B] font-bold tracking-widest">
                    {WEDDING_DATA.monogramInitials}
                  </span>
                  <span className="text-[10px] text-neutral-400 font-ethiopic-serif">
                    • {WEDDING_DATA.groomNameAm} &amp; {WEDDING_DATA.brideNameAm}
                  </span>
                </div>
              </div>

              {/* Scroll-Snap Container with All Requested Sections in Exact Order */}
              <div
                ref={containerRef}
                className="scroll-snap-container w-full h-screen no-scrollbar"
              >
                {/* 1. Hero / Greeting Screen */}
                <HeroSection
                  wedding={WEDDING_DATA}
                  onNavigateToMap={handleNavigateToMap}
                />

                {/* 2. Map Section */}
                <MapSection wedding={WEDDING_DATA} />

                {/* 3. Save-the-Date Calendar Section */}
                <CalendarSection wedding={WEDDING_DATA} />

                {/* 4. Ceremony Timeline Section */}
                <TimelineSection />

                {/* 5. Our Story / Video Section */}
                <StorySection />

                {/* 6. Countdown Section */}
                <CountdownSection wedding={WEDDING_DATA} />

                {/* 7. Access Pass Card (QR Code from video) */}
                <PassCardSection wedding={WEDDING_DATA} />

                {/* 8. Share Photos / Telegram Bot Section */}
                <PhotoShareSection wedding={WEDDING_DATA} />

                {/* 9. RSVP Section */}
                <RsvpSection wedding={WEDDING_DATA} />
              </div>

              {/* Persistent Bottom-Right Music Toggle */}
              <AudioToggle />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
