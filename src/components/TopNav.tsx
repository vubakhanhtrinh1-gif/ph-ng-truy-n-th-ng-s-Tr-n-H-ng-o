import React from 'react';
import { Volume2, VolumeX, Info, RotateCcw } from 'lucide-react';
import { ViewpointId } from '../types/lobby';
import { SchoolLogo } from './SchoolLogo';

interface TopNavProps {
  currentViewpoint: ViewpointId;
  onSelectViewpoint: (id: ViewpointId) => void;
  isAudioOn: boolean;
  onToggleAudio: () => void;
  onOpenAbout: () => void;
  onReplayIntro: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentViewpoint,
  onSelectViewpoint,
  isAudioOn,
  onToggleAudio,
  onOpenAbout,
  onReplayIntro,
}) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-30 flex items-center justify-between px-5 md:px-8 py-3.5 border-b border-stone-800/80 bg-[#0c0e13]/90 backdrop-blur-md">
      {/* Zone 1: Single identity lockup: [OFFICIAL SCHOOL LOGO]  THPT A TRẦN HƯNG ĐẠO */}
      <button
        onClick={() => onSelectViewpoint('hero')}
        className="flex items-center gap-2.5 hover:opacity-95 transition-opacity text-left shrink-0 cursor-pointer group"
      >
        <SchoolLogo size="md" />
        <span className="text-sm md:text-base font-monument font-bold tracking-wider text-[#f7f4ee] group-hover:text-[#FFD75A] transition-colors whitespace-nowrap">
          THPT A TRẦN HƯNG ĐẠO
        </span>
      </button>

      {/* Zone 2: 4-5 clean text navigation links */}
      <nav className="hidden lg:flex items-center gap-6 text-xs font-sans-ui font-medium text-stone-300">
        <button
          onClick={() => onSelectViewpoint('hero')}
          className={`transition-colors hover:text-[#FFD75A] whitespace-nowrap cursor-pointer ${
            currentViewpoint === 'hero'
              ? 'text-[#FFD75A] underline underline-offset-8 decoration-2 font-semibold'
              : 'text-stone-300'
          }`}
        >
          Sảnh Toàn Cảnh
        </button>

        <button
          onClick={() => onSelectViewpoint('identity')}
          className={`transition-colors hover:text-[#FFD75A] whitespace-nowrap cursor-pointer ${
            currentViewpoint === 'identity'
              ? 'text-[#FFD75A] underline underline-offset-8 decoration-2 font-semibold'
              : 'text-stone-300'
          }`}
        >
          Biểu Tượng 60 Năm
        </button>

        <button
          onClick={() => onSelectViewpoint('heritage')}
          className={`transition-colors hover:text-[#FFD75A] whitespace-nowrap cursor-pointer ${
            currentViewpoint === 'heritage'
              ? 'text-[#FFD75A] underline underline-offset-8 decoration-2 font-semibold'
              : 'text-stone-300'
          }`}
        >
          Hành Lang Truyền Thống
        </button>

        <button
          onClick={() => onSelectViewpoint('future')}
          className={`transition-colors hover:text-[#FFD75A] whitespace-nowrap cursor-pointer ${
            currentViewpoint === 'future'
              ? 'text-[#FFD75A] underline underline-offset-8 decoration-2 font-semibold'
              : 'text-stone-300'
          }`}
        >
          Cánh Cổng Tương Lai
        </button>

        <button
          onClick={() => onSelectViewpoint('archival')}
          className={`transition-colors hover:text-[#FFD75A] whitespace-nowrap cursor-pointer ${
            currentViewpoint === 'archival'
              ? 'text-[#FFD75A] underline underline-offset-8 decoration-2 font-semibold'
              : 'text-stone-300'
          }`}
        >
          Dấu Ấn 1966
        </button>
      </nav>

      {/* Zone 3: 1-2 primary actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Audio Mute/Unmute */}
        <button
          onClick={onToggleAudio}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-sans-ui text-stone-200 bg-stone-900/80 border border-stone-800 rounded-lg hover:border-[#FFD75A]/50 hover:text-[#FFD75A] transition-colors whitespace-nowrap cursor-pointer"
          title={isAudioOn ? 'Tắt âm thanh không gian' : 'Bật âm thanh không gian'}
          aria-label={isAudioOn ? 'Tắt âm thanh' : 'Bật âm thanh'}
        >
          {isAudioOn ? (
            <Volume2 className="w-3.5 h-3.5 text-[#FFD75A]" />
          ) : (
            <VolumeX className="w-3.5 h-3.5 text-stone-500" />
          )}
          <span className="hidden sm:inline">{isAudioOn ? 'Âm thanh' : 'Tắt âm'}</span>
        </button>

        {/* Replay Intro */}
        <button
          onClick={onReplayIntro}
          className="p-1.5 sm:px-3 sm:py-1.5 text-xs font-sans-ui text-stone-300 bg-stone-900/80 border border-stone-800 rounded-lg hover:border-stone-700 hover:text-stone-100 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5"
          title="Xem lại phần giới thiệu sảnh chờ"
        >
          <RotateCcw className="w-3.5 h-3.5 text-stone-400" />
          <span className="hidden md:inline">Giới thiệu</span>
        </button>

        {/* Primary CTA button: Về Sảnh Chờ */}
        <button
          onClick={onOpenAbout}
          className="px-3.5 py-1.5 text-xs font-sans-ui font-semibold text-[#0f1218] bg-[#FFD75A] hover:bg-[#ffe07a] shadow-[0_0_18px_rgba(255,215,90,0.35)] rounded-lg transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 active:scale-95"
        >
          <Info className="w-3.5 h-3.5 text-[#0f1218]" />
          <span>Về Sảnh Chờ</span>
        </button>
      </div>
    </header>
  );
};
