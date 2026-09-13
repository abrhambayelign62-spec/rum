import { useState } from 'react';
import { motion } from 'motion/react';
import { QrCode, Download, Check, ShieldCheck, Sparkles } from 'lucide-react';
import { WeddingDetails } from '../types';

interface PassCardSectionProps {
  wedding: WeddingDetails;
}

export default function PassCardSection({ wedding }: PassCardSectionProps) {
  const [downloaded, setDownloaded] = useState(false);

  const handleDownloadPass = () => {
    // Generate a simple downloadable SVG / image pass card or printable canvas
    const canvas = document.createElement('canvas');
    canvas.width = 600;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Card background
    ctx.fillStyle = '#0F0F0F';
    ctx.fillRect(0, 0, 600, 800);

    // Gold border
    ctx.strokeStyle = '#C9A66B';
    ctx.lineWidth = 6;
    ctx.strokeRect(20, 20, 560, 760);

    // Inner thin border
    ctx.strokeStyle = 'rgba(244, 227, 178, 0.4)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(30, 30, 540, 740);

    // Title
    ctx.fillStyle = '#F4E3B2';
    ctx.font = 'bold 28px serif';
    ctx.textAlign = 'center';
    ctx.fillText('የክብር መግቢያ ካርድ • DIGITAL PASS', 300, 90);

    // Couple
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px serif';
    ctx.fillText(`${wedding.groomNameAm} እና ${wedding.brideNameAm}`, 300, 150);

    ctx.fillStyle = '#C9A66B';
    ctx.font = '20px sans-serif';
    ctx.fillText('ACCESS FOR 2 GUESTS', 300, 195);

    // White QR background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(175, 240, 250, 250);

    // Mock QR patterns
    ctx.fillStyle = '#000000';
    ctx.fillRect(195, 260, 60, 60);
    ctx.fillRect(345, 260, 60, 60);
    ctx.fillRect(195, 410, 60, 60);
    ctx.fillRect(275, 340, 50, 50);

    // Venue & Date
    ctx.fillStyle = '#EAE5E2';
    ctx.font = '22px sans-serif';
    ctx.fillText(wedding.venueNameAm, 300, 550);
    ctx.fillText(wedding.weddingDateEth, 300, 590);
    ctx.font = '18px sans-serif';
    ctx.fillStyle = '#C9A66B';
    ctx.fillText('ከምሽቱ 12:00 ሰዓት ጀምሮ', 300, 630);

    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#888888';
    ctx.fillText('እባክዎ ይህን መግቢያ ካርድ ለበር ጠባቂው ያሳዩ', 300, 700);

    const link = document.createElement('a');
    link.download = `Wedding_Pass_${wedding.groomNameEn}_${wedding.brideNameEn}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();

    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <section className="scroll-snap-section relative w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center pt-2 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#C9A66B] uppercase font-semibold">
            Invitation Entry Pass
          </span>
          <h2 className="text-2xl sm:text-3xl font-ethiopic-serif font-bold text-white mt-1">
            የዲጂታል መግቢያ ካርድ
          </h2>
          <p className="text-xs font-ethiopic-sans text-neutral-400 mt-0.5">
            የእርስዎ የተረጋገጠ የመግቢያ ፈቃድ
          </p>
        </motion.div>
      </div>

      {/* Access Pass Card Container */}
      <div className="relative w-full max-w-sm mx-auto my-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-white text-neutral-900 rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-[#C9A66B] flex flex-col items-center text-center relative overflow-hidden"
        >
          {/* Subtle gold ribbon accents */}
          <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#7A5A2E] via-[#F4E3B2] to-[#B8874E]" />

          {/* Access Badge */}
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-300 text-neutral-700 text-[11px] font-cinzel font-bold tracking-widest uppercase mb-4 mt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#B8874E]" />
            <span>ACCESS FOR 2 GUESTS</span>
          </div>

          {/* QR Code Container */}
          <div className="w-44 h-44 sm:w-48 sm:h-48 p-3.5 bg-white border-2 border-neutral-200 rounded-2xl shadow-inner flex items-center justify-center relative mb-4">
            {/* SVG QR Code */}
            <svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              shapeRendering="crispEdges"
            >
              {/* Outer Corners */}
              <rect x="5" y="5" width="28" height="28" fill="#0A0A0A" rx="4" />
              <rect x="9" y="9" width="20" height="20" fill="#FFFFFF" rx="2" />
              <rect x="13" y="13" width="12" height="12" fill="#0A0A0A" rx="2" />

              <rect x="67" y="5" width="28" height="28" fill="#0A0A0A" rx="4" />
              <rect x="71" y="9" width="20" height="20" fill="#FFFFFF" rx="2" />
              <rect x="75" y="13" width="12" height="12" fill="#0A0A0A" rx="2" />

              <rect x="5" y="67" width="28" height="28" fill="#0A0A0A" rx="4" />
              <rect x="9" y="71" width="20" height="20" fill="#FFFFFF" rx="2" />
              <rect x="13" y="75" width="12" height="12" fill="#0A0A0A" rx="2" />

              {/* Data Modules */}
              <rect x="38" y="8" width="6" height="6" fill="#0A0A0A" />
              <rect x="48" y="14" width="6" height="6" fill="#0A0A0A" />
              <rect x="56" y="8" width="6" height="6" fill="#0A0A0A" />
              <rect x="38" y="24" width="6" height="6" fill="#0A0A0A" />

              <rect x="8" y="38" width="6" height="6" fill="#0A0A0A" />
              <rect x="18" y="46" width="6" height="6" fill="#0A0A0A" />
              <rect x="26" y="38" width="6" height="6" fill="#0A0A0A" />

              <rect x="42" y="42" width="16" height="16" fill="#C9A66B" rx="3" />
              <rect x="46" y="46" width="8" height="8" fill="#0A0A0A" rx="1" />

              <rect x="68" y="38" width="6" height="6" fill="#0A0A0A" />
              <rect x="78" y="46" width="6" height="6" fill="#0A0A0A" />
              <rect x="86" y="38" width="6" height="6" fill="#0A0A0A" />

              <rect x="38" y="68" width="6" height="6" fill="#0A0A0A" />
              <rect x="48" y="76" width="6" height="6" fill="#0A0A0A" />
              <rect x="56" y="68" width="6" height="6" fill="#0A0A0A" />
              <rect x="42" y="86" width="6" height="6" fill="#0A0A0A" />
              <rect x="76" y="76" width="12" height="12" fill="#0A0A0A" />
            </svg>

            {/* Monogram Seal in center */}
            <div className="absolute w-8 h-8 rounded-full bg-neutral-900 border border-[#C9A66B] flex items-center justify-center shadow-md">
              <span className="font-cinzel text-[10px] font-bold text-[#F4E3B2]">
                {wedding.monogramInitials}
              </span>
            </div>
          </div>

          {/* Download Pass Button */}
          <button
            id="btn-download-pass"
            onClick={handleDownloadPass}
            className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#B8874E] via-[#C9A66B] to-[#9C753B] hover:opacity-95 text-white font-ethiopic-sans font-semibold text-xs shadow-md transition-all active:scale-95 mb-3"
          >
            {downloaded ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>ካርዱ ተቀምጧል! (Downloaded)</span>
              </>
            ) : (
              <>
                <Download className="w-4 h-4" />
                <span>Download Pass (ካርዱን ያውርዱ)</span>
              </>
            )}
          </button>

          {/* Description text under QR */}
          <p className="text-[11px] font-ethiopic-sans text-neutral-500 leading-normal">
            እባክዎ ይህን በስልክዎ ስክሪንሾት ያድርጉ ወይም Download በማድረግ ለበር ጠባቂው ያሳዩ
          </p>
        </motion.div>
      </div>

      <div className="pb-4" />
    </section>
  );
}
