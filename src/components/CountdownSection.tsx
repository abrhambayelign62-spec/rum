import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Calendar, Download, ExternalLink } from 'lucide-react';
import { WeddingDetails } from '../types';
import { downloadIcsFile, generateGoogleCalendarUrl } from '../utils/calendarHelper';
import GoldRibbonDivider from './GoldRibbonDivider';

interface CountdownSectionProps {
  wedding: WeddingDetails;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function CountdownSection({ wedding }: CountdownSectionProps) {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const target = new Date(wedding.targetDateTime).getTime();
      const now = new Date().getTime();
      const diff = Math.max(0, target - now);

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [wedding.targetDateTime]);

  const handleAddToCalendar = () => {
    // 1. Download .ics for native calendar app (Apple Calendar / Outlook / Phone Calendar)
    downloadIcsFile(
      `የ${wedding.groomNameAm} እና የ${wedding.brideNameAm} ሰርግ • ${wedding.groomNameEn} & ${wedding.brideNameEn} Wedding`,
      `የ${wedding.groomNameAm} እና የ${wedding.brideNameAm} የክብር ሰርግ እና የእራት ግብዣ በ${wedding.venueNameAm}።`,
      `${wedding.venueNameAm}, ${wedding.venueAddress}`,
      '2026-05-24T18:00:00',
      '2026-05-24T23:30:00'
    );
  };

  const googleCalUrl = generateGoogleCalendarUrl(
    `የ${wedding.groomNameAm} እና የ${wedding.brideNameAm} ሰርግ`,
    `የክብር ሰርግ እና የእራት ግብዣ በ${wedding.venueNameAm}።`,
    `${wedding.venueNameAm}, ${wedding.venueAddress}`,
    '2026-05-24T18:00:00',
    '2026-05-24T23:30:00'
  );

  return (
    <section className="scroll-snap-section relative w-full min-h-screen bg-white text-neutral-900 flex flex-col justify-between overflow-hidden">
      {/* Top Gold Ribbon Divider from black section */}
      <GoldRibbonDivider inverted={true} className="mb-auto" />

      {/* Main Countdown Content */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-6 flex flex-col items-center justify-center flex-1 text-center">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#7A5A2E] uppercase font-bold">
            The Celebration Begins In
          </span>
          <h2 className="text-2xl sm:text-3xl font-ethiopic-serif font-black text-neutral-950 mt-1">
            ለሰርጋችን የቀረው ቀን
          </h2>
          <p className="text-xs font-ethiopic-sans text-neutral-500 mt-1">
            ደስታችንን አብረን የምናከብርበት ልዩ ሰዓት
          </p>
        </motion.div>

        {/* 4 Large Gold Numerals in a Row */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="grid grid-cols-4 gap-2.5 sm:gap-3.5 w-full mb-8"
        >
          {/* Days */}
          <div className="flex flex-col items-center bg-neutral-50 rounded-2xl p-3 border border-[#C9A66B]/35 shadow-sm">
            <span className="text-3xl sm:text-4xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#B8874E] via-[#C9A66B] to-[#7A5A2E]">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-xs font-ethiopic-sans font-bold text-neutral-700 mt-1">
              ቀን
            </span>
            <span className="text-[9px] font-cinzel text-neutral-400 tracking-wider">
              Days
            </span>
          </div>

          {/* Hours */}
          <div className="flex flex-col items-center bg-neutral-50 rounded-2xl p-3 border border-[#C9A66B]/35 shadow-sm">
            <span className="text-3xl sm:text-4xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#B8874E] via-[#C9A66B] to-[#7A5A2E]">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-xs font-ethiopic-sans font-bold text-neutral-700 mt-1">
              ሰዓት
            </span>
            <span className="text-[9px] font-cinzel text-neutral-400 tracking-wider">
              Hours
            </span>
          </div>

          {/* Minutes */}
          <div className="flex flex-col items-center bg-neutral-50 rounded-2xl p-3 border border-[#C9A66B]/35 shadow-sm">
            <span className="text-3xl sm:text-4xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#B8874E] via-[#C9A66B] to-[#7A5A2E]">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-xs font-ethiopic-sans font-bold text-neutral-700 mt-1">
              ደቂቃ
            </span>
            <span className="text-[9px] font-cinzel text-neutral-400 tracking-wider">
              Minutes
            </span>
          </div>

          {/* Seconds */}
          <div className="flex flex-col items-center bg-neutral-50 rounded-2xl p-3 border border-[#C9A66B]/35 shadow-sm">
            <span className="text-3xl sm:text-4xl font-cinzel font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#B8874E] via-[#C9A66B] to-[#7A5A2E]">
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-xs font-ethiopic-sans font-bold text-neutral-700 mt-1">
              ሰከንድ
            </span>
            <span className="text-[9px] font-cinzel text-neutral-400 tracking-wider">
              Seconds
            </span>
          </div>
        </motion.div>

        {/* Black Pill-Shaped Button: 'ወደ ካሌንደር ያስገቡ' */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full justify-center"
        >
          <button
            id="btn-add-to-calendar"
            onClick={handleAddToCalendar}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-neutral-950 hover:bg-neutral-900 text-[#F4E3B2] border border-[#C9A66B] shadow-xl font-ethiopic-sans font-semibold text-xs tracking-wider transition-all active:scale-95 group"
          >
            <Calendar className="w-4 h-4 text-[#C9A66B] group-hover:scale-110 transition-transform" />
            <span>ወደ ካሌንደር ያስገቡ (.ics)</span>
            <Download className="w-3.5 h-3.5 opacity-75" />
          </button>

          <a
            id="link-google-calendar"
            href={googleCalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-ethiopic-sans text-neutral-700 hover:text-neutral-950 font-medium underline underline-offset-4 flex items-center gap-1 py-1"
          >
            <span>Google Calendar</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </motion.div>
      </div>

      {/* Bottom Gold Ribbon Divider to Black Section */}
      <GoldRibbonDivider className="mt-auto" />
    </section>
  );
}
