import { motion } from 'motion/react';
import { Send, Camera, Sparkles } from 'lucide-react';
import { WeddingDetails } from '../types';

interface PhotoShareSectionProps {
  wedding: WeddingDetails;
}

export default function PhotoShareSection({ wedding }: PhotoShareSectionProps) {
  return (
    <section className="scroll-snap-section relative w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between py-12 px-6 overflow-hidden">
      {/* Background Wedding Photo with dark overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-25"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1200&q=80')`
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/80 to-[#0A0A0A] pointer-events-none" />

      {/* Main Content Box */}
      <div className="relative z-10 w-full max-w-md mx-auto my-auto flex flex-col items-center text-center">
        {/* Camera Badge Icon */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="w-16 h-16 rounded-full bg-gradient-to-tr from-[#7A5A2E] via-[#F4E3B2] to-[#B8874E] p-[2px] shadow-[0_0_25px_rgba(201,166,107,0.3)] mb-5"
        >
          <div className="w-full h-full rounded-full bg-neutral-950 flex items-center justify-center">
            <Camera className="w-7 h-7 text-[#F4E3B2]" />
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-2xl sm:text-3xl font-ethiopic-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F4E3B2] via-[#C9A66B] to-[#F4E3B2] leading-snug px-2 mb-3"
        >
          የሰርጉን ድጋፍ በፎቶ እና በቪዲዮ አጋሩን
        </motion.h2>

        {/* Body Text */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xs sm:text-sm font-ethiopic-sans text-neutral-300 leading-relaxed max-w-xs sm:max-w-sm mb-7"
        >
          በሰርጉ ዕለት ያነሳችሁትን ፎቶ እና ቪዲዮ በቀጥታ ለእኛ በ <strong className="text-[#F4E3B2] underline underline-offset-4 font-semibold">"ቴሌግራም ቦት"</strong> አማካኝነት አጋሩን!!!
        </motion.p>

        {/* Gold Pill Button with Paper-Plane Icon */}
        <motion.a
          id="btn-telegram-bot"
          href={wedding.telegramBotUrl}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-full bg-gradient-to-r from-[#C9A66B] via-[#E4BE7E] to-[#B8874E] hover:opacity-95 text-neutral-950 font-ethiopic-sans font-bold text-sm tracking-wide shadow-[0_0_20px_rgba(201,166,107,0.35)] transition-all active:scale-95 group"
        >
          <Send className="w-4 h-4 text-neutral-950 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          <span>ቴሌግራም ቦት (@YeneSergBot)</span>
        </motion.a>

        <span className="text-[11px] font-cinzel text-[#C9A66B]/70 tracking-widest uppercase mt-4">
          Direct Upload via Telegram
        </span>
      </div>

      <div className="pb-4" />
    </section>
  );
}
