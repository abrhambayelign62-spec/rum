import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronUp } from 'lucide-react';
import { WeddingDetails } from '../types';
import { soundManager } from '../utils/audioPlayer';

interface CoverScreenProps {
  wedding: WeddingDetails;
  onOpen: () => void;
}

export default function CoverScreen({ wedding, onOpen }: CoverScreenProps) {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);

    // Play subtle harp glissando unseal chime
    soundManager.playUnsealGlissando();

    // Smooth, calibrated transition time matching the flap opening and card rise
    window.setTimeout(() => {
      onOpen();
    }, 1450);
  };

  return (
    <div
      id="cover-screen"
      onClick={handleSealClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleSealClick();
      }}
      className="relative w-full h-screen min-h-[640px] flex flex-col justify-between items-center bg-[#070707] text-white overflow-hidden cursor-pointer select-none [perspective:1400px]"
    >
      {/* Background Ambience & Soft Top Spotlight */}
      <div
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          background: `
            radial-gradient(ellipse 75% 55% at 50% 0%, rgba(201, 166, 107, 0.14) 0%, transparent 70%),
            radial-gradient(circle 380px at 50% 50%, rgba(244, 227, 178, 0.05) 0%, transparent 65%),
            radial-gradient(ellipse 80% 60% at 50% 100%, rgba(15, 15, 15, 0.95) 0%, #060606 100%)
          `,
        }}
      />

      {/* Floating gold dust specks */}
      <div className="absolute inset-0 pointer-events-none opacity-30 z-0">
        <div className="absolute top-1/5 left-1/6 w-1 h-1 bg-[#F4E3B2] rounded-full animate-ping [animation-duration:3.6s]" />
        <div className="absolute top-1/3 right-1/5 w-1 h-1 bg-[#C9A66B] rounded-full animate-pulse [animation-duration:4.5s]" />
        <div className="absolute bottom-1/4 left-1/4 w-1 h-1 bg-[#F4E3B2] rounded-full animate-ping [animation-duration:5.5s]" />
        <div className="absolute bottom-1/3 right-1/4 w-1 h-1 bg-[#F4E3B2] rounded-full animate-pulse [animation-duration:4s]" />
      </div>

      {/* ========================================================================= */}
      {/* 1. TOP HEADER: Welcome Label & Sacred Amharic Title                      */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: isOpening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="z-20 flex flex-col items-center gap-1 pt-6 px-4"
      >
        <div className="flex items-center gap-2">
          <span className="h-[1px] w-8 bg-gradient-to-r from-transparent to-[#C9A66B]" />
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.25em] text-[#F4E3B2] font-medium font-cinzel">
            The Royal Invitation
          </span>
          <span className="h-[1px] w-8 bg-gradient-to-l from-transparent to-[#C9A66B]" />
        </div>
        <span className="text-xs font-ethiopic-serif text-[#C9A66B]/90 tracking-wider">
          የክብር ሰርግ ግብዣ
        </span>
      </motion.div>

      {/* ========================================================================= */}
      {/* 2. THE LUXURY ENVELOPE (Fluid 3D unfolding and card rise)                 */}
      {/* ========================================================================= */}
      <div className="relative w-full max-w-[370px] sm:max-w-[400px] h-[52vh] min-h-[350px] max-h-[460px] my-auto flex items-center justify-center z-10 [transform-style:preserve-3d]">
        
        {/* Envelope Outer Frame & Subtle Ambient Shadow */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#121215] via-[#0c0c0e] to-[#080808] border border-[#C9A66B]/35 shadow-[0_25px_60px_rgba(0,0,0,0.92),0_0_30px_rgba(201,166,107,0.12)] overflow-hidden">
          
          {/* Inner Golden Silk Lining */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#3D2C15] via-[#241A0B] to-[#120D05] opacity-95">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(244,227,178,0.22)_0%,transparent_65%)]" />
          </div>

          {/* Invitation Card Peeking & Gliding Upward */}
          <motion.div
            initial={{ y: 22, opacity: 0.55 }}
            animate={
              isOpening
                ? {
                    y: -65,
                    opacity: 1,
                    scale: 1.02,
                    boxShadow: '0 25px 40px -10px rgba(0,0,0,0.85)',
                  }
                : { y: 22, opacity: 0.55, scale: 1 }
            }
            transition={{
              duration: 1.4,
              ease: [0.22, 1, 0.36, 1], // Natural, silky smooth bezier curve
              delay: 0.15,
            }}
            className="absolute inset-x-4 top-4 h-[92%] rounded-xl bg-gradient-to-b from-[#FAF8F5] via-[#EFECE6] to-[#E3DCD1] p-5 shadow-2xl flex flex-col items-center text-neutral-900 border border-[#C9A66B]/45"
          >
            <div className="w-full h-full border border-[#C9A66B]/40 rounded-lg p-3 flex flex-col items-center justify-between text-center">
              <span className="font-cinzel text-[10px] tracking-[0.25em] text-[#9C753B] uppercase">
                Wedding Celebration
              </span>
              <div className="my-auto flex flex-col items-center">
                <span className="font-script text-2xl sm:text-3xl text-[#5F431A] font-bold">
                  {wedding.groomNameEn} &amp; {wedding.brideNameEn}
                </span>
                <span className="font-ethiopic-serif text-sm text-[#7A5A2E] mt-1 font-semibold">
                  {wedding.groomNameAm} እና {wedding.brideNameAm}
                </span>
              </div>
              <span className="text-[11px] font-cinzel text-neutral-700 tracking-wider">
                {wedding.weddingDateGreg}
              </span>
            </div>
          </motion.div>

          {/* ------------------------------------------------------------- */}
          {/* BOTTOM & SIDE FOLD POCKET (Front of envelope)                 */}
          {/* ------------------------------------------------------------- */}
          <div className="absolute inset-0 pointer-events-none">
            <svg
              viewBox="0 0 400 460"
              preserveAspectRatio="none"
              className="absolute inset-0 w-full h-full drop-shadow-[0_-5px_15px_rgba(0,0,0,0.85)]"
            >
              <defs>
                <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FBE8B3" />
                  <stop offset="35%" stopColor="#E2BA70" />
                  <stop offset="70%" stopColor="#C59850" />
                  <stop offset="100%" stopColor="#8E662D" />
                </linearGradient>

                <linearGradient id="goldLineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#7A5A2E" stopOpacity="0.2" />
                  <stop offset="50%" stopColor="#F4E3B2" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#7A5A2E" stopOpacity="0.2" />
                </linearGradient>

                <linearGradient id="envelopeBlackGrad" x1="0%" y1="100%" x2="0%" y2="0%">
                  <stop offset="0%" stopColor="#0B0B0C" />
                  <stop offset="100%" stopColor="#151518" />
                </linearGradient>
              </defs>

              {/* Bottom Pocket Polygon */}
              <polygon
                points="0,460 400,460 400,280 200,225 0,280"
                fill="url(#envelopeBlackGrad)"
                stroke="#C9A66B"
                strokeWidth="0.8"
                strokeOpacity="0.5"
              />

              {/* Side Wing Shadows */}
              <polygon points="0,0 0,460 200,225" fill="#0E0E10" opacity="0.3" />
              <polygon points="400,0 400,460 200,225" fill="#0E0E10" opacity="0.3" />

              {/* Bottom Flap Seam Lines */}
              <line x1="0" y1="280" x2="200" y2="225" stroke="url(#goldLineGrad)" strokeWidth="1.2" opacity="0.75" />
              <line x1="400" y1="280" x2="200" y2="225" stroke="url(#goldLineGrad)" strokeWidth="1.2" opacity="0.75" />

              {/* Lower Flap Symmetrical Gold Floral Filigree */}
              <g id="bottom-filigree" className="opacity-95">
                {/* Left Floral Vine & Rose Bouquet */}
                <g transform="translate(60, 310) scale(0.65)">
                  <path
                    d="M 50 50 C 45 40, 35 45, 40 55 C 45 65, 60 62, 58 50 C 56 42, 48 38, 42 45 C 38 52, 45 60, 52 58 C 55 56, 55 52, 50 50 Z"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M 35 48 C 25 35, 45 25, 55 35 C 65 25, 80 40, 70 52 C 80 65, 65 80, 50 72 C 35 80, 22 65, 35 48 Z"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 55 35 C 70 15, 110 20, 130 50 C 145 75, 125 110, 95 105 C 75 100, 70 85, 85 75 C 95 68, 105 78, 98 88"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="2"
                  />
                  <path d="M 85 24 C 95 18, 105 25, 98 32 C 90 35, 82 28, 85 24 Z" fill="url(#goldFiligree)" opacity="0.85" />
                  <path d="M 122 38 C 132 35, 138 45, 130 50 C 122 52, 118 42, 122 38 Z" fill="url(#goldFiligree)" opacity="0.85" />
                  <path d="M 30 65 C 18 68, 15 80, 25 82 C 32 80, 35 70, 30 65 Z" fill="url(#goldFiligree)" opacity="0.85" />
                </g>

                {/* Right Floral Vine & Rose Bouquet (Mirrored) */}
                <g transform="translate(340, 310) scale(-0.65, 0.65)">
                  <path
                    d="M 50 50 C 45 40, 35 45, 40 55 C 45 65, 60 62, 58 50 C 56 42, 48 38, 42 45 C 38 52, 45 60, 52 58 C 55 56, 55 52, 50 50 Z"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="2.2"
                  />
                  <path
                    d="M 35 48 C 25 35, 45 25, 55 35 C 65 25, 80 40, 70 52 C 80 65, 65 80, 50 72 C 35 80, 22 65, 35 48 Z"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="2"
                  />
                  <path
                    d="M 55 35 C 70 15, 110 20, 130 50 C 145 75, 125 110, 95 105 C 75 100, 70 85, 85 75 C 95 68, 105 78, 98 88"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="2"
                  />
                  <path d="M 85 24 C 95 18, 105 25, 98 32 C 90 35, 82 28, 85 24 Z" fill="url(#goldFiligree)" opacity="0.85" />
                  <path d="M 122 38 C 132 35, 138 45, 130 50 C 122 52, 118 42, 122 38 Z" fill="url(#goldFiligree)" opacity="0.85" />
                  <path d="M 30 65 C 18 68, 15 80, 25 82 C 32 80, 35 70, 30 65 Z" fill="url(#goldFiligree)" opacity="0.85" />
                </g>

                {/* Lower Filigree Border Trim */}
                <path
                  d="M 110 442 C 140 435, 170 445, 200 438 C 230 445, 260 435, 290 442"
                  fill="none"
                  stroke="url(#goldFiligree)"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
                <circle cx="200" cy="438" r="3" fill="url(#goldFiligree)" />
                <circle cx="160" cy="440" r="2" fill="url(#goldFiligree)" />
                <circle cx="240" cy="440" r="2" fill="url(#goldFiligree)" />
              </g>
            </svg>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* TOP TRIANGULAR FLAP (Smooth 3D unfold with gradual perspective) */}
          {/* ------------------------------------------------------------- */}
          <motion.div
            className="absolute inset-x-0 top-0 h-[52%] z-20 pointer-events-none origin-top"
            animate={
              isOpening
                ? {
                    rotateX: -130,
                    opacity: [1, 0.9, 0],
                    transition: {
                      duration: 1.35,
                      ease: [0.25, 1, 0.45, 1], // Smooth, silk-like unfolding
                    },
                  }
                : { rotateX: 0, opacity: 1 }
            }
            style={{ transformStyle: 'preserve-3d' }}
          >
            <svg
              viewBox="0 0 400 240"
              preserveAspectRatio="none"
              className="w-full h-full drop-shadow-[0_10px_20px_rgba(0,0,0,0.85)]"
            >
              <defs>
                <linearGradient id="topFlapBlack" x1="50%" y1="0%" x2="50%" y2="100%">
                  <stop offset="0%" stopColor="#1C1C20" />
                  <stop offset="60%" stopColor="#121214" />
                  <stop offset="100%" stopColor="#0A0A0B" />
                </linearGradient>

                <linearGradient id="topFlapBorder" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#C9A66B" />
                  <stop offset="50%" stopColor="#F4E3B2" />
                  <stop offset="100%" stopColor="#8E662D" />
                </linearGradient>
              </defs>

              {/* Triangle Top Flap */}
              <polygon
                points="0,0 400,0 200,230"
                fill="url(#topFlapBlack)"
                stroke="url(#topFlapBorder)"
                strokeWidth="1"
              />

              {/* Flap Diagonal Seam Highlights */}
              <line x1="0" y1="0" x2="200" y2="230" stroke="url(#topFlapBorder)" strokeWidth="1.6" opacity="0.85" />
              <line x1="400" y1="0" x2="200" y2="230" stroke="url(#topFlapBorder)" strokeWidth="1.6" opacity="0.85" />

              {/* Top Flap Filigree & Crest */}
              <g id="top-filigree" className="opacity-95">
                <g transform="translate(175, 15) scale(0.55)">
                  <path
                    d="M 45 40 C 40 30, 30 35, 35 45 C 40 55, 55 52, 53 40 C 51 32, 43 28, 37 35 Z"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M 30 38 C 20 25, 40 15, 50 25 C 60 15, 75 30, 65 42 C 75 55, 60 70, 45 62 C 30 70, 17 55, 30 38 Z"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="2.2"
                  />
                </g>

                {/* Left Diagonal Vine */}
                <g transform="translate(25, 20)">
                  <path
                    d="M 10 10 Q 50 50, 95 105 Q 135 150, 165 195"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="1.8"
                    strokeDasharray="4 2"
                    opacity="0.8"
                  />
                  <path
                    d="M 40 35 C 55 30, 65 45, 55 55 C 45 65, 35 50, 48 45"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M 90 90 C 105 85, 115 100, 105 110 C 95 120, 85 105, 98 100"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="1.6"
                  />
                  <path
                    d="M 135 145 C 148 140, 155 155, 145 162"
                    fill="none"
                    stroke="url(#goldFiligree)"
                    strokeWidth="1.6"
                  />
                </g>

                {/* Right Diagonal Vine */}
                <g transform="translate(400, 0) scale(-1, 1)">
                  <g transform="translate(25, 20)">
                    <path
                      d="M 10 10 Q 50 50, 95 105 Q 135 150, 165 195"
                      fill="none"
                      stroke="url(#goldFiligree)"
                      strokeWidth="1.8"
                      strokeDasharray="4 2"
                      opacity="0.8"
                    />
                    <path
                      d="M 40 35 C 55 30, 65 45, 55 55 C 45 65, 35 50, 48 45"
                      fill="none"
                      stroke="url(#goldFiligree)"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M 90 90 C 105 85, 115 100, 105 110 C 95 120, 85 105, 98 100"
                      fill="none"
                      stroke="url(#goldFiligree)"
                      strokeWidth="1.6"
                    />
                    <path
                      d="M 135 145 C 148 140, 155 155, 145 162"
                      fill="none"
                      stroke="url(#goldFiligree)"
                      strokeWidth="1.6"
                    />
                  </g>
                </g>
              </g>
            </svg>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 3. SOFT, ELEGANT GOLDEN LIGHT GLOW (Refined and gentle per user request)   */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {isOpening && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-35 overflow-visible">
              {/* Soft, warm ambient golden flare that gently expands and softly dissolves */}
              <motion.div
                initial={{ scale: 0.3, opacity: 0 }}
                animate={{
                  scale: [0.3, 1.15, 1.45],
                  opacity: [0, 0.75, 0],
                }}
                transition={{
                  duration: 1.3,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="relative flex items-center justify-center w-64 h-64 sm:w-72 sm:h-72 pointer-events-none"
              >
                {/* Subtle radial warmth halo */}
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(255,236,179,0.7)_0%,rgba(226,186,112,0.35)_40%,rgba(201,166,107,0.1)_65%,transparent_75%)] blur-xl" />

                {/* Delicate 8-point gentle soft light rays */}
                <svg viewBox="0 0 200 200" className="w-full h-full opacity-60">
                  <defs>
                    <radialGradient id="delicateGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
                      <stop offset="30%" stopColor="#FFF2B8" stopOpacity="0.5" />
                      <stop offset="70%" stopColor="#E2BA70" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#C59850" stopOpacity="0" />
                    </radialGradient>
                  </defs>

                  {[0, 45, 90, 135].map((angle, idx) => (
                    <g key={idx} transform={`rotate(${angle} 100 100)`}>
                      <ellipse cx="100" cy="100" rx="90" ry="3.5" fill="url(#delicateGlow)" />
                    </g>
                  ))}
                  <circle cx="100" cy="100" r="18" fill="url(#delicateGlow)" />
                  <circle cx="100" cy="100" r="7" fill="#FFFFFF" opacity="0.8" />
                </svg>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* 4. THE AUTHENTIC WAX SEAL WITH GOLD RING (Silky smooth lift & fade)       */}
        {/* ========================================================================= */}
        <motion.div
          animate={
            isOpening
              ? {
                  scale: [1, 1.08, 0.92],
                  opacity: [1, 0.95, 0],
                  y: -18,
                  transition: {
                    duration: 1.1,
                    ease: [0.25, 1, 0.5, 1],
                  },
                }
              : { scale: 1, opacity: 1 }
          }
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          transition={{ duration: 0.25 }}
          className="relative z-30 cursor-pointer group flex items-center justify-center -translate-y-1"
        >
          {/* Ambient Outer Halo Pulse */}
          <div className="absolute -inset-5 rounded-full bg-[#F4E3B2]/12 blur-lg animate-pulse-subtle pointer-events-none" />

          {/* Organic Melted Wax Silhouette */}
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.85)]">
            <svg viewBox="0 0 160 160" className="w-full h-full overflow-visible">
              <defs>
                {/* Metallic Gold Ring Gradient */}
                <linearGradient id="sealGoldRing" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2D6" />
                  <stop offset="30%" stopColor="#E4BE7E" />
                  <stop offset="60%" stopColor="#C9A66B" />
                  <stop offset="85%" stopColor="#8A6329" />
                  <stop offset="100%" stopColor="#573D14" />
                </linearGradient>

                {/* Dark Luxury Obsidian Wax Base */}
                <radialGradient id="waxBodyGrad" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#2A2826" />
                  <stop offset="50%" stopColor="#161514" />
                  <stop offset="85%" stopColor="#0C0B0A" />
                  <stop offset="100%" stopColor="#050505" />
                </radialGradient>
              </defs>

              {/* Organic Melted Wax Scalloped Contour */}
              <path
                d="
                  M 80,10
                  C 95,9 108,18 120,28
                  C 132,38 145,46 148,62
                  C 152,78 146,95 138,108
                  C 130,122 121,136 106,144
                  C 92,152 74,151 58,145
                  C 42,139 27,130 19,115
                  C 10,100 9,82 13,66
                  C 17,50 28,37 40,26
                  C 53,15 66,11 80,10 Z
                "
                fill="url(#waxBodyGrad)"
                stroke="#5A431D"
                strokeWidth="1.5"
              />

              {/* Gold Ring */}
              <circle
                cx="80"
                cy="80"
                r="52"
                fill="none"
                stroke="url(#sealGoldRing)"
                strokeWidth="4.2"
                className="filter drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]"
              />

              {/* Concentric Gold Hairline */}
              <circle
                cx="80"
                cy="80"
                r="45"
                fill="none"
                stroke="#F4E3B2"
                strokeWidth="0.9"
                strokeOpacity="0.7"
              />

              {/* Beaded Accents */}
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg, i) => {
                const rad = (deg * Math.PI) / 180;
                const cx = 80 + 48.5 * Math.cos(rad);
                const cy = 80 + 48.5 * Math.sin(rad);
                return <circle key={i} cx={cx} cy={cy} r="1" fill="#F4E3B2" opacity="0.85" />;
              })}
            </svg>

            {/* Monogram in Center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center select-none pointer-events-none">
              <span className="font-script text-2xl sm:text-3xl text-transparent bg-clip-text bg-gradient-to-b from-[#FFF5E0] via-[#E4BE7E] to-[#B3833C] drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] leading-none font-bold tracking-tight">
                {wedding.monogramInitials}
              </span>
              <span className="text-[9px] font-ethiopic-serif text-[#F4E3B2]/80 tracking-[0.2em] mt-0.5">
                አ • ቢ
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ========================================================================= */}
      {/* 5. FLOATING "TAP TO OPEN" INVITATION CALLOUT                             */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isOpening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
        className="z-20 flex flex-col items-center gap-1.5 -mt-3 mb-1"
      >
        <motion.div
          animate={{ y: [-1, -5, -1] }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="text-[#F4E3B2] flex items-center justify-center"
        >
          <ChevronUp className="w-5 h-5 stroke-[2.2]" />
        </motion.div>
        
        {/* Glowing Pill Button */}
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-900/80 border border-[#C9A66B]/50 backdrop-blur-md shadow-[0_0_20px_rgba(201,166,107,0.2)] transition-colors hover:border-[#F4E3B2]/80">
          <Sparkles className="w-3.5 h-3.5 text-[#F4E3B2] animate-pulse" />
          <span className="text-xs font-ethiopic-sans font-medium text-[#F4E3B2] tracking-wider">
            ግብዣውን ለመክፈት ይንኩ
          </span>
          <span className="text-[10px] font-cinzel text-[#C9A66B] uppercase tracking-widest hidden sm:inline">
            • Tap to Open
          </span>
        </div>
      </motion.div>

      {/* ========================================================================= */}
      {/* 6. BOTTOM NAMES & SAVE THE DATE FOOTER                                  */}
      {/* ========================================================================= */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: isOpening ? 0 : 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut', delay: 0.35 }}
        className="z-20 w-full max-w-sm flex flex-col items-center pb-6 text-center px-4"
      >
        {/* Couple Names */}
        <div className="mb-2">
          <h1 className="text-2xl sm:text-3xl font-ethiopic-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F4E3B2] via-[#E4BE7E] to-[#F4E3B2] tracking-wide leading-snug">
            {wedding.groomNameAm}{' '}
            <span className="font-light text-[#C9A66B]/80 px-1 font-ethiopic-sans">&amp;</span>{' '}
            {wedding.brideNameAm}
          </h1>
          <p className="font-cinzel text-xs sm:text-sm text-[#C9A66B]/85 tracking-[0.25em] mt-0.5 uppercase">
            {wedding.groomNameEn} &amp; {wedding.brideNameEn}
          </p>
        </div>

        {/* Thin Gold Divider with Diamond */}
        <div className="flex items-center justify-center w-full max-w-[200px] my-2">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent opacity-60" />
          <div className="w-1.5 h-1.5 mx-2 rotate-45 border border-[#F4E3B2] bg-[#C9A66B]" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A66B] to-transparent opacity-60" />
        </div>

        {/* Save the Date & Wedding Date */}
        <div className="flex flex-col items-center gap-0.5">
          <span className="text-[10px] tracking-[0.22em] text-neutral-400 uppercase font-medium">
            ቀኑን ያስቀምጡ • Save the Date
          </span>
          <span className="text-xs sm:text-sm font-ethiopic-serif text-[#F4E3B2] font-semibold tracking-wide">
            {wedding.weddingDateEth}
          </span>
          <span className="text-[11px] font-cinzel text-[#C9A66B]/80 tracking-widest">
            {wedding.weddingDateGreg}
          </span>
        </div>
      </motion.div>
    </div>
  );
}
