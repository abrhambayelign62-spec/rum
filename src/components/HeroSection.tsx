import { motion } from 'motion/react';
import { Calendar, Heart } from 'lucide-react';
import { WeddingDetails } from '../types';
import GoldRibbonDivider from './GoldRibbonDivider';

interface HeroSectionProps {
  wedding: WeddingDetails;
  onNavigateToMap: () => void;
}

export default function HeroSection({ wedding, onNavigateToMap }: HeroSectionProps) {
  return (
    <section id="hero-home-page" className="scroll-snap-section relative w-full flex flex-col bg-[#070707] text-white overflow-hidden pb-10">
      {/* ========================================================================= */}
      {/* 1. TOP PHOTO HERO WITH AUTHENTIC HABESHA WEDDING COUPLE                   */}
      {/* ========================================================================= */}
      <div className="relative w-full h-[62vh] sm:h-[66vh] min-h-[420px] max-h-[580px] overflow-hidden">
        {/* Ethiopian / Habesha wedding couple smiling with sunglasses, outdoor historic stone venue & bistro lights */}
        <img
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85"
          alt="Adane and Bitaniya Wedding Couple"
          className="w-full h-full object-cover object-top filter brightness-[0.98] contrast-[1.03]"
        />

        {/* Top edge soft dark vignette */}
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/75 to-transparent pointer-events-none" />

        {/* Seamless Bottom Gradient Mask directly to pure black background */}
        <div 
          className="absolute inset-x-0 bottom-0 h-44 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(7,7,7,0) 0%, rgba(7,7,7,0.65) 50%, rgba(7,7,7,1) 98%)'
          }}
        />

        {/* ========================================================================= */}
        {/* 2. COUPLE NAMES OVERLAY (Exact typography & layout from uploaded image)  */}
        {/* ========================================================================= */}
        <div className="absolute inset-x-0 bottom-1 px-4 text-center z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center w-full"
          >
            {/* Couple Big Ethiopian Font Names: አዳነ እና ቢታንያ */}
            <div className="flex items-baseline justify-center gap-2.5 sm:gap-3 flex-wrap">
              <span className="text-4xl sm:text-5xl font-ethiopic-serif font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] tracking-wide">
                {wedding.groomNameAm}
              </span>
              <span className="text-2xl sm:text-3xl font-ethiopic-serif font-bold text-[#E5B56E] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] px-0.5">
                እና
              </span>
              <span className="text-4xl sm:text-5xl font-ethiopic-serif font-black text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.95)] tracking-wide">
                {wedding.brideNameAm}
              </span>
            </div>

            {/* "ቀኑ እንደደረሰ" (The day has arrived) */}
            <p className="font-ethiopic-serif text-sm sm:text-base text-[#F4E3B2] tracking-wider mt-1.5 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
              ቀኑ እንደደረሰ
            </p>

            {/* Date Pill Badge with Gold Border: 📅 ግንቦት 16/2018 ዓ.ም */}
            <div className="mt-2.5 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/65 border border-[#C9A66B]/60 backdrop-blur-md shadow-[0_4px_15px_rgba(0,0,0,0.85)]">
              <Calendar className="w-3.5 h-3.5 text-[#E5B56E]" />
              <span className="text-xs sm:text-sm font-ethiopic-sans font-medium text-[#F4E3B2] tracking-wide">
                ግንቦት 16/2018 ዓ.ም
              </span>
            </div>

            {/* Big Bold Greeting: ውድ ቤተሰቦች እና ጓደኞች */}
            <h2 className="text-2xl sm:text-3xl font-ethiopic-serif font-black text-white drop-shadow-[0_3px_10px_rgba(0,0,0,0.95)] mt-4 tracking-wide">
              ውድ ቤተሰቦች እና ጓደኞች
            </h2>
          </motion.div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. SCRIPTURE CARD WITH HEART & GOLDEN VERSE (Exact styling from image)   */}
      {/* ========================================================================= */}
      <div className="relative px-5 pt-5 pb-2 flex flex-col items-center z-10 max-w-md mx-auto w-full text-center">
        
        {/* Rounded Card with Thin Gold Border & Heart Accent */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="w-full rounded-2xl border border-[#C9A66B]/35 bg-[#111112]/90 backdrop-blur-md px-6 py-5 shadow-[0_12px_35px_rgba(0,0,0,0.85)] flex flex-col items-center"
        >
          {/* Heart Icon on top */}
          <Heart className="w-4 h-4 text-[#C9A66B] fill-transparent mb-2.5 opacity-90" />

          {/* Scripture Verse Quote in Amharic */}
          <p className="text-base sm:text-lg font-ethiopic-serif text-[#F4E3B2] leading-relaxed tracking-wide">
            &ldquo;እግዚአብሔር ነገርን ሁሉ በጊዜው ውብ አድርጎ ሠራው፡፡&rdquo;
          </p>

          {/* Scripture Citation */}
          <span className="text-xs sm:text-sm font-ethiopic-sans text-[#C9A66B] mt-2 font-medium tracking-wider">
            መክ 3:11
          </span>
        </motion.div>

        {/* ========================================================================= */}
        {/* 4. BANQUET INVITATION STATEMENT (From image)                              */}
        {/* ========================================================================= */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-6 flex flex-col items-center text-center px-2"
        >
          <p className="text-sm sm:text-base font-ethiopic-sans text-neutral-100 font-normal leading-relaxed">
            የክብር እንግዳችን እንድትሆኑ በታላቅ ደስታና ፍቅር ጋብዘንዎታል።
          </p>

          {/* Groom and Bride Parent / Formal Titles */}
          <p className="text-base sm:text-lg font-ethiopic-serif font-bold text-[#E5B56E] mt-3.5 tracking-wide drop-shadow-sm">
            {wedding.groomFullTitleAm || 'የአቶ አዳነ አረጋ'} እና {wedding.brideFullTitleAm || 'የወ/ሪት ቢታንያ መስፍን'}
          </p>
        </motion.div>

        {/* Detailed Time & Venue Subtext */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mt-4 pt-3 border-t border-[#C9A66B]/20 w-full flex flex-col items-center gap-1 text-center"
        >
          <p className="text-xs sm:text-sm font-ethiopic-sans text-neutral-300">
            በዚሁ ዕለት በአዳራሽ <span className="text-[#F4E3B2] font-semibold">{wedding.receptionTimeAm}</span> ጀምሮ
          </p>
          <button
            id="btn-hero-venue-link"
            onClick={onNavigateToMap}
            className="text-xs font-ethiopic-sans text-[#C9A66B] hover:text-[#F4E3B2] underline underline-offset-4 mt-1 transition-colors"
          >
            ቦታ፦ {wedding.venueNameAm} ({wedding.venueNameEn}) &rarr;
          </button>
        </motion.div>
      </div>

      {/* Gold Ribbon Divider Transition */}
      <GoldRibbonDivider className="mt-6" />
    </section>
  );
}
