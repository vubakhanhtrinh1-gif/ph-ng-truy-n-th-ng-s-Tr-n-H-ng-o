import React from 'react';
import { VIEWPOINTS } from '../data/doors';
import { ViewpointId } from '../types/lobby';
import { Eye, Move } from 'lucide-react';

interface ViewpointControlsProps {
  currentViewpoint: ViewpointId;
  onSelectViewpoint: (id: ViewpointId) => void;
}

export const ViewpointControls: React.FC<ViewpointControlsProps> = ({
  currentViewpoint,
  onSelectViewpoint,
}) => {
  return (
    <div className="fixed bottom-4 left-0 right-0 z-20 flex flex-col items-center gap-2 pointer-events-none px-4">
      {/* Viewpoint switcher segmented control */}
      <div className="pointer-events-auto flex items-center gap-1 p-1 bg-[#12161f]/95 border border-stone-800/95 rounded-xl shadow-2xl backdrop-blur-md max-w-full overflow-x-auto">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[11px] text-stone-400 font-sans-ui border-r border-stone-800">
          <Eye className="w-3.5 h-3.5 text-[#FFD75A]" />
          <span>Góc nhìn:</span>
        </div>

        {VIEWPOINTS.map((vp) => {
          const isActive = currentViewpoint === vp.id;
          return (
            <button
              key={vp.id}
              onClick={() => onSelectViewpoint(vp.id)}
              className={`px-3 py-1.5 text-xs font-sans-ui font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-[#FFD75A] text-[#0f1218] shadow-[0_0_16px_rgba(255,215,90,0.35)] font-bold'
                  : 'text-stone-300 hover:text-[#FFD75A] hover:bg-stone-800/60'
              }`}
            >
              {vp.name}
            </button>
          );
        })}
      </div>

      {/* Gentle interaction hint */}
      <div className="flex items-center gap-1.5 text-[11px] text-stone-400 font-sans-ui">
        <Move className="w-3 h-3 text-[#FFD75A]/80" />
        <span>Kéo chuột hoặc vuốt để quan sát không gian · Chạm vào các cánh cổng để tìm hiểu</span>
      </div>
    </div>
  );
};
