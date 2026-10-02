import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Lock, Sparkles, CornerDownLeft } from 'lucide-react';
import { ExplorationDoor } from '../types/lobby';
import archivalPhotoPath from '../assets/images/archival_photo_1966_1790917981565.jpg';

interface DoorDetailModalProps {
  selectedDoor: ExplorationDoor | null;
  showArchivalModal: boolean;
  onClose: () => void;
  onFocusDoorView?: (door: ExplorationDoor) => void;
}

export const DoorDetailModal: React.FC<DoorDetailModalProps> = ({
  selectedDoor,
  showArchivalModal,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {(selectedDoor || showArchivalModal) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#07090c]/85 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-stone-800 bg-[#12151d] p-6 sm:p-8 shadow-2xl text-[#f5f2ea]"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800/80 transition-colors cursor-pointer"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>

            {/* CASE 1: ARCHIVAL PEDESTAL */}
            {showArchivalModal && (
              <div className="space-y-5">
                <div className="flex items-center gap-2 text-xs font-sans-ui text-[#FFD75A]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD75A] shadow-[0_0_8px_rgba(255,215,90,0.8)]" />
                  <span className="font-monument uppercase tracking-wider font-bold">
                    KỶ VẬT LƯU GIỮ TỪ 1966
                  </span>
                </div>

                <div className="overflow-hidden rounded-xl border border-stone-800 bg-[#0d0f14]">
                  <img
                    src={archivalPhotoPath}
                    alt="Tài liệu lưu giữ từ năm 1966"
                    className="w-full h-56 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="p-3 bg-stone-900/60 border-t border-stone-800 text-[11px] font-editorial italic text-stone-300 text-center">
                    “Dấu ấn từ những năm đầu — Nền tảng dựng xây 60 năm truyền thống.”
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-monument font-bold text-[#f7f4ee]">
                    DẤU ẤN TỪ NHỮNG NĂM ĐẦU
                  </h3>
                  <p className="text-xs sm:text-sm font-sans-ui text-stone-300 leading-relaxed">
                    Hình ảnh và tài liệu lịch sử nguyên bản thời kỳ thành lập trường năm 1966 sẽ được giới thiệu trọn vẹn và trang trọng bên trong không gian chuyên đề tiếp theo.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl border border-[#FFD75A]/30 bg-[#FFD75A]/10 text-xs text-stone-200 font-sans-ui flex items-start gap-2.5">
                  <Sparkles className="w-4 h-4 text-[#FFD75A] shrink-0 mt-0.5" />
                  <span>
                    Hiện vật sẽ được trưng bày tại <strong>Phòng Lịch sử & Truyền thống</strong> trong giai đoạn kế tiếp của dự án Phòng Truyền thông Số.
                  </span>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={onClose}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold font-sans-ui text-[#0f1218] bg-[#FFD75A] hover:bg-[#ffe07a] shadow-[0_0_15px_rgba(255,215,90,0.3)] transition-all cursor-pointer"
                  >
                    Quay lại sảnh chờ
                  </button>
                </div>
              </div>
            )}

            {/* CASE 2: EXPLORATION DOOR */}
            {selectedDoor && !showArchivalModal && (
              <div className="space-y-5">
                {/* Header status */}
                <div className="flex items-center gap-2 text-xs font-sans-ui text-stone-400">
                  <span className="font-monument text-[#FFD75A] font-bold">{selectedDoor.number}</span>
                  <span aria-hidden="true">·</span>
                  <span className="uppercase tracking-wider text-[#FFD75A] font-semibold">CÁNH CỬA KHÁM PHÁ</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-stone-400">Giai đoạn kế tiếp</span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-monument font-bold text-[#f7f4ee] tracking-tight">
                    {selectedDoor.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-sans-ui text-[#FFD75A] mt-1 font-medium">
                    {selectedDoor.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm font-sans-ui text-stone-300 leading-relaxed">
                  {selectedDoor.description}
                </p>

                {/* Institutional In-Progress Notice */}
                <div className="p-4 rounded-xl border border-stone-800 bg-[#0d0f14]/80 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#FFD75A]">
                    <Lock className="w-3.5 h-3.5 text-[#FFD75A]" />
                    <span>Khu vực đang được hoàn thiện</span>
                  </div>
                  <p className="text-xs text-stone-400 leading-relaxed font-sans-ui">
                    {selectedDoor.futurePhaseNote}
                  </p>
                </div>

                {/* Action buttons */}
                <div className="pt-2 flex items-center justify-between gap-3">
                  <span className="text-[11px] text-stone-500 font-sans-ui">
                    Giai đoạn 1: Sảnh Chờ (Digital Lobby)
                  </span>

                  <button
                    onClick={onClose}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-bold font-sans-ui text-[#0f1218] bg-[#FFD75A] hover:bg-[#ffe07a] shadow-[0_0_15px_rgba(255,215,90,0.3)] transition-all cursor-pointer"
                  >
                    <CornerDownLeft className="w-3.5 h-3.5" />
                    <span>Quay lại sảnh chờ</span>
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
