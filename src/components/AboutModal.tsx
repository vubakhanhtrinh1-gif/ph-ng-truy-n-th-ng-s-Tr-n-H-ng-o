import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Building2 } from 'lucide-react';
import { SchoolLogo } from './SchoolLogo';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#07090c]/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl border border-stone-800 bg-[#12151e] p-6 sm:p-8 shadow-2xl text-[#f5f2ea]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header with Official Logo Lockup */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-2 text-xs font-sans-ui text-[#FFD75A]">
                <Building2 className="w-4 h-4 text-[#FFD75A]" />
                <span className="font-monument uppercase tracking-widest font-bold text-[11px]">
                  KHÔNG GIAN SỐ HOÁ
                </span>
              </div>

              <div className="flex items-center gap-3">
                <SchoolLogo size="lg" />
                <div>
                  <h2 className="text-xl sm:text-2xl font-monument font-bold text-[#f7f4ee]">
                    TRƯỜNG THPT A TRẦN HƯNG ĐẠO
                  </h2>
                  <p className="text-xs font-sans-ui text-stone-400 mt-0.5">
                    Giai đoạn 1: Sảnh Chờ (Digital Lobby) — Ngưỡng cửa không gian truyền thông ảo
                  </p>
                </div>
              </div>
            </div>

            {/* Key Verified Institutional Facts */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3.5 rounded-xl border border-stone-800 bg-[#0d0f14]/80">
                <span className="text-[11px] font-sans-ui text-stone-400 uppercase tracking-wider block">
                  Năm thành lập
                </span>
                <span className="text-xl font-monument font-bold text-[#FFD75A] mt-0.5 block">
                  1966
                </span>
              </div>

              <div className="p-3.5 rounded-xl border border-stone-800 bg-[#0d0f14]/80">
                <span className="text-[11px] font-sans-ui text-stone-400 uppercase tracking-wider block">
                  Dấu mốc kỷ niệm
                </span>
                <span className="text-xl font-monument font-bold text-[#f7f4ee] mt-0.5 block">
                  60 NĂM
                </span>
                <span className="text-[11px] text-[#FFD75A] font-medium">1966 — 2026</span>
              </div>
            </div>

            {/* Core Message */}
            <div className="p-4 rounded-xl border border-[#FFD75A]/40 bg-[#FFD75A]/10 text-center my-6 space-y-1.5 shadow-[0_0_25px_rgba(255,215,90,0.15)]">
              <p className="text-xl font-editorial italic text-[#fbf9f5]">
                “Chào mừng bạn trở về.”
              </p>
              <p className="text-xs text-stone-300 font-sans-ui">
                Nơi mỗi thế hệ để lại một câu chuyện.
              </p>
            </div>

            {/* Curatorial Philosophy */}
            <div className="space-y-4 text-xs sm:text-sm font-sans-ui text-stone-300 leading-relaxed">
              <p>
                <strong>Sảnh Chờ (Digital Lobby)</strong> là không gian khởi đầu mang phong cách kiến trúc di sản hiện đại (Modern Heritage). Không gian được thiết kế nhằm xác lập nhận diện trường, mang lại cảm xúc ấm áp cho các thế hệ thầy cô, cựu học sinh và học sinh khi bước qua cánh cửa số.
              </p>

              <div className="p-3.5 rounded-xl bg-stone-900/70 border border-stone-800 text-xs text-stone-300 space-y-1">
                <span className="font-semibold text-[#FFD75A] block">Lộ trình triển khai các phân khu tiếp theo:</span>
                <ul className="list-disc pl-4 space-y-1 text-stone-400">
                  <li>Phòng Lịch sử & Truyền thống 60 năm</li>
                  <li>Phòng Trưng bày Thành tích & Huân chương</li>
                  <li>Cổng Tạp chí, Tin tức & Sự kiện học đường</li>
                  <li>Không gian Triển lãm Sản phẩm STEM & Nghệ thuật học sinh</li>
                  <li>Góc Lưu bút & Ký ức các thế hệ cựu học sinh</li>
                  <li>Cánh cửa Tương lai — Tầm nhìn giáo dục thời đại số</li>
                </ul>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-stone-800 flex justify-end">
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl text-xs font-bold font-sans-ui text-[#0f1218] bg-[#FFD75A] hover:bg-[#ffe07a] shadow-[0_0_18px_rgba(255,215,90,0.3)] transition-all cursor-pointer"
              >
                Tiếp tục trải nghiệm
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
