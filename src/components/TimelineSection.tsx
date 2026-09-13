import { motion } from 'motion/react';
import { Car, Church, Camera, Utensils, Sparkles } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/weddingData';
import { TimelineEvent } from '../types';

export default function TimelineSection() {
  const getIcon = (type: TimelineEvent['iconType']) => {
    switch (type) {
      case 'car':
        return <Car className="w-4 h-4 text-[#F4E3B2]" />;
      case 'church':
        return <Church className="w-4 h-4 text-[#F4E3B2]" />;
      case 'camera':
        return <Camera className="w-4 h-4 text-[#F4E3B2]" />;
      case 'dinner':
        return <Utensils className="w-4 h-4 text-[#F4E3B2]" />;
      case 'celebration':
      default:
        return <Sparkles className="w-4 h-4 text-[#F4E3B2]" />;
    }
  };

  return (
    <section className="scroll-snap-section relative w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center pt-2 pb-6">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#C9A66B] uppercase font-semibold">
            Ceremony Schedule &amp; Order
          </span>
          <h2 className="text-2xl sm:text-3xl font-ethiopic-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F4E3B2] via-[#C9A66B] to-[#F4E3B2] mt-1">
            የሰርጋችን ፕሮግራም
          </h2>
          <p className="text-xs font-ethiopic-sans text-neutral-400 mt-1">
            የእለቱ ዝግጅት የሰዓት ሰሌዳ
          </p>
        </motion.div>
      </div>

      {/* Vertical Timeline */}
      <div className="relative w-full max-w-md mx-auto my-auto py-2">
        {/* Continuous Connecting Gold Line */}
        <div className="absolute top-4 bottom-4 left-[21px] sm:left-[25px] w-[2px] bg-gradient-to-b from-[#C9A66B] via-[#F4E3B2] to-[#7A5A2E]" />

        <div className="flex flex-col space-y-4">
          {TIMELINE_EVENTS.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="relative flex items-start gap-3 sm:gap-4 pl-1"
            >
              {/* Circular Icon Node */}
              <div className="relative z-10 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#141414] border-2 border-[#C9A66B] shadow-[0_0_12px_rgba(201,166,107,0.35)] flex items-center justify-center shrink-0">
                {getIcon(event.iconType)}
              </div>

              {/* White Rounded Card to the right */}
              <div className="flex-1 bg-white text-neutral-900 rounded-xl p-3.5 sm:p-4 shadow-lg border border-neutral-200">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-sm sm:text-base font-ethiopic-serif font-bold text-neutral-950 leading-snug">
                    {event.titleAm}
                  </h3>
                  <span className="text-[11px] font-bold font-ethiopic-sans bg-neutral-900 text-[#F4E3B2] px-2 py-0.5 rounded-full shrink-0 shadow-sm">
                    {event.timeAm}
                  </span>
                </div>
                <p className="text-xs font-ethiopic-sans text-neutral-600 mt-1 leading-relaxed">
                  {event.descriptionAm}
                </p>
                <span className="text-[10px] font-cinzel text-neutral-400 tracking-wider block mt-1">
                  {event.timeEn} • {event.titleEn}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="pb-4" />
    </section>
  );
}
