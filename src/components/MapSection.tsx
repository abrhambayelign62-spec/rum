import { useState } from 'react';
import { motion } from 'motion/react';
import { MapPin, Navigation, ExternalLink, Star, Copy, Check } from 'lucide-react';
import { WeddingDetails } from '../types';

interface MapSectionProps {
  wedding: WeddingDetails;
}

export default function MapSection({ wedding }: MapSectionProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(`${wedding.venueNameAm}, ${wedding.venueAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="venue-map-section" className="scroll-snap-section relative w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between py-8 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center pt-4 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#C9A66B] uppercase font-semibold">
            Wedding Venue Location
          </span>
          <h2 className="text-2xl sm:text-3xl font-ethiopic-serif font-bold text-white mt-1">
            የአዳራሹ መገኛ ካርታ
          </h2>
          <p className="text-xs font-ethiopic-sans text-neutral-400 mt-0.5">
            የሰርጉ ዝግጅት የሚካሄድበት ልዩ ቦታ
          </p>
        </motion.div>
      </div>

      {/* Main Map Box & Card Container */}
      <div className="relative w-full max-w-md mx-auto flex-1 flex flex-col rounded-2xl overflow-hidden border border-[#C9A66B]/30 shadow-2xl bg-neutral-900">
        {/* Interactive Google Maps Embed with fallback styling */}
        <div className="relative w-full flex-1 min-h-[360px] bg-neutral-950 overflow-hidden">
          <iframe
            title="Wedding Venue Location Map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15763.543592182098!2d38.7460!3d8.9880!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85aaf301b0f5%3A0xc47e3a985fca58f5!2sGofa%20Mebrat%2C%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1700000000000!5m2!1sen!2set"
            className="w-full h-full border-0 filter contrast-[1.05] brightness-[0.95]"
            loading="lazy"
            referrerPolicy="no-referrer"
            allowFullScreen
          />

          {/* Floating 'Open in Maps' Button */}
          <div className="absolute top-3 right-3 z-20">
            <a
              id="link-open-google-maps"
              href={wedding.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/80 hover:bg-black text-[#F4E3B2] border border-[#C9A66B]/40 text-xs font-medium shadow-lg backdrop-blur-md transition-all active:scale-95"
            >
              <Navigation className="w-3.5 h-3.5 text-[#C9A66B]" />
              <span>ካርታ ክፈት</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>

        {/* Location Details Card Overlay */}
        <div className="p-4 bg-gradient-to-b from-neutral-900 to-[#0d0d0d] border-t border-[#C9A66B]/20">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-ethiopic-serif font-bold text-white">
                  {wedding.venueNameAm}
                </h3>
                <span className="flex items-center gap-0.5 text-[11px] font-bold text-amber-400 bg-amber-950/60 px-1.5 py-0.5 rounded border border-amber-500/30">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  {wedding.venueRating}
                </span>
              </div>
              <p className="text-xs font-cinzel text-[#C9A66B] font-medium mt-0.5">
                {wedding.venueNameEn}
              </p>
              <p className="text-xs text-neutral-400 mt-1 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#C9A66B] shrink-0" />
                <span>{wedding.venueAddress}</span>
              </p>
            </div>

            <button
              id="btn-copy-address"
              onClick={handleCopyAddress}
              title="Copy venue address"
              className="p-2 rounded-lg bg-neutral-800/80 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-neutral-700 transition-colors"
            >
              {copied ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="mt-3 pt-3 border-t border-neutral-800/80 flex items-center justify-between text-xs">
            <span className="text-neutral-400 font-ethiopic-sans">
              የእራት ፕሮግራም፡ <strong className="text-neutral-200">{wedding.receptionTimeAm}</strong>
            </span>
            <a
              href={wedding.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#F4E3B2] hover:text-white font-medium underline underline-offset-4 flex items-center gap-1"
            >
              አቅጣጫ አሳየኝ
            </a>
          </div>
        </div>
      </div>

      <div className="pb-2" />
    </section>
  );
}
