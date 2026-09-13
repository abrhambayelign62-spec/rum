import { useState, useEffect, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Send, CheckCircle2, Heart, Edit3 } from 'lucide-react';
import { GuestRsvp, WeddingDetails } from '../types';

interface RsvpSectionProps {
  wedding: WeddingDetails;
}

export default function RsvpSection({ wedding }: RsvpSectionProps) {
  const [fullName, setFullName] = useState('');
  const [attendance, setAttendance] = useState<'attending' | 'declined'>('attending');
  const [guestCount, setGuestCount] = useState(2);
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [existingRsvp, setExistingRsvp] = useState<GuestRsvp | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('habesha_wedding_rsvp');
      if (saved) {
        const parsed = JSON.parse(saved);
        setExistingRsvp(parsed);
        setSubmitted(true);
        setFullName(parsed.fullName);
        setAttendance(parsed.attendance);
        setGuestCount(parsed.guestCount || 2);
        setMessage(parsed.message);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName.trim()) return;

    const rsvpData: GuestRsvp = {
      fullName: fullName.trim(),
      phone: '',
      attendance,
      guestCount: attendance === 'attending' ? guestCount : 0,
      message: message.trim(),
      submittedAt: new Date().toISOString(),
    };

    try {
      localStorage.setItem('habesha_wedding_rsvp', JSON.stringify(rsvpData));
    } catch {
      // ignore
    }

    setExistingRsvp(rsvpData);
    setSubmitted(true);
  };

  const handleEditAgain = () => {
    setSubmitted(false);
  };

  return (
    <section id="rsvp-section" className="scroll-snap-section relative w-full min-h-screen bg-[#0A0A0A] text-white flex flex-col justify-between py-10 px-4 sm:px-6">
      {/* Header */}
      <div className="text-center pt-2 pb-4">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[11px] font-cinzel tracking-[0.25em] text-[#C9A66B] uppercase font-semibold">
            RSVP &amp; Blessings
          </span>
          <h2 className="text-2xl sm:text-3xl font-ethiopic-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#F4E3B2] via-[#C9A66B] to-[#F4E3B2] mt-1">
            ደስታችንን ተካፈሉን
          </h2>
          <p className="text-xs font-ethiopic-sans text-neutral-400 mt-1">
            በሰርጋችን ላይ መገኘትዎን ያረጋግጡ
          </p>
        </motion.div>
      </div>

      {/* Main Form or Confirmation State */}
      <div className="w-full max-w-md mx-auto my-auto">
        {submitted && existingRsvp ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-neutral-900/90 border border-[#C9A66B]/50 rounded-2xl p-6 text-center shadow-2xl backdrop-blur-md"
          >
            <div className="w-14 h-14 rounded-full bg-[#C9A66B]/20 border border-[#C9A66B] flex items-center justify-center mx-auto mb-4 text-[#F4E3B2]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <h3 className="text-lg font-ethiopic-serif font-bold text-[#F4E3B2]">
              እናመሰግናለን!
            </h3>
            <p className="text-sm font-ethiopic-sans text-neutral-200 mt-2">
              ውድ <strong className="text-white">{existingRsvp.fullName}</strong>፣ ምላሽዎ በተሳካ ሁኔታ ተመዝግቧል!
            </p>

            <div className="my-4 p-3 rounded-xl bg-black/50 border border-neutral-800 text-xs font-ethiopic-sans text-neutral-300">
              {existingRsvp.attendance === 'attending' ? (
                <span className="text-emerald-400 font-medium">
                  ✓ በደስታ እገኛለሁ ({existingRsvp.guestCount} ተጋባዥ)
                </span>
              ) : (
                <span className="text-rose-400 font-medium">
                  ✗ ይቅርታ፣ መገኘት አልችልም
                </span>
              )}
              {existingRsvp.message && (
                <p className="mt-2 text-neutral-400 italic text-[11px] border-t border-neutral-800 pt-2">
                  "{existingRsvp.message}"
                </p>
              )}
            </div>

            <button
              id="btn-edit-rsvp"
              onClick={handleEditAgain}
              className="inline-flex items-center gap-1.5 text-xs text-[#C9A66B] hover:text-[#F4E3B2] transition-colors py-1 underline underline-offset-4"
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>ምላሽ ለመቀየር ይጫኑ</span>
            </button>
          </motion.div>
        ) : (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col space-y-4"
          >
            {/* Field 1: Full Name */}
            <div>
              <label 
                htmlFor="input-full-name"
                className="block text-xs font-ethiopic-sans font-medium text-neutral-200 mb-1.5"
              >
                ሙሉ ስም <span className="text-amber-400">*</span>
              </label>
              <input
                id="input-full-name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="ስምዎን እዚህ ያስገቡ..."
                className="w-full px-4 py-3 rounded-xl bg-white text-neutral-950 placeholder-neutral-400 text-sm font-ethiopic-sans font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A66B] shadow-inner"
              />
            </div>

            {/* Field 2: Attendance Radio Options */}
            <div>
              <span className="block text-xs font-ethiopic-sans font-medium text-neutral-200 mb-2">
                ሰርጋችን ላይ መገኘት ይችላሉ? <span className="text-amber-400">*</span>
              </span>
              <div className="space-y-2">
                <label 
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    attendance === 'attending'
                      ? 'bg-neutral-900 border-[#C9A66B] text-white shadow-md'
                      : 'bg-neutral-900/50 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    checked={attendance === 'attending'}
                    onChange={() => setAttendance('attending')}
                    className="w-4 h-4 text-[#C9A66B] accent-[#C9A66B]"
                  />
                  <span className="text-xs font-ethiopic-sans font-medium">
                    አዎ፣ በደስታ! እመጣለሁ።
                  </span>
                </label>

                <label 
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                    attendance === 'declined'
                      ? 'bg-neutral-900 border-[#C9A66B] text-white shadow-md'
                      : 'bg-neutral-900/50 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                  }`}
                >
                  <input
                    type="radio"
                    name="attendance"
                    checked={attendance === 'declined'}
                    onChange={() => setAttendance('declined')}
                    className="w-4 h-4 text-[#C9A66B] accent-[#C9A66B]"
                  />
                  <span className="text-xs font-ethiopic-sans font-medium">
                    በጣም ይቅርታ፣ መገኘት አልችልም።
                  </span>
                </label>
              </div>
            </div>

            {/* Field 3: Number of guests if attending */}
            {attendance === 'attending' && (
              <div>
                <label 
                  htmlFor="select-guest-count"
                  className="block text-xs font-ethiopic-sans font-medium text-neutral-200 mb-1.5"
                >
                  የተጋባዥ ብዛት (Guests)
                </label>
                <select
                  id="select-guest-count"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl bg-white text-neutral-950 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#C9A66B]"
                >
                  <option value={1}>1 ተጋባዥ (1 Guest)</option>
                  <option value={2}>2 ተጋባዦች (2 Guests - Access Card)</option>
                </select>
              </div>
            )}

            {/* Field 4: Message for bride & groom */}
            <div>
              <label 
                htmlFor="textarea-blessing"
                className="block text-xs font-ethiopic-sans font-medium text-neutral-200 mb-1.5"
              >
                ለሙሽራይቱና ለሙሽራው መልዕክት
              </label>
              <textarea
                id="textarea-blessing"
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="የምርቃት ወይም የደስታ መግለጫ መልዕክትዎን እዚህ ያስፍሩ..."
                className="w-full px-4 py-3 rounded-xl bg-white text-neutral-950 placeholder-neutral-400 text-sm font-ethiopic-sans focus:outline-none focus:ring-2 focus:ring-[#C9A66B] shadow-inner resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              id="btn-submit-rsvp"
              type="submit"
              className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#B8874E] via-[#C9A66B] to-[#9C753B] hover:opacity-95 text-white font-ethiopic-sans font-bold text-sm tracking-wider shadow-[0_0_20px_rgba(201,166,107,0.3)] transition-all active:scale-95 flex items-center justify-center gap-2 mt-2"
            >
              <span>ይላኩ (Send)</span>
              <Send className="w-4 h-4" />
            </button>
          </motion.form>
        )}
      </div>

      {/* Footer Credit Line */}
      <div className="text-center pt-8 pb-4 text-neutral-500 text-[11px] font-ethiopic-sans">
        <p className="flex items-center justify-center gap-1">
          <span>በፍቅር የተዘጋጀ</span>
          <Heart className="w-3 h-3 text-[#C9A66B] fill-current" />
          <span>ለአዳነ እና ቢታኒያ</span>
        </p>
        <p className="text-[10px] font-cinzel text-neutral-600 tracking-wider mt-1 uppercase">
          Yene Serg • የኔ ሰርግ | Digital Wedding Experience
        </p>
      </div>
    </section>
  );
}
