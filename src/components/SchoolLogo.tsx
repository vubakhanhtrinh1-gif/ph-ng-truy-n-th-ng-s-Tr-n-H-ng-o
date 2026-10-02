import React from 'react';
import officialLogoSvg from '../assets/images/logo_thpt_a_tran_hung_dao.svg';

interface SchoolLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showLabel?: boolean;
}

export const SchoolLogo: React.FC<SchoolLogoProps> = ({
  className = '',
  size = 'md',
  showLabel = false,
}) => {
  // Dimension classes
  const sizeMap = {
    sm: 'w-7 h-7',
    md: 'w-8 h-8 md:w-9 md:h-9',
    lg: 'w-16 h-16 md:w-20 md:h-20',
    xl: 'w-24 h-24 md:w-28 md:h-28',
  };

  return (
    <div className={`relative inline-flex items-center justify-center shrink-0 ${className}`}>
      <img
        src={officialLogoSvg}
        alt="Huy hiệu chính thức Trường THPT A Trần Hưng Đạo"
        className={`${sizeMap[size]} object-contain drop-shadow-[0_0_12px_rgba(255,215,90,0.4)]`}
        referrerPolicy="no-referrer"
      />
      {showLabel && (
        <span className="sr-only">Logo Trường THPT A Trần Hưng Đạo</span>
      )}
    </div>
  );
};
