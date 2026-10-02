import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { ambientSound } from '../audio/ambientAudio';
import { SchoolLogo } from './SchoolLogo';

interface EntranceSequenceProps {
  onEnter: () => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
}

export const EntranceSequence: React.FC<EntranceSequenceProps> = ({
  onEnter,
  isAudioOn,
  onToggleAudio,
}) => {
  const [step, setStep] = useState<number>(1);

  // Progressive ceremonial timer
  useEffect(() => {
    const timer1 = setTimeout(() => setStep(2), 700);   // Logo reveals
    const timer2 = setTimeout(() => setStep(3), 1800);  // School Name reveals
    const timer3 = setTimeout(() => setStep(4), 2900);  // 60 Nam (1966-2026)
    const timer4 = setTimeout(() => setStep(5), 4000);  // Spatial light breathes
    const timer5 = setTimeout(() => setStep(6), 5100);  // "Chào mừng bạn trở về"
    const timer6 = setTimeout(() => setStep(7), 6200);  // Primary actions reveal

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearTimeout(timer6);
    };
  }, []);

  const handleStartExplore = () => {
    ambientSound.playGentleChime();
    onEnter();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-between p-6 md:p-12 overflow-hidden bg-[#0a0c10] text-[#f5f2ea]"
    >
      {/* Background architectural aura that subtly reveals itself in step 5 */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          step >= 5 ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 45%, rgba(255, 215, 90, 0.12) 0%, rgba(18, 22, 30, 0.4) 60%, rgba(10, 12, 16, 0.98) 100%)',
        }}
      />

      {/* Subtle architectural grid lines */}
      <div
        className={`absolute inset-0 pointer-events-none transition-opacity duration-1000 ${
          step >= 5 ? 'opacity-20' : 'opacity-0'
        }`}
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(255, 215, 90, 0.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 215, 90, 0.06) 1px, transparent 1px)',
          backgroundSize: '80px 80px',
        }}
      />

      {/* Top utility row: Skip & Audio */}
      <div className="relative z-10 w-full flex items-center justify-between text-xs tracking-wider uppercase text-stone-300">
        <div className="flex items-center gap-2.5">
          <SchoolLogo size="sm" />
          <span className="w-1.5 h-1.5 rounded-full bg-[#FFD75A] animate-pulse" />
          <span className="font-monument tracking-widest text-[#FFD75A] text-[11px] font-bold">
            SẢNH CHỜ KHÔNG GIAN SỐ
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onToggleAudio}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-stone-800 bg-stone-900/70 hover:border-[#FFD75A]/50 hover:text-[#FFD75A] transition-colors cursor-pointer"
            aria-label="Bật/Tắt âm thanh"
          >
            {isAudioOn ? (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#FFD75A]" />
                <span className="text-[11px] font-sans-ui">Âm thanh: Bật</span>
              </>
            ) : (
              <>
                <VolumeX className="w-3.5 h-3.5 text-stone-500" />
                <span className="text-[11px] font-sans-ui">Âm thanh: Tắt</span>
              </>
            )}
          </button>

          <button
            onClick={handleStartExplore}
            className="px-3.5 py-1.5 rounded-full border border-stone-700/80 bg-stone-900/80 hover:bg-stone-800 hover:text-white transition-all text-[11px] font-sans-ui tracking-wide text-stone-300 cursor-pointer"
          >
            Bỏ qua giới thiệu →
          </button>
        </div>
      </div>

      {/* Center ceremonial composition */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center max-w-3xl my-auto px-4">
        {/* STEP 2: School emblem appears */}
        <AnimatePresence>
          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.0, ease: 'easeOut' }}
              className="relative mb-6"
            >
              <div className="relative w-22 h-22 md:w-26 md:h-26 rounded-full p-[2px] bg-gradient-to-b from-[#FFD75A] via-[#F4C542] to-[#5a4313] shadow-[0_0_50px_rgba(255,215,90,0.3)] flex items-center justify-center">
                <div className="w-full h-full rounded-full bg-[#12151c] flex flex-col items-center justify-center border border-[#FFD75A]/40 text-[#FFD75A] p-2">
                  <SchoolLogo size="lg" />
                </div>
              </div>

              {/* Gentle ring aura */}
              <div className="absolute inset-0 -m-3 rounded-full border border-[#FFD75A]/25 animate-ping [animation-duration:4s]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 3: School Name */}
        <AnimatePresence>
          {step >= 3 && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="space-y-1"
            >
              <p className="text-xs uppercase tracking-[0.28em] text-[#FFD75A] font-monument font-semibold">
                TRƯỜNG TRUNG HỌC PHỔ THÔNG
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-5xl font-monument font-bold tracking-tight text-[#f7f4ee] uppercase">
                A TRẦN HƯNG ĐẠO
              </h1>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 4: 60-Year Milestone */}
        <AnimatePresence>
          {step >= 4 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, ease: 'easeOut' }}
              className="mt-4 flex items-center justify-center gap-3 text-stone-200"
            >
              <div className="h-[1px] w-8 md:w-16 bg-gradient-to-r from-transparent to-[#FFD75A]" />
              <div className="flex items-center gap-2">
                <span className="font-monument text-lg md:text-xl font-bold text-[#FFD75A] tracking-wider">
                  60 NĂM
                </span>
                <span className="text-stone-400">·</span>
                <span className="font-sans-ui text-xs md:text-sm tracking-widest text-stone-200 uppercase font-medium">
                  1966 — 2026
                </span>
              </div>
              <div className="h-[1px] w-8 md:w-16 bg-gradient-to-l from-transparent to-[#FFD75A]" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 6: Core Emotional Message */}
        <AnimatePresence>
          {step >= 6 && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, ease: 'easeOut' }}
              className="mt-8 space-y-3"
            >
              <p className="text-2xl sm:text-3xl md:text-4xl font-editorial italic text-[#fbf9f5] font-normal leading-snug">
                “Chào mừng bạn trở về.”
              </p>
              <p className="text-sm md:text-base text-stone-300 font-sans-ui font-light max-w-md mx-auto">
                Nơi mỗi thế hệ để lại một câu chuyện.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STEP 7: Primary Action */}
        <AnimatePresence>
          {step >= 7 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <button
                onClick={handleStartExplore}
                className="group relative px-8 py-3.5 rounded-full overflow-hidden transition-all duration-300 bg-gradient-to-r from-[#FFD75A] via-[#FFD34E] to-[#F4C542] text-[#0f1218] font-bold text-sm tracking-wide shadow-[0_0_35px_rgba(255,215,90,0.45)] hover:shadow-[0_0_50px_rgba(255,215,90,0.65)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Compass className="w-4 h-4 transition-transform group-hover:rotate-45" />
                  <span>BẮT ĐẦU KHÁM PHÁ</span>
                </span>
                <span className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </button>

              <button
                onClick={handleStartExplore}
                className="px-6 py-3 rounded-full border border-stone-700/80 bg-stone-900/60 hover:bg-stone-800/80 hover:border-[#FFD75A]/50 text-stone-200 hover:text-white transition-all text-xs tracking-wider uppercase font-medium cursor-pointer"
              >
                Khám phá tự do
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer subtle identity footnote */}
      <div className="relative z-10 w-full text-center text-[11px] text-stone-400 font-sans-ui">
        <span>Không gian truyền thông số hoá chào mừng kỷ niệm 60 năm thành lập trường (1966 – 2026)</span>
      </div>
    </motion.div>
  );
};
