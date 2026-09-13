import { motion } from 'motion/react';
import { Heart } from 'lucide-react';
import { WeddingDetails } from '../types';
import GoldRibbonDivider from './GoldRibbonDivider';

interface CalendarSectionProps {
  wedding: WeddingDetails;
}

export default function CalendarSection({ wedding }: CalendarSectionProps) {
  // May 2026 Calendar Grid:
  // May 1, 2026 is a Friday.
  // Days of week: እሁድ (Sun), ሰኞ (Mon), ማክሰኞ (Tue), ረቡዕ (Wed), ሐሙስ (Thu), አርብ (Fri), ቅዳሜ (Sat)
  // Leading empty days before May 1 (Fri): 5 days (Sun, Mon, Tue, Wed, Thu)
  const daysOfWeek = ['እሁድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'አርብ', 'ቅዳሜ'];
  
  // 31 days in May
  const leadingBlanks = [null, null, null, null, null];
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);
  const calendarCells = [...leadingBlanks, ...daysInMonth];

  const weddingDay = 24; // May 24, 2026 (ግንቦት 16)

  return (
    <section className="scroll-snap-section relative w-full min-h-screen bg-[#EAE5E2] text-neutral-900 flex flex-col justify-between overflow-hidden">
      {/* Top Gold Ribbon Divider for smooth transition from previous dark section */}
      <GoldRibbonDivider inverted={true} className="mb-auto" />

      {/* Faint couple photo watermark background */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none mix-blend-multiply"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1000&q=80')`
        }}
      />

      {/* Main Content Area */}
      <div className="relative z-10 w-full max-w-md mx-auto px-6 py-4 flex flex-col items-center justify-center flex-1">
        {/* Headlines */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-6"
        >
          <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#7A5A2E] uppercase font-bold">
            Save The Date
          </span>
          <h2 className="text-2xl sm:text-3xl font-ethiopic-serif font-black text-neutral-950 tracking-tight mt-1">
            ቀኑን እንዳይረሱ
          </h2>
          <p className="text-base font-ethiopic-serif font-bold text-[#8C6430] mt-1">
            {wedding.groomNameAm} እና {wedding.brideNameAm}
          </p>
          <div className="h-[1.5px] w-12 bg-[#C9A66B] mx-auto mt-2" />
        </motion.div>

        {/* Calendar Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-5 shadow-xl border border-[#C9A66B]/30"
        >
          {/* Month Header */}
          <div className="flex items-center justify-between border-b border-neutral-200 pb-3 mb-3">
            <span className="font-ethiopic-serif text-sm font-bold text-neutral-800">
              ግንቦት 2018 ዓ.ም
            </span>
            <span className="font-cinzel text-xs tracking-wider text-[#8C6430] font-bold">
              MAY 2026
            </span>
          </div>

          {/* Days of Week Row */}
          <div className="grid grid-cols-7 gap-1 text-center mb-2">
            {daysOfWeek.map((day, idx) => (
              <span
                key={idx}
                className="text-[11px] font-ethiopic-sans font-semibold text-neutral-500 py-1"
              >
                {day}
              </span>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1 text-center">
            {calendarCells.map((day, index) => {
              if (day === null) {
                return <div key={`blank-${index}`} className="h-9 w-full" />;
              }

              const isWeddingDay = day === weddingDay;

              return (
                <div
                  key={`day-${day}`}
                  className="h-9 flex items-center justify-center relative"
                >
                  {isWeddingDay ? (
                    <motion.div
                      animate={{ scale: [1, 1.08, 1] }}
                      transition={{ repeat: Infinity, duration: 2.2 }}
                      className="w-8 h-8 rounded-full border-2 border-[#C9A66B] bg-gradient-to-tr from-[#C9A66B]/20 to-[#F4E3B2]/40 flex flex-col items-center justify-center shadow-md relative"
                    >
                      <span className="text-xs font-bold text-neutral-900 leading-none">
                        {day}
                      </span>
                      <Heart className="w-2.5 h-2.5 fill-[#B8874E] text-[#7A5A2E] -mt-0.5" />
                    </motion.div>
                  ) : (
                    <span className="text-xs font-medium text-neutral-700 hover:text-neutral-950 transition-colors">
                      {day}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* Date Restated Below */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-6"
        >
          <p className="text-xs font-ethiopic-sans tracking-wider text-neutral-600 uppercase">
            የሰርጉ ልዩ ቀን
          </p>
          <p className="text-xl sm:text-2xl font-ethiopic-serif font-black text-neutral-950 mt-0.5">
            {wedding.weddingDateEth}
          </p>
          <p className="text-xs font-cinzel tracking-[0.25em] text-[#8C6430] font-bold mt-0.5 uppercase">
            {wedding.weddingDateGreg}
          </p>
        </motion.div>
      </div>

      {/* Bottom Gold Ribbon Divider to Black Section */}
      <GoldRibbonDivider className="mt-auto" />
    </section>
  );
}
